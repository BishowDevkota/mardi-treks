"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FlipGlassCardProps {
  title: string;
  description?: string | React.ReactNode;
  image?: string;
}

export default function FlipGlassCard({
  title,
  description,
  image,
}: FlipGlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group relative perspective-1000"
    >
      {/* Flip Container */}
      <motion.div
        className="relative h-[520px] rounded-3xl overflow-hidden transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
        animate={{ rotateY: 0 }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backdrop-blur-lg border border-white/20 bg-white/10 group-hover:bg-white/20 transition-all duration-500 backface-hidden">
          {image && (
            <div className="absolute inset-0">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
              />
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.05) 100%)`,
                }}
              ></div>
            </div>
          )}

          {/* Shimmer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-3xl translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800 ease-in-out"></div>

          {/* Front Content */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center">
            <h3 className="text-3xl font-bold drop-shadow-lg text-white">
              {title}
            </h3>
          </div>

          <div className="absolute inset-0 rounded-3xl border border-white/30 transition-all duration-500"></div>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/0 to-white/0 group-hover:from-white/10 group-hover:via-white/10 group-hover:to-white/10 transition-all duration-600 blur-sm"></div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backdrop-blur-lg border border-white/20 bg-white/10 group-hover:bg-white/20 transition-all duration-500 backface-hidden rotate-y-180">
          {image && (
            <div className="absolute inset-0">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
              />
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.05) 100%)`,
                }}
              ></div>
            </div>
          )}

          {/* Shimmer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-3xl translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800 ease-in-out"></div>

          {/* Back Content */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-center">
            {description && (
              <p className="leading-relaxed font-medium text-white/90 drop-shadow-sm text-center">
                {description}
              </p>
            )}
          </div>

          <div className="absolute inset-0 rounded-3xl border border-white/30 transition-all duration-500"></div>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/0 to-white/0 group-hover:from-white/10 group-hover:via-white/10 group-hover:to-white/10 transition-all duration-600 blur-sm"></div>
        </div>
      </motion.div>
    </motion.div>
  );
}