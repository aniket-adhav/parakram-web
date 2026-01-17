"use client";

import { motion } from "framer-motion";
import { ElegantShape } from "@/components/ui/shape-landing-hero";

export function PageBackground() {
  return (
    <div className="fixed inset-0 bg-[#030303] -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.08] via-transparent to-red-600/[0.08] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-orange-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-red-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-yellow-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-orange-400/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
        <ElegantShape
          delay={0.8}
          width={180}
          height={50}
          rotate={35}
          gradient="from-red-400/[0.12]"
          className="right-[5%] md:right-[8%] top-[40%] md:top-[45%]"
        />
        <ElegantShape
          delay={0.9}
          width={120}
          height={35}
          rotate={-18}
          gradient="from-yellow-400/[0.12]"
          className="left-[35%] md:left-[40%] bottom-[15%] md:bottom-[20%]"
        />
      </div>

      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-1 h-32 bg-gradient-to-b from-orange-500 to-transparent rotate-45"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/3 w-1 h-24 bg-gradient-to-b from-red-500 to-transparent -rotate-45"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/3 w-1 h-40 bg-gradient-to-b from-yellow-500 to-transparent rotate-12"
        />
        <motion.div
          animate={{ opacity: [0.15, 0.4, 0.15], x: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
          className="absolute top-[60%] right-1/4 w-1 h-28 bg-gradient-to-b from-orange-400 to-transparent rotate-[30deg]"
        />
        <motion.div
          animate={{ opacity: [0.15, 0.4, 0.15], x: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2, ease: "easeInOut" }}
          className="absolute top-[20%] left-[60%] w-1 h-20 bg-gradient-to-b from-red-400 to-transparent -rotate-[20deg]"
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030303_70%)]" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}
