"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PageBackground } from "@/components/PageBackground";
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Users,
  Trophy,
  X,
  Plus,
  Trash2,
  UserPlus,
  Crown,
} from "lucide-react";
import Link from "next/link";

const SPORTS = [
  { name: "Cricket", teamSize: 11, minSize: 11, category: "Team Sport", icon: "🏏", slots: 8, isTeam: true },
  { name: "Football", teamSize: 11, minSize: 11, category: "Team Sport", icon: "⚽", slots: 12, isTeam: true },
  { name: "Basketball", teamSize: 5, minSize: 5, category: "Team Sport", icon: "🏀", slots: 16, isTeam: true },
  { name: "Volleyball", teamSize: 6, minSize: 6, category: "Team Sport", icon: "🏐", slots: 10, isTeam: true },
  { name: "Badminton Singles", teamSize: 1, minSize: 1, category: "Individual", icon: "🏸", slots: 32, isTeam: false },
  { name: "Badminton Doubles", teamSize: 2, minSize: 2, category: "Doubles", icon: "🏸", slots: 16, isTeam: true },
  { name: "Table Tennis Singles", teamSize: 1, minSize: 1, category: "Individual", icon: "🏓", slots: 24, isTeam: false },
  { name: "Table Tennis Doubles", teamSize: 2, minSize: 2, category: "Doubles", icon: "🏓", slots: 12, isTeam: true },
  { name: "Athletics", teamSize: 1, minSize: 1, category: "Track & Field", icon: "🏃", slots: 50, isTeam: false },
  { name: "Chess", teamSize: 1, minSize: 1, category: "Mind Sport", icon: "♟️", slots: 20, isTeam: false },
];

function RegistrationModal({ sport, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    captainName: "",
    captainEmail: "",
    captainPhone: "",
    captainDepartment: "",
    teamName: "",
    teamMembers: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const departments = [
    "Computer Gaints",
    "Electrical Knights",
    "Mechanical",
    "Civil",
    "ENTC Spartans",
    "Information Technology",
    "A&R Worriors",
    "AI&DS Comrades",
    "FE",
    "Instu"
  ];

  useEffect(() => {
    if (sport && sport.isTeam && sport.teamSize > 1) {
      const initialMembers = Array(sport.teamSize - 1)
        .fill(null)
        .map(() => ({
          name: "",
          email: "",
          phone: "",
          department: "",
        }));
      setFormData((prev) => ({ ...prev, teamMembers: initialMembers }));
    } else {
      setFormData((prev) => ({ ...prev, teamMembers: [] }));
    }
  }, [sport]);

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...formData.teamMembers];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setFormData({ ...formData, teamMembers: newMembers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({
        captainName: "",
        captainEmail: "",
        captainPhone: "",
        captainDepartment: "",
        teamName: "",
        teamMembers: [],
      });
    }, 2500);
  };

  if (!isOpen || !sport) return null;

  const isTeamSport = sport.isTeam && sport.teamSize > 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-gradient-to-b from-zinc-900 to-black border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden my-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{sport.icon}</div>
          <h2 className="font-display text-2xl md:text-3xl text-white mb-2">
            {sport.name.toUpperCase()} REGISTRATION
          </h2>
          <p className="text-white/50 text-sm">
            {isTeamSport
              ? `Register your team of ${sport.teamSize} players`
              : "Register as an individual participant"}
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl text-white font-semibold mb-2">
              Registration Successful!
            </h3>
            <p className="text-white/50">
              {isTeamSport
                ? "Your team has been registered successfully."
                : "You have been registered successfully."}
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {isTeamSport && (
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                <label className="block text-orange-400 text-sm font-medium mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.teamName}
                  onChange={(e) =>
                    setFormData({ ...formData, teamName: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                  placeholder="Enter your team name"
                />
              </div>
            )}

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-5 h-5 text-yellow-500" />
                <span className="text-white font-medium">
                  {isTeamSport ? "Captain Details" : "Player Details"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.captainName}
                    onChange={(e) =>
                      setFormData({ ...formData, captainName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors text-sm"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.captainEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, captainEmail: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors text-sm"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.captainPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, captainPhone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors text-sm"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-1">
                    Department
                  </label>
                  <select
                    required
                    value={formData.captainDepartment}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        captainDepartment: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-orange-500/50 transition-colors text-sm appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-zinc-900">
                      Select department
                    </option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept} className="bg-zinc-900">
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {isTeamSport && formData.teamMembers.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  <span className="text-white font-medium">
                    Team Members ({formData.teamMembers.length} players)
                  </span>
                </div>

                {formData.teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/70 text-sm font-medium">
                        Player {index + 2}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={member.name}
                        onChange={(e) =>
                          handleMemberChange(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors text-sm"
                        placeholder="Full Name"
                      />
                      <input
                        type="email"
                        required
                        value={member.email}
                        onChange={(e) =>
                          handleMemberChange(index, "email", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors text-sm"
                        placeholder="Email"
                      />
                      <input
                        type="tel"
                        required
                        value={member.phone}
                        onChange={(e) =>
                          handleMemberChange(index, "phone", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors text-sm"
                        placeholder="Phone"
                      />
                      <select
                        required
                        value={member.department}
                        onChange={(e) =>
                          handleMemberChange(index, "department", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-orange-500/50 transition-colors text-sm appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-zinc-900">
                          Department
                        </option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept} className="bg-zinc-900">
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    <Trophy className="w-5 h-5" />
                    {isTeamSport ? "Register Team" : "Register Now"}
                  </>
                )}
              </span>
            </motion.button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function RegisterPage() {
const { data: session, status } = useSession();
const user = session?.user;
const isLoading = status === "loading";

  const router = useRouter();
  const [selectedSport, setSelectedSport] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const handleSelectSport = (sport) => {
    if (!user?.jerseyVerified) {
      router.push("/jersey-verification");
      return;
    }
    setSelectedSport(sport);
    setModalOpen(true);
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.1 + i * 0.1,
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

  return (
    <main className="min-h-screen py-24 px-4">
      <PageBackground />

      <div className="container mx-auto max-w-6xl relative z-10">
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
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-6xl text-white mb-4">
            SPORTS REGISTRATION
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto">
            Choose your sport and register as an individual or team captain.
            Team captains can register their entire team in one go.
          </p>
        </motion.div>

        {!user.jerseyVerified && (
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 flex items-center gap-4"
          >
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-yellow-500 font-semibold mb-1">
                Jersey Verification Required
              </h3>
              <p className="text-white/60 text-sm">
                You need to verify your jersey before registering for any sport.
              </p>
            </div>
            <Link
              href="/jersey-verification"
              className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm font-medium hover:bg-yellow-400 transition-colors"
            >
              Verify Now
            </Link>
          </motion.div>
        )}

        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                <Crown className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-white font-semibold">For Team Captains</h3>
            </div>
            <p className="text-white/50 text-sm">
              Register your entire team by filling in all team members&apos; details.
              You&apos;ll be marked as the team captain.
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-white font-semibold">For Solo Players</h3>
            </div>
            <p className="text-white/50 text-sm">
              Individual sports like Chess, Athletics, or Singles events - just
              register yourself directly.
            </p>
          </div>
        </motion.div>

        <div className="mb-6">
          <h2 className="text-white/70 text-sm uppercase tracking-wider mb-4">
            Team Sports
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SPORTS.filter((s) => s.isTeam).map((sport, i) => (
              <motion.div
                key={sport.name}
                custom={4 + i}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => handleSelectSport(sport)}
                className="group bg-gradient-to-b from-white/10 to-white/5 border border-white/10 hover:border-orange-500/50 rounded-2xl p-6 transition-all cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {sport.icon}
                </div>
                <h3 className="font-display text-xl text-white mb-1">
                  {sport.name}
                </h3>
                <div className="flex flex-col gap-1 text-sm text-white/50 mb-4">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {sport.teamSize} Players
                  </span>
                  <span className="text-orange-400 text-xs">
                    {sport.slots} slots left
                  </span>
                </div>
                <div className="w-full py-2 bg-white/5 border border-white/20 text-white rounded-lg text-sm text-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all">
                  Register Team
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-white/70 text-sm uppercase tracking-wider mb-4">
            Individual Sports
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SPORTS.filter((s) => !s.isTeam).map((sport, i) => (
              <motion.div
                key={sport.name}
                custom={8 + i}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => handleSelectSport(sport)}
                className="group bg-gradient-to-b from-white/10 to-white/5 border border-white/10 hover:border-blue-500/50 rounded-2xl p-6 transition-all cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {sport.icon}
                </div>
                <h3 className="font-display text-xl text-white mb-1">
                  {sport.name}
                </h3>
                <div className="flex flex-col gap-1 text-sm text-white/50 mb-4">
                  <span className="text-blue-400">{sport.category}</span>
                  <span className="text-white/40 text-xs">
                    {sport.slots} slots left
                  </span>
                </div>
                <div className="w-full py-2 bg-white/5 border border-white/20 text-white rounded-lg text-sm text-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all">
                  Register Solo
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <RegistrationModal
            sport={selectedSport}
            isOpen={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setSelectedSport(null);
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
