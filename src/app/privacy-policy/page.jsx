"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.05] via-transparent to-red-600/[0.05]" />
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back to Home</span>
            </Link>
            <Link href="/" className="font-display text-2xl tracking-wider text-white">
              PARAKRAM
            </Link>
          </div>
        </div>
      </header>

      <main className="relative pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Privacy Policy</h1>
            <p className="text-white/50">Last updated: January 2026</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 space-y-8"
          >
            <section>
              <h2 className="font-display text-xl text-white mb-3">1. Information We Collect</h2>
              <p className="text-white/70 leading-relaxed">
                We collect the following personal information for event registration purposes:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-1 ml-4 mt-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-white mb-3">2. How We Use Your Data</h2>
              <p className="text-white/70 leading-relaxed">
                Your information is used solely for PARAKRAM 2025 event registration, communication, and participant coordination. We do not use your data for any other purpose.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-white mb-3">3. Data Sharing</h2>
              <p className="text-white/70 leading-relaxed">
                We do not sell, trade, or share your personal information with any third parties. Your data remains confidential and is only accessible to the PARAKRAM organizing committee.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-white mb-3">4. Contact</h2>
              <p className="text-white/70 leading-relaxed">
                For privacy-related queries, contact us at <span className="text-orange-400">privacy@parakram2025.com</span>
              </p>
            </section>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:from-orange-600 hover:to-red-700 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">© 2026 PARAKRAM. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4 flex-wrap">
            <Link href="/privacy-policy" className="text-orange-400 text-sm">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-white/50 hover:text-white text-sm transition-colors">Terms & Conditions</Link>
            <Link href="/refund-policy" className="text-white/50 hover:text-white text-sm transition-colors">Refund Policy</Link>
            <Link href="/shipping-policy" className="text-white/50 hover:text-white text-sm transition-colors">Shipping Policy</Link>
            <Link href="/contact" className="text-white/50 hover:text-white text-sm transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
