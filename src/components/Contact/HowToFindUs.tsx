"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GlassButton from "../Bottons/GlassButton";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function PromoGlassCards() {
  const socials = [
    { id: 1, icon: <Facebook className="w-6 h-6 text-blue-600" />, link: "#" },
    { id: 2, icon: <Instagram className="w-6 h-6 text-pink-500" />, link: "#" },
    { id: 3, icon: <Twitter className="w-6 h-6 text-blue-400" />, link: "#" },
    { id: 5, icon: <Mail className="w-6 h-6 text-purple-400" />, link: "#" },
  ];

  return (
    <section className="py-20 px-8 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

        {/* Left Card - Enjoy Discounts */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="group relative"
        >
          <div className="relative h-[320px] rounded-3xl overflow-hidden backdrop-blur-lg border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-3xl">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/slide2.jpg"
                alt="Enjoy Discounts"
                fill
                className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
              />
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.05) 100%)`,
                }}
              />
            </div>

            {/* Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-3xl translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800 ease-in-out"></div>

            {/* Card Content */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-center items-center text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white drop-shadow-lg">
                Enjoy Our Discounts
              </h2>
              <p className="text-white/90 text-base mb-4 drop-shadow-sm max-w-[80%]">
                Book your next adventure with us and get amazing offers for a limited time!
              </p>
              <GlassButton label="Explore Offers" href="#" />
            </div>

            {/* Glow Border */}
            <div className="absolute inset-0 rounded-3xl border border-white/30 transition-all duration-500"></div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/0 to-white/0 group-hover:from-white/10 group-hover:via-white/10 group-hover:to-white/10 transition-all duration-600 blur-sm"></div>
          </div>
        </motion.div>

        {/* Right Card - Find Us On */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="group relative"
        >
          <div className="relative h-[320px] rounded-3xl overflow-hidden backdrop-blur-lg border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-3xl">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/contact/how-to-find-us.webp"
                alt="Find Us On"
                fill
                className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
              />
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.05) 100%)`,
                }}
              />
            </div>

            {/* Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-3xl translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800 ease-in-out"></div>

            {/* Card Content */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-center items-center text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white drop-shadow-lg">
                Find Us On
              </h2>
              <p className="text-white/90 text-base mb-4 drop-shadow-sm max-w-[80%]">
                Follow us on social media to stay updated with our latest adventures!
              </p>
              <div className="flex gap-3 justify-center">
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.link}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Glow Border */}
            <div className="absolute inset-0 rounded-3xl border border-white/30 transition-all duration-500"></div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/0 to-white/0 group-hover:from-white/10 group-hover:via-white/10 group-hover:to-white/10 transition-all duration-600 blur-sm"></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
