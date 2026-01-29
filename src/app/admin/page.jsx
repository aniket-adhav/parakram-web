"use client"; import { useState, useEffect } from "react"; 
import { motion, AnimatePresence } from "framer-motion"; 
import { LogOut } from "lucide-react"; import { signOut } from "next-auth/react";
 import { Shield, CheckCircle, XCircle, Eye, ExternalLink, Search, Filter, Clock, Users, Shirt, CreditCard, Mail, Hash, Phone } from "lucide-react"; 
 import { useSession } from "next-auth/react";
  import { ADMIN_EMAILS, MASTER_ADMINS, DEPARTMENT_ADMINS } from "@/lib/admins";
  import { useRouter } from "next/navigation"; 
  import { toast } from "sonner"; import { normalizeEmail } from "@/lib/adminUtils";
  import { ElegantShape } from "@/components/ui/shape-landing-hero";

export default function AdminPanel() {

  const { data: session, status } = useSession();
  const router = useRouter();

  const user = session?.user;
  const email = normalizeEmail(user?.email);

  const isAdmin = email && ADMIN_EMAILS.includes(email);
  const isMasterAdmin = email && MASTER_ADMINS.includes(email);
  const department = DEPARTMENT_ADMINS[email];

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [search, setSearch] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [processingId, setProcessingId] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [imageLoading, setImageLoading] = useState(false);

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?status=${filter}`, {
        headers: { "x-admin-email": user.email },
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      setOrders(data || []);
    } catch {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    if (status === "loading") return;

    if (!user || !isAdmin) {
      router.replace("/");
      return;
    }

    setAuthorized(true);        // ✅ FIX
    fetchOrders();
  }, [status, user, isAdmin, filter]);

  /* ================= LOADING HANDLED BY app/admin/loading.jsx ================= */
  if (status === "loading" || !authorized) {
    return null;
  }

  /* ================= ACTIONS ================= */
  const handleApprove = async (orderId) => {
    setProcessingId(orderId);
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          action: "approved",
          adminEmail: user.email,
        }),
      });

      if (!res.ok) throw new Error();
      toast.success("Order approved");
      fetchOrders();
    } catch {
      toast.error("Approval failed");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (orderId) => {
    setProcessingId(orderId);
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          action: "rejected",
          adminEmail: user.email,
        }),
      });

      if (!res.ok) throw new Error();
      toast.error("Order rejected");
      fetchOrders();
    } catch {
      toast.error("Rejection failed");
    } finally {
      setProcessingId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      (o.utrNo || "").toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      !isMasterAdmin ||
      departmentFilter === "all" ||
      o.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Shield className="w-6 h-6 text-white" />
                </div>

                {/* Title + Subtitle (STACKED) */}
                <div className="flex flex-col">
                  <h1 className="text-3xl font-display uppercase tracking-wider leading-tight">
                    {isMasterAdmin
                      ? "Master Admin Panel"
                      : `${department} Department Admin Panel`}
                  </h1>

                  <p className="text-white/40 text-sm">
                    {isMasterAdmin
                      ? "Manage payments for all departments"
                      : `Manage all ${department} department payments`}
                  </p>
                </div>
              </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Total Orders</p>
                <p className="text-xl font-bold">{orders.length}</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 bg-yellow-500/10 rounded-xl">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Pending</p>
                <p className="text-xl font-bold">{orders.filter(o => o.status === 'pending').length}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20 group ml-2"
              title="Logout"
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
        

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-orange-500/50 transition-all"
              placeholder="Search by name or UTR..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
                  {isMasterAdmin && (
                    <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1.5 overflow-x-auto">
                      <button
                        onClick={() => setDepartmentFilter("all")}
                        className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                          departmentFilter === "all"
                            ? "bg-white text-black shadow-lg"
                            : "text-white/40 hover:text-white"
                        }`}
                      >
                        All
                      </button>

                      {Object.values(DEPARTMENT_ADMINS)
                        .filter(Boolean)
                        .filter((v, i, a) => a.indexOf(v) === i)
                        .map((dept) => (
                          <button
                            key={dept}
                            onClick={() => setDepartmentFilter(dept)}
                            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                              departmentFilter === dept
                                ? "bg-white text-black shadow-lg"
                                : "text-white/40 hover:text-white"
                            }`}
                          >
                            {dept}
                          </button>
                        ))}
                    </div>
                  )}

          <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1.5">
            {['pending', 'approved', 'rejected', 'all'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                  filter === f ? "bg-white text-black shadow-lg" : "text-white/40 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="px-8 py-6 text-[10px] uppercase font-bold text-white/40 tracking-[0.2em]">Name</th>
                    <th className="px-8 py-6 text-[10px] uppercase font-bold text-white/40 tracking-[0.2em]">Phone</th>
                    <th className="px-8 py-6 text-[10px] uppercase font-bold text-white/40 tracking-[0.2em]">Jersey</th>
                    <th className="px-8 py-6 text-[10px] uppercase font-bold text-white/40 tracking-[0.2em]">UTR NO</th>
                    <th className="px-8 py-6 text-[10px] uppercase font-bold text-white/40 tracking-[0.2em]">Payment</th>
                    <th className="px-8 py-6 text-[10px] uppercase font-bold text-white/40 tracking-[0.2em]">Status</th>
                    <th className="px-8 py-6 text-[10px] uppercase font-bold text-white/40 tracking-[0.2em] text-right">
                      {filter === "approved" ? "Secret Code" : "Actions"}
                    </th>
                  </tr>
                </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="p-20 text-center text-white/20 font-display italic">Scanning records...</td>
                    </tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-20 text-center text-white/20 font-display italic">No records found</td>
                    </tr>
                  ) : filteredOrders.map((order) => (
                    <motion.tr 
                      key={order._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center font-bold text-orange-500">
                              {order.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-white">{order.name}</p>
                              <p className="text-[10px] text-white/30 uppercase tracking-widest">{order.department}</p>
                            </div>
                          </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-orange-400" />
                          <p className="text-sm font-mono text-white font-bold tracking-wider">
                            {order.phone}
                          </p>
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/5 rounded-lg">
                            <Shirt className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-mono text-white/80"><span className="text-orange-400 font-bold">{order.jerseyName}</span> #{order.jerseyNo}</p>
                            <p className="text-[10px] text-white/30 uppercase font-bold">Size {order.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <Hash className="w-3.5 h-3.5 text-orange-500" />
                          <p className="text-sm font-mono font-bold text-white tracking-wider">{order.utrNo}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                       <button
                          onClick={() => {
                            setImageLoading(true);
                            setPreviewImage(order.screenshotUrl);
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border border-blue-500/20"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Receipt
                        </button>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                          order.status === 'approved' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                          order.status === 'rejected' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                          "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                     <td className="px-8 py-6">
                        <div className="flex justify-end items-center gap-2">

                          {/* 🟡 PENDING → Approve / Reject */}
                          {order.status === "pending" && (
                            <>
                              <button
                                disabled={processingId === order._id}
                                onClick={() => handleApprove(order._id)}
                                className="p-3 bg-green-500/10 text-green-400 rounded-xl
                                          hover:bg-green-500 hover:text-white
                                          transition-all disabled:opacity-50"
                              >
                                {processingId === order._id ? (
                                  <div className="w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <CheckCircle className="w-5 h-5" />
                                )}
                              </button>

                              <button
                                disabled={processingId === order._id}
                                onClick={() => handleReject(order._id)}
                                className="p-3 bg-red-500/10 text-red-400 rounded-xl
                                          hover:bg-red-500 hover:text-white
                                          transition-all disabled:opacity-50"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            </>
                          )}

                          {/* 🟢 APPROVED → Show Secret Code */}
                          {order.status === "approved" && order.secretCode && (
                            <div
                              onClick={() => {
                                navigator.clipboard.writeText(order.secretCode);
                                toast.success("Secret code copied");
                              }}
                              className="px-4 py-2 rounded-xl cursor-pointer
                                        bg-emerald-500/10 border border-emerald-500/30
                                        text-emerald-400 font-mono font-black
                                        tracking-widest text-sm hover:bg-emerald-500/20"
                              title="Click to copy secret code"
                            >
                              {order.secretCode}
                            </div>
                          )}

                          {/* 🔴 REJECTED → Label */}
                          {order.status === "rejected" && (
                            <span className="px-4 py-2 rounded-xl
                                            bg-red-500/10 border border-red-500/30
                                            text-red-400 text-xs font-black uppercase tracking-widest">
                              Rejected
                            </span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          <AnimatePresence>
            {previewImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
                  onClick={() => setPreviewImage(null)}
                >
                  <div className="relative">
                    {imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl">
                        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      </div>
                    )}

                    <motion.img
                      src={previewImage}
                      onLoad={() => setImageLoading(false)}
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.95 }}
                      className="max-h-[90vh] max-w-[90vw] rounded-2xl border border-white/10 shadow-2xl bg-white"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
