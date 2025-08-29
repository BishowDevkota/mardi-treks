"use client";

import { motion } from "framer-motion";
import { Sparkles, Percent, Clock, Star } from "lucide-react";

export default function DiscountSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="group relative rounded-2xl overflow-hidden backdrop-blur-md bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 p-6"
    >
      {/* Shining Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 text-center">
        <motion.div
          className="flex justify-center mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <Percent className="w-8 h-8 text-white" />
          </div>
        </motion.div>
        
        <h3 className="text-2xl font-bold text-white mb-2 font-serif">
          Special Offer
        </h3>
        
        <div className="flex items-center justify-center space-x-1 mb-3">
          {[...Array(5)].map((_, idx) => (
            <Star key={idx} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-4 py-2 rounded-full text-lg font-bold mb-4 inline-block">
          10% OFF
        </div>
        
        <p className="text-white/90 text-sm mb-4 leading-relaxed">
          Beautiful Glass Theme Package
        </p>
        
        <div className="flex items-center justify-center space-x-2 text-white/80 text-xs mb-4">
          <Clock className="w-4 h-4" />
          <span>Limited Time Offer</span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group/btn"
        >
          <Sparkles className="w-4 h-4 group-hover/btn:animate-pulse" />
          <span>Claim Discount</span>
        </motion.button>
        
        <p className="text-white/60 text-xs mt-3">
          *Terms and conditions apply
        </p>
      </div>
    </motion.div>
  );
}