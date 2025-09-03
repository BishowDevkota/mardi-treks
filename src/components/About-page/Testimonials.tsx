"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Anjali Sharma",
    role: "Adventure Enthusiast",
    image: "/images/testimonials/anjali.jpg", // Use local image
    review:
      "Big Sky Treks made our Everest Base Camp trek unforgettable! The guides were professional, friendly, and truly passionate about the mountains.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rohan Thapa",
    role: "Travel Blogger",
    image: "/images/testimonials/rohan.jpg",
    review:
      "The experience was seamless from start to finish. I loved the personalized touches and eco-friendly approach. Highly recommend!",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Koirala",
    role: "First Time Trekker",
    image: "/images/testimonials/priya.jpg",
    review:
      "I was nervous about my first trek, but the team guided me every step of the way. I felt safe, supported, and inspired throughout.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-8 md:px-20">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-serif tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Hear directly from the adventurers who explored the Himalayas with us.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 min-w-0">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-md bg-black/40 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] p-8 h-96 flex flex-col items-center justify-center text-center">
                {/* Shining Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-0"></div>

                <div className="relative z-10 flex flex-col items-center justify-center">
                  <Image
                    src={testimonial.image}
                    alt={`Profile picture of ${testimonial.name}, ${testimonial.role}`}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full mb-4 border-2 border-white/30 object-cover"
                    priority={i === 0}
                  />
                  <h3 className="text-2xl font-semibold text-white mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-300 mb-3">{testimonial.role}</p>
                  <p className="text-gray-200 text-sm max-w-xs">{testimonial.review}</p>
                  <div className="flex mt-4 space-x-1">
                    {[...Array(testimonial.rating || 5)].map((_, idx) => (
                      <Star key={`${testimonial.id}-star-${idx}`} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}