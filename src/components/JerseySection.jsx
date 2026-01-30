"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
Shirt, ArrowRight, CheckCircle, Clock, AlertTriangle, 
Copy, Zap, ShieldCheck, QrCode, CreditCard, Check, Box, Truck, Trophy, Medal,
ChevronRight, Sparkles, Receipt, ExternalLink, Cpu, Activity, Fingerprint, Lock, Ticket, MapPin, Calendar, Shield, Mail,User
} from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import JerseyOrderFlow from "@/components/JerseyOrderFlow";
import { MASTER_ADMINS } from "@/lib/admins"
import { CometCard2 } from "@/components/ui/comet-card2";


export default function JerseySection() {
// ✅ 1. Hooks FIRST
const { data: session, status } = useSession();
const user = session?.user;

const isAdmin =
  user?.email && MASTER_ADMINS.includes(user.email);

useEffect(() => {
  if (isAdmin) {
    window.location.replace("/admin");
  }
}, [isAdmin]);

const [hasCheckedOrder, setHasCheckedOrder] = useState(false);
const [order, setOrder] = useState(null);
const [loading, setLoading] = useState(true);
const [modalOpen, setModalOpen] = useState(false);
const [copied, setCopied] = useState(false);


const isSessionLoading = status === "loading";

const fetchOrder = async () => {
  if (!user?.email) {
    setOrder(null);
    setHasCheckedOrder(true);
    setLoading(false);
    return;
  }

  try {
    const res = await fetch(
      `/api/jersey/status?email=${encodeURIComponent(user.email)}`
    );

    if (!res.ok) {
      setOrder(null);
      return;
    }

    const data = await res.json();

    // 🔥 THIS IS THE KEY
    if (data && data.status) {
      setOrder(data);
    } else {
      setOrder(null);
    }
  } catch (err) {
    console.error("FETCH ORDER ERROR:", err);
    setOrder(null);
  } finally {
    setHasCheckedOrder(true);
    setLoading(false);
  }
};

useEffect(() => {
  if (isSessionLoading) return;

  fetchOrder();

  if (!user?.email) return;

  const interval = setInterval(fetchOrder, 10000);
  return () => clearInterval(interval);
}, [user?.email, isSessionLoading]);


 const handleCopyCode = () => {
  if (!order?.secretCode) return;

  navigator.clipboard.writeText(order.secretCode);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};


  const handleSecureArmorClick = () => {
  if (!user) {
    toast.error("Please login first to continue");
    return;
  }

  setModalOpen(true);
};

let screen = "GET_JERSEY";

if (user && order?.status) {
  if (order.status === "pending") screen = "PENDING";
  else if (order.status === "approved") screen = "APPROVED";
  else if (order.status === "rejected") screen = "REJECTED";
}
if (isSessionLoading || loading || !hasCheckedOrder) return null;
  return (
   <section
  id="jersey"
  className="
  min-h-screen flex justify-center relative overflow-hidden
  items-start p-4 pt-20
  md:items-center md:p-6
"
>

      {/* Dynamic Background */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-orange-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-50 mix-blend-overlay" />
      </div> */}

      <div className="container mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {screen === "GET_JERSEY" ? (
            <motion.div
                  key="no-order"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="max-w-6xl mx-auto"
                >
                  <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="space-y-12">
                      <div className="space-y-6">
                        <motion.div 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl"
                        >
                          <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                          <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Phase 01: Activation</span>
                        </motion.div>
                        
                        <h2 className="text-5xl sm:text-6xl md:text-[10rem] font-black text-white tracking-tighter leading-[0.85] uppercase">
                          GET YOUR <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-600">OFFICIAL</span> <br />
                          JERSEY
                        </h2>
                        
                        <p className="text-zinc-400 text-xl font-light max-w-lg leading-relaxed">
                          Buy your official{"  "}
                          <span className="text-white font-bold">PARAKRAM &apos;26 </span>{"  "}
                          department jersey and{" "}
                          <span className="text-orange-400 font-medium drop-shadow-[0_0_8px_rgba(251,146,60,0.6)]">
                          play for glory or support your team.
                        </span>
                        </p>
                        </div>

                      <div className="flex flex-col sm:flex-row items-stretch gap-6">
                       <button
                          onClick={() => {
                            if (!session) {
                              toast.error("Please login first to order a jersey");
                              return;
                            }
                            setModalOpen(true);
                          }}
                          className="
                            group relative overflow-hidden
                            bg-white
                            w-full sm:w-auto
                            px-6 py-4
                            sm:px-8 sm:py-5
                            md:px-12 md:py-6
                            rounded-2xl md:rounded-full
                            transition-all
                            hover:scale-105 active:scale-95
                          "
                        >
                          {/* hover gradient — ONLY shows on hover */}
                          <div className="
                            absolute inset-0
                            bg-gradient-to-r from-orange-500 to-red-600
                            opacity-0 group-hover:opacity-100
                            transition-opacity
                          " />

                          {/* content */}
                          <span className="
                            relative z-10
                            flex items-center justify-center gap-4
                            text-black group-hover:text-white
                            font-black text-base sm:text-lg md:text-xl
                            tracking-tight
                          ">
                            ORDER YOUR JERSEY NOW
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                          </span>
                        </button>

                        
                        <div className="flex items-center gap-5 px-5 py-4 rounded-2xl md:px-8 md:py-6 md:rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                            <Zap className="w-6 h-6 text-orange-500" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Entry Tier</p>
                            <p className="text-white text-2xl font-black">₹360</p>
                          </div>
                        </div>
                      </div>
                    </div>

                <div className="relative perspective-2000 flex items-center justify-center">
                    <CometCard2
                        className="
                          w-full
                          max-w-[90vw]
                          sm:max-w-md
                          lg:max-w-2xl
                          rounded-[2.5rem] lg:rounded-[4rem]
                        "
                        rotateDepth={35}
                        translateDepth={25}
                      >


                    <motion.div
                      animate={{ y: [0, -14, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={cn(
                        "relative z-20 aspect-[4/5]",
                        "bg-gradient-to-b from-white/10 to-white/5",
                        "border border-white/20",
                        "rounded-[4rem] p-8 md:p-16 overflow-hidden",
                        "backdrop-blur-sm group transform-style-3d"
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                      <div className="h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center">
                            <Shirt className="w-8 h-8 text-black" />
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
                              Material
                            </p>
                            <p className="text-white font-bold">Aero-Dry Mesh</p>
                          </div>
                        </div>

                        <div className="relative flex items-center justify-center">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute w-64 h-64 bg-orange-500/20 blur-[80px] rounded-full"
                          />
                          <Shirt className="w-64 h-64 text-white/5 drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]" />
                        </div>

                        <div className="space-y-4">
                          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest leading-none mb-1">
                                Status
                              </p>
                              <p className="text-white font-black text-lg">
                                GET JERSEY AND PLAY
                              </p>
                            </div>
                            <div className="flex -space-x-3">
                              {["M", "L", "XL"].map((size) => (
                                <div
                                  key={size}
                                  className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white"
                                >
                                  {size}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </CometCard2>
                </div>
                  </div>
                </motion.div>
       ) : screen === "PENDING" ? (
            <>
              {/* ⬇️ PASTE YOUR FULL SECTION EXACTLY AS IT IS ⬇️ */}
               <section id="jersey" className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6">
                  <motion.div
                    key="pending"
                    initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    className="max-w-3xl mx-auto perspective-1000"
                  >
                    <div className="relative bg-[#050a15] border border-blue-500/30 rounded-[3rem] p-8 md:p-20 overflow-hidden shadow-[0_0_150px_rgba(30,58,138,0.4)] transform-style-3d">
                      {/* Data Streams Animation */}
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            x: ["-100%", "100%"],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ 
                            duration: 3 + i, 
                            repeat: Infinity, 
                            ease: "linear",
                            delay: i * 0.5
                          }}
                          className="absolute h-[1px] w-1/2 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-0"
                          style={{ top: `${20 * (i + 1)}%` }}
                        />
                      ))}

                      {/* Scanning Animation */}
                      <motion.div 
                        animate={{ y: [-100, 600] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_30px_#60a5fa] z-20"
                      />
                      
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,138,0.05)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(30,58,138,0.05)_1.5px,transparent_1.5px)] bg-[size:40px_40px]" />
                      
                      <div className="relative z-10 flex flex-col items-center text-center space-y-12">
                        <div className="relative">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="w-44 h-44 rounded-full border-2 border-dashed border-blue-500/50 flex items-center justify-center"
                          >
                            <div className="w-36 h-36 rounded-full border border-blue-400/30 flex items-center justify-center bg-blue-500/10 backdrop-blur-sm">
                              <Shield className="w-14 h-14 text-blue-400" />
                            </div>
                          </motion.div>
                          <motion.div 
                            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"
                          />
                          {/* Floating icons */}
                          <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-4 bg-blue-500/20 p-3 rounded-2xl border border-blue-500/30 backdrop-blur-md"
                          >
                            <CheckCircle className="w-5 h-5 text-blue-400" />
                          </motion.div>
                        </div>

                          <div className="space-y-6">
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                            >
                              <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
                              <span className="text-xs font-black text-blue-400 uppercase tracking-[0.4em]">Transaction Secured</span>
                            </motion.div>
                            
                              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic leading-none px-4">
                                PAYMENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600">UNDER VERIFICATION</span>
                              </h2>
                              
                              <div className="space-y-4 max-w-lg mx-auto">
                                <p className="text-blue-100 text-lg font-bold">
                                  The <span className="text-blue-400">Parakram Team</span> will verify your order soon.
                                </p>
                                <p className="text-blue-200/50 text-base leading-relaxed">
                                  We are currently reviewing your payment details. You will receive a confirmation once the verification is complete.
                                </p>
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 1 }}
                                  className="pt-2"
                                >
                                  <p className="text-orange-400 font-black text-sm uppercase tracking-widest animate-pulse">
                                    After payment success you will get your secret code
                                  </p>
                                </motion.div>

                              <div className="flex flex-col gap-3 items-center justify-center text-sm font-mono text-blue-400 bg-blue-500/5 p-6 rounded-[2rem] border border-blue-500/10 backdrop-blur-sm">
                              <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4" />
                                <span className="font-bold uppercase tracking-wider">ETA: 12-24 HOURS</span>
                              </div>
                              <div className="flex items-center gap-3 opacity-60">
                                <Mail className="w-4 h-4" />
                                <span>parakramevent@gmail.com</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center gap-4 pt-4">
                          <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                              <motion.div 
                                key={i} 
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                className="w-10 h-10 rounded-full border-2 border-[#050a15] bg-blue-600/20 flex items-center justify-center backdrop-blur-md"
                              >
                                <Shield className="w-4 h-4 text-blue-400" />
                              </motion.div>
                            ))}
                          </div>
                          <p className="text-blue-300/40 text-[9px] font-black uppercase tracking-[0.5em]">Secured by Parakram Encryption Engine v2.6.0</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>
            </>
             ) : screen === "APPROVED" ? (
                <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-5xl mx-auto w-full px-2 sm:px-4 md:px-0"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-orange-500/20 to-blue-500/20 rounded-[4rem] blur-3xl opacity-50 animate-pulse" />
                
                <div className="relative bg-zinc-950 border border-white/10 rounded-[3.5rem] overflow-hidden shadow-2xl">
                  {/* Premium Success Indicator */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500" />
                  
                  <div className="flex flex-col lg:grid lg:grid-cols-[1.2fr_0.8fr]">
                    {/* Left: Jersey & Identity */}
                    <div className="p-8 md:p-12 lg:p-16 space-y-10 border-b lg:border-b-0 lg:border-r border-white/5">
                      <div className="space-y-6">
                        <motion.div 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Official Parakram Jersey</span>
                        </motion.div>
                        
                        <div className="space-y-1">
                          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
                            ORDER <span className="text-emerald-500">CONFIRMED</span>
                          </h2>
                          <p className="text-zinc-500 text-xs md:text-sm font-medium">Your department jersey is locked and ready for deployment.</p>
                        </div>
                      </div>

                      {/* Jersey Mockup Card */}
                      <div className="relative group/jersey w-full max-w-md mx-auto lg:mx-0">
                        <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/20 to-transparent rounded-[2.5rem] blur opacity-50" />
                        <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-white/10 rounded-[2.5rem] p-8 overflow-hidden aspect-[4/3] flex flex-col justify-between">
                          {/* Background Texture */}
                          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                            <Shirt className="w-[120%] h-[120%] text-white rotate-12" />
                          </div>

                          <div className="flex justify-between items-start relative z-10">
                            <div className="space-y-1">
                              <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em]">Official Gear</p>
                              <p className="text-white text-4xl font-black tracking-tighter uppercase italic leading-none">{order.jerseyName}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Size</p>
                              <div className="px-3 py-1 bg-white text-black text-[10px] font-black rounded-lg">{order.size}</div>
                            </div>
                          </div>

                          <div className="flex items-end justify-between relative z-10">
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Department</p>
                                <p className="text-zinc-400 font-mono text-xs tracking-tighter">{order?.department}</p>
                              </div>
                            </div>
                            <div className="text-right relative">
                              <motion.p 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.15 }}
                                className="text-[12rem] font-black text-white leading-none absolute -bottom-12 -right-4 italic"
                              >
                                {order.jerseyNo}
                              </motion.p>
                              <p className="text-8xl md:text-9xl font-black text-white leading-none relative z-10 italic drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                {order.jerseyNo}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 py-4 border-t border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">PARAKRAM TEAM</p>
                      </div>
                    </div>

                    {/* Right: Secret Code Section */}
                    <div className="bg-zinc-900/40 p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.05),transparent_70%)]" />
                      
                      <div className="relative z-10 text-center space-y-8 w-full max-w-sm">
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-3">
                            <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center">
                              <Ticket className="w-5 h-5 text-orange-500" />
                            </div>
                            <div className="text-left">
                              <p className="text-orange-500 text-[14px] font-black uppercase tracking-[0.4em] leading-none mb-1">SECRET CODE</p>
                              <p className="text-white text-xs font-medium uppercase tracking-tight">Active Deployment Code</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                            Use this code for jersey collection <br />
                            <span className="text-white">& game registrations</span>
                          </p>

                          <motion.div 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleCopyCode}
                            className="bg-black/50 border border-white/5 rounded-3xl p-6 relative overflow-hidden cursor-pointer group/code backdrop-blur-xl shadow-2xl"
                          >
                            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 via-transparent to-transparent opacity-0 group-hover/code:opacity-100 transition-opacity" />
                            
                            <div className="flex justify-center gap-2 mb-4">
                              {order.secretCode?.split("").map((char, i) => (
                                <div
                                  key={i}
                                  className="w-8 h-10 sm:w-10 sm:h-12 md:w-12 md:h-14 bg-black/60 border border-white/10
                                  rounded-xl flex items-center justify-center"
                                >
                                  <span className="text-2xl md:text-3xl font-black text-white tracking-widest">
                                    {char}
                                  </span>
                                </div>
                              ))}
                            </div>

                           <div
                                className={`py-2 px-4 rounded-lg font-black text-[9px] uppercase tracking-[0.2em]
                                transition-all flex items-center justify-center gap-2 mx-auto w-fit
                                ${
                                  copied
                                    ? "bg-emerald-500 text-white"
                                    : "bg-white/5 text-zinc-400 group-hover/code:bg-orange-500 group-hover/code:text-white border border-white/5"
                                }`}
                              >
                              {copied ? (
                                <><Check className="w-3 h-3" /> SECURED</>
                              ) : (
                                <><Copy className="w-3 h-3" /> COPY KEY</>
                              )}
                            </div>
                          </motion.div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl text-center">
                            <MapPin className="w-3 h-3 text-zinc-600 mx-auto mb-1.5" />
                            <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">Terminal</p>
                            <p className="text-[10px] text-white font-bold">DYPIT</p>
                          </div>
                          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-2xl text-center">
                            <Calendar className="w-3 h-3 text-zinc-600 mx-auto mb-1.5" />
                            <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">Protocol</p>
                            <p className="text-[10px] text-white font-bold">One-Time</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-zinc-700">
                          <Fingerprint className="w-2.5 h-2.5" />
                          <span className="text-[7px] font-black uppercase tracking-[0.5em]">Verified Athlete Access Only</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            ) : screen === "REJECTED" ? (
            <motion.div
              key="failed"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-xl mx-auto px-2 sm:px-4 md:px-0"
            >
              <div className="bg-[#1a0505] border border-red-500/30 rounded-[3rem] p-12 md:p-16 text-center space-y-10 relative overflow-hidden shadow-[0_0_100px_rgba(220,38,38,0.2)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1)_0%,transparent_70%)]" />
                
                <div className="relative z-10 space-y-8">
                  <div className="w-24 h-24 bg-red-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto border border-red-500/20 group hover:bg-red-500/20 transition-colors">
                    <AlertTriangle className="w-12 h-12 text-red-500 animate-bounce" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Critical Rejection</span>
                    </div>
                    <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic">
                      INTEL <span className="text-red-500">CORRUPTED</span>
                    </h2>
                    <p className="text-red-200/40 text-lg font-medium max-w-sm mx-auto">
                      Verification protocol failed. Your transaction evidence was insufficient or invalid. 
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => setModalOpen(true)}
                      className="w-full py-6 bg-red-500 rounded-2xl text-white font-black text-base uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-900/20 active:scale-95"
                    >
                      RE-INITIATE SEQUENCE
                    </button>
                  </div>
                </div>

                {/* Aesthetic glitch lines */}
                <div className="absolute top-1/4 left-0 w-4 h-1 bg-red-500/20" />
                <div className="absolute bottom-1/3 right-0 w-8 h-1 bg-red-500/20" />
              </div>
            </motion.div>
          ):null}
        </AnimatePresence>
      </div>

      <JerseyOrderFlow 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onComplete={fetchOrder} 
      />
    </section>
  );
}
