import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

/* 🔑 Department → Short Code */
const DEPT_SHORT = {
  "First Year (All Departments)": "FY",
  "Computer": "CS",
  "AIDS": "AI",
  "Electrical": "EE",
  "Civil": "CV",
  "Mechanical": "ME",
  "ENTC": "EC",
  "STR": "ST",
  "A&R": "AR",
  "INSTRU": "IN",
  "IT": "IT",
};

/* ✅ FORM ID = DEPT + FORM + RANDOM */
function generateFormId(department = "PARAKRAM") {
  const deptCode = DEPT_SHORT[department] || "PRK";

  const randomCode = Math.random()
    .toString(36)
    .substring(2, 7)
    .toUpperCase();

  return `${deptCode}-FORM-${randomCode}`;
}

/* 🔥 FIX: CLEAN TEXT FOR WinAnsi PDF */
function cleanText(text) {
  if (!text) return "";
  return String(text)
    .replace(/[\u2060\u200B-\u200D\uFEFF]/g, "") // invisible unicode
    .replace(/[^\x20-\x7E]/g, "")              // WinAnsi-safe
    .trim();
}

export async function generateFilledPdf({ players, department }) {
  const pdfPath = path.join(
    process.cwd(),
    "src/templates/PARAKRAM_REGISTRATION.pdf"
  );

  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const page = pdfDoc.getPages()[0];

  /* 🔤 Fonts */
  const normalFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  /* 🔒 SAFE DRAW FUNCTION */
  const draw = (text, x, y, size = 9, font = normalFont) => {
    const safeText = cleanText(text);
    if (!safeText) return;

    page.drawText(safeText, {
      x,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    });
  };

  /* 🔹 FORM ID (TOP-RIGHT, BOLD) */
  const formId = generateFormId(department);
  draw(formId, 470, 790, 9, boldFont);

  /* 🔒 PLAYERS TABLE (UNCHANGED LAYOUT) */
  const startY = 399;
  const rowGap = 19;

  players
    .map(p => ({
      ...p,
      firstName: cleanText(p.firstName),
      lastName: cleanText(p.lastName),
      year: cleanText(p.year),
      mobile: cleanText(p.mobile),
      secretCode: cleanText(p.secretCode),
    }))
    .forEach((p, i) => {
      const y = startY - i * rowGap;

      draw(p.secretCode?.toUpperCase(), 79, y);
      draw(
        `${p.firstName} ${p.lastName}`.toUpperCase(),
        215,
        y
      );
      draw(p.year, 375, y);
      draw(p.mobile, 465, y);
    });

  return {
    pdfBytes: await pdfDoc.save(), // ✅ BUFFER
    formId,                        // ✅ FORM ID
  };
}
