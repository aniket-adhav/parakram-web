"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
// import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ButtonLoader } from "@/components/ui/ButtonLoader";


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
  User,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  AlertTriangle,
  Shirt,
  Shield,
  Copy,
} from "lucide-react";



import { cn } from "@/lib/utils";
import { ElegantShape } from "@/components/ui/shape-landing-hero";




import { Suspense } from "react";
import LoginSuccessToast from "@/components/LoginSuccessToast";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Suspense fallback={null}>
        <LoginSuccessToast />
      </Suspense>

      <GlobalBackground />
      <Header />
      <HeroSection />
      <JerseyBanner />
      <GetJerseySection />
      <AboutSection />
      <SportsSection />
      <ChampionsSection />
      <ScheduleSection />
      <ContactSection />
      <Footer />
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
  { name: "Cricket", teamSize: "11 Players", category: "Team Sport", icon: "🏏" },
  { name: "Football", teamSize: "11 Players", category: "Team Sport", icon: "⚽" },
  { name: "Basketball", teamSize: "5 Players", category: "Team Sport", icon: "🏀" },
  { name: "Volleyball", teamSize: "6 Players", category: "Team Sport", icon: "🏐" },
  { name: "Badminton", teamSize: "1-2 Players", category: "Individual", icon: "🏸" },
  { name: "Table Tennis", teamSize: "1-2 Players", category: "Individual", icon: "🏓" },
  { name: "Athletics", teamSize: "Individual", category: "Track & Field", icon: "🏃" },
  { name: "Chess", teamSize: "Individual", category: "Mind Sport", icon: "♟️" },
];

const GC_CHAMPIONS = {
  2025: [
    {
      position: "Winner",
      name: "AI&DS COMRADES",
      description: "Dominated with 12 gold medals across all sports categories",
      imageUrl: "https://res.cloudinary.com/djoqcej0n/image/upload/v1768922243/AI_DS_COMRADES_wqrupu.jpg",
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
      description: "Excellent showing in cricket and volleyball finals",
      imageUrl: "https://res.cloudinary.com/djoqcej0n/image/upload/v1768922243/Rudrashakti_Mechanical_xusziz.jpg",
    },
  ],
  2024: [
    {
      position: "Winner",
      name: "Thunder Hawks",
      description: "Historic victory with record-breaking medal tally",
      imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop",
    },
    {
      position: "Runner Up",
      name: "Storm Riders",
      description: "Fierce competitors in basketball and football",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    },
    {
      position: "3rd Place",
      name: "Phoenix Fire",
      description: "Memorable performances in individual sports",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
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
  const { data: session } = useSession();
  const user = session?.user;
  const toast = useAppToast()
 // const params = useSearchParams();
   const router = useRouter();
   
const loginToastShown = useRef(false);


  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


const isLoading = false; // or your state

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
                      href="/login"
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
                  window.location.href = "/login";
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


function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 40,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 🔥 40 days in milliseconds
    let remainingTime = 40 * 24 * 60 * 60 * 1000;

    const updateTimer = () => {
      if (remainingTime <= 0) return;

      remainingTime -= 1000;

      setTimeLeft({
        days: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
        hours: Math.floor((remainingTime / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((remainingTime / (1000 * 60)) % 60),
        seconds: Math.floor((remainingTime / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  if (!mounted) {
    return (
      <div className="flex gap-3 md:gap-6">
        {timeUnits.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center">
              <span className="font-display text-2xl md:text-4xl text-white">--</span>
            </div>
            <span className="text-xs md:text-sm text-white/50 mt-2 uppercase tracking-wider">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3 md:gap-6">
      {timeUnits.map((unit, i) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + i * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center">
            <span className="font-display text-2xl md:text-4xl text-white">
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs md:text-sm text-white/50 mt-2 uppercase tracking-wider">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
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
            <h1 className="font-display text-6xl sm:text-8xl md:text-[10rem] leading-none tracking-tight mb-4">
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
                    onClick={() => handleButtonClick("/register", "heroRegister")}
                    disabled={buttonLoading === "heroRegister"}
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
                      {buttonLoading === "heroRegister" && <ButtonLoader className="w-5 h-5" />}
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        ⚡
                      </motion.span>
                      Register Now
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
              <span className="text-green-400">✓ Your jersey is verified</span>
            ) : (
              <Link href="/jersey-verification" className="text-yellow-400 hover:underline">
                Click here to verify your jersey
              </Link>
            )
          ) : (
            "Verified jerseys required for all participants"
          )}
        </p>
      </div>
    </motion.div>
  );
}

import { toast } from "sonner";
import { useAppToast } from "@/lib/useAppToast";



const Row = ({ label, value, highlight = false }) => (
    <div className="flex justify-between items-center py-2 border-b border-white/5">
      <span className="text-white/50 text-xs">{label}</span>
      <span
        className={`text-sm font-medium ${
          highlight ? "text-orange-400 font-bold" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );



function JerseyOrderModal({ isOpen, onClose, onOrderSuccess })
 {

  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const toast = useAppToast();

  useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [isOpen]);


const [showConfirmation, setShowConfirmation] = useState(false);

const handleBackToEdit = () => {
  setShowConfirmation(false);
};






  const [showSizeChart, setShowSizeChart] = useState(false);
  const [activeSizeImg, setActiveSizeImg] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
const [secretCode, setSecretCode] = useState("");


  const sizeChartImages = [
    "https://res.cloudinary.com/djoqcej0n/image/upload/v1768666803/Screenshot_2026-01-17_214905_wwmn9w.png"
  ];


  const [formData, setFormData] = useState({
    name: "",
    phone:"",
    jerseyName: "",
    jerseyNo: "",
    department: "",
    size: "",
  });
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [modalOpen, setModalOpen] = useState(false);
  const [hasOrdered, setHasOrdered] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  // ✅ ADD THESE LINES 👇👇👇
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (!orderDetails?.secretCode) return;

    navigator.clipboard.writeText(orderDetails.secretCode);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };




// 🔙 Go back to edit form
const handleConfirmOrder = () => {
  setSubmitting(true);
  handleSubmit(); // just trigger Razorpay
};






const handleSubmit = async (e) => {
  e?.preventDefault(); // ✅ safe optional chaining

  // rest of your logic stays SAME

  // 🔐 Login check




  if (!user) {
    toast.show({
      title: "Login Required",
      message: "Please login to order jersey",
      variant: "warning",
    });

    return;
  }

  if (!formData.size) {
    toast.show({
      title: "Size Required",
      message: "Please select jersey size",
      variant: "warning",
    });

    return;
  }

  try {
    setSubmitting(true);

    // 1️⃣ Create Razorpay order
    const res = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 799 }),
    });

    const order = await res.json();

    // 2️⃣ Razorpay options
    const options = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  amount: order.amount,
  currency: "INR",
  name: "PARAKRAM",
  description: "Official Jersey Order",
  order_id: order.id,

  handler: async function (response) {
  try {
    setPaymentProcessing(true); // 🔥 SHOW LOADER

    const saveRes = await fetch("/api/jersey/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        name: formData.name,
        email: user.email,
        phone: formData.phone,
        jerseyName: formData.jerseyName,
        jerseyNo: formData.jerseyNo,
        department: formData.department,
        size: formData.size,
        paymentId: response.razorpay_payment_id,
      }),
    });

      const data = await saveRes.json();

      if (!saveRes.ok) {
        toast.error(data.message || "Order failed");
        setPaymentProcessing(false);
        return;
      }

      // ✅ SUCCESS
      setPaymentProcessing(true);

      setSecretCode(data.secretCode);
      setShowSuccess(true);
      setPaymentProcessing(false);
      toast.show({
        title: "Payment Successful",
        message: "Your jersey order has been placed",
        variant: "success",
      });


      // await signIn("credentials", { redirect: false }); 


    } catch (err) {
      setPaymentProcessing(false);
      toast.show({
          title: "Payment Failed",
          message: "Transaction was not completed. Please try again.",
          variant: "error",
        });

    }
  },


  prefill: {
    name: user.name,
    email: user.email,
  },

  theme: {
    color: "#f97316",
  },
};


    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    toast.error("Payment failed. Try again.");
  } finally {
    setSubmitting(false);
  }
};






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

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];


  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`
            relative
            w-[94%] sm:w-full
            max-w-md mx-auto
            bg-gradient-to-b from-zinc-900 to-black
            border border-white/10
            rounded-3xl
            p-4 sm:p-6
            max-h-[88vh] md:max-h-[90vh]
            ${showSuccess ? "overflow-hidden" : "overflow-y-auto"}
          `}

      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

       {paymentProcessing ? (

        /* ================= LOADER ================= */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-10"
        >
          <div className="w-14 h-14 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mb-4" />
          <p className="text-white/70 text-sm text-center">
            Confirming payment & placing your order...
          </p>
          <p className="text-white/40 text-xs mt-1">
            Please don’t close this window
          </p>
        </motion.div>

      ) : showSuccess ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-4 flex flex-col"
          >
            <div className="pr-2">
              {/* ICON */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>

              {/* TITLE */}
              <div className="text-center mb-4">
                <h3 className="font-display text-xl text-white mb-1">
                  ORDER SUCCESSFUL 🎉
                </h3>
                <p className="text-white/60 text-xs">
                  Your jersey order has been placed successfully
                </p>
              </div>

              {/* SECRET CODE */}
              <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4 mb-4"
                >
                  <p className="text-orange-400 text-xs uppercase tracking-wider mb-2 text-center">
                    Your Secret Code
                  </p>

                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="flex flex-wrap justify-center gap-1 max-w-full"
                    >
                      {secretCode.split("").map((digit, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 20, rotateX: -90 }}
                          animate={{ opacity: 1, y: 0, rotateX: 0 }}
                          transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                          className="
                                          w-7 h-9 sm:w-8 sm:h-10
                                          bg-black/50 border border-orange-500/50
                                          rounded-lg flex items-center justify-center
                                          font-mono text-base sm:text-xl
                                          text-white font-bold
                                        "
                            >
                          {digit}
                        </motion.span>
                      ))}
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      onClick={handleCopyCode}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 rounded-lg transition-all ${
                        copied
                          ? "bg-green-500/20 text-green-400"
                          : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20"
                      }`}
                    >
                      {copied ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      )}
                    </motion.button>
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-white/40 text-xs text-center mt-2"
                  >
                    Save this code & Don't share with anyone! You will need it for games registration & jersey collection.
                  </motion.p>
                </motion.div>


              {/* INFO BOX */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-3 text-left">
                <p className="text-yellow-400 text-xs font-medium mb-1">
                  Important Note
                </p>
                <p className="text-yellow-400/70 text-xs">
                  Your departmental coordinator will contact you regarding jersey
                  distribution.
                </p>
              </div>

              {/* ORDER DETAILS */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-white/40">Jersey:</span>
                    <span className="text-white/70 ml-1">
                      {formData.jerseyName} #{formData.jerseyNo}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40">Size:</span>
                    <span className="text-white/70 ml-1">{formData.size}</span>
                  </div>
                  <div>
                    <span className="text-white/40">Department:</span>
                    <span className="text-white/70 ml-1">
                      {formData.department}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40">Status:</span>
                    <span className="text-green-400 ml-1">Confirmed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* GO HOME */}
            <button
              type="button"
              onClick={()=>{
                 onOrderSuccess({
                    jerseyName: formData.jerseyName,
                    jerseyNo: formData.jerseyNo,
                    size: formData.size,
                    department: formData.department,
                    secretCode: secretCode,
                  });
                  onClose();
              }}
              className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-sm hover:opacity-90 transition"
            >
              Go to Home
            </button>
          </motion.div>
        ) : showConfirmation ?(
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col"
                  >
                    {/* HEADER */}
                    <div className="text-center mb-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2"
                      >
                        <AlertTriangle className="w-6 h-6 text-yellow-500" />
                      </motion.div>
                      <h3 className="font-display text-lg text-white mb-1">
                        CONFIRM YOUR ORDER
                      </h3>
                      <p className="text-white/50 text-xs">
                        Please verify your details before payment
                      </p>
                    </div>

                    {/* WARNING */}
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-2.5 mb-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <p className="text-red-400 text-xs">
                          <strong>No changes allowed after order!</strong>
                        </p>
                      </div>
                    </div>

                    {/* DETAILS */}
                    <div className="overflow-y-auto max-h-[35vh] pr-1 mb-3 custom-scrollbar scroll-smooth">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <h4 className="text-white/40 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                          <User className="w-3 h-3" />
                          Your Order Details
                        </h4>

                        <div className="space-y-2">
                          <Row label="Full Name" value={formData.name} />
                          <Row label="Phone No" value={formData.phone} />
                          <Row label="Jersey Name" value={formData.jerseyName.toUpperCase()} highlight />
                          <Row label="Jersey Number" value={`#${formData.jerseyNo}`} highlight />
                          <Row label="Department" value={formData.department} />
                          <div className="flex justify-between items-center py-2">
                            <span className="text-white/50 text-xs">Size</span>
                            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-full">
                              {formData.size}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-3 mb-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-white/50 text-xs">Total Amount</p>
                          <p className="text-white text-xl font-bold">₹799</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/50 text-xs">Payment</p>
                          <p className="text-green-400 text-sm font-medium">Online</p>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3">
                      <button
                        onClick={handleBackToEdit}
                        className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-sm
                                  flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Edit Details
                      </button>


                      <button
                        type="button"
                        onClick={handleConfirmOrder}
                        disabled={submitting}
                        className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-600 
                                  text-white rounded-xl font-semibold text-sm
                                  disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Confirm & Pay
                          </span>
                        )}
                      </button>

                    </div>
                  </motion.div>
                ):(
          <>
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shirt className="w-7 h-7 text-orange-500" />
            </div>
            <h2 className="font-display text-xl text-white mb-1">
              ORDER YOUR JERSEY
            </h2>
            <p className="text-white/50 text-xs">
              Fill in your details to get your official PARAKRAM jersey
            </p>
          </div>


          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-white/70 text-xs mb-1">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                placeholder="Enter your full name"
              />
            </div>


            <div>
                <label className="block text-white/70 text-xs mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                  placeholder="Enter phone number"
                />
              </div>


            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/70 text-xs mb-1">Jersey Name</label>
                <input
                  type="text"
                  required
                  value={formData.jerseyName}
                  onChange={(e) => setFormData({ ...formData, jerseyName: e.target.value.toUpperCase() })}
                  maxLength={12}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors uppercase"
                  placeholder="MAX 12 CHARS"
                />
              </div>
              <div>
                <label className="block text-white/70 text-xs mb-1">Jersey No.</label>
                <input
                  type="number"
                  required
                  min="0"
                  max="999"
                  value={formData.jerseyNo}
                  onChange={(e) => setFormData({ ...formData, jerseyNo: e.target.value })}
                 className="w-full px-3 py-2 md:py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                  placeholder="0-999"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/70 text-xs mb-1">Department</label>
              <select
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
               className="w-full px-3 py-2 md:py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
              >
                <option value="" className="bg-zinc-900">Select your department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept} className="bg-zinc-900">{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white/70 text-xs mb-2">Size</label>
              <div className="grid grid-cols-7 gap-1 md:gap-1.5">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setFormData({ ...formData, size })}
                    className={`py-py-1.5 md:py-2 rounded-lg text-xs font-medium transition-all ${
                      formData.size === size
                        ? "bg-orange-500 text-white"
                        : "bg-white/5 border border-white/10 text-white/70 hover:border-orange-500/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <p
              onClick={() => setShowSizeChart(true)}
              className="mt-2 text-xs text-orange-400 text-center cursor-pointer hover:underline"
            >
              View Size Chart
            </p>
                {showSizeChart && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center px-4"
            >
              <button
                onClick={() => setShowSizeChart(false)}
                className="absolute top-6 right-6 text-white/60 hover:text-white text-xl"
              >
                ✕
              </button>

              <div className="relative w-full max-w-md">
                <img
                  src={sizeChartImages[activeSizeImg]}
                  alt="Size Chart"
                  className="w-full rounded-xl object-contain"
                />

                {activeSizeImg > 0 && (
                  <button
                    onClick={() => setActiveSizeImg(activeSizeImg - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full px-3 py-1"
                  >
                    ‹
                  </button>
                )}

                {activeSizeImg < sizeChartImages.length - 1 && (
                  <button
                    onClick={() => setActiveSizeImg(activeSizeImg + 1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full px-3 py-1"
                  >
                    ›
                  </button>
                )}
              </div>
            </motion.div>
          )}



            <motion.button
                type="button"
                onClick={() => setShowConfirmation(true)}
                disabled={submitting || !formData.size}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                <span className="relative flex items-center justify-center gap-2 text-sm">
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shirt className="w-4 h-4" />
                      Review Order
                    </>
                  )}
                </span>
              </motion.button>

          </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}


function GetJerseySection() {


  const [formData, setFormData] = useState({
    name: "",
    phone:"",
    jerseyName: "",
    jerseyNo: "",
    department: "",
    size: "",
  });


  const router = useRouter();

  // ✅ MOVE THESE TO TOP
  const { data: session } = useSession();
  const user = session?.user;

  const [orderStatus, setOrderStatus] = useState("loading");
  const [orderDetails, setOrderDetails] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);



const hasCheckedRef = useRef(false);

useEffect(() => {
  // reset when user changes
  hasCheckedRef.current = false;
  setOrderStatus("loading");
  setOrderDetails(null);
}, [user?.email]);



useEffect(() => {
  if (!user?.email) return;
  if (hasCheckedRef.current) return;

  hasCheckedRef.current = true;

  const checkJerseyStatus = async () => {
    try {
      setOrderStatus("loading");

      const res = await fetch(`/api/jersey/status?email=${user.email}`);
      const data = await res.json();

      if (data.ordered) {
        setOrderDetails(data.orderDetails);
        setOrderStatus("ordered");
      } else {
        setOrderStatus("not_ordered");
      }
    } catch (err) {
      console.error(err);
      setOrderStatus("not_ordered");
    }
  };

  checkJerseyStatus();
}, [user?.email]);




useEffect(() => {
  if (!modalOpen) return;

  sessionStorage.setItem(
    "jersey_form",
    JSON.stringify(formData)
  );
}, [formData, modalOpen]);


useEffect(() => {
  if (orderStatus !== "not_ordered") return;

  const saved = sessionStorage.getItem("jersey_form");
  if (saved) {
    setFormData(JSON.parse(saved));
  }
}, [orderStatus]);



const handleOrderSuccess = (details) => {
  setOrderDetails(details);
  setOrderStatus("ordered");
  setModalOpen(false);
  sessionStorage.removeItem("jersey_form");
};



  const handleCopyCode = () => {
    if (!orderDetails?.secretCode) return;

    navigator.clipboard.writeText(orderDetails.secretCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ⏳ Optional loader




  return (
  <>
       {/* 🔄 LOADER (AFTER LOGIN, BEFORE STATUS KNOWN) */}
      {orderStatus === "loading" && (
          <section className="py-20 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            <p className="text-orange-400 text-sm tracking-wide">
              Checking jersey status...
            </p>
          </section>
        )}





       {/* ✅ ORDERED SECTION */}
      {orderStatus === "ordered" && (
        <section id="jersey" className="py-16 relative">
          

          <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10
                      border border-green-500/20 rounded-3xl p-8 md:p-12
                      text-center relative overflow-hidden"
          >
            {/* BACKGROUND PATTERN */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M30%200L60%2030L30%2060L0%2030Z%22%20fill%3D%22rgba(255%2C255%2C255%2C0.02)%22%2F%3E%3C%2Fsvg%3E')]" />

            {/* SUCCESS ICON */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
              className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600
                        rounded-full flex items-center justify-center mx-auto mb-6
                        shadow-lg shadow-green-500/30"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>

            {/* TITLE */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-3xl md:text-5xl text-white mb-4"
            >
              JERSEY ORDERED SUCCESSFULLY!
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-white/60 text-lg mb-6">
                Your warrior gear is on its way. Get ready to represent your department with pride!
              </p>

              {/* SECRET CODE CARD */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="bg-gradient-to-br from-orange-500/20 to-red-600/20
                          border border-orange-500/30 rounded-2xl p-6 mb-8
                          relative overflow-hidden max-w-md mx-auto"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
                />

                <div className="flex items-center justify-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-orange-400" />
                  <span className="text-orange-400 font-semibold text-sm uppercase tracking-wide">
                    Your Secret Code
                  </span>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="
                      flex items-center justify-center
                      gap-1 sm:gap-2
                      flex-nowrap
                      max-w-full
                    "
                  >
                    {/* CODE BLOCKS */}
                    <div className="flex items-center gap-[2px] sm:gap-1 md:gap-2 flex-nowrap">
                      {orderDetails?.secretCode?.split("").map((char, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                          className="
                            /* MOBILE */
                            w-5 h-7 text-xs
                            /* SMALL */
                            sm:w-7 sm:h-9 sm:text-base
                            /* DESKTOP (UNCHANGED) */
                            md:w-10 md:h-12 md:text-2xl

                            bg-black/50 border border-orange-500/50
                            rounded-md md:rounded-lg
                            flex items-center justify-center
                            font-mono text-white font-bold
                            shrink-0
                          "
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>

                    {/* COPY BUTTON */}
                    <button
                      onClick={handleCopyCode}
                      className="
                        p-1 sm:p-1.5 md:p-2
                        bg-white/10 rounded-md md:rounded-lg
                        hover:bg-white/20 transition
                        shrink-0
                      "
                    >
                      {copied ? (
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-400" />
                      ) : (
                        <Copy className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white/60" />
                      )}
                    </button>
                  </motion.div>



                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7 }}
                  className="text-white/40 text-xs mt-4"
                >
                  Save this code & Don't share with anyone! You will need it for games registration & jersey collection.
                </motion.p>
              </motion.div>

              {/* TAGS */}
              <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  🏆 <span className="text-white/70 text-sm">Champion in the making</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  ⚡ <span className="text-white/70 text-sm">Ready to compete</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  🔥 <span className="text-white/70 text-sm">Unleash the warrior</span>
                </div>
              </div>

              {/* INFO */}
              <div className="bg-black/30 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-3">
                  You're All Set!
                </p>
                <p className="text-white/80 text-lg md:text-xl font-light">
                  Your jersey will be ready for pickup soon. Keep an eye on announcements for collection details.
                </p>
                <p className="text-orange-400 text-sm mt-3">See you on the field! 🏅</p>
              </div>

              {/* STATUS */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-5 h-5" /> Order Confirmed
                </div>
                <div className="flex items-center gap-2 text-white/50">
                  <Shirt className="w-5 h-5" /> Processing
                </div>
                <div className="flex items-center gap-2 text-white/50">
                  <Trophy className="w-5 h-5" /> Ready for Glory
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>


        </section>
      )}



      {/* 🛒 NOT ORDERED SECTION */}
      {orderStatus === "not_ordered" && (
        <>
          <section id="jersey" className="py-16 relative">
           
           
            <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 border border-orange-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M30%200L60%2030L30%2060L0%2030Z%22%20fill%3D%22rgba(255%2C255%2C255%2C0.02)%22%2F%3E%3C%2Fsvg%3E')]" />
              
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-12"
              >
                <Shirt className="w-10 h-10 text-white -rotate-12" />
              </motion.div>
              
              <h2 className="font-display text-3xl md:text-5xl text-white mb-4 relative">
                GET YOUR OFFICIAL JERSEY
              </h2>
              <p className="text-white/50 max-w-xl mx-auto mb-8 relative">
                Represent your team with pride. Order your official PARAKRAM 2026 jersey now and be part of the legacy.
              </p>
              
              <motion.button
                onClick={() => {
                        if (!user) {
                          toast.error("Please login to order jersey");
                          router.push("/login");
                          return;
                        }
                        setModalOpen(true);
                  }}

                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold text-lg relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-3">
                  <Shirt className="w-5 h-5" />
                  Order Now - ₹799
                </span>
              </motion.button>
            </motion.div>
          </div>



          </section>

          <JerseyOrderModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onOrderSuccess={handleOrderSuccess}
          />
        </>
      )}
  </>
  );
}


function AboutSection() {
  const stats = [
    { icon: Users, value: "2000+", label: "Athletes" },
    { icon: Trophy, value: "8", label: "Sports" },
    { icon: Calendar, value: "4", label: "Days" },
    { icon: Medal, value: "50+", label: "Medals" },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-orange-500 text-sm tracking-widest uppercase mb-4 block">
            About The Event
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-6">
            THE SPIRIT OF COMPETITION
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            PARAKRAM is more than just a sports fest—it&apos;s a celebration of
            athletic excellence, teamwork, and the undying spirit of competition.
            Join us as colleges from across the region battle for glory on the
            grandest stage of inter-college sports.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center group hover:bg-white/10 transition-all"
            >
              <stat.icon className="w-8 h-8 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="font-display text-3xl md:text-4xl text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative rounded-3xl overflow-hidden"
        >
          <img
            src="https://res.cloudinary.com/djoqcej0n/image/upload/v1768921780/pic_qdgbky.jpg"
            alt="Sports Arena"
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
              Where Champions Are Made
            </h3>
            <p className="text-white/60">
              State-of-the-art facilities across multiple venues
            </p>
          </div>
        </motion.div>

           <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 relative rounded-3xl overflow-hidden"
          >
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/c2219a10-407e-4854-b421-aa549fc1e840/tug-of-war-resized-1768923878416.jpg?width=8000&height=8000&resize=contain"
              alt="Tug of War Battle"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-right">
              <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
                United We Pull, Together We Conquer
              </h3>
              <p className="text-white/60">
                Raw strength, unbreakable bonds, and the roar of victory
              </p>
            </div>
          </motion.div>

      </div>
    </section>
  );
}

function SportsSection() {
 
  const { data: session } = useSession();
const user = session?.user;


  const getButtonText = (sportName) => {
    if (!user) return "Login to Register";
    if (user.registeredSports?.includes(sportName)) return "Registered ✓";
    if (!user.jerseyVerified) return "Verify Jersey First";
    return "Register Now";
  };

  const getButtonLink = (sportName) => {
    if (!user) return "/login";
    if (user.registeredSports?.includes(sportName)) return "/register";
    if (!user.jerseyVerified) return "/jersey-verification";
    return "/register";
  };

  return (
    <section id="sports" className="py-24 relative">
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
          <h2 className="font-display text-4xl md:text-6xl text-white mb-4">
            SPORTS SHOWCASE
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Choose your arena. From team sports to individual competitions,
            find your calling and register to compete.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPORTS.map((sport, i) => {
            const isRegistered = user?.registeredSports?.includes(sport.name);
            return (
              <motion.div
                key={sport.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group bg-gradient-to-b from-white/10 to-white/5 border rounded-2xl p-6 transition-all cursor-pointer ${
                  isRegistered ? "border-green-500/50" : "border-white/10 hover:border-orange-500/50"
                }`}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {sport.icon}
                </div>
                <h3 className="font-display text-2xl text-white mb-2">
                  {sport.name}
                </h3>
                <div className="flex flex-col gap-1 text-sm text-white/50 mb-4">
                  <span>{sport.teamSize}</span>
                  <span className="text-orange-400">{sport.category}</span>
                </div>
                <Link
                  href={getButtonLink(sport.name)}
                  className={`block w-full py-2.5 rounded-lg text-sm text-center transition-all ${
                    isRegistered
                      ? "bg-green-500/20 border border-green-500/30 text-green-400"
                      : "bg-white/5 border border-white/20 text-white hover:bg-orange-500 hover:border-orange-500"
                  }`}
                >
                  {getButtonText(sport.name)}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
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
    <section id="schedule" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 text-sm tracking-widest uppercase mb-4 block">
            Timeline
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-4">
            EVENT SCHEDULE
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Four days of non-stop action. Plan your visit and don&apos;t miss
            your favorite events.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SCHEDULE.map((day, i) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-orange-500/50 transition-all"
            >
              <div className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-4">
                <div className="font-display text-2xl text-white">{day.day}</div>
                <div className="text-white/80 text-sm">{day.date}</div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {day.events.map((event, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Zap className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-white/70 text-sm">{event}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
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
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center group hover:border-orange-500/50 transition-all">
              <Mail className="w-8 h-8 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Email Us</h3>
              <p className="text-white/50 text-sm">parakram@college.edu</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center group hover:border-orange-500/50 transition-all">
              <Target className="w-8 h-8 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Event Venue</h3>
              <p className="text-white/50 text-sm">Main Sports Complex</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center group hover:border-orange-500/50 transition-all">
              <Calendar className="w-8 h-8 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold text-white mb-2">Event Dates</h3>
              <p className="text-white/50 text-sm">March 15-18, 2026</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const policyLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-8">
          <div className="font-display text-2xl text-white tracking-wider">
            PARAKRAM
          </div>
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
          <p className="text-white/30 text-sm">
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



