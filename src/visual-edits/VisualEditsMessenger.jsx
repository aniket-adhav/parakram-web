"use client";
import React, { useEffect, useState, useRef } from "react";

export const CHANNEL = "ORCHIDS_HOVER_v1";
const VISUAL_EDIT_MODE_KEY = "orchids_visual_edit_mode";
const FOCUSED_ELEMENT_KEY = "orchids_focused_element";

let _orchidsLastMsg = "";
const postMessageDedup = (data) => {
  try {
    const key = JSON.stringify(data);
    if (key === _orchidsLastMsg) return;
    _orchidsLastMsg = key;
  } catch (e) {
    // ignore
  }
  window.parent.postMessage(data, "*");
};

const BOX_PADDING = 4;

const isTextEditable = (element) => {
  const tagName = element.tagName.toLowerCase();
  const editableTags = [
    "p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "div", "li", "td", "th", "label", "a", "button",
  ];

  if (element.contentEditable === "true" || tagName === "input" || tagName === "textarea") {
    return true;
  }

  if (editableTags.includes(tagName) && element.textContent?.trim()) {
    const hasDirectText = Array.from(element.childNodes).some(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
    );

    if (element.childElementCount === 0 || (element.childElementCount <= 1 && hasDirectText)) {
      return true;
    }
  }

  return false;
};

const extractDirectTextContent = (element) => {
  let text = "";
  for (const node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent || "";
    }
  }
  return text;
};

const parseOrchidsId = (orchidsId) => {
  const parts = orchidsId.split(":");
  if (parts.length < 3) return null;
  const column = parseInt(parts.pop() || "0");
  const line = parseInt(parts.pop() || "0");
  const filePath = parts.join(":");
  if (isNaN(line) || isNaN(column)) return null;
  return { filePath, line, column };
};

const getCurrentStyles = (element) => {
  const computed = window.getComputedStyle(element);

  const normalizeValue = (value, property) => {
    if (property === "backgroundColor") {
      if (value === "rgba(0, 0, 0, 0)" || value === "rgb(0, 0, 0, 0)" || value === "transparent" || value === "") {
        return "transparent";
      }
    }
    if (property === "backgroundImage" && (value === "none" || value === "")) return "none";
    if (property === "textDecoration" && (value.includes("none") || value === "")) return "none";
    if (property === "fontStyle" && (value === "normal" || value === "")) return "normal";
    if (property === "fontWeight") {
      const weight = parseInt(value);
      return !isNaN(weight) ? String(weight) : (value || "400");
    }
    if (property === "opacity" && (value === "1" || value === "")) return "1";
    if ((property.includes("padding") || property.includes("margin")) && (value === "0px" || value === "0")) return "0";
    if (property === "borderRadius" && (value === "0px" || value === "0")) return "0";
    if (property === "letterSpacing" && (value === "normal" || value === "0px")) return "normal";
    if (property === "gap" && (value === "normal" || value === "0px")) return "normal";
    return value;
  };

  return {
    fontSize: normalizeValue(computed.fontSize, "fontSize"),
    color: normalizeValue(computed.color, "color"),
    fontWeight: normalizeValue(computed.fontWeight, "fontWeight"),
    fontStyle: normalizeValue(computed.fontStyle, "fontStyle"),
    textDecoration: normalizeValue(computed.textDecoration, "textDecoration"),
    textAlign: normalizeValue(computed.textAlign, "textAlign"),
    lineHeight: normalizeValue(computed.lineHeight, "lineHeight"),
    letterSpacing: normalizeValue(computed.letterSpacing, "letterSpacing"),
    paddingLeft: normalizeValue(computed.paddingLeft, "paddingLeft"),
    paddingRight: normalizeValue(computed.paddingRight, "paddingRight"),
    paddingTop: normalizeValue(computed.paddingTop, "paddingTop"),
    paddingBottom: normalizeValue(computed.paddingBottom, "paddingBottom"),
    marginLeft: normalizeValue(computed.marginLeft, "marginLeft"),
    marginRight: normalizeValue(computed.marginRight, "marginRight"),
    marginTop: normalizeValue(computed.marginTop, "marginTop"),
    marginBottom: normalizeValue(computed.marginBottom, "marginBottom"),
    backgroundColor: normalizeValue(computed.backgroundColor, "backgroundColor"),
    backgroundImage: normalizeValue(computed.backgroundImage, "backgroundImage"),
    borderRadius: normalizeValue(computed.borderRadius, "borderRadius"),
    fontFamily: normalizeValue(computed.fontFamily, "fontFamily"),
    opacity: normalizeValue(computed.opacity, "opacity"),
    display: normalizeValue(computed.display, "display"),
    flexDirection: normalizeValue(computed.flexDirection, "flexDirection"),
    alignItems: normalizeValue(computed.alignItems, "alignItems"),
    justifyContent: normalizeValue(computed.justifyContent, "justifyContent"),
    gap: normalizeValue(computed.gap, "gap"),
  };
};

const normalizeImageSrc = (input) => {
  if (!input) return "";
  try {
    const url = new URL(input, window.location.origin);
    if (url.pathname === "/_next/image") {
      const real = url.searchParams.get("url");
      if (real) return decodeURIComponent(real);
    }
    return url.href;
  } catch (e) {
    return input;
  }
};

const wrapMultiline = (text) => {
  if (text.includes("\n")) {
    const escaped = text.replace(/\n/g, "\\n");
    return `{\`${escaped}\`}`;
  }
  return text;
};

export default function VisualEditsMessenger() {
  const [hoverBoxes, setHoverBoxes] = useState([]);
  const [focusBox, setFocusBox] = useState(null);
  const [focusedElementId, setFocusedElementId] = useState(null);
  const [isVisualEditMode, setIsVisualEditMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(VISUAL_EDIT_MODE_KEY) === "true";
    }
    return false;
  });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);
  const [resizeStart, setResizeStart] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hoverTag, setHoverTag] = useState(null);
  const [focusTag, setFocusTag] = useState(null);

  const isResizingRef = useRef(false);
  const lastHitElementRef = useRef(null);
  const lastHitIdRef = useRef(null);
  const focusedElementRef = useRef(null);
  const isVisualEditModeRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const originalContentRef = useRef("");
  const originalSrcRef = useRef("");
  const focusedImageElementRef = useRef(null);
  const editingElementRef = useRef(null);
  const wasEditableRef = useRef(false);
  const styleElementRef = useRef(null);
  const appliedStylesRef = useRef(new Map());
  const hasStyleChangesRef = useRef(false);
  const lastClickTimeRef = useRef(0);
  const loadedFontFamilies = useRef(new Set());
  const persistentFontMap = useRef(new Map());
  const persistentFontTimeouts = useRef(new Map());

  useEffect(() => {
    isVisualEditModeRef.current = isVisualEditMode;
    if (typeof window !== "undefined") {
      localStorage.setItem(VISUAL_EDIT_MODE_KEY, String(isVisualEditMode));
    }
  }, [isVisualEditMode]);

  useEffect(() => {
    if (isVisualEditMode) {
      window.parent.postMessage({ type: CHANNEL, msg: "VISUAL_EDIT_MODE_ACK", active: true }, "*");
      window.parent.postMessage({ type: CHANNEL, msg: "VISUAL_EDIT_MODE_RESTORED", active: true }, "*");

      setTimeout(() => {
        if (typeof window !== "undefined") {
          const focusedData = localStorage.getItem(FOCUSED_ELEMENT_KEY);
          if (focusedData) {
            try {
              const { id } = JSON.parse(focusedData);
              const element = document.querySelector(`[data-orchids-id="${id}"]`);
              if (element) {
                const rect = element.getBoundingClientRect();
                const clickEvent = new MouseEvent("click", {
                  clientX: rect.left + rect.width / 2,
                  clientY: rect.top + rect.height / 2,
                  bubbles: true,
                  cancelable: true,
                });
                element.dispatchEvent(clickEvent);
              }
            } catch (e) {
              // ignore
            }
          }
        }
      }, 500);
    }
  }, []);

  const expandBox = (rect) => ({
    top: rect.top - BOX_PADDING,
    left: rect.left - BOX_PADDING,
    width: rect.width + BOX_PADDING * 2,
    height: rect.height + BOX_PADDING * 2,
  });

  const updateFocusBox = () => {
    if (focusedElementRef.current) {
      const r = focusedElementRef.current.getBoundingClientRect();
      setFocusBox(expandBox(r));
    }
  };

  useEffect(() => {
    if (isVisualEditMode && !styleElementRef.current) {
      const style = document.createElement("style");
      style.textContent = `
        [contenteditable="true"]:focus { outline: none !important; box-shadow: none !important; border-color: inherit !important; }
        [contenteditable="true"] { cursor: text !important; }
        [contenteditable="true"]::selection { background-color: rgba(59, 130, 246, 0.3); }
        [contenteditable="true"] [contenteditable="false"] { user-select: none !important; opacity: 0.7 !important; cursor: default !important; }
        [data-orchids-protected="true"] { user-select: none !important; }
      `;
      document.head.appendChild(style);
      styleElementRef.current = style;
    } else if (!isVisualEditMode && styleElementRef.current) {
      styleElementRef.current.remove();
      styleElementRef.current = null;
    }
    return () => styleElementRef.current?.remove();
  }, [isVisualEditMode]);

  const protectChildElements = (element) => {
    element.querySelectorAll("*").forEach((child) => {
      child.contentEditable = "false";
      child.setAttribute("data-orchids-protected", "true");
      child.style.userSelect = "none";
    });
  };

  const restoreChildElements = (element) => {
    element.querySelectorAll('[data-orchids-protected="true"]').forEach((child) => {
      child.removeAttribute("contenteditable");
      child.removeAttribute("data-orchids-protected");
      child.style.userSelect = "";
    });
  };

  const handleTextChange = (element) => {
    if (element !== editingElementRef.current) return;
    const orchidsId = element.getAttribute("data-orchids-id");
    if (!orchidsId) return;

    const newText = element.childElementCount > 0 
      ? extractDirectTextContent(element) 
      : (element.innerText || element.textContent || "");
    const oldText = originalContentRef.current;

    if (newText !== oldText) {
      const parsed = parseOrchidsId(orchidsId);
      if (!parsed) return;
      postMessageDedup({
        type: CHANNEL,
        msg: "TEXT_CHANGED",
        id: orchidsId,
        oldText: wrapMultiline(oldText),
        newText: wrapMultiline(newText),
        filePath: parsed.filePath,
        line: parsed.line,
        column: parsed.column,
      });
      originalContentRef.current = newText;
    }
  };

  const handleStyleChange = (element, styles) => {
    const orchidsId = element.getAttribute("data-orchids-id");
    if (!orchidsId) return;

    document.querySelectorAll(`[data-orchids-id="${orchidsId}"]`).forEach((el) => {
      Object.entries(styles).forEach(([property, value]) => {
        const cssProp = property.replace(/([A-Z])/g, "-$1").toLowerCase();
        let finalValue = value;
        if (property === "backgroundColor" && (value === "transparent" || value.startsWith("rgba(0, 0, 0, 0)"))) {
          finalValue = "transparent";
        }

        if (
          (property === "backgroundColor" && finalValue === "transparent") ||
          (property === "backgroundImage" && value === "none") ||
          (property === "textDecoration" && value === "none") ||
          (property === "fontStyle" && value === "normal") ||
          (property === "opacity" && value === "1") ||
          ((property.includes("padding") || property.includes("margin")) && value === "0") ||
          (property === "borderRadius" && value === "0") ||
          (property === "letterSpacing" && value === "normal") ||
          (property === "gap" && value === "normal")
        ) {
          el.style.removeProperty(cssProp);
        } else {
          el.style.setProperty(cssProp, finalValue, "important");
        }
      });
    });

    const existingStyles = appliedStylesRef.current.get(orchidsId) || {};
    appliedStylesRef.current.set(orchidsId, { ...existingStyles, ...styles });
    hasStyleChangesRef.current = true;
    requestAnimationFrame(updateFocusBox);
  };

  const handleStyleBlur = (element) => {
    if (!hasStyleChangesRef.current) return;
    const orchidsId = element.getAttribute("data-orchids-id");
    if (!orchidsId) return;
    const parsed = parseOrchidsId(orchidsId);
    if (!parsed) return;

    const appliedStyles = appliedStylesRef.current.get(orchidsId);
    if (!appliedStyles || Object.keys(appliedStyles).length === 0) return;

    postMessageDedup({
      type: CHANNEL,
      msg: "STYLE_BLUR",
      id: orchidsId,
      styles: appliedStyles,
      className: element.getAttribute("class") || "",
      filePath: parsed.filePath,
      line: parsed.line,
      column: parsed.column,
    });
    hasStyleChangesRef.current = false;
  };

  const flushImageSrcChange = () => {
    const imgElement = focusedImageElementRef.current;
    if (!imgElement) return;
    const orchidsId = imgElement.getAttribute("data-orchids-id");
    if (!orchidsId) return;
    const parsed = parseOrchidsId(orchidsId);
    if (!parsed) return;

    const newSrc = normalizeImageSrc(imgElement.src);
    const oldSrc = normalizeImageSrc(originalSrcRef.current);
    if (!newSrc || newSrc === oldSrc) return;

    postMessageDedup({
      type: CHANNEL,
      msg: "IMAGE_BLUR",
      id: orchidsId,
      oldSrc,
      newSrc,
      filePath: parsed.filePath,
      line: parsed.line,
      column: parsed.column,
    });
    originalSrcRef.current = newSrc;
    focusedImageElementRef.current = null;
  };

  useEffect(() => {
    function handleMessage(e) {
      if (e.data?.type === "ORCHIDS_STYLE_UPDATE") {
        const { elementId, styles } = e.data;
        const allMatchingElements = document.querySelectorAll(`[data-orchids-id="${elementId}"]`);
        if (allMatchingElements.length > 0) {
          const fam = styles.fontFamily;
          if (fam) {
            const familyKey = fam.replace(/['\s]+/g, "+");
            if (!loadedFontFamilies.current.has(familyKey)) {
              const link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = `https://fonts.googleapis.com/css2?family=${familyKey}:wght@400&display=swap`;
              document.head.appendChild(link);
              loadedFontFamilies.current.add(familyKey);
            }
            persistentFontMap.current.set(elementId, fam);
            const existingTimeout = persistentFontTimeouts.current.get(elementId);
            if (existingTimeout) clearTimeout(existingTimeout);
            const timeoutId = window.setTimeout(() => {
              persistentFontMap.current.delete(elementId);
              persistentFontTimeouts.current.delete(elementId);
            }, 2000);
            persistentFontTimeouts.current.set(elementId, timeoutId);
          }

          allMatchingElements.forEach((element) => {
            if (focusedElementRef.current === element) {
              handleStyleChange(element, styles);
            } else {
              Object.entries(styles).forEach(([property, value]) => {
                const cssProp = property.replace(/([A-Z])/g, "-$1").toLowerCase();
                element.style.setProperty(cssProp, String(value), "important");
              });
            }
          });
        }
      } else if (e.data?.type === "ORCHIDS_IMAGE_UPDATE") {
        const { elementId, src } = e.data;
        const imgEl = document.querySelector(`img[data-orchids-id="${elementId}"]`);
        if (imgEl) {
          imgEl.removeAttribute("srcset");
          imgEl.src = src;
          originalSrcRef.current = normalizeImageSrc(src);
          focusedImageElementRef.current = imgEl;
          imgEl.onload = updateFocusBox;
        }
      } else if (e.data?.type === "RESIZE_ELEMENT") {
        const { elementId, width, height } = e.data;
        const element = document.querySelector(`[data-orchids-id="${elementId}"]`);
        if (element && focusedElementRef.current === element) {
          element.style.setProperty("width", `${width}px`, "important");
          element.style.setProperty("height", `${height}px`, "important");
          updateFocusBox();
        }
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleResizeStart = (e, handle) => {
    if (!focusedElementRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const rect = focusedElementRef.current.getBoundingClientRect();
    setHoverBoxes([]);
    document.body.style.pointerEvents = "none";
    document.querySelectorAll(".resize-handle").forEach(h => h.style.pointerEvents = "auto");
    setIsResizing(true);
    isResizingRef.current = true;
    setResizeHandle(handle);
    setResizeStart({ x: e.clientX, y: e.clientY, width: rect.width, height: rect.height });
  };

  useEffect(() => {
    if (!isResizing || !resizeStart || !resizeHandle || !focusedElementRef.current) return;
    const handleMouseMove = (e) => {
      const dx = e.clientX - resizeStart.x;
      const dy = e.clientY - resizeStart.y;
      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;
      if (resizeHandle.includes("e")) newWidth = resizeStart.width + dx;
      if (resizeHandle.includes("w")) newWidth = resizeStart.width - dx;
      if (resizeHandle.includes("s")) newHeight = resizeStart.height + dy;
      if (resizeHandle.includes("n")) newHeight = resizeStart.height - dy;
      newWidth = Math.max(20, newWidth);
      newHeight = Math.max(20, newHeight);
      if (focusedElementId) {
        window.parent.postMessage({ type: CHANNEL, msg: "RESIZE_ELEMENT", elementId: focusedElementId, width: Math.round(newWidth), height: Math.round(newHeight) }, "*");
      }
    };
    const handleMouseUp = () => {
      if (focusedElementRef.current && focusedElementId) {
        const el = focusedElementRef.current;
        const rect = el.getBoundingClientRect();
        const orchidsId = el.getAttribute("data-orchids-id");
        const parsed = parseOrchidsId(orchidsId);
        window.parent.postMessage({
          type: CHANNEL,
          msg: "STYLE_BLUR",
          id: focusedElementId,
          styles: { width: `${Math.round(rect.width)}px`, height: `${Math.round(rect.height)}px` },
          filePath: parsed?.filePath || "",
          line: parsed?.line || 0,
          column: parsed?.column || 0,
          className: el.getAttribute("class") || "",
        }, "*");
      }
      setIsResizing(false);
      isResizingRef.current = false;
      document.body.style.pointerEvents = "";
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, resizeStart, resizeHandle, focusedElementId]);

  const cleanupEditingElement = () => {
    if (editingElementRef.current) {
      const el = editingElementRef.current;
      editingElementRef.current = null;
      handleStyleBlur(el);
      handleTextChange(el);
      if (el.childElementCount > 0) restoreChildElements(el);
      if (!wasEditableRef.current) el.contentEditable = "false";
      el.style.outline = "";
      el.style.boxShadow = "";
      el.blur();
    }
  };

  useEffect(() => {
    if (!isVisualEditMode) return;
    const preventLinkClick = (e) => {
      const link = e.target.closest("a");
      if (link && !link.isContentEditable) { e.preventDefault(); e.stopPropagation(); }
    };
    const preventFormSubmit = (e) => { e.preventDefault(); e.stopPropagation(); };
    document.addEventListener("click", preventLinkClick, true);
    document.addEventListener("submit", preventFormSubmit, true);
    return () => {
      document.removeEventListener("click", preventLinkClick, true);
      document.removeEventListener("submit", preventFormSubmit, true);
    };
  }, [isVisualEditMode]);

  useEffect(() => {
    function onPointerMove(e) {
      if (isResizingRef.current || !isVisualEditModeRef.current || isScrolling) return;
      const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-orchids-id]");
      if (hit !== lastHitElementRef.current) {
        lastHitElementRef.current = hit;
        if (!hit) {
          setHoverBoxes([]);
          setHoverTag(null);
          postMessageDedup({ type: CHANNEL, msg: "HIT", id: null, tag: null, rect: null });
          return;
        }
        const hitId = hit.getAttribute("data-orchids-id");
        if (hitId === lastHitIdRef.current) return;
        lastHitIdRef.current = hitId;
        const tagName = hit.getAttribute("data-orchids-name") || hit.tagName.toLowerCase();
        const boxes = [];
        document.querySelectorAll(`[data-orchids-id="${hitId}"]`).forEach((el) => {
          if (el.getAttribute("data-orchids-id") !== focusedElementId) {
            boxes.push(expandBox(el.getBoundingClientRect()));
          }
        });
        setHoverBoxes(boxes);
        setHoverTag(tagName);
        postMessageDedup({ type: CHANNEL, msg: "HIT", id: hitId, tag: tagName, rect: hitId !== focusedElementId ? expandBox(hit.getBoundingClientRect()) : null });
      }
    }

    function onPointerLeave() {
      if (!isVisualEditModeRef.current || isResizingRef.current) return;
      setHoverBoxes([]);
      setHoverTag(null);
      flushImageSrcChange();
      lastHitElementRef.current = null;
      lastHitIdRef.current = null;
      postMessageDedup({ type: CHANNEL, msg: "HIT", id: null, tag: null, rect: null });
    }

    function onMouseDownCapture(e) {
      if (isResizingRef.current || !isVisualEditModeRef.current) return;
      const hit = e.target.closest("[data-orchids-id]");
      if (hit && isTextEditable(hit)) {
        wasEditableRef.current = hit.contentEditable === "true";
        if (!wasEditableRef.current) {
          hit.style.outline = "none";
          hit.style.boxShadow = "none";
          hit.contentEditable = "true";
          if (hit.childElementCount > 0) protectChildElements(hit);
        }
      }
    }

    function onClickCapture(e) {
      if (isResizingRef.current || !isVisualEditModeRef.current) return;
      const now = Date.now();
      if (now - lastClickTimeRef.current < 100) return;
      lastClickTimeRef.current = now;

      const hit = e.target.closest("[data-orchids-id]");
      if (hit) {
        const hitId = hit.getAttribute("data-orchids-id");
        const tagName = hit.getAttribute("data-orchids-name") || hit.tagName.toLowerCase();
        if (hit.tagName.toLowerCase() === "a" || hit.closest("a") || hit.tagName.toLowerCase() === "button") {
          e.preventDefault(); e.stopPropagation();
        }

        const prevFocused = focusedElementRef.current;
        focusedElementRef.current = hit;
        setFocusedElementId(hitId);
        setFocusTag(tagName);

        if (hitId) localStorage.setItem(FOCUSED_ELEMENT_KEY, JSON.stringify({ id: hitId, tag: tagName }));

        const boxes = [];
        document.querySelectorAll(`[data-orchids-id="${hitId}"]`).forEach(el => {
          if (el !== hit) boxes.push(expandBox(el.getBoundingClientRect()));
        });
        setHoverBoxes(boxes);
        if (boxes.length > 0) setHoverTag(tagName);

        focusedImageElementRef.current = hit.tagName.toLowerCase() === "img" ? hit : null;
        if (isTextEditable(hit)) {
          if (editingElementRef.current && editingElementRef.current !== hit) {
            editingElementRef.current.blur();
            cleanupEditingElement();
          }
          if (hit !== editingElementRef.current) {
            editingElementRef.current = hit;
            originalContentRef.current = hit.childElementCount > 0 ? extractDirectTextContent(hit) : (hit.innerText || hit.textContent || "");
          }
        }

        const rect = expandBox(hit.getBoundingClientRect());
        setFocusBox(rect);
        postMessageDedup({
          type: CHANNEL,
          msg: "ELEMENT_CLICKED",
          id: hitId,
          tag: tagName,
          rect,
          isEditable: isTextEditable(hit),
          currentStyles: getCurrentStyles(hit),
          className: hit.getAttribute("class") || "",
          src: hit.tagName.toLowerCase() === "img" ? hit.src : undefined
        });

        setTimeout(() => {
          flushImageSrcChange();
          if (prevFocused && prevFocused !== hit) handleStyleBlur(prevFocused);
          if (editingElementRef.current && editingElementRef.current !== hit) cleanupEditingElement();
        }, 0);
      } else {
        if (focusedElementRef.current) {
          flushImageSrcChange();
          handleStyleBlur(focusedElementRef.current);
          cleanupEditingElement();
          focusedElementRef.current = null;
          setFocusedElementId(null);
          setFocusBox(null);
          setHoverBoxes([]);
          localStorage.removeItem(FOCUSED_ELEMENT_KEY);
          postMessageDedup({ type: CHANNEL, msg: "ELEMENT_CLICKED", id: null, tag: null, rect: null });
        }
      }
    }

    function onMsg(e) {
      if (e.data?.type !== CHANNEL) return;
      if (e.data.msg === "VISUAL_EDIT_MODE") {
        setIsVisualEditMode(e.data.active);
        if (!e.data.active) {
          cleanupEditingElement();
          setFocusedElementId(null);
          setFocusBox(null);
          setHoverBoxes([]);
        }
      }
    }

    function onScroll() {
      if (isResizingRef.current || !isVisualEditModeRef.current) return;
      setIsScrolling(true);
      setHoverBoxes([]);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = window.setTimeout(() => setIsScrolling(false), 100);
    }

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("mousedown", onMouseDownCapture, true);
    document.addEventListener("click", onClickCapture, true);
    window.addEventListener("message", onMsg);
    window.addEventListener("scroll", onScroll, true);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("mousedown", onMouseDownCapture, true);
      document.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("message", onMsg);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [focusedElementId, isScrolling]);

  if (!isVisualEditMode) return null;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zOrigin: 9999 }}>
      {hoverBoxes.map((box, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: box.top,
            left: box.left,
            width: box.width,
            height: box.height,
            border: "1px dashed #3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            pointerEvents: "none",
          }}
        >
          {hoverTag && i === 0 && (
            <div style={{ position: "absolute", top: -20, left: 0, backgroundColor: "#3b82f6", color: "white", fontSize: 10, padding: "2px 4px", borderRadius: 2 }}>
              {hoverTag}
            </div>
          )}
        </div>
      ))}
      {focusBox && (
        <div
          style={{
            position: "absolute",
            top: focusBox.top,
            left: focusBox.left,
            width: focusBox.width,
            height: focusBox.height,
            border: "2px solid #3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.05)",
            pointerEvents: "none",
          }}
        >
          {focusTag && (
            <div style={{ position: "absolute", top: -24, left: -2, backgroundColor: "#3b82f6", color: "white", fontSize: 12, fontWeight: "bold", padding: "2px 6px", borderRadius: "2px 2px 0 0" }}>
              {focusTag}
            </div>
          )}
          <div className="resize-handle" onMouseDown={(e) => handleResizeStart(e, "nw")} style={{ position: "absolute", top: -4, left: -4, width: 8, height: 8, backgroundColor: "white", border: "1px solid #3b82f6", cursor: "nw-resize", pointerEvents: "auto" }} />
          <div className="resize-handle" onMouseDown={(e) => handleResizeStart(e, "ne")} style={{ position: "absolute", top: -4, right: -4, width: 8, height: 8, backgroundColor: "white", border: "1px solid #3b82f6", cursor: "ne-resize", pointerEvents: "auto" }} />
          <div className="resize-handle" onMouseDown={(e) => handleResizeStart(e, "sw")} style={{ position: "absolute", bottom: -4, left: -4, width: 8, height: 8, backgroundColor: "white", border: "1px solid #3b82f6", cursor: "sw-resize", pointerEvents: "auto" }} />
          <div className="resize-handle" onMouseDown={(e) => handleResizeStart(e, "se")} style={{ position: "absolute", bottom: -4, right: -4, width: 8, height: 8, backgroundColor: "white", border: "1px solid #3b82f6", cursor: "se-resize", pointerEvents: "auto" }} />
        </div>
      )}
    </div>
  );
}
