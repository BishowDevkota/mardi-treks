// src/components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Mountain, BookOpen, Info, Phone, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    const normalizedPathname = pathname.toLowerCase().replace(/\/$/, '');
    const normalizedPath = path.toLowerCase().replace(/\/$/, '');
    if (path === "/trekking") return normalizedPathname.startsWith("/trekking");
    if (path === "/blog") return normalizedPathname.startsWith("/blog");
    return normalizedPathname === normalizedPath;
  };

  const DesktopGlassDrop = () => (
    <motion.div
      layoutId="desktop-active-nav"
      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.1)]"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    />
  );

  const GlassDrop = () => (
    <motion.div
      layoutId="active-nav"
      className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 shadow-[0_8px_32px_rgba(255,255,255,0.3)]"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    />
  );

  return (
    <div className="sticky top-0 z-50">
      {/* Desktop Navbar */}
      <nav className="hidden md:block backdrop-blur-xl bg-black/60 border-b border-white/20 shadow-lg">
        <div className="max-w-6xl mx-auto w-full px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white drop-shadow-lg hover:scale-105 transition-transform duration-200">
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Big Sky Treks
            </span>
          </Link>

          {/* Navigation Items */}
          <ul className="flex items-center gap-2 text-white font-medium">
            {/* Home */}
            <li className="relative">
              <Link href="/" className="relative px-6 py-3 rounded-2xl flex items-center gap-2 hover:text-white transition-all duration-200 group">
                {isActive("/") && <DesktopGlassDrop />}
                <Home size={16} className="relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Home</span>
              </Link>
            </li>

            {/* Trekking with Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setOpenDropdown(true)}
              onMouseLeave={() => setOpenDropdown(false)}
            >
              <div className="relative px-6 py-3 rounded-2xl flex items-center gap-2 hover:text-white transition-all duration-200 group cursor-pointer">
                {isActive("/trekking") && <DesktopGlassDrop />}
                <Mountain size={16} className="relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Trekking</span>
                <motion.div animate={{ rotate: openDropdown ? 180 : 0 }} transition={{ duration: 0.2 }} className="relative z-10">
                  <ChevronDown size={14} />
                </motion.div>
              </div>

              <AnimatePresence>
                {openDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full -mt-1 left-0 min-w-[220px]"
                  >
                    <div className="backdrop-blur-xl bg-black/60 border border-white/20 rounded-xl p-3 shadow-lg">
                      <ul className="flex flex-col gap-2 pt-2">
                        <li>
                          <Link href="/trekking/annapurna" className="block px-4 py-2 rounded hover:bg-white/10 transition-all duration-200">Annapurna Circuit</Link>
                        </li>
                        <li>
                          <Link href="/trekking/everest" className="block px-4 py-2 rounded hover:bg-white/10 transition-all duration-200">Everest Base Camp</Link>
                        </li>
                        <li>
                          <Link href="/trekking/langtang" className="block px-4 py-2 rounded hover:bg-white/10 transition-all duration-200">Langtang Valley</Link>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* About */}
            <li className="relative">
              <Link href="/about" className="relative px-6 py-3 rounded-2xl flex items-center gap-2 hover:text-white transition-all duration-200 group">
                {isActive("/about") && <DesktopGlassDrop />}
                <Info size={16} className="relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">About</span>
              </Link>
            </li>

            {/* Blog */}
            <li className="relative">
              <Link href="/blog" className="relative px-6 py-3 rounded-2xl flex items-center gap-2 hover:text-white transition-all duration-200 group">
                {isActive("/blog") && <DesktopGlassDrop />}
                <BookOpen size={16} className="relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Blog</span>
              </Link>
            </li>

            {/* Contact */}
            <li className="relative">
              <Link href="/contact" className="relative px-6 py-3 rounded-2xl flex items-center gap-2 hover:text-white transition-all duration-200 group">
                {isActive("/contact") && <DesktopGlassDrop />}
                <Phone size={16} className="relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Contact</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Top Nav */}
      <nav className="md:hidden backdrop-blur-xl bg-black/60 border-b border-white/20 shadow-lg w-full fixed z-50 bottom-0">
        <ul className="flex justify-around items-center py-3 text-xs text-white relative">
          <li className="relative">
            <Link href="/" className="flex flex-col items-center relative px-4 py-2 rounded-full">
              {isActive("/") && <GlassDrop />}
              <Home size={20} className="relative z-10" />
              <span className="relative z-10">Home</span>
            </Link>
          </li>

          <li className="relative">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex flex-col items-center relative px-4 py-2 rounded-full"
            >
              {isActive("/trekking") && <GlassDrop />}
              <Mountain size={20} className="relative z-10" />
              <span className="relative z-10">Trekking</span>
            </button>
            <AnimatePresence>
              {openDropdown && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl border border-white/20 shadow-lg rounded-xl p-3 flex flex-col gap-2 text-sm text-white"
                >
                  <li><Link href="/trekking/annapurna" className="hover:text-gray-300">Annapurna</Link></li>
                  <li><Link href="/trekking/everest" className="hover:text-gray-300">Everest</Link></li>
                  <li><Link href="/trekking/langtang" className="hover:text-gray-300">Langtang</Link></li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          <li className="relative">
            <Link href="/about" className="flex flex-col items-center relative px-4 py-2 rounded-full">
              {isActive("/about") && <GlassDrop />}
              <Info size={20} className="relative z-10" />
              <span className="relative z-10">About</span>
            </Link>
          </li>

          <li className="relative">
            <Link href="/blog" className="flex flex-col items-center relative px-4 py-2 rounded-full">
              {isActive("/blog") && <GlassDrop />}
              <BookOpen size={20} className="relative z-10" />
              <span className="relative z-10">Blog</span>
            </Link>
          </li>

          <li className="relative">
            <Link href="/contact" className="flex flex-col items-center relative px-4 py-2 rounded-full">
              {isActive("/contact") && <GlassDrop />}
              <Phone size={20} className="relative z-10" />
              <span className="relative z-10">Contact</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
