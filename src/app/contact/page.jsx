
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sportclub.dit@dypvp.edu.in",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 96573 25070",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "Dr. D. Y. Patil Institute of Technology Pimpri, Pune, Maharashtra - 411018",
    },
  ];

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
              <MessageSquare className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Contact Us</h1>
            <p className="text-white/50">Get in touch with the PARAKRAM 2026 team</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10"
          >
            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl"
                >
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{info.label}</h3>
                    <p className="text-orange-400">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl"
            >
              <p className="text-white/70 text-sm text-center">
                For urgent queries, please email us and we will respond within 24-48 hours.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
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
            <Link href="/terms-and-conditions" className="text-white/50 hover:text-white text-sm transition-colors">Terms & Conditions</Link>
            <Link href="/refund-policy" className="text-white/50 hover:text-white text-sm transition-colors">Refund Policy</Link>
            <Link href="/shipping-policy" className="text-white/50 hover:text-white text-sm transition-colors">Shipping Policy</Link>
            <Link href="/contact" className="text-orange-400 text-sm">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
