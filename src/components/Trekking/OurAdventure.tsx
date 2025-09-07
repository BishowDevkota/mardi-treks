"use client";

import { motion } from "framer-motion";

import GlassCard from "../GlassCard";

const trekkings = [
  {
    id: 1,
    title: "Mountain Trekking",
    description:
      "Embark on breathtaking mountain trails with experienced guides and discover the beauty of high-altitude landscapes.",
    image: "/images/slide1.webp",

    topLeft: "7-14 Days",
    topRight:"20% Off",
    price: 1200,
    buttonLabel: "Learn More",
    buttonLink: "/adventures/mountain-trekking",
  },
  {
    id: 2,
    title: "Cultural Tours",
    description:
      "Immerse yourself in rich local traditions, ancient temples, and vibrant communities across Nepal.",
    image: "/images/slide2.jpg",
    topLeft: "3-7 Days",
    topRight: "10% Off",
    price: 600,
    buttonLabel: "Learn More",
    buttonLink: "/adventures/cultural-tours",
  },
  {
    id: 3,
    title: "Peak Expeditions",
    description:
      "Challenge yourself with high-altitude climbing adventures to some of the world's most iconic peaks.",
    image: "/images/slide3.jpg",
    topLeft: "14-45 Days",
    price: 3500,
    topRight: "5% Off",
    buttonLabel: "Learn More",
    buttonLink: "/adventures/peak-expeditions",
  },
];

export default function OurAdventure() {
  return (
    <section className="py-20 px-8 md:px-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-serif tracking-tight">
            Our Adventures
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover extraordinary journeys crafted for adventurers seeking authentic experiences in the heart of the Himalayas
          </p>
        </motion.div>

        {/* Adventure Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {trekkings.map((trekking, index) => (
            <motion.div
              key={trekking.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <GlassCard
                title={trekking.title}
                description={trekking.description}
                image={trekking.image}
                topLeft={trekking.topLeft}
                topRight={trekking.topRight}
                price={trekking.price}
                ctaLabel={trekking.buttonLabel}
                ctaLink={trekking.buttonLink}
              />



            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
