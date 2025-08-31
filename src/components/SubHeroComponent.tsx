"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import GlassSearchIcon from "./GlassSearchBlogs";
import Breadcrumbs from "./Breadcrumbs";

interface SubHeroProps {
  siteTitle: string;
  backgroundImage?: string;
}

export default function SubHero({
  siteTitle,
  backgroundImage = "/images/sub-hero-bg.jpg",
}: SubHeroProps) {
  const [pause, setPause] = useState(false);

  // ✅ make sure we always have a valid string
  const safeSrc = backgroundImage && backgroundImage.trim() !== "" 
    ? backgroundImage 
    : "/images/sub-hero-bg.jpg";

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Background */}
      <AnimatePresence>
        <motion.div
          key={safeSrc}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={safeSrc}
            alt={siteTitle || "Trekking in Nepal"}
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered Content */}
      <div className="relative z-10 flex gap-4 h-full flex-col justify-center items-center px-6 md:px-20 text-center">
        {/* Site Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2"
        >
          {siteTitle || "Trekking in Nepal"}
        </motion.h1>

        {/* Glass Search */}
        <motion.div>
          <GlassSearchIcon />
        </motion.div>

        {/* Breadcrumbs */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mb-4"
        >
          <Breadcrumbs />
        </motion.div>
      </div>
    </section>
  );
}
