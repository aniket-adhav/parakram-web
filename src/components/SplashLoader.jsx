"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import TextType from "./ui/TextType";

const SplashLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(onComplete, 1200);
            return 100;
          }
          return prev + 1;
        });
      }, 45);

      return () => clearInterval(timer);
    }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#030303] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08)_0%,transparent_70%)]" />
      
        <div className="relative flex flex-col items-center">
          <div className="relative mb-6">
              <TextType
                text="PARAKRAM"
                typingSpeed={80}
                className="font-display text-5xl md:text-6xl tracking-[0.3em] text-white font-bold"
              showCursor={true}
              cursorCharacter="_"
              loop={false}
            />

            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 blur-2xl bg-orange-500/20 -z-10"
          />
        </div>

        <div className="w-64 md:w-96 h-[1px] bg-white/5 rounded-full relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_20px_rgba(249,115,22,0.8)]"
            initial={{ width: "0%", left: "-100%" }}
            animate={{ width: `${progress}%`, left: "0%" }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-3 text-white/20 font-mono text-[10px] tracking-[0.5em] uppercase">
            <TextType 
              text={["System Initialization", "Syncing Sports Data", "Ready for Glory"]}
              typingSpeed={60}
              deletingSpeed={30}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="•"
            />
          </div>
          <span className="text-orange-500/40 font-mono text-xs tracking-widest">{progress}%</span>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-12 left-12 space-y-2">
        <div className="h-[1px] w-24 bg-gradient-to-r from-orange-500/30 to-transparent" />
        <div className="text-[8px] text-white/20 tracking-[0.4em] uppercase font-mono">
          Igniting the Spirit
        </div>
      </div>

      <div className="absolute top-12 right-12 space-y-2 text-right">
        <div className="text-[8px] text-white/20 tracking-[0.4em] uppercase font-mono">
          Rise to Glory
        </div>
        <div className="h-[1px] w-24 bg-gradient-to-l from-orange-500/30 to-transparent ml-auto" />
      </div>

      <div className="absolute bottom-12 left-12 space-y-2">
        <div className="h-[1px] w-24 bg-gradient-to-r from-orange-500/30 to-transparent" />
        <div className="text-[8px] text-white/20 tracking-[0.4em] uppercase font-mono">
          Limitless Passion
        </div>
      </div>
      
      <div className="absolute bottom-12 right-12 space-y-2 text-right">
        <div className="text-[8px] text-white/20 tracking-[0.4em] uppercase font-mono">
          Parakram 2026
        </div>
        <div className="h-[1px] w-24 bg-gradient-to-l from-orange-500/30 to-transparent ml-auto" />
      </div>
    </motion.div>
  );
};

export default SplashLoader;
