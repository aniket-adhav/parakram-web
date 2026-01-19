"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";


import { PageBackground } from "@/components/PageBackground";
import { Flame, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppToast } from "@/lib/useAppToast";






export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // ✅ HOOK CALLED INSIDE COMPONENT
    const toast = useAppToast(); // ✅ here

  useEffect(() => {
    if (session?.user) {
      
    }
  }, [session]);

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    signIn("google", { callbackUrl: "/?login=success" });
  };


  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2 + i * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const [googleLoading, setGoogleLoading] = useState(false);



  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <PageBackground />

      <div className="w-full max-w-md relative z-10">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6"
            >
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-orange-400 tracking-wide font-medium">
                Welcome to PARAKRAM
              </span>
            </motion.div>

            <motion.h1
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="font-display text-4xl md:text-5xl text-white mb-3"
            >
              SIGN IN
            </motion.h1>

            <motion.p
              custom={4}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-white/50"
            >
              Login to register for sports and verify your jersey
            </motion.p>
          </div>

            <motion.div
              custom={5}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-center"
            >
              <style jsx>{`
                @property --gradient-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
                @property --gradient-angle-offset { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
                @property --gradient-percent { syntax: "<percentage>"; initial-value: 20%; inherits: false; }
                @property --gradient-shine { syntax: "<color>"; initial-value: #8484ff; inherits: false; }
                .shiny-cta {
                  --gradient-angle: 0deg;
                  --gradient-angle-offset: 0deg;
                  --gradient-percent: 20%;
                  --gradient-shine: #f97316;
                  --shadow-size: 2px;
                  position: relative;
                  overflow: hidden;
                  border-radius: 9999px;
                  padding: 1.25rem 2.5rem;
                  font-size: 1.125rem;
                  line-height: 1.2;
                  font-weight: 500;
                  color: #ffffff;
                  background: linear-gradient(#000000, #000000) padding-box,
                    conic-gradient(
                      from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
                      transparent 0%,
                      #ea580c 5%,
                      var(--gradient-shine) 15%,
                      #ea580c 30%,
                      transparent 40%,
                      transparent 100%
                    ) border-box;
                  border: 2px solid transparent;
                  box-shadow: inset 0 0 0 1px #1a1818;
                  outline: none;
                  transition: --gradient-angle-offset 800ms cubic-bezier(0.25, 1, 0.5, 1),
                    --gradient-percent 800ms cubic-bezier(0.25, 1, 0.5, 1),
                    --gradient-shine 800ms cubic-bezier(0.25, 1, 0.5, 1),
                    box-shadow 0.3s;
                  cursor: pointer;
                  isolation: isolate;
                  outline-offset: 4px;
                  z-index: 0;
                  animation: border-spin 2.5s linear infinite;
                }
                @keyframes border-spin { to { --gradient-angle: 360deg; } }
                .shiny-cta:active { transform: translateY(1px); }
                .shiny-cta::before {
                  content: '';
                  pointer-events: none;
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  z-index: 0;
                  --size: calc(100% - 6px);
                  --position: 2px;
                  --space: 4px;
                  width: var(--size);
                  height: var(--size);
                  background: radial-gradient(circle at var(--position) var(--position), white 0.5px, transparent 0) padding-box;
                  background-size: var(--space) var(--space);
                  background-repeat: space;
                  mask-image: conic-gradient(from calc(var(--gradient-angle) + 45deg), black, transparent 10% 90%, black);
                  border-radius: inherit;
                  opacity: 0.4;
                }
                .shiny-cta::after {
                  content: '';
                  pointer-events: none;
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  z-index: 1;
                  width: 100%;
                  aspect-ratio: 1;
                  background: linear-gradient(-50deg, transparent, #ea580c, transparent);
                  mask-image: radial-gradient(circle at bottom, transparent 40%, black);
                  opacity: 0.6;
                  animation: shimmer 4s linear infinite;
                }
                .shiny-cta span { position: relative; z-index: 2; display: inline-flex; align-items: center; gap: 0.75rem; }
                .shiny-cta span::before {
                  content: '';
                  pointer-events: none;
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  z-index: -1;
                  --size: calc(100% + 1rem);
                  width: var(--size);
                  height: var(--size);
                  box-shadow: inset 0 -1ex 2rem 4px #ea580c;
                  opacity: 0;
                  border-radius: inherit;
                  transition: opacity 800ms cubic-bezier(0.25, 1, 0.5, 1);
                  animation: breathe 4.5s linear infinite;
                }
                @keyframes shimmer { to { transform: translate(-50%, -50%) rotate(360deg); } }
                @keyframes breathe { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.20); } }
              `}</style>
              <button
                  onClick={handleGoogleLogin}
                  disabled={googleLoading}
                  className="shiny-cta focus:outline-none relative"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 min-h-[28px]">
                    {googleLoading ? (
                      <>
                        <span
                          className="
                            w-5 h-5
                            border-[3px]
                            border-white/40
                            border-t-white
                            rounded-full
                            animate-spin
                            shrink-0
                          "
                        />
                        <span className="leading-none">Signing in…</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        <span className="leading-none">Continue with Google</span>
                      </>
                    )}
                  </span>
                </button>
            </motion.div>

          <motion.div
            custom={6}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 pt-6 border-t border-white/10"
          >
            <p className="text-center text-white/40 text-sm">
              By signing in, you agree to our{" "}
              <span className="text-orange-400 hover:underline cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-orange-400 hover:underline cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          custom={7}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 text-center"
        >
          <p className="text-white/40 text-sm">
            Need help?{" "}
            <Link href="/#contact" className="text-orange-400 hover:underline">
              Contact Support
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
