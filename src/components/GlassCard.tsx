"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GlassButton from "./Bottons/GlassButton";

interface AdventureCardProps {
  title: string;
  description?: string|React.ReactNode;
  image?: string;
  price?: number;
  topLeft?: string | React.ReactNode;
  topRight?: string | number | React.ReactNode;
  ctaLabel?: string;
  ctaLink?: string;
}

export default function GlassCard({
  title,
  description,
  image,
  price,
  topLeft,
  topRight,
  ctaLabel,
  ctaLink,
}: AdventureCardProps) {
  let discount = 0;
  if (typeof topRight === "string") {
    const match = topRight.match(/(\d+)%/);
    if (match) discount = parseInt(match[1]);
  } else if (typeof topRight === "number") {
    discount = topRight;
  }

  const discountedPrice =
    price && discount ? (price * (1 - discount / 100)).toFixed(0) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* Glass Card */}
      <div className="relative h-[520px] rounded-3xl overflow-hidden backdrop-blur-lg border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-3xl">
        {/* Background Image */}
        {image && (
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
            />
            {/* Gradient Overlay */}
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

        {/* Card Content */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Top Badges */}
          {(topLeft || topRight) && (
            <div className="flex justify-between items-start mb-6">
              {/* Glass Blur Badge (like GlassButton) */}
              {topLeft && (
                <span className="relative inline-flex items-center justify-center px-5 py-1.5 
                                 rounded-full font-medium text-white text-sm
                                 bg-white/10 backdrop-blur-md border border-white/20
                                 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
                                 overflow-hidden group/topLeft transition-all duration-500">
                  {/* Glow Border */}
                  <span className="absolute inset-0 rounded-full border border-white/30 opacity-50 
                                   group-hover/topLeft:opacity-100 transition-opacity duration-500 pointer-events-none"></span>
                  {/* Shiny reflection */}
                  <span className="absolute w-[120%] h-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent 
                                   rotate-45 -translate-x-[150%] group-hover/topLeft:translate-x-[150%] 
                                   transition-transform duration-1000 ease-in-out pointer-events-none"></span>
                  {/* Inner Glow */}
                  <div className="absolute inset-1 bg-white/10 rounded-full blur-sm 
                                  group-hover/topLeft:blur-md transition-all duration-300 pointer-events-none"></div>
                  <span className="relative z-10">{topLeft}</span>
                </span>
              )}

              {/* Unique Animated Badge (comet pulse) */}
              {topRight && (
                <motion.span
                  className="relative px-5 py-1.5 rounded-full text-sm font-bold text-white overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, #FF6A00, #FF0000)`,
                  }}
                  animate={{
                    scale: [1, 1.12, 1],
                    rotate: [0, 3, -3, 0],
                    boxShadow: [
                      "0 0 8px rgba(255,120,0,0.6)",
                      "0 0 20px rgba(255,60,0,0.9)",
                      "0 0 14px rgba(255,200,0,0.7)",
                      "0 0 8px rgba(255,120,0,0.6)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {topRight}
                  {/* Orbiting glowing comet */}
                  <motion.span
                    className="absolute -top-2 left-1 w-2 h-2 bg-yellow-400 rounded-full blur-sm"
                    animate={{
                      x: [0, 30, 0, -30, 0],
                      y: [0, -20, 0, 20, 0],
                      opacity: [0.6, 1, 0.6],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.span>
              )}
            </div>
          )}

          {/* Bottom Content */}
          <div className="mt-auto">
            <h3 className="text-3xl font-bold mb-4 drop-shadow-lg text-white">
              {title}
            </h3>

{description && (
  typeof description === "string" ? (
    <p className="mb-4 leading-relaxed font-medium text-white/90 drop-shadow-sm line-clamp-4">
      {description}
    </p>
  ) : (
    <div className="mb-4 leading-relaxed font-medium text-white/90 drop-shadow-sm line-clamp-4">
      {description}
    </div>
  )
)}


            {price && (
              <p className="text-lg font-semibold text-white mb-6 drop-shadow-sm">
                Price:{" "}
                {discountedPrice ? (
                  <>
                    <span className="line-through text-gray-300 drop-shadow-sm">
                      ${price}
                    </span>{" "}
                    <span className="text-teal-300 drop-shadow-sm">
                      ${discountedPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-teal-300 drop-shadow-sm">${price}</span>
                )}
              </p>
            )}

            {/* CTA Button */}
            {ctaLabel && ctaLink && (
              <GlassButton label={ctaLabel} href={ctaLink} />
            )}
          </div>
        </div>

        {/* Glow Border */}
        <div className="absolute inset-0 rounded-3xl border border-white/30 transition-all duration-500"></div>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/0 to-white/0 group-hover:from-white/10 group-hover:via-white/10 group-hover:to-white/10 transition-all duration-600 blur-sm"></div>
      </div>
    </motion.div>
  );
}
