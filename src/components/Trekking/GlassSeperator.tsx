
export default function GlassSeparator() {
  return (
    <div className="relative overflow-hidden group my-6">
      <div className="h-1 w-full bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.2)]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
    </div>
  );
}