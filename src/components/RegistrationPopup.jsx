"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ShieldCheck, 
  Users, 
  Plus, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  ArrowLeft,
  User,
  Mail,
  Smartphone,
  GraduationCap,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
const WHATSAPP_ONLY_SPORTS = ["CARROM", "CHESS"];


export const COORDINATOR_CODES = {
  "FY-K9X2Q": "First Year (All Departments)",
  "CS-FHA45": "Computer",
  "AI-7Q9MZ": "AIDS",
  "EE-X2A8Q": "Electrical",
  "CV-9MZX1": "Civil",
  "ME-RZ5A9": "Mechanical",
  "EC-XM2Z9": "ENTC",
  "ST-A2XZQ": "STR",
  "AR-Z9X2M": "A&R",
  "IN-ZX9QA": "INSTRU",
  "IT-QA2MZ": "IT",
};


export function RegistrationPopup({ isOpen, onClose, sport }) {
  const [step, setStep] = useState(1); // 1: Code, 2: Category/Form, 3: Success
  const [coordinatorCode, setCoordinatorCode] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("Boys"); // Boys/Girls
  const [isVerifying, setIsVerifying] = useState(false);
  const [players, setPlayers] = useState([
    { firstName: "", lastName: "", email: "", year: "", mobile: "", secretCode: "", role: "Captain" }
  ]);

  const handleVerifyCode = async () => {
    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (COORDINATOR_CODES[coordinatorCode]) {
      setDepartment(COORDINATOR_CODES[coordinatorCode]);
      setStep(2);
      toast.success(`Verified for ${COORDINATOR_CODES[coordinatorCode]} Department`);
    } else {
      toast.error("Invalid Coordinator Code");
    }
    setIsVerifying(false);
  };

  const addPlayer = () => {
    setPlayers([...players, { firstName: "", lastName: "", email: "", year: "", mobile: "", secretCode: "", role: "Player" }]);
  };

  const removePlayer = (index) => {
    if (index === 0) return; // Cannot remove captain
    const newPlayers = players.filter((_, i) => i !== index);
    setPlayers(newPlayers);
  };

  const handlePlayerChange = (index, field, value) => {
    const newPlayers = [...players];
    newPlayers[index][field] = value;
    setPlayers(newPlayers);
  };



 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsVerifying(true);

  if (!department || !coordinatorCode) {
    toast.error("Coordinator verification required");
    setIsVerifying(false);
    return;
  }

  if (!players || players.length === 0) {
    toast.error("Add at least one player");
    setIsVerifying(false);
    return;
  }

  try {
    const res = await fetch("/api/sports/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sport: sport.name,
        department,
        category,
        coordinatorCode,
        players: players.map((p, i) => ({
          ...p,
          email: i === 0 ? p.email.toLowerCase() : undefined,
        })),

      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Registration failed");
    }

    toast.success("Registration Successful!");
    setStep(3);
  } catch (err) {
    toast.error(err.message || "Something went wrong");
  } finally {
    setIsVerifying(false);
  }
};



  const getRequiredCount = () => {
    if (!sport?.mandatoryCount) return null;
    if (typeof sport.mandatoryCount === 'object') {
      return sport.mandatoryCount[category];
    }
    return sport.mandatoryCount;
  };

  const requiredCount = getRequiredCount();
  const isLimitReached = requiredCount ? players.length >= requiredCount : false;
  const isCountMet = requiredCount ? players.length === requiredCount : true;

  if (!isOpen) return null;

  if (WHATSAPP_ONLY_SPORTS.includes(sport?.name?.toUpperCase())) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0.95, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          className="w-full max-w-[440px] bg-zinc-900 border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden text-center"
        >
          <div className={cn("absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r", sport.gradient)} />
          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 group transition-transform hover:rotate-6">
            <span className="text-5xl group-hover:scale-110 transition-transform">{sport.icon}</span>
          </div>
          
          <h2 className="font-display text-3xl text-white mb-4 uppercase tracking-tighter">{sport.name}</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 mb-8">
            <p className="text-white/70 text-sm leading-relaxed mb-6 font-medium">
              Registration for <span className="text-white font-black">{sport.name}</span> is managed exclusively via <span className="text-orange-400">Google Forms</span> on departmental WhatsApp groups.
            </p>
            <div className="flex items-center justify-center gap-3 text-orange-400 text-[10px] font-black uppercase tracking-[0.3em] bg-orange-500/10 py-3 rounded-xl border border-orange-500/20">
              <Smartphone className="w-4 h-4 animate-bounce" />
              Check WhatsApp Groups
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-white text-black font-black py-5 rounded-[1.5rem] hover:bg-zinc-200 transition-all uppercase tracking-[0.3em] text-[12px] shadow-xl shadow-white/5"
          >
            Understood
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        className="w-full max-w-xl bg-zinc-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative my-8"
      >
        <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", sport?.gradient || "from-orange-500 to-red-600")} />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 md:p-8">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-display text-2xl text-white mb-2 uppercase tracking-tight">Coordinator Access</h2>
              <p className="text-white/50 text-xs mb-8">Enter department secret code to represent your arena</p>
              
              <div className="max-w-xs mx-auto space-y-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-white/5 rounded-xl blur-lg group-focus-within:bg-white/10 transition-all" />
                  <input
                    type="text"
                    value={coordinatorCode}
                    onChange={(e) => setCoordinatorCode(e.target.value.toUpperCase())}
                    placeholder="DEPT CODE"
                    className="relative w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white text-center text-lg font-mono tracking-[0.2em] focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                  />
                </div>
                <button
                  onClick={handleVerifyCode}
                  disabled={isVerifying || !coordinatorCode}
                  className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-[10px] uppercase tracking-[0.3em]"
                >
                  {isVerifying ? "Verifying..." : "Enter the Arena"}
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

                <div className="mt-10 p-5 bg-white/[0.02] border border-white/10 rounded-[2rem] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start gap-4 text-left relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-orange-500 font-black text-[10px] mb-1.5 uppercase tracking-[0.2em]">Departmental Selection Policy</h4>
                      <p className="text-white/50 text-[11px] leading-relaxed font-medium">
                        Number of players are limited per department. Please meet your <span className="text-white font-bold tracking-tight">Department Coordinator</span> to play and participate in the <span className="text-orange-400">trials and selection process</span> of department teams.
                      </p>
                    </div>
                  </div>
                </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-white/5 rounded-md text-[8px] font-black text-white/40 uppercase tracking-[0.2em] border border-white/5">
                      {department}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span className="text-[8px] font-black text-orange-500 uppercase tracking-[0.2em]">
                      {players.length} Players Added
                    </span>
                  </div>
                    <h2 className="font-display text-2xl text-white tracking-tight uppercase">{sport?.name}</h2>
                    {requiredCount && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn(
                          "px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider border",
                          isCountMet ? "bg-green-500/20 text-green-400 border-green-500/20" : "bg-orange-500/20 text-orange-400 border-orange-500/20"
                        )}>
                          Exactly {requiredCount} Players Mandatory
                        </span>
                      </div>
                    )}
                  </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {players.map((player, index) => (
                    <div key={index} className="relative group/player bg-white/5 border border-white/5 rounded-2xl p-4 transition-all hover:bg-white/[0.07]">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-5 h-5 rounded-lg flex items-center justify-center font-black text-[9px]",
                            index === 0 ? "bg-white text-black" : "bg-white/10 text-white/40"
                          )}>
                            {index + 1}
                          </div>
                          <span className="font-black uppercase text-[8px] tracking-widest text-white/30">
                            {index === 0 ? "Captain / Lead" : "Player Detail"}
                          </span>
                        </div>
                        {index !== 0 && (
                          <button
                            type="button"
                            onClick={() => removePlayer(index)}
                            className="p-1 text-white/20 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                              <input
                                required
                                type="text"
                                value={player.firstName}
                                onChange={(e) => handlePlayerChange(index, "firstName", e.target.value)}
                                placeholder="First Name"
                                className="w-full bg-black/20 border border-white/5 rounded-xl pl-10 pr-4 py-3.5 text-xs text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/20"
                              />
                            </div>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                              <input
                                required
                                type="text"
                                value={player.lastName}
                                onChange={(e) => handlePlayerChange(index, "lastName", e.target.value)}
                                placeholder="Last Name"
                                className="w-full bg-black/20 border border-white/5 rounded-xl pl-10 pr-4 py-3.5 text-xs text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/20"
                              />
                            </div>
                          {index === 0 && (
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                                <input
                                  required
                                  type="email"
                                  value={player.email}
                                  onChange={(e) => handlePlayerChange(index, "email", e.target.value)}
                                  placeholder="Captain Email Address"
                                  className="w-full bg-black/20 border border-white/5 rounded-xl pl-10 pr-4 py-3.5 text-xs text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/20"
                                />
                              </div>
                            )}

                          <div className="relative">
                            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                            <select
                              required
                              value={player.year}
                              onChange={(e) => handlePlayerChange(index, "year", e.target.value)}
                              className="w-full bg-black/20 border border-white/5 rounded-xl pl-10 pr-4 py-3.5 text-xs text-white focus:outline-none focus:border-white/20 transition-all appearance-none"
                            >
                              <option value="" className="bg-zinc-900 text-white/30">Year of Study</option>
                              <option value="1st Year" className="bg-zinc-900">1st Year</option>
                              <option value="2nd Year" className="bg-zinc-900">2nd Year</option>
                              <option value="3rd Year" className="bg-zinc-900">3rd Year</option>
                              <option value="4th Year" className="bg-zinc-900">4th Year</option>
                            </select>
                          </div>
                          <div className="relative">
                            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                            <input
                              required
                              type="tel"
                              value={player.mobile}
                              onChange={(e) => handlePlayerChange(index, "mobile", e.target.value)}
                              placeholder="Mobile No"
                              className="w-full bg-black/20 border border-white/5 rounded-xl pl-10 pr-4 py-3.5 text-xs text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/20"
                            />
                          </div>
                          <div className="relative md:col-span-2">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                            <input
                              required
                              type="text"
                              value={player.secretCode}
                              onChange={(e) => handlePlayerChange(index, "secretCode", e.target.value.toUpperCase())}
                              placeholder="Student Secret Code"
                              className="w-full bg-black/20 border border-white/5 rounded-xl pl-10 pr-4 py-3.5 text-xs text-white font-mono tracking-[0.2em] focus:outline-none focus:border-white/20 transition-all placeholder:text-white/20"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
  
                    <div className="flex flex-col md:flex-row gap-3 pt-2">
                      <button
                        type="button"
                        onClick={addPlayer}
                        disabled={isLimitReached}
                        className={cn(
                          "flex-1 bg-white/5 border border-white/10 rounded-xl py-4 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-black/20",
                          isLimitReached && "opacity-30 cursor-not-allowed grayscale"
                        )}
                      >
                        <Plus className="w-4 h-4" />
                        {isLimitReached ? "Player Limit Reached" : "Add Another Player"}
                      </button>
                      <button
                        type="submit"
                        disabled={isVerifying || !isCountMet}
                        className={cn(
                          "flex-1 bg-white text-black font-black py-4 rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] disabled:opacity-50",
                          !isCountMet && "bg-zinc-800 text-white/20 border border-white/5 cursor-not-allowed"
                        )}
                      >
                        {isVerifying ? "Submitting..." : isCountMet ? "Finish Registration" : `Add ${requiredCount - players.length} more players`}
                        {isCountMet && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                    </div>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-7 h-7 text-green-500" />
              </div>
              <h2 className="font-display text-2xl text-white mb-2 uppercase tracking-tight">Registered!</h2>
              <p className="text-white/40 text-[10px] mb-8 max-w-xs mx-auto leading-relaxed">
                Team registration for <span className="text-white font-bold">{sport?.name}</span> is confirmed. Coordinators will contact shortly.
              </p>
              <button
                onClick={onClose}
                className="bg-white/5 border border-white/10 text-white font-black px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all uppercase tracking-widest text-[9px]"
              >
                Return to Showcase
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
