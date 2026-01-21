"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsAndConditionsPage() {
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
              <FileText className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Terms & Conditions</h1>
            <p className="text-white/50">Last updated: January 2026</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 space-y-8"
          >
            <section>
              <h2 className="font-display text-xl text-white mb-3">1. Event Participation Rules</h2>
              <p className="text-white/70 leading-relaxed">
                By registering for PARAKRAM 2025, participants agree to follow all event rules, guidelines, and instructions provided by the organizing committee. Participants must maintain sportsmanlike conduct at all times.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-white mb-3">2. Organizer Rights</h2>
              <p className="text-white/70 leading-relaxed">
                The PARAKRAM 2025 organizing committee reserves the right to:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-1 ml-4 mt-2">
                <li>Modify event schedules, venues, or rules as needed</li>
                <li>Disqualify participants for rule violations</li>
                <li>Use event photographs and videos for promotional purposes</li>
                <li>Make final decisions on any disputes</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-white mb-3">3. Prohibited Activities</h2>
              <p className="text-white/70 leading-relaxed">
                Any misuse of the registration platform, false information submission, or unsportsmanlike behavior will result in immediate disqualification and potential ban from future events.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-white mb-3">4. Acceptance</h2>
              <p className="text-white/70 leading-relaxed">
                By completing registration, you acknowledge that you have read and agree to these terms and conditions.
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
            <Link href="/privacy-policy" className="text-white/50 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-orange-400 text-sm">Terms & Conditions</Link>
            <Link href="/refund-policy" className="text-white/50 hover:text-white text-sm transition-colors">Refund Policy</Link>
            <Link href="/shipping-policy" className="text-white/50 hover:text-white text-sm transition-colors">Shipping Policy</Link>
            <Link href="/contact" className="text-white/50 hover:text-white text-sm transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
