"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PageBackground } from "@/components/PageBackground";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft,
  CheckCircle,
  Loader2,
  Shirt,
  Upload,
  Building,
  Hash,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const COLLEGES = [
  "ABC Engineering College",
  "XYZ Institute of Technology",
  "State University",
  "National College of Arts",
  "Central Institute of Science",
  "Metropolitan University",
  "Regional Engineering College",
  "Premier Institute",
];

export default function JerseyVerificationPage() {
  const { user, isLoading, verifyJersey } = useAuth();
  const router = useRouter();
  const [jerseyNumber, setJerseyNumber] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!jerseyNumber || !collegeName || !playerName) {
      setError("Please fill in all fields");
      return;
    }

    if (parseInt(jerseyNumber) < 1 || parseInt(jerseyNumber) > 99) {
      setError("Jersey number must be between 1 and 99");
      return;
    }

    setIsSubmitting(true);
    const result = await verifyJersey(jerseyNumber, collegeName);
    setIsSubmitting(false);

    if (result) {
      router.push("/register");
    } else {
      setError("Verification failed. Please try again.");
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PageBackground />
        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  if (user.jerseyVerified) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <PageBackground />
        <div className="w-full max-w-md relative z-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>
          <h1 className="font-display text-3xl text-white mb-4">
            JERSEY VERIFIED
          </h1>
          <p className="text-white/50 mb-8">
            Your jersey has been verified. You can now register for sports.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:from-orange-600 hover:to-red-700 transition-all"
          >
            Register for Sports
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-24">
      <PageBackground />

      <div className="w-full max-w-xl relative z-10">
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
              className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Shirt className="w-8 h-8 text-orange-500" />
            </motion.div>

            <motion.h1
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="font-display text-3xl md:text-4xl text-white mb-3"
            >
              JERSEY VERIFICATION
            </motion.h1>

            <motion.p
              custom={4}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-white/50"
            >
              Verify your jersey to participate in PARAKRAM 2025
            </motion.p>
          </div>

          <motion.div
            custom={5}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-400 text-sm">
                <strong>NO JERSEY • NO ENTRY</strong> - All participants must have
                verified jerseys to compete.
              </p>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              custom={6}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-white/70 text-sm mb-2">
                Player Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                />
                <Shirt className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              </div>
            </motion.div>

            <motion.div
              custom={7}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-white/70 text-sm mb-2">
                College / Institution
              </label>
              <div className="relative">
                <select
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-orange-500/50 transition-colors"
                >
                  <option value="" className="bg-gray-900">
                    Select your college
                  </option>
                  {COLLEGES.map((college) => (
                    <option key={college} value={college} className="bg-gray-900">
                      {college}
                    </option>
                  ))}
                </select>
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              </div>
            </motion.div>

            <motion.div
              custom={8}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-white/70 text-sm mb-2">
                Jersey Number
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={jerseyNumber}
                  onChange={(e) => setJerseyNumber(e.target.value)}
                  placeholder="Enter jersey number (1-99)"
                  className="w-full px-4 py-3 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                />
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              </div>
            </motion.div>

            <motion.div
              custom={9}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-white/70 text-sm mb-2">
                Jersey Photo (Optional)
              </label>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-orange-500/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-white/30 mx-auto mb-3" />
                <p className="text-white/50 text-sm">
                  Click to upload or drag and drop
                </p>
                <p className="text-white/30 text-xs mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 rounded-xl p-4"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            <motion.button
              custom={10}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Verify Jersey
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
