"use client";

import { motion } from "framer-motion";
import { Compass, Users, Globe, Mountain, Shield, Heart } from "lucide-react";

const missions = [
  {
    id: 1,
    icon: <Compass className="w-10 h-10 text-blue-300" />,
    title: "Guiding Adventures",
    desc: "We lead explorers deep into the Himalayas, creating journeys that are safe, authentic, and unforgettable.",
  },
  {
    id: 2,
    icon: <Users className="w-10 h-10 text-pink-300" />,
    title: "Community First",
    desc: "Empowering local communities by supporting sustainable tourism and fostering opportunities.",
  },
  {
    id: 3,
    icon: <Globe className="w-10 h-10 text-indigo-300" />,
    title: "Sustainable Travel",
    desc: "Preserving nature for generations with eco-friendly trekking and responsible practices.",
  },
  {
    id: 4,
    icon: <Mountain className="w-10 h-10 text-amber-300" />,
    title: "Challenge & Growth",
    desc: "Helping trekkers embrace challenges and discover their true potential among the peaks.",
  },
  {
    id: 5,
    icon: <Shield className="w-10 h-10 text-cyan-300" />,
    title: "Safety & Trust",
    desc: "Your safety is our top priority—expert guides and careful preparation every step.",
  },
  {
    id: 6,
    icon: <Heart className="w-10 h-10 text-rose-300" />,
    title: "Passion for Nature",
    desc: "We inspire deeper connections with the natural world, fueled by love for the outdoors.",
  },
];

export default function OurMission() {
  return (
    <section className="py-20 px-8 md:px-20 relative overflow-hidden min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1770&q=80')",
          }}
        ></div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-10 left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif tracking-tight">
            Our Mission
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            More than guides—we are storytellers, guardians of nature, and
            companions in your adventure. Every step echoes with purpose.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {missions.map((mission, i) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] p-8 h-72 flex flex-col items-center justify-center text-center">
                {/* Shining Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>

                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
                    {mission.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {mission.title}
                  </h3>
                  <p className="text-gray-200 text-sm max-w-xs">
                    {mission.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
