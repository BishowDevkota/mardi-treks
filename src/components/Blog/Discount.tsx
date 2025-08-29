"use client";

import Image from "next/image";
import GlassButton from "../Bottons/GlassButton";

export default function GlassOfferCard() {
  return (
    <div className="relative w-full max-w-xs mx-auto group right-2">
      {/* Background Image */}
      <div className="relative h-64 w-full rounded-2xl overflow-hidden">
        <Image
          src="/images/dark-image.jpg" // replace with your background image path
          alt="Trek Background"
          fill
          className="object-cover rounded-2xl"
        />

        {/* Glass Overlay with shine + scale */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center rounded-2xl backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg overflow-hidden transition-transform duration-500 group-hover:scale-105">
          {/* Shine effect */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>

          <h3 className="text-lg font-semibold text-white drop-shadow relative z-10">
            Special Offer!
          </h3>
          <p className="text-3xl font-extrabold text-white drop-shadow mt-2 relative z-10">
            10% Off
          </p>
          <p className="text-sm text-white/90 drop-shadow relative z-10">
            On Each Trek
          </p>

          {/* Button */}
          <GlassButton label="Book Now" href="/trekking/mardi-himal-trek" />
        </div>
      </div>
    </div>
  );
}
