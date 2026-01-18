"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import dynamic from "next/dynamic";
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
  AlertTriangle,
  Shirt,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ElegantShape } from "@/components/ui/shape-landing-hero";




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

const CHAMPIONS = [
  {
    name: "Thunder Hawks",
    sport: "Cricket",
    year: "2024",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop",
  },
  {
    name: "Storm Riders",
    sport: "Football",
    year: "2024",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop",
  },
  {
    name: "Phoenix Fire",
    sport: "Basketball",
    year: "2024",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
  },
  {
    name: "Velocity Vipers",
    sport: "Athletics",
    year: "2024",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=300&fit=crop",
  },
];

const SCHEDULE = [
  { day: "Day 1", date: "March 15", events: ["Opening Ceremony", "Cricket - Pool A", "Football - Pool A", "Chess - Round 1"] },
  { day: "Day 2", date: "March 16", events: ["Cricket - Pool B", "Basketball - Pool A", "Badminton Singles", "Athletics - Heats"] },
  { day: "Day 3", date: "March 17", events: ["Semi-Finals", "Table Tennis Finals", "Volleyball Finals", "Athletics - Finals"] },
  { day: "Day 4", date: "March 18", events: ["Grand Finals", "Prize Distribution", "Closing Ceremony"] },
];

function Header() {
  const { data: session } = useSession();
const user = session?.user;

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
  signOut({ callbackUrl: "/" });
};


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
          {user ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden md:block relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10"
              >
                <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                <span className="text-white text-sm">{user.name}</span>
                {user.jerseyVerified && <CheckCircle className="w-4 h-4 text-green-500" />}
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
                      href="/jersey-verification"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-white/70 hover:bg-white/5"
                    >
                      {user.jerseyVerified ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className="text-sm">
                        {user.jerseyVerified ? "Jersey Verified" : "Verify Jersey"}
                      </span>
                    </Link>

                    <Link
                      href="/register"
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
            <Link href="/login" className="hidden md:block shiny-cta-btn">
              Login
            </Link>
          )}

          {/* MOBILE MENU BUTTON */}
          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
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
    const eventDate = new Date("2025-03-15T09:00:00");

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
      }
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
              College Sports Fest 2025
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
            <a
              href="#sports"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:from-orange-600 hover:to-red-700 transition-all animate-glow-pulse text-lg"
            >
              Explore Sports
            </a>
            {user ? (
              <Link
                href="/register"
                className="px-8 py-4 bg-white/5 border border-white/20 text-white rounded-full font-semibold hover:bg-white/10 transition-all text-lg"
              >
                Register Now
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-8 py-4 bg-white/5 border border-white/20 text-white rounded-full font-semibold hover:bg-white/10 transition-all text-lg"
              >
                Login to Register
              </Link>
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

function JerseyOrderModal({ isOpen, onClose }) {


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



  const [showSizeChart, setShowSizeChart] = useState(false);
  const [activeSizeImg, setActiveSizeImg] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
const [secretCode, setSecretCode] = useState("");


  const sizeChartImages = [
    "https://res.cloudinary.com/djoqcej0n/image/upload/v1768666803/Screenshot_2026-01-17_214905_wwmn9w.png"
  ];



const { data: session } = useSession();
const user = session?.user;
  const [formData, setFormData] = useState({
    name: "",
    phoneno:"",
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


const handleSubmit = async (e) => {
  e.preventDefault();

  // 🔐 Login check
  if (!user) {
    toast.error("Please login to order jersey");
    return;
  }

  if (!formData.size) {
    toast.error("Please select jersey size");
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
  const saveRes = await fetch("/api/jersey/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user.id,
      name: formData.name,
      email: user.email,
      phone: formData.phoneno, // ✅ must be "phone"
      jerseyName: formData.jerseyName,
      jerseyNo: formData.jerseyNo,
      department: formData.department,
      size: formData.size,
      paymentId: response.razorpay_payment_id,
    }),
  });

  if (!saveRes.ok) {
    const err = await saveRes.json();
    toast.error(err.message || "Order failed");
    return;
  }

  const data = await saveRes.json();

  setSecretCode(data.secretCode);
  setShowSuccess(true);
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
    "Computer Science",
    "Electronics",
    "Mechanical",
    "Civil",
    "Electrical",
    "Information Technology",
    "Chemical",
    "Biotechnology",
    "Other",
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
        className="relative w-full max-w-md mx-auto bg-gradient-to-b from-zinc-900 to-black border border-white/10 rounded-3xl p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Shirt className="w-7 h-7 text-orange-500" />
          </div>
          <h2 className="font-display text-xl text-white mb-1">ORDER YOUR JERSEY</h2>
          <p className="text-white/50 text-xs">Fill in your details to get your official PARAKRAM jersey</p>
        </div>

       {showSuccess ? (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-6 space-y-4"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>

            <h3 className="text-xl text-white font-semibold">
              Jersey Ordered Successfully 🎉
            </h3>

            <p className="text-white/60 text-sm">
              This secret code will be required for game registration
            </p>

            {/* SECRET CODE BOX */}
            <div className="bg-black/40 border border-white/10 rounded-xl py-3 px-4 flex items-center justify-between max-w-xs mx-auto">
              <span className="text-orange-400 font-mono text-lg tracking-widest">
                {secretCode}
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(secretCode);
                  toast.success("Secret code copied");
                }}
                className="text-xs text-white/70 hover:text-white"
              >
                Copy
              </button>
            </div>

            <p className="text-xs text-white/40">
              ⚠️ Save this code carefully. Do not share it.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-6 py-2 rounded-full bg-orange-500 text-white text-sm hover:bg-orange-600 transition"
            >
              Go to Home
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  value={formData.phoneno}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneno: e.target.value })
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
                  max="99"
                  value={formData.jerseyNo}
                  onChange={(e) => setFormData({ ...formData, jerseyNo: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                  placeholder="0-99"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/70 text-xs mb-1">Department</label>
              <select
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500/50 transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="bg-zinc-900">Select your department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept} className="bg-zinc-900">{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white/70 text-xs mb-2">Size</label>
              <div className="grid grid-cols-7 gap-1.5">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setFormData({ ...formData, size })}
                    className={`py-2 rounded-lg text-xs font-medium transition-all ${
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
              type="submit"
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
                    Submit Order - ₹799
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

function GetJerseySection() {
  const [modalOpen, setModalOpen] = useState(false);
const router = useRouter();

const { data: session } = useSession();
const user = session?.user;

  return (
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
              Represent your team with pride. Order your official PARAKRAM 2025 jersey now and be part of the legacy.
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

      <JerseyOrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
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
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=500&fit=crop"
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
  return (
    <section id="champions" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 text-sm tracking-widest uppercase mb-4 block">
            Hall of Fame
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-4">
            DEFENDING CHAMPIONS
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            The titans who conquered last year. Can they defend their crowns,
            or will new challengers rise?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHAMPIONS.map((champion, i) => (
            <motion.div
              key={champion.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={champion.image}
                alt={champion.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute top-4 right-4">
                <div className="px-3 py-1 bg-orange-500 rounded-full text-white text-xs font-medium">
                  {champion.year}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
                <h3 className="font-display text-xl text-white mb-1">
                  {champion.name}
                </h3>
                <p className="text-white/60 text-sm">{champion.sport}</p>
              </div>
            </motion.div>
          ))}
        </div>
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
              <p className="text-white/50 text-sm">March 15-18, 2025</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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
          <p className="text-white/30 text-sm">
            © 2025 PARAKRAM. All rights reserved.
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

export default function Home() {
  return (
    <main className="min-h-screen relative">
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

