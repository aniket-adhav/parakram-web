"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Shirt, QrCode, Upload, CheckCircle, AlertTriangle, 
  ArrowLeft, ArrowRight, Shield, Copy, Clock, Mail, Info, FileText,
  User, Phone, MapPin, Check, Zap
} from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";


const DEPARTMENTS = [
  "First Year (All Departments)",
  "Computer",
  "AIDS",
  "Electrical",
  "Civil",
  "Mechanical",
  "ENTC",
  "STR",
  "A&R",
  "INSTRU",
  "IT",
];





const DEPARTMENT_QRS = [
  { name: "Computer", upi: "avisabale7230-1@okaxis", qr: "/qr/Comp.jpeg" },
  { name: "AIDS", upi: "vaishnavibabar0918-2@okaxis", qr: "/qr/AIDS.jpeg" },
  { name: "Electrical", upi: "nikhilmutha890@okaxis", qr: "/qr/Electrical.jpeg" },
  { name: "Civil", upi: "gaikwadshivam2004@oksbi", qr: "/qr/Civil.jpeg" },
  { name: "Mechanical", upi: "yashkudale12-2@okhdfcbank", qr: "/qr/Mech.jpeg" },
  { name: "ENTC", upi: "sainathkalkekar863@okaxis", qr: "/qr/Entc.jpeg" },
  { name: "FE", upi: "thoratpranav0307@okhdfcbank", qr: "/qr/FE.jpeg" },
  { name: "STR", upi: "gaikwadkartik131-4@oksbi", qr: "/qr/STR.jpeg" },
  { name: "A&R", upi: "idrup04@oksbi", qr: "/qr/A&R.jpeg" },
  { name: "INSTRU", upi: "kanchanpotghan2003@okicici", qr: "/qr/Instru.jpeg" },
  { name: "IT", upi: "rsc171224@okicici", qr: "/qr/IT.jpeg" },
];



const SIZES = ["S", "M", "L", "XL", "XXL", "3XL","4XL"];

export default function JerseyOrderFlow({ isOpen, onClose, onComplete }) {
  const { data: session, status } = useSession();
const user = session?.user;
const isSessionLoading = status === "loading";
if (isSessionLoading) return null;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
   const [showSizeChart, setShowSizeChart] = useState(false);
   const [copied, setCopied] = useState(false);
const [utrTouched, setUtrTouched] = useState(false);

  const SIZE_CHART_IMAGE = "https://res.cloudinary.com/djoqcej0n/image/upload/v1769704516/sizechart_gren2l.jpg";


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    jerseyName: "",
    jerseyNo: "",
    department: "",
    collar: "",
    size: "",
    utrNo: "",
  });
  const [screenshot, setScreenshot] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
  if (user) {
    setFormData((prev) => ({
      ...prev,
      name: user.name || "",
      // phone: "", // keep manual unless you store it
    }));
  }
}, [user]);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
      setPreview(URL.createObjectURL(file));
    }
  };

const handleSubmit = async () => {
  if (!user) return toast.error("Please login first");

  // ✅ exact 12-digit UTR validation
  if (!formData.utrNo || formData.utrNo.length !== 12) {
    return toast.error("Enter a valid 12-digit UTR number");
  }

  if (!screenshot) {
    return toast.error("Upload payment screenshot");
  }

  setLoading(true);

  try {
    const form = new FormData();

    form.append("email", user.email);
    form.append("name", formData.name);
    form.append("phone", formData.phone);
    form.append("jerseyName", formData.jerseyName);
    form.append("jerseyNo", String(formData.jerseyNo)); // ✅ ensure string
    form.append("department", formData.department);
    form.append("size", formData.size);
    form.append("collar", formData.collar);
    form.append("utrNo", formData.utrNo);
    form.append("screenshot", screenshot);

    const res = await fetch("/api/jersey/create", {
      method: "POST",
      body: form, // ✅ multipart
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || "Order failed");
    }

    toast.success("Payment submitted for verification");
    if (onComplete) await onComplete();
    setStep(5);
  } catch (err) {
    console.error(err);

    const message = err?.message?.toLowerCase() || "";

    if (message.includes("utr")) {
      toast.error("This UTR is already used. Please make a new payment.");
    } else if (message.includes("already ordered")) {
      toast.error("You already have a pending or approved order.");
    } else {
      toast.error("Submission failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};
  const selectedPayment = DEPARTMENT_QRS.find(
    (d) => d.name === formData.department
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
      className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-[2.5rem] overflow-hidden relative shadow-[0_0_100px_rgba(249,115,22,0.1)]"
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <div 
            key={s} 
            className={cn(
              "flex-1 h-full transition-all duration-700 ease-out",
              step >= s ? "bg-gradient-to-r from-orange-500 to-red-600" : "bg-transparent"
            )}
          />
        ))}
      </div>

      <button 
        onClick={onClose}
        className="absolute top-5 right-5 p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all z-10 group"
      >
        <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
      </button>

      <div className="p-4 md:p-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="space-y-1">
                <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20">
                  <Shirt className="w-5 h-5 text-orange-500" />
                </div>
                <h2 className="font-display text-2xl text-white tracking-tight">ARMOR SETUP</h2>
                <p className="text-white/40 text-[10px] font-medium">Configure your custom battle-ready gear.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Full Name</label>
                    <input 
                      className="
                        w-full bg-white/5 border border-white/10
                        rounded-xl px-4 py-3 text-sm
                        text-white focus:outline-none focus:border-orange-500/50
                        transition-all placeholder:text-white/10 font-medium
                      "
                      placeholder="Name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />

                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Phone</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-white/10 font-medium"
                      placeholder="Contact"
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Jersey Name</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-white/10 uppercase font-black tracking-widest"
                      placeholder="ANIKET"
                      maxLength={12}
                      value={formData.jerseyName}
                      onChange={e => setFormData({...formData, jerseyName: e.target.value.toUpperCase()})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">
                      Jersey No
                    </label>

                    <input
                      type="number"
                      inputMode="numeric"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-white/10 font-black"
                      placeholder="0-999"
                      min={0}
                      max={999}
                      value={formData.jerseyNo}
                      onChange={(e) => {
                        const value = e.target.value;

                        // allow empty (for delete)
                        if (value === "") {
                          setFormData({ ...formData, jerseyNo: "" });
                          return;
                        }

                        const num = Number(value);

                        if (num >= 0 && num <= 999) {
                          setFormData({ ...formData, jerseyNo: value });
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Department</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all appearance-none font-medium"
                      value={formData.department}
                      onChange={e => setFormData({...formData, department: e.target.value})}
                    >
                      <option value="" disabled className="bg-zinc-900">Select Department</option>
                      {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-zinc-900 text-sm">{d}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                      <ArrowLeft className="w-3 h-3 -rotate-90" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">
                    Jersey Collar
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all appearance-none font-medium"
                      value={formData.collar}
                      onChange={(e) =>
                        setFormData({ ...formData, collar: e.target.value })
                      }
                    >
                      <option value="" disabled className="bg-zinc-900">
                        Select Collar Type
                      </option>
                      <option value="With Collar" className="bg-zinc-900">
                        With Collar
                      </option>
                      <option value="Without Collar" className="bg-zinc-900">
                        Without Collar
                      </option>
                    </select>

                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                      <ArrowLeft className="w-3 h-3 -rotate-90" />
                    </div>
                  </div>
                </div>


                <div className="space-y-2">
                  <label className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Elite Sizing</label>
                  <div className="grid grid-cols-7 gap-1.5">
                    {SIZES.map(s => (
                      <button
                        key={s}
                        onClick={() => setFormData({...formData, size: s})}
                        className={cn(
                          "py-2.5 rounded-lg text-[9px] font-black transition-all border",
                          formData.size === s 
                            ? "bg-orange-500 border-orange-500 text-white shadow-[0_5px_15px_rgba(249,115,22,0.3)]" 
                            : "bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                  <button 
                        onClick={() => setShowSizeChart(true)}
                        className="w-full bg-white/5 border border-white/10 text-white/60 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2 group"
                      >
                        <FileText className="w-3.5 h-3.5 text-orange-500" />
                        View Size Chart
                      </button>
                  <button 
                  disabled={
                    !formData.name ||
                    !formData.phone ||
                    !formData.jerseyName ||
                    !formData.jerseyNo ||
                    !formData.department ||
                    !formData.collar || // ✅
                    !formData.size
                  }
                onClick={handleNext}
                className="w-full bg-white text-black py-4 rounded-[1.2rem] font-black text-base hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-3 group disabled:opacity-30 disabled:grayscale"
              >
                LOCK DETAILS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="text-center space-y-1">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-2 border border-blue-500/20">
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="font-display text-2xl text-white uppercase tracking-tight">
                  FINAL REVIEW
                </h2>
                <p className="text-white/40 text-[10px] font-medium leading-relaxed">
                  Review every detail carefully.<br />
                  No edits will be possible once the order is placed.
                </p>
              </div>

              {/* Details Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
                <div className="relative bg-white/5 border border-white/10 rounded-[1.5rem] overflow-hidden backdrop-blur-xl">
                  <div className="grid grid-cols-2 gap-px bg-white/10">
                    {[
                    { icon: User, label: "Name", value: formData.name },
                    { icon: Phone, label: "Contact", value: formData.phone },
                    { icon: Shirt, label: "Jersey Name", value: formData.jerseyName },
                    { icon: Info, label: "Jersey No", value: formData.jerseyNo },
                    { icon: MapPin, label: "Department", value: formData.department },
                    { icon: Info, label: "Collar Type", value: formData.collar }, // ✅
                    { icon: Zap, label: "Fit Size", value: formData.size },
                    { icon: Mail, label: "Email", value: user.email },
                  ].map((item, i) => (
                        <div key={i} className="bg-zinc-950 p-4 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <item.icon className="w-2.5 h-2.5 text-white/20" />
                          <p className="text-[7px] font-black text-white/20 uppercase tracking-[0.2em]">
                            {item.label}
                          </p>
                        </div>
                        <p className="text-white text-xs font-bold tracking-tight uppercase truncate">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-[8px] font-black text-red-500 uppercase tracking-widest">
                    Important Notice
                  </p>
                  <p className="text-[10px] text-white/60 leading-relaxed">
                    Once payment is completed, your jersey goes directly for printing.{" "}
                    <span className="text-white font-bold uppercase tracking-tighter italic">
                      Name, number, size, and department cannot be changed later.
                    </span>{" "}
                    Please verify everything carefully before proceeding.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleBack}
                  className="flex-1 bg-white/5 border border-white/10 text-white py-4 rounded-[1.2rem] font-black hover:bg-white/10 transition-all uppercase tracking-widest text-[13px]"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex-[2] bg-white text-black py-4 rounded-[1.2rem] font-black text-base hover:bg-orange-500 hover:text-white transition-all shadow-xl"
                >
                  PAYMENT GATEWAY
                </button>
              </div>
            </motion.div>
          )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Header */}
            <div className="text-center space-y-1.5">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-blue-500/20">
                <QrCode className="w-7 h-7 text-blue-500" />
              </div>

              <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-white">
                FUEL THE FLAME
              </h2>

              <p className="text-white/40 text-[11px] sm:text-xs font-medium">
                Complete ₹360 transaction via Secure UPI
              </p>
            </div>

            {/* QR Section */}
            <div className="flex flex-col items-center space-y-3 sm:space-y-5">

              {/* Department Title */}
              <div className="text-center -mb-1 sm:mb-0">
                <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.35em] sm:tracking-[0.45em] text-orange-500">
                  {formData.department} Department
                </p>
              </div>

              {/* QR Card */}
              <div className="relative">
                <div className="absolute inset-0 rounded-[2.2rem] bg-white/30 blur-2xl opacity-30" />

                <div
                  className="
                    relative
                    w-52 h-52
                    sm:w-60 sm:h-60
                    md:w-72 md:h-72
                    bg-white
                    rounded-[2.2rem]
                    shadow-2xl
                    border-[6px] border-black
                    overflow-hidden
                    flex items-center justify-center
                  "
                >
                  <img
                    src={selectedPayment.qr}
                    alt={`${selectedPayment.name} QR`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* UPI COPY */}
              <div className="w-full space-y-2.5">
                <button
                  onClick={() => {
                    if (!selectedPayment) return;

                    navigator.clipboard.writeText(selectedPayment.upi);
                    setCopied(true);
                    toast.success(`${formData.department} UPI ID copied`);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className={cn(
                    "w-full border rounded-xl p-4 text-center group transition-all active:scale-95",
                    copied
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  )}
                >
                  <p className="text-[8px] uppercase font-black tracking-widest mb-0.5 text-white/30">
                    Direct Transfer ID
                  </p>

                  <div
                    className={cn(
                      "flex items-center justify-center gap-2 transition-all",
                      copied ? "text-emerald-400" : "text-orange-400"
                    )}
                  >
                    <p className="text-base font-mono font-black tracking-wider">
                      {selectedPayment?.upi || "Select department first"}
                    </p>

                    {copied ? (
                      <CheckCircle className="w-4 h-4 animate-pop" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-white/20 group-hover:text-orange-400" />
                    )}
                  </div>
                </button>

                <div className="flex items-center justify-center gap-2 text-white/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-[9px] font-black uppercase tracking-widest">
                    End-to-End Encrypted
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 sm:gap-3 pt-0.5 sm:pt-2">
              <button
                onClick={handleBack}
                className="flex-1 bg-white/5 border border-white/10 text-white py-2.5 sm:py-3 md:py-4 rounded-[1.2rem] font-black hover:bg-white/10 transition-all uppercase tracking-widest text-[13px]"
              >
                Back
              </button>

              <button
                onClick={handleNext}
                className="flex-[2] bg-white text-black py-2.5 sm:py-3 md:py-4 rounded-[1.2rem] font-black text-base hover:bg-orange-500 hover:text-white transition-all shadow-xl"
              >
                I HAVE PAID
              </button>
            </div>
          </motion.div>
        )}


            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-emerald-500/20">
                    <CheckCircle className="w-7 h-7 text-emerald-500" />
                  </div>
                  <h2 className="font-display text-3xl text-white uppercase tracking-tight">VALIDATE INTEL</h2>
                  <p className="text-white/40 text-xs font-medium leading-relaxed">Submit transaction evidence for manual audit.</p>
                </div>

                <div className="space-y-4">
                 <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">
                      Enter 12-Digit UTR / Transaction ID
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={12}
                      className={cn(
                        "w-full rounded-xl px-5 py-4 font-mono text-base tracking-widest transition-all focus:outline-none",
                        "bg-white/5 border",
                        // ✅ border logic
                        !utrTouched
                          ? "border-white/10 text-white" // initial state (neutral)
                          : formData.utrNo.length === 12
                          ? "border-emerald-500/60 text-white" // valid
                          : "border-red-500/40 text-white/70" // invalid
                      )}
                      placeholder="Enter 12 Digit UTR No"
                      value={formData.utrNo}
                      onFocus={() => setUtrTouched(true)} // 👈 key line
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 12) {
                          setFormData({ ...formData, utrNo: value });
                        }
                      }}
                    />

                    {/* Helper text */}
                    {utrTouched && (
                      <p
                        className={cn(
                          "text-[10px] font-bold ml-1 transition-all",
                          formData.utrNo.length === 12
                            ? "text-emerald-400"
                            : "text-red-400"
                        )}
                      >
                        {formData.utrNo.length === 12
                          ? "✓ Valid 12-digit UTR"
                          : `${formData.utrNo.length}/12 digits entered`}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Payment Proof (Screenshot)</label>
                    <div 
                      onClick={() => document.getElementById('screenshot-upload').click()}
                      className={cn(
                        "relative border-2 border-dashed rounded-[2rem] p-8 text-center cursor-pointer transition-all overflow-hidden",
                        preview ? "border-emerald-500 bg-emerald-500/5" : "border-white/10 hover:border-white/20 hover:bg-white/5"
                      )}
                    >
                      <input 
                        id="screenshot-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      {preview ? (
                        <div className="relative group/preview">
                          <img src={preview} alt="Preview" className="max-h-40 mx-auto rounded-2xl shadow-xl" />
                          <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-sm opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Swap Intel</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="w-8 h-8 text-white/10 mx-auto" />
                          <div className="space-y-1">
                            <p className="text-xs text-white/50 font-black uppercase tracking-widest">Upload Screenshot</p>
                            <p className="text-[8px] text-white/20 font-medium">PNG, JPG, HEIC up to 5MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={handleBack} className="flex-1 bg-white/5 border border-white/10 text-white py-4 rounded-[1.2rem] font-black hover:bg-white/10 transition-all uppercase tracking-widest text-[13px]">
                    Back
                  </button>
                    <button 
                      disabled={loading || formData.utrNo.length !== 12}
                      onClick={handleSubmit} 
                      className="flex-[2] bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-[1.2rem] font-black text-base hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-[0_15px_30px_rgba(16,185,129,0.2)] active:scale-95 disabled:grayscale disabled:opacity-30"
                    >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ENCRYPTING...
                      </>
                    ) : (
                      <>
                        FINALIZE ORDER
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

           {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 sm:space-y-8 py-4"
            >
              {/* ICON */}
              <div className="relative">
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.2 }}
                  className="
                    w-20 h-20 sm:w-24 sm:h-24   /* 👈 smaller on mobile */
                    bg-gradient-to-br from-emerald-400 to-teal-600
                    rounded-[1.8rem] sm:rounded-[2rem]
                    flex items-center justify-center
                    mx-auto
                    shadow-[0_20px_50px_rgba(16,185,129,0.4)]
                    relative z-10
                  "
                >
                  <Check className="w-10 h-10 sm:w-12 sm:h-12 text-white stroke-[3px]" />
                </motion.div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 bg-emerald-500/20 blur-[60px] sm:blur-[70px] rounded-full" />
              </div>

              {/* TEXT */}
              <div className="space-y-4">
                <h2 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-tighter leading-none">
                  ORDER <br /> <span className="text-emerald-500">INITIATED</span>
                </h2>

                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 sm:p-8 space-y-4 backdrop-blur-xl">
                  <div className="flex items-center justify-center gap-2 text-emerald-500">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                    <span className="font-black uppercase tracking-[0.4em] text-[8px]">
                      Manual Validation Pulse
                    </span>
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed max-w-[240px] mx-auto font-medium">
                    Your order request has been successfully submitted.
                    It is now under <span className="text-white font-semibold">manual verification</span>.
                  </p>

                  {/* ✅ NEW IMPORTANT INFO LINE */}
                  <p className="text-emerald-400 text-[11px] font-black uppercase tracking-widest animate-pulse">
                    After payment success, you will receive your secret code
                  </p>

                  <p className="text-white/40 text-xs leading-relaxed max-w-[240px] mx-auto">
                    Verification usually takes <span className="text-white font-semibold">12–24 hours</span>.
                  </p>
                </div>
              </div>

              {/* BUTTON */}
              <button 
                onClick={onClose}
                className="w-full bg-white text-black py-4 sm:py-5 rounded-[2rem] font-black text-base sm:text-lg hover:bg-emerald-500 hover:text-white transition-all shadow-xl active:scale-95 group"
              >
                VIEW MISSION DASHBOARD
                <ArrowRight className="w-5 h-5 inline ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          </AnimatePresence>
        </div>
      </motion.div>
       <AnimatePresence>
          {showSizeChart && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setShowSizeChart(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-sm bg-zinc-950 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">ARMOR SIZING</h3>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Dimensions in Inches</p>
                    </div>
                    <button 
                      onClick={() => setShowSizeChart(false)}
                      className="p-2 hover:bg-white/5 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-zinc-500" />
                    </button>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative group/chart">
                    <img 
                      src={SIZE_CHART_IMAGE} 
                      alt="Size Chart" 
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/600x800/09090b/white?text=SIZE+CHART\n(Update+Link)";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <p className="text-[10px] font-black text-white uppercase tracking-widest bg-black/60 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                        Reference Dimensions
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                    <Info className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <p className="text-[9px] text-zinc-400 leading-relaxed">
                      Measurements are approximate. We recommend choosing your standard athletic fit for optimal performance.
                    </p>
                  </div>

                  <button 
                    onClick={() => setShowSizeChart(false)}
                    className="w-full py-4 bg-white text-black rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all"
                  >
                    CONFIRM & CLOSE
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}
