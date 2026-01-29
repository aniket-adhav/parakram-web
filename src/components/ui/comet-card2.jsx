"use client";
import React, { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  animate,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * CometCard - A high-fidelity 3D card with dynamic glare and smooth rotation.
 * Fixed the double border issue and added default floating/tilting animation.
 */
export const CometCard2 = ({
  rotateDepth = 15,
  translateDepth = 15,
  className,
  children,
  floating = true,
}) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${rotateDepth}deg`, `-${rotateDepth}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${rotateDepth}deg`, `${rotateDepth}deg`]
  );

  const translateX = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`]
  );
  const translateY = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`-${translateDepth}px`, `${translateDepth}px`]
  );

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 80%)`;

  // Default floating/tilting animation
  useEffect(() => {
    if (!floating) return;

    const controlsX = animate(x, [0, 0.08, -0.08, 0], {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const controlsY = animate(y, [0, -0.08, 0.08, 0], {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    });

    return () => {
      controlsX.stop();
      controlsY.stop();
    };
  }, [floating, x, y]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
  };

  return (
    <div className={cn("perspective-distant transform-gpu group", className)}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
        className="relative w-full h-full bg-transparent rounded-[inherit]"
      >
        {/* Content Layer */}
        <div className="relative z-10 w-full h-full rounded-[inherit]">
          {children}
        </div>

        {/* Glare Layer */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 h-full w-full rounded-[inherit] mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: glareBackground,
          }}
        />
      </motion.div>
    </div>
  );
};
