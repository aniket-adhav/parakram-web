"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { normalizeEmail } from "@/lib/adminUtils";
import { ADMIN_EMAILS } from "@/lib/admins";
// import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ButtonLoader } from "@/components/ui/ButtonLoader";
import { useAppToast } from "@/lib/useAppToast";
import { CometCard } from "../components/ui/comet-card";
import { ElegantShape } from "@/components/ui/shape-landing-hero";
import { cn } from "@/lib/utils";
import SplashLoader from "@/components/SplashLoader";
import AdminRedirectLoader from "@/components/AdminRedirectLoader";


// ⬇️ Load new jersey section (client-only, heavy animations)
const JerseySection = dynamic(
  () => import("@/components/JerseySection"),
  { ssr: false }
);
import {
  Menu,
  X,
  Trophy,
  Users,
  Calendar,
  Mail,
  ChevronDown,
  Flame,
  Target,
  Medal,
  Zap,
  LogOut,
  CheckCircle,
    ChevronRight,
    Clock,
    MapPin,
  User,
    AlertTriangle,
    Shirt,
    Copy,
    Shield,
    Activity,
    Cpu,
    Fingerprint,
    Loader2,
} from "lucide-react";


export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(false);
  const [redirecting, setRedirecting] = useState(false);


  // ✅ ALWAYS CALL HOOKS FIRST
 useEffect(() => {
  if (status === "loading") return;

  const email = normalizeEmail(session?.user?.email);

  // 🔐 ADMIN → show admin redirect loader
  if (email && ADMIN_EMAILS.includes(email)) {
    setRedirecting(true);
    router.replace("/admin");
    return;
  }

  // 🌊 existing splash logic (UNCHANGED)
  const hasVisited = sessionStorage.getItem("parakram_loaded");
  if (!hasVisited) {
    setShowSplash(true);
  }
}, [status, session, router]);


  const handleSplashComplete = () => {
    sessionStorage.setItem("parakram_loaded", "true");
    setShowSplash(false);
  };
  if (redirecting) {
  return <AdminRedirectLoader />;
}

if (status === "loading") return null;


  return (
    <main className="min-h-screen relative">
      {/* 🔥 Splash Loader */}
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashLoader onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      {/* 🌍 Main Website */}
      {!showSplash && (
        <>
          <GlobalBackground />
          <Header />
          <HeroSection />
          <JerseyBanner />
          <JerseySection />
          <AboutSection />
          <SportsSection />
          <ChampionsSection />
          <ScheduleSection />
          <ContactSection />
          <Footer />
        </>
      )}
    </main>
  );
}


const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Sports", href: "#sports" },
  { label: "Champions", href: "#champions" },
  { label: "Schedule", href: "#schedule" },
  { label: "Contact", href: "#contact" },
];

const SPORTS = [
    { 
      name: "Cricket", 
      teamSize: "11 Players", 
      category: "Team Sport", 
      icon: "🏏",
      color: "blue",
      gradient: "from-blue-600/30 to-indigo-900/40",
      buttonColor: "bg-blue-600 hover:bg-blue-500",
      glow: "shadow-blue-500/50"
    },
    { 
      name: "Football", 
      teamSize: "11 Players", 
      category: "Team Sport", 
      icon: "⚽",
      color: "emerald",
      gradient: "from-emerald-600/30 to-teal-900/40",
      buttonColor: "bg-emerald-600 hover:bg-emerald-500",
      glow: "shadow-emerald-500/50"
    },
    { 
      name: "Badminton", 
      teamSize: "1-2 Players", 
      category: "Individual/Doubles", 
      icon: "🏸",
      color: "purple",
      gradient: "from-purple-600/30 to-pink-900/40",
      buttonColor: "bg-purple-600 hover:bg-purple-500",
      glow: "shadow-purple-500/50"
    },
    { 
      name: "Kabaddi", 
      teamSize: "7 Players", 
      category: "Team Sport", 
      icon: "🤼",
      color: "red",
      gradient: "from-red-600/30 to-orange-900/40",
      buttonColor: "bg-red-600 hover:bg-red-500",
      glow: "shadow-red-500/50"
    },
    { 
      name: "Tug of War", 
      teamSize: "8 Players", 
      category: "Team Sport", 
      icon: "💪",
      color: "amber",
      gradient: "from-amber-600/30 to-yellow-900/40",
      buttonColor: "bg-amber-600 hover:bg-amber-500",
      glow: "shadow-amber-500/50"
    },
    { 
      name: "Basketball", 
      teamSize: "5 Players", 
      category: "Team Sport", 
      icon: "🏀",
      color: "orange",
      gradient: "from-orange-600/30 to-red-900/40",
      buttonColor: "bg-orange-600 hover:bg-orange-500",
      glow: "shadow-orange-500/50"
    },
    { 
      name: "Volleyball", 
      teamSize: "6 Players", 
      category: "Team Sport", 
      icon: "🏐",
      color: "indigo",
      gradient: "from-indigo-600/30 to-blue-900/40",
      buttonColor: "bg-indigo-600 hover:bg-indigo-500",
      glow: "shadow-indigo-500/50"
    },
    { 
      name: "Throwball", 
      teamSize: "7 Players", 
      category: "Team Sport", 
      icon: "🏐",
      color: "cyan",
      gradient: "from-cyan-600/30 to-blue-900/40",
      buttonColor: "bg-cyan-600 hover:bg-cyan-500",
      glow: "shadow-cyan-500/50"
    },
    { 
      name: "Carrom", 
      teamSize: "1-2 Players", 
      category: "Mind Sport", 
      icon: "🎱",
      color: "rose",
      gradient: "from-rose-600/30 to-pink-900/40",
      buttonColor: "bg-rose-600 hover:bg-rose-500",
      glow: "shadow-rose-500/50"
    },
    { 
      name: "Chess", 
      teamSize: "Individual", 
      category: "Mind Sport", 
      icon: "♟️",
      color: "zinc",
      gradient: "from-zinc-600/30 to-zinc-900/40",
      buttonColor: "bg-zinc-600 hover:bg-zinc-500",
      glow: "shadow-zinc-500/50"
    },
    { 
      name: "Table Tennis", 
      teamSize: "1-2 Players", 
      category: "Individual/Doubles", 
      icon: "🏓",
      color: "lime",
      gradient: "from-lime-600/30 to-emerald-900/40",
      buttonColor: "bg-lime-600 hover:bg-lime-500",
      glow: "shadow-lime-500/50"
    },
  ];

const GC_CHAMPIONS = {
  2025: [
    {
      position: "Winner",
      name: "AI&DS COMRADES",
      description: "Dominated across all sports categories",
      imageUrl: "https://res.cloudinary.com/djoqcej0n/image/upload/v1769758387/aidslogo_q85xse.jpg",
    },
    {
      position: "Runner Up",
      name: "CIVILIANS",
      description: "Strong performance in athletics and team sports",
      imageUrl: "https://res.cloudinary.com/djoqcej0n/image/upload/v1768922243/civil_sc5r8d.png",
    },
    {
      position: "PowerHouse",
      name: "RUDRASHAKTI MECHANICAL",
      description: "Strong fan support throughout the event",
      imageUrl: "https://res.cloudinary.com/djoqcej0n/image/upload/v1769758399/Mech_cedyq1.png",
    },
  ],
  2024: [
    {
      position: "Winner",
      name: "Computer GIANTS",
      description: "Showed the best overall performance with consistent results across multiple sports",
      imageUrl: "https://res.cloudinary.com/djoqcej0n/image/upload/v1769522186/Computer_Gaints_logo_ryedkp.png",
    },
    {
      position: "Runner Up",
      name: "ENTC SPARTANS",
      description: "Performed strongly in team events with good coordination and match results",
      imageUrl: "https://res.cloudinary.com/djoqcej0n/image/upload/v1769522187/ENTC_SPARTANS_logo_plnxyu.png",
    },
    {
      position: "3rd Place",
      name: "AI&DS COMRADES",
      description: "Delivered notable performances, especially in individual sporting events",
      imageUrl: "https://res.cloudinary.com/djoqcej0n/image/upload/v1769758387/aidslogo_q85xse.jpg",
    },
  ],
};

const SCHEDULE = [
  { day: "Day 1", date: "March 15", events: ["Opening Ceremony", "Cricket - Pool A", "Football - Pool A", "Chess - Round 1"] },
  { day: "Day 2", date: "March 16", events: ["Cricket - Pool B", "Basketball - Pool A", "Badminton Singles", "Athletics - Heats"] },
  { day: "Day 3", date: "March 17", events: ["Semi-Finals", "Table Tennis Finals", "Volleyball Finals", "Athletics - Finals"] },
  { day: "Day 4", date: "March 18", events: ["Grand Finals", "Prize Distribution", "Closing Ceremony"] },
];

function Header() {
  const { data: session, status } = useSession();
const isLoading = status === "loading";
const user = session?.user;

const email = normalizeEmail(session?.user?.email);
if (email && ADMIN_EMAILS.includes(email)) {
  return null;
}
  const toast = useAppToast()
 // const params = useSearchParams();
   const router = useRouter();
   
const loginToastShown = useRef(false);


  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  // useEffect(() => {
  //   if (params.get("login") === "success" && session?.user && !loginToastShown.current) {
  //     toast.show({
  //       title: "Login Successful",
  //       message: "Welcome to PARAKRAM 👋",
  //       variant: "success",
  //     });

  //     loginToastShown.current = true;
  //     // ✅ REMOVE ?login=success WITHOUT RELOAD
  //     router.replace("/", { scroll: false });
  //   }
  // }, [params, session, router]);



  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.show({
      title: "Logged Out",
      message: "You have been logged out successfully",
      variant: "success",
    });
    router.push("/");  
  };

  const [loginLoading, setLoginLoading] = useState(false);



  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* LOGO */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link href="/" className="font-display text-2xl md:text-3xl tracking-wider text-white">
              PARAKRAM
            </Link>
          </motion.div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* USER / LOGIN */}
          {isLoading ? (
  /* 👇 Placeholder to avoid flash */
            <div className="hidden md:block w-[120px] h-10 rounded-full bg-white/5 animate-pulse" />
          ) : user ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden md:block relative">
             <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition"
              >
                {/* AVATAR */}
                <div className="relative w-8 h-8 rounded-full overflow-hidden 
                                border border-white/20 bg-white/10 
                                flex items-center justify-center shrink-0">
                  {user.image ? (
                    <img
                      src={`${user.image}?v=${session?.expires}`}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-white text-xs font-semibold uppercase">
                      {user.name?.charAt(0)}
                    </span>
                  )}
                </div>

                {/* NAME */}
                <span className="text-white text-sm max-w-[120px] truncate">
                  {user.name}
                </span>
              </button>


              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-56 bg-black/95 border border-white/10 rounded-xl"
                >
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-white/50 text-sm">{user.email}</p>
                  </div>

                  <div className="py-2">
          
                    <Link
                      href="/#sports"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-white/70 hover:bg-white/5"
                    >
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm">Register Sports</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-white/5"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <div className="hidden md:block">
              <button
                onClick={() => {
                  setLoginLoading(true);
                  router.push("/login");
                }}
                disabled={loginLoading}
                className="shiny-cta-btn relative"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 min-h-[28px]">
                  {loginLoading && (
                    <span
                      className="
                        w-5 h-5
                        border-[3px]
                        border-white/40
                        border-t-white
                        rounded-full
                        animate-spin
                      "
                    />
                  )}
                  <span className="leading-none">Login</span>
                </span>
              </button>
            </div>

          )}

          {/* MOBILE MENU BUTTON */}
          {/* MOBILE HAMBURGER BUTTON */}
            <button
                onClick={() => {
                  if (!mobileMenuOpen) setMobileMenuOpen(true);
                }}
                aria-label="Open menu"
                className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
              >
                <Menu className="w-6 h-6" />
              </button>


          <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md md:hidden"
                >
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    className="absolute right-0 top-0 h-full w-72 bg-black border-l border-white/10 px-6 py-6 flex flex-col"
                  >
                    {/* CLOSE BUTTON */}
                    <div className="flex justify-end mb-6">
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-white/70 hover:text-white"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                  {/* USER HEADER */}

                      {user && (
                        <div className="flex items-center gap-3 px-2 pb-4 mb-4 border-b border-white/10">
                          
                          {/* AVATAR */}
                          <div className="relative w-10 h-10 rounded-full overflow-hidden 
                                                  border border-white/20 bg-white/10 
                            flex items-center justify-center shrink-0">
                            {user.image ? (
                              <img
                                src={`${user.image}?v=${session?.expires}`}
                                alt={user.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <span className="text-white text-sm font-semibold uppercase">
                                {user.name?.charAt(0)}
                              </span>
                            )}
                          </div>

                          {/* USER INFO */}
                          <div className="flex flex-col min-w-0">
                            <span className="text-white text-sm font-medium leading-tight truncate">
                              {user.name}
                            </span>
                            <span className="text-white/40 text-xs">
                              Logged in
                            </span>
                          </div>

                        </div>
                      )}


                    {/* LINKS */}
                    <nav className="flex flex-col gap-4 text-white text-base">
                      {[
                        ["Home", "#home"],
                        ["About", "#about"],
                        ["Sports", "#sports"],
                        ["Champions", "#champions"],
                        ["Schedule", "#schedule"],
                        ["Contact", "#contact"],
                      ].map(([label, href]) => (
                        <a
                          key={label}
                          href={href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-2 border-b border-white/10 hover:text-orange-400"
                        >
                          {label}
                        </a>
                      ))}
                    </nav>

                    {/* LOGIN / LOGOUT */}
                    <div className="mt-auto pt-6 border-t border-white/10">
                      {!user ? (
                        <Link
                          href="/login"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block w-full text-center py-3 rounded-xl 
                                    bg-gradient-to-r from-orange-500 to-red-600 
                                    text-white font-semibold"
                        >
                          Login
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            handleLogout();
                          }}
                          className="w-full py-3 rounded-xl bg-white/5 
                                    border border-white/10 text-red-400 
                                    font-semibold flex items-center justify-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

        </div>
      </div>
    </header>
  );
}

function CountdownUnit({ value, label }) {
  const formattedValue = String(value).padStart(2, "0");
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <motion.div
          key={value}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative"
        >
          <span 
            className="block font-mono text-2xl sm:text-3xl md:text-4xl font-black tabular-nums bg-gradient-to-b from-white via-orange-200 to-orange-500 bg-clip-text text-transparent"
            style={{ textShadow: "0 0 30px rgba(249,115,22,0.4)" }}
          >
            {formattedValue}
          </span>
        </motion.div>
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.6) 0%, transparent 70%)" }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
      <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-white/40 mt-1.5 font-medium">
        {label}
      </span>
    </div>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 🔥 FIXED EVENT DATE (2 March 2026, 9:00 AM IST)
    const eventDate = new Date("2026-02-21T09:00:00+05:30");

    const updateTimer = () => {
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      } else {
        // Event started / ended
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

  updateTimer();
  const interval = setInterval(updateTimer, 1000);
  return () => clearInterval(interval);
}, []);


  if (!mounted) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5 px-4 sm:px-6 py-3 sm:py-4 bg-black/50 backdrop-blur-md rounded-xl border border-white/10">
          {["Days", "Hrs", "Min", "Sec"].map((label, i) => (
            <div key={label} className="flex items-center gap-3 sm:gap-4 md:gap-5">
              {i > 0 && <span className="text-orange-500/50 font-light text-lg sm:text-xl">:</span>}
              <div className="flex flex-col items-center">
                <span className="font-mono text-2xl sm:text-3xl md:text-4xl font-black text-white/20 tabular-nums">--</span>
                <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-white/30 mt-1.5">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative"
    >
      <div className="relative flex items-center gap-3 sm:gap-4 md:gap-5 px-4 sm:px-6 py-3 sm:py-4 bg-black/50 backdrop-blur-md rounded-xl border border-white/10">
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-red-500/5"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        <CountdownUnit value={timeLeft.days} label="Days" />
        
        <span className="text-orange-500/50 font-light text-lg sm:text-xl">:</span>
        
        <CountdownUnit value={timeLeft.hours} label="Hrs" />
        
        <span className="text-orange-500/50 font-light text-lg sm:text-xl">:</span>
        
        <CountdownUnit value={timeLeft.minutes} label="Min" />
        
        <span className="text-orange-500/50 font-light text-lg sm:text-xl">:</span>
        
        <CountdownUnit value={timeLeft.seconds} label="Sec" />
      </div>
    </motion.div>
  );
}



function HeroSection() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
    const [buttonLoading, setButtonLoading] = useState(null);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const handleButtonClick = (href, name) => {
    setButtonLoading(name);
    router.push(href);
  };


  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
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
      </div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-1 h-32 bg-gradient-to-b from-orange-500 to-transparent rotate-45 animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-24 bg-gradient-to-b from-red-500 to-transparent -rotate-45 animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-40 bg-gradient-to-b from-yellow-500 to-transparent rotate-12 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8"
          >
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-orange-400 tracking-wide font-medium">
              College Sports Fest 2026
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1
              className="
                font-display
                text-[4.5rem]        /* 📱 mobile (BIG) */
                leading-[0.9]
                tracking-tight
                mb-4

                sm:text-[6rem]       /* small screens */
                md:text-[8rem]       /* tablets */
                lg:text-[10rem]      /* desktop */
              "
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60">
                PARAKRAM
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-xl md:text-2xl text-white/60 mb-8 font-light tracking-wider">
              Unleash the Warrior Within
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-12"
          >
            <CountdownTimer />
           </motion.div>

<motion.div
                  custom={4}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <motion.a
                    href="#sports"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold text-lg overflow-hidden"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-700"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                      >
                        🏆
                      </motion.span>
                      Explore Sports
                    </span>
                  </motion.a>
                  {user ? (
                <motion.button
                  onClick={() => {
                    document.getElementById("jersey")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-white/5 border border-white/20 text-white rounded-full font-semibold text-lg overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <motion.span
                    className="absolute inset-0 border-2 border-orange-500/0 rounded-full group-hover:border-orange-500/50 transition-all duration-300"
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ⚡
                    </motion.span>
                    Get Jersey
                  </span>
                </motion.button>
                ) : (
                  <motion.button
                    onClick={() => handleButtonClick("/login", "heroLogin")}
                    disabled={buttonLoading === "heroLogin"}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-4 bg-white/5 border border-white/20 text-white rounded-full font-semibold text-lg overflow-hidden disabled:opacity-80"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <motion.span
                      className="absolute inset-0 border-2 border-orange-500/0 rounded-full group-hover:border-orange-500/50 transition-all duration-300"
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      {buttonLoading === "heroLogin" && <ButtonLoader className="w-5 h-5" />}
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        🔐
                      </motion.span>
                      Login to Register
                    </span>
                  </motion.button>
                )}
              </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-white/40 animate-bounce" />
      </motion.div>
    </section>
  );
}


function JerseyBanner() {


  const { data: session } = useSession();
  const user = session?.user;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden bg-gradient-to-r from-red-900/80 via-red-600/80 to-red-900/80 py-6"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M30%200L60%2030L30%2060L0%2030Z%22%20fill%3D%22rgba(255%2C255%2C255%2C0.03)%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <span className="text-2xl md:text-4xl">🚫</span>
          <span className="font-display text-3xl md:text-5xl text-white tracking-wider">
            NO JERSEY • NO ENTRY
          </span>
          <span className="text-2xl md:text-4xl">👕</span>
        </motion.div>
       <p className="text-center text-white/70 mt-2 text-sm md:text-base">
          {user ? (
            user.jerseyVerified ? (
              <span className="text-emerald-400 font-semibold">
                ✓ Jersey verified — you’re all set
              </span>
            ) : (
              <Link
                href="/jersey-verification"
                className="text-yellow-400 hover:text-yellow-300 underline-offset-4 hover:underline font-medium"
              >
                Complete your jersey order
              </Link>
            )
          ) : (
            <span className="text-white/50">
              Jersey verification is mandatory for all participants
            </span>
          )}
        </p>
      </div>
    </motion.div>
  );
}




function AboutSection() {
  const stats = [
    { icon: Users, value: "1000+", label: "Athletes" },
    { icon: Trophy, value: "11", label: "Sports" },
    { icon: Calendar, value: "4", label: "Days" },
    { icon: Medal, value: "3", label: "Winners" },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 text-sm tracking-widest uppercase mb-4 block">
            The Legacy
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-4">
            ABOUT PARAKRAM
          </h2>
        </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6 text-white/60 text-lg leading-relaxed mb-8">
                  <p>
                    <span className="text-orange-500 font-bold">Parakram</span> is the <span className="text-white font-semibold">flagship inter-departmental sports festival</span> of <span className="text-white font-bold">DYPIT, Pimpri</span>. 
                    It is a celebration of <span className="text-orange-400 italic font-medium">athleticism</span>, <span className="text-orange-400 italic font-medium">sportsmanship</span>, and the <span className="text-orange-400 italic font-medium">relentless pursuit of excellence</span>. 
                    Every year, over <span className="text-white font-bold underline decoration-orange-500/50 underline-offset-4">1000 athletes</span> compete across various sports to claim the <span className="text-orange-500 font-bold">ultimate glory</span> for their departments.
                    
                    <br /><br />

                    Alongside the intense competition, <span className="text-white font-semibold">Parakram</span> awards 
                    <span className="text-orange-400 font-semibold"> two major titles</span> — the 
                    <span className="text-white font-semibold">  General Championship Winner</span> and 
                    <span className="text-white font-semibold">  Runner-Up</span>.  
                    Additionally, the prestigious 
                    <span className="text-orange-500 font-bold"> Powerhouse Trophy</span> is awarded to the department with the 
                    <span className="text-white font-semibold">  highest jersey participation</span> and 
                    <span className="text-white font-semibold">  maximum student support</span>, celebrating unity beyond the field.
                  </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-all"
                  >
                    <stat.icon className="w-6 h-6 text-orange-500 mb-4" />
                    <div className="font-display text-3xl text-white mb-1">{stat.value}</div>
                    <div className="text-white/40 text-xs uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative flex flex-row items-center justify-center gap-6 md:gap-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-red-600/20 blur-3xl -z-10" />
              
              <motion.img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/05bb24b0-35d0-4b97-a0ce-2d662ac49b04/parakramlogo-1769422745744.PNG?width=8000&height=8000&resize=contain"
                alt="Parakram Logo"
                className="w-40 md:w-56 h-auto drop-shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/05bb24b0-35d0-4b97-a0ce-2d662ac49b04/dyp-1769422745745.png?width=8000&height=8000&resize=contain"
                alt="DYP Logo"
                className="w-40 md:w-56 h-auto drop-shadow-2xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
            </motion.div>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, translateY: -10 }}
              transition={{ duration: 0.6 }}
              className="relative group rounded-[2.5rem] overflow-hidden aspect-[16/10] md:aspect-auto md:h-[450px] shadow-2xl shadow-orange-500/10 border border-white/5 cursor-pointer"
            >
              <img
                src="https://res.cloudinary.com/djoqcej0n/image/upload/v1768921780/pic_qdgbky.jpg"
                alt="Sports Arena"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-10 transform transition-all duration-500 group-hover:translate-y-[-5px]">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/20 rounded-full border border-orange-500/30 mb-4"
                >
                  <Flame className="w-3 h-3 text-orange-500" />
                  <span className="text-[10px] text-orange-400 uppercase tracking-widest font-bold">Elite Venues</span>
                </motion.div>
                <h3 className="font-display text-3xl md:text-5xl text-white mb-4 leading-tight tracking-tight">
                  Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Champions</span> <br />Are Made
                </h3>
      
                <div className="mt-6 h-1 w-16 bg-gradient-to-r from-orange-500 to-transparent rounded-full transform origin-left transition-all duration-700 group-hover:w-32" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, translateY: -10 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group rounded-[2.5rem] overflow-hidden aspect-[16/10] md:aspect-auto md:h-[450px] shadow-2xl shadow-red-500/10 border border-white/5 cursor-pointer"
            >
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/c2219a10-407e-4854-b421-aa549fc1e840/tug-of-war-resized-1768923878416.jpg?width=8000&height=8000&resize=contain"
                alt="Tug of War Battle"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-10 text-right transform transition-all duration-500 group-hover:translate-y-[-5px]">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full border border-red-500/30 mb-4 ml-auto"
                >
                  <Target className="w-3 h-3 text-red-500" />
                  <span className="text-[10px] text-red-400 uppercase tracking-widest font-bold">Warrior Spirit</span>
                </motion.div>
                <h3 className="font-display text-3xl md:text-5xl text-white mb-4 leading-tight tracking-tight">
                  United We Pull, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Together</span> We Conquer
                </h3>
              
                <div className="mt-6 h-1 w-16 bg-gradient-to-l from-red-500 to-transparent ml-auto rounded-full transform origin-right transition-all duration-700 group-hover:w-32" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
  );
}





function RegistrationPopup({ isOpen, onClose, sport }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40, rotateX: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40, rotateX: 15 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#080808] border border-white/10 rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-[0_0_120px_rgba(249,115,22,0.1)]"
      >
        {/* Elite Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-white/20 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all z-20"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto border border-orange-500/20">
            <Calendar className="w-10 h-10 text-orange-500" />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-display text-3xl text-white tracking-tight uppercase italic font-black">Registration Pending</h3>
            <p className="text-orange-500 font-bold uppercase tracking-widest text-xs">Arena: {sport?.name || "Multiple Sports"}</p>
          </div>

            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 text-left space-y-4 relative group">
              <div className="absolute top-4 right-4 flex gap-1">
                <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
                <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse delay-75" />
                <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse delay-150" />
              </div>
              
              <p className="text-white/70 text-sm leading-relaxed">
                Registration for <span className="text-white font-bold">PARAKRAM 2026</span> has not officially opened yet. Our coordination committee is finalizing the brackets and schedules.
              </p>
              

              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 text-white/40 text-xs">
                  <CheckCircle className="w-4 h-4 text-orange-500/50" />
                  <span>Expected Opening: <span className="text-white/60">February 2026</span></span>
                </div>
                <div className="flex items-center gap-3 text-white/40 text-xs">
                  <CheckCircle className="w-4 h-4 text-orange-500/50" />
                  <span>Notification: <span className="text-white/60">Dashboard Alert & WhatsApp Groups</span></span>
                </div>
                <div className="flex items-center gap-3 text-white/40 text-xs">
                  <CheckCircle className="w-4 h-4 text-orange-500/50" />
                  <span>Eligibility: <span className="text-white/60">Verified Jersey Required</span></span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold">We will notify you once the battle begins</p>
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => {

                    onClose();
                  }}
                  className="flex-[2] py-5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4" />
                  Notify Me
                </button>
              </div>
            </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

function SportsSection() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const user = session?.user;
  const router = useRouter();
  const [loadingSport, setLoadingSport] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleRegisterClick = async (e, sport) => {
    e.preventDefault();
    setLoadingSport(sport.name);

    if (!user) {
      await new Promise(resolve => setTimeout(resolve, 800));
      router.push("/login");
      return;
    }

    // Simulate check
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoadingSport(null);
    setSelectedSport(sport);
    setIsPopupOpen(true);
  };

  const getButtonText = (sportName) => {
    if (loadingSport === sportName) return user ? "Initializing..." : "Redirecting...";
    if (!user) return "Login to Register";
    return "Register Now";
  };

  return (
    <section id="sports" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 text-sm tracking-widest uppercase mb-4 block">
            Events
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-4 tracking-tighter">
            SPORTS SHOWCASE
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Choose your arena. From team sports to individual competitions,
            find your calling and register to compete.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {SPORTS.map((sport, i) => {
            return (
              <CometCard key={sport.name} className="h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "group h-full bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 transition-all duration-700 cursor-pointer flex flex-col justify-between relative overflow-hidden",
                      "hover:border-white/20 hover:shadow-[0_0_80px_rgba(0,0,0,0.5)]"
                    )}
                  >
                    {/* Dynamic Gradient Background on Hover */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-all duration-1000 -z-10",
                      sport.gradient
                    )} />
                    
                    {/* Background Glow Pulse */}
                    <motion.div 
                      animate={{ 
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 180, 270, 360]
                      }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className={cn(
                        "absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[100px] -z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                        `bg-${sport.color}-500/30`
                      )}
                    />
                  
                  <div>
                    <motion.div 
                      whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 }}
                      className="text-6xl mb-6 inline-block drop-shadow-2xl"
                    >
                      {sport.icon}
                    </motion.div>
                    <h3 className="font-display text-3xl text-white mb-3 group-hover:text-white transition-colors tracking-tight">
                      {sport.name}
                    </h3>
                    <div className="flex flex-col gap-2 text-base text-white/50 mb-8 group-hover:text-white/80 transition-colors">
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-white/20 group-hover:text-white/40" />
                        {sport.teamSize}
                      </span>
                      <span className={cn(
                        "font-black uppercase text-[10px] tracking-[0.3em] group-hover:text-white transition-colors",
                        `text-${sport.color}-500`
                      )}>
                        {sport.category}
                      </span>
                    </div>
                  </div>

                    <motion.button
                      whileHover={{ 
                        scale: 1.05, 
                        y: -4,
                      }}
                      whileTap={{ scale: 0.95 }}
                      disabled={loadingSport === sport.name}
                      onClick={(e) => handleRegisterClick(e, sport)}
                          className={cn(
                            "block w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all relative overflow-hidden group/btn disabled:opacity-80 disabled:cursor-wait",
                            mounted && user 
                              ? `${sport.buttonColor} text-white ${sport.glow} shadow-xl` 
                              : "bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/5"
                          )}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {loadingSport === sport.name && <ButtonLoader className="w-3 h-3" variant={(mounted && user) ? "light" : "dark"} />}
                            {mounted ? getButtonText(sport.name) : "Loading..."}
                            {loadingSport !== sport.name && (
                              <motion.div
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <ChevronRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                              </motion.div>
                            )}
                          </span>
                        
                        {/* Interactive Background Glow on Hover */}
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        
                        {/* Animated Shine Sweep */}
                        <motion.div 
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "200%" }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[35deg] pointer-events-none"
                        />

                      
                      {/* Reactive Border for Active User Button */}
                      {user && (
                        <div className="absolute inset-0 border border-white/20 rounded-xl group-hover/btn:border-white/60 group-hover/btn:scale-105 transition-all duration-300" />
                      )}
                    </motion.button>

                </motion.div>
              </CometCard>
            );
          })}
        </div>
      </div>
      
      <AnimatePresence>
        {isPopupOpen && (
          <RegistrationPopup 
            isOpen={isPopupOpen} 
            onClose={() => setIsPopupOpen(false)} 
            sport={selectedSport} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ChampionsSection() {
  const [activeYear, setActiveYear] = useState("2025");

  return (
    <section id="champions" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-orange-500 text-sm tracking-widest uppercase mb-4 block">
            Hall of Fame
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-4">
            GENERAL CHAMPIONSHIP
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Celebrating the top departments who dominated the overall championship standings
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-12">
          {["2025", "2024"].map((year) => (
            <motion.button
              key={year}
              onClick={() => setActiveYear(year)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-8 py-3 rounded-full font-display text-lg transition-all",
                activeYear === year
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                  : "bg-white/5 border border-white/20 text-white/70 hover:text-white hover:border-white/40"
              )}
            >
              {year}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeYear}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {GC_CHAMPIONS[activeYear].map((champion, i) => (
            <motion.div
              key={champion.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={cn(
                "group relative flex h-72 w-full flex-col justify-between overflow-hidden",
                "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-white",
                "cursor-default select-none"
              )}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                champion.position === "Winner" ? "from-yellow-500 to-amber-600" :
                champion.position === "Runner Up" ? "from-gray-300 to-gray-500" :
                "from-amber-600 to-orange-700"
              }`} />
              
              <div className="z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">
                    {champion.position === "Winner" ? "🥇" : champion.position === "Runner Up" ? "🥈" : "🥉"}
                  </span>
                  <span className={`text-xs font-semibold uppercase tracking-wider bg-gradient-to-r ${
                    champion.position === "Winner" ? "from-yellow-500 to-amber-600" :
                    champion.position === "Runner Up" ? "from-gray-300 to-gray-500" :
                    "from-amber-600 to-orange-700"
                  } bg-clip-text text-transparent`}>
                    {champion.position}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-2xl font-medium tracking-tight text-white">
                  {champion.name}
                </h3>
                <p className="max-w-[85%] text-sm text-white/60">
                  {champion.description}
                </p>
              </div>

              <div className="absolute bottom-0 right-0 h-40 w-40 translate-x-4 translate-y-4 transform">
                <img
                  src={champion.imageUrl}
                  alt={`${champion.name}`}
                  className="h-full w-full rounded-full object-cover opacity-60 transition-all duration-300 ease-out group-hover:scale-110 group-hover:opacity-80"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


function ScheduleSection() {
  return (
    <section id="schedule" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-500/10 blur-[120px] rounded-full" />
      </div> */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6"
            >
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="text-xs text-orange-400 tracking-[0.3em] font-bold uppercase">
                Stay Tuned
              </span>
            </motion.div>

              <h2 className="font-display text-4xl md:text-6xl text-white mb-6 uppercase tracking-tight">
                THE <span className="text-orange-500">BATTLE</span> PLAN
              </h2>
            
            <p className="text-white/40 text-lg uppercase tracking-[0.2em] font-medium">
              Coming Soon to Your Screen
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-transparent to-red-600/30 blur-3xl rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
          <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 md:p-16 overflow-hidden shadow-2xl">
              {/* Animated mesh background for card */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#f97316_0%,transparent_50%)]" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center space-y-10">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.3)]"
                >
                  <Trophy className="w-12 h-12 text-white" />
                </motion.div>
                
                <div className="space-y-6">
                  <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                    Schedule is dropping <span className="text-orange-500">really soon!</span>
                  </h3>
                  
                  <p className="text-white/50 text-base md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
                    We're locking in the times and picking the best spots for every match. Get your gear ready, the wait is almost over.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-3 pt-6">
                    {[
                      { icon: Zap, label: "Matches" },
                      { icon: MapPin, label: "Venues" },
                      { icon: Calendar, label: "Dates" }
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-white/70 font-bold uppercase tracking-wider">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <div className="flex items-center gap-3 text-orange-500/40 font-black text-sm tracking-[0.5em] uppercase">
                    <span className="animate-pulse">●</span>
                    <span>Team Parakram</span>
                    <span className="animate-pulse">●</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



function ContactSection() {
  const TEAM_MEMBERS = [
    { name: "Aniket Adhav", post: "Technical Head", phone: "+91 96573 25070" },
    { name: "Kartik Gaikwad", post: "Co-COORDINATOR", phone: "+91 70289 38880" },
    { name: "Pranav Kale", post: "President - DIT SPORTS CLUB", phone: "sportclub.dit@dypvp.edu.in" },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-orange-500 text-sm tracking-widest uppercase mb-4 block">
              Get In Touch
            </span>
            <h2 className="font-display text-4xl md:text-6xl text-white mb-4">
              CONTACT US
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Have questions? We&apos;re here to help. Reach out to our team for
              any queries regarding registration, events, or sponsorships.
            </p>
          </motion.div>

         <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3 
                gap-8 
                justify-items-center
              "
            >
              {TEAM_MEMBERS.map((member, i) => (
                <div
                  key={i}
                  className="
                    w-full 
                    max-w-xs
                    bg-white/5 
                    border 
                    border-white/10 
                    rounded-3xl 
                    p-8
                    min-h-[220px]
                    text-center 
                    group 
                    hover:border-orange-500/50 
                    transition-all 
                    flex 
                    flex-col 
                    items-center 
                    justify-center
                  "
                >
                  <Users className="w-10 h-10 text-orange-500 mb-5" />

                  <h3 className="font-semibold text-white mb-2 text-lg">
                    {member.name}
                  </h3>

                  <p className="text-orange-500/80 text-[11px] font-bold uppercase tracking-widest mb-3">
                    {member.post}
                  </p>

                  <p className="text-white/60 text-sm">
                    {member.phone}
                  </p>
                </div>
              ))}
            </motion.div>

        </div>
      </div>
    </section>
  );
}


import Image from "next/image";




function Footer() {
  const policyLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-8">

          {/* LOGO */}
          <div className="font-display text-2xl text-white tracking-wider">
            PARAKRAM
          </div>

          {/* NAV LINKS */}
          <nav className="flex flex-wrap justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* POLICIES */}
          <div className="w-full max-w-2xl border-t border-white/10 pt-6">
            <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
              {policyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/40 hover:text-orange-400 text-xs md:text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 🔥 FOLLOW SECTION */}
          <div className="flex flex-col items-center gap-5 pt-6">
            <p className="text-white/50 text-[11px] uppercase tracking-[0.4em] font-semibold">
              Follow Parakram
            </p>

            <div className="flex items-center gap-5">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/sports.club_dit?igsh=MW5lZmkzM3l5ZDU5aA=="
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  w-11 h-11
                  flex items-center justify-center
                  rounded-xl
                  bg-white/5
                  border border-white/10
                  transition-all
                  hover:border-pink-500/50
                  hover:bg-pink-500/10
                  hover:shadow-[0_0_20px_rgba(236,72,153,0.35)]
                "
              >
                <Image
                  src="/social/instagram.png"
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="
                    brightness-0 invert 
                    opacity-80 
                    group-hover:opacity-100
                  "
                />

              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/dit-sports-club?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAb21jcAPpkmJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAaeFvX8EEkdqEFezDXI8GQFtNGjBAgzNjI53BsO6B1MECH6Wm89XlRIYw2GC3A_aem_3eiAScWed2bPpPHHBcwjcQ"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  w-11 h-11
                  flex items-center justify-center
                  rounded-xl
                  bg-white/5
                  border border-white/10
                  transition-all
                  hover:border-blue-500/50
                  hover:bg-blue-500/10
                  hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]
                "
              >
                <Image
                  src="/social/linkedin.png"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  className="
                    brightness-0 invert 
                    opacity-80 
                    group-hover:opacity-100
                  "
                />
              </a>

              {/* WhatsApp */}
              <a
                href="https://chat.whatsapp.com/FHCyyrqAjuSDsM04n8RSQe"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  w-11 h-11
                  flex items-center justify-center
                  rounded-xl
                  bg-white/5
                  border border-white/10
                  transition-all
                  hover:border-emerald-500/50
                  hover:bg-emerald-500/10
                  hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]
                "
              >
               <Image
                  src="/social/whatsapp.png"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="
                    brightness-0 invert 
                    opacity-80 
                    group-hover:opacity-100
                  "
                />
              </a>
            </div>
          </div>


          {/* COPYRIGHT */}
          <p className="text-white/30 text-sm pt-2">
            © 2026 PARAKRAM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


function GlobalBackground() {
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
    </div>
  );
}



