"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Truck } from "lucide-react";

export default function ShippingPolicyPage() {
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
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Truck className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Shipping & Delivery Policy</h1>
            <p className="text-white/50">Last updated: January 2026</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 space-y-8"
          >
            <section>
              <h2 className="font-display text-2xl text-white mb-4">1. Overview</h2>
              <p className="text-white/70 leading-relaxed">
                This Shipping and Delivery Policy explains how PARAKRAM 2025 official jerseys and merchandise are distributed to participants. As a college sports fest, we follow a unique distribution model through departmental coordinators to ensure efficient and organized delivery.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-white mb-4">2. Distribution Method</h2>
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6 mb-4">
                <h3 className="text-white font-semibold mb-2">On-Campus Collection</h3>
                <p className="text-white/70">
                  PARAKRAM 2025 jerseys are distributed through on-campus collection points. We do not offer home delivery or courier services for jerseys.
                </p>
              </div>
              <p className="text-white/70 leading-relaxed">
                All jersey orders are collected and distributed through your respective departmental coordinators. This ensures:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-4">
                <li>Efficient bulk distribution</li>
                <li>Proper verification of participants</li>
                <li>Organized payment collection</li>
                <li>Quality check before handover</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-white mb-4">3. Jersey Collection Process</h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-semibold">1</span>
                  <div>
                    <h4 className="text-white font-semibold">Order Placement</h4>
                    <p className="text-white/70">Place your order through the PARAKRAM website with accurate details</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-semibold">2</span>
                  <div>
                    <h4 className="text-white font-semibold">Receive Secret Code</h4>
                    <p className="text-white/70">Save your 6-digit secret code issued after successful order</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-semibold">3</span>
                  <div>
                    <h4 className="text-white font-semibold">Coordinator Contact</h4>
                    <p className="text-white/70">Your departmental coordinator will contact you for payment within 24-48 hours</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-semibold">4</span>
                  <div>
                    <h4 className="text-white font-semibold">Payment Completion</h4>
                    <p className="text-white/70">Complete payment to your coordinator via cash/UPI</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-semibold">5</span>
                  <div>
                    <h4 className="text-white font-semibold">Collection Day</h4>
                    <p className="text-white/70">Collect your jersey from the designated distribution point using your secret code</p>
                  </div>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="font-display text-2xl text-white mb-4">4. Delivery Timeline</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-white/70">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 text-white">Stage</th>
                      <th className="text-left py-3 text-white">Expected Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Order Processing</td>
                      <td className="py-3">24-48 hours</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Production (after payment)</td>
                      <td className="py-3">7-10 business days</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Quality Check</td>
                      <td className="py-3">1-2 business days</td>
                    </tr>
                    <tr>
                      <td className="py-3">Distribution Ready</td>
                      <td className="py-3">Announced via coordinators</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-white/50 text-sm mt-4">
                * Total estimated time from order to collection: 10-14 business days after payment confirmation
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-white mb-4">5. Distribution Points</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Jersey distribution will take place at designated locations:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Main College Auditorium</li>
                <li>Departmental Common Rooms</li>
                <li>Sports Complex (during event days)</li>
                <li>Specific locations announced by coordinators</li>
              </ul>
              <p className="text-orange-400 text-sm mt-4">
                Distribution dates and locations will be communicated via official PARAKRAM channels and WhatsApp groups.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-white mb-4">6. Collection Requirements</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                To collect your jersey, please bring:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Your 6-digit secret code</li>
                <li>Valid college ID card</li>
                <li>Payment receipt (if available)</li>
                <li>Registered mobile phone for OTP verification (if applicable)</li>
              </ul>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mt-4">
                <p className="text-red-400 text-sm">
                  <strong>Note:</strong> Jerseys will only be handed over to the person whose name is on the order. Proxy collection requires written authorization and ID proof of both parties.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-white mb-4">7. Bulk Orders (Team Orders)</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                For team sports requiring bulk jersey orders:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Team captain or manager can collect jerseys for the entire team</li>
                <li>Complete team roster with secret codes must be provided</li>
                <li>All team members must have completed individual payments</li>
                <li>Bulk collection requires prior appointment with coordinators</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-white mb-4">8. Delays and Issues</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                In case of delays or issues:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Production delays will be communicated in advance</li>
                <li>Participants will be notified via SMS and email</li>
                <li>Alternative collection dates will be provided</li>
                <li>Contact your coordinator for urgent issues</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-white mb-4">9. Lost or Uncollected Jerseys</h2>
              <p className="text-white/70 leading-relaxed">
                Jerseys must be collected within the designated collection period. Uncollected jerseys:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-4">
                <li>Will be held for 7 days after the distribution period ends</li>
                <li>Can be collected from the main organizing committee office</li>
                <li>May incur a storage fee after extended periods</li>
                <li>Unclaimed jerseys after 30 days may be forfeited (no refund)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-white mb-4">10. Contact for Delivery Queries</h2>
              <p className="text-white/70 leading-relaxed">
                For any shipping or delivery related questions:
              </p>
              <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-white">PARAKRAM 2026 Logistics Team</p>
                <p className="text-orange-400">Email: parakramevent@gmail.com</p>
                <p className="text-white/50">Phone: +91 9657325070</p>
                <p className="text-white/50 text-sm mt-2">Working Hours: Mon-Sat, 10:00 AM - 6:00 PM IST</p>
              </div>
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
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/privacy-policy" className="text-white/50 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-white/50 hover:text-white text-sm transition-colors">Terms & Conditions</Link>
            <Link href="/refund-policy" className="text-white/50 hover:text-white text-sm transition-colors">Refund Policy</Link>
            <Link href="/shipping-policy" className="text-orange-400 text-sm">Shipping Policy</Link>
            <Link href="/contact" className="text-white/50 hover:text-white text-sm transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
