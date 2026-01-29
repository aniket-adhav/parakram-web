export default function Loading() {
  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-t-2 border-orange-500 rounded-full animate-spin" />
          <div className="absolute inset-2 border-t-2 border-red-600 rounded-full animate-spin-slow" />
          <div className="absolute inset-4 border-t-2 border-amber-400 rounded-full animate-spin-fast" />
        </div>
        <div className="space-y-2 text-center">
          <h2 className="font-display text-2xl text-white tracking-widest uppercase italic font-black animate-pulse">
            Parakram
          </h2>
          <p className="text-white/20 text-[10px] uppercase tracking-[0.5em]">
            Initializing Systems...
          </p>
        </div>
      </div>
    </div>
  );
}
