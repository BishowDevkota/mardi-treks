'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WhatsAppButtonProps {
  phoneNumber: string; // Phone number in international format (e.g., "+9779864379436")
  message?: string; // Optional pre-filled message
  className?: string; // Optional additional classes
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = '',
  className = '',
}) => {
  // Validate phoneNumber to prevent errors
  if (!phoneNumber) {
    console.warn('WhatsAppButton: phoneNumber prop is required but was not provided.');
    return null; // Render nothing if phoneNumber is missing
  }

  // Construct WhatsApp link
  const cleanedPhoneNumber = phoneNumber.replace(/[^0-9+]/g, ''); // Remove non-numeric characters except '+'
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${cleanedPhoneNumber}${message ? `?text=${encodedMessage}` : ''}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`
        fixed bottom-6 right-20 z-50 overflow-hidden
        w-12 h-12
        bg-black/70 backdrop-blur-xl
        border border-gray-700/50 rounded-full
        shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
        flex items-center justify-center
        transition-all duration-300
        hover:bg-black/80 hover:scale-110
        active:scale-95
        group
        ${className}
      `}
      aria-label="Open WhatsApp chat"
    >
      {/* Shimmer Overlay */}
      <div className="absolute inset-0 rounded-full pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
      </div>
      {/* WhatsApp SVG Icon */}
      <svg
        className="w-6 h-6 text-white relative z-10"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.134.559 4.135 1.535 5.874L0 24l6.305-1.654C8.014 23.446 9.955 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.694 18.194c-.306.856-.885 1.548-1.766 1.794-.75.21-1.74.316-2.81.158-1.197-.176-2.345-.708-3.43-1.486-2.717-1.95-4.469-4.348-4.916-4.916-.447-.568-1.46-1.873-1.46-3.566 0-1.693.894-2.52 1.305-2.904.41-.384.894-.447 1.19-.447.298 0 .596.032.854.064.258.032.563.096.788.447.224.351.707 1.214.763 1.308.056.094.113.225.056.351-.056.127-.175.287-.351.447l-.528.479c-.175.16-.351.319-.351.479 0 .16.175.319.41.606.234.287.586.638 1.02 1.02.434.383.735.606.894.702.16.096.351.096.528-.032.176-.127.41-.351.763-.702l.563-.606c.351-.383.606-.479.854-.479.248 0 .496.096.703.287.207.192.447.447.703.798.257.351.321.766.193 1.053z" />
      </svg>
    </motion.a>
  );
};

export default WhatsAppButton;