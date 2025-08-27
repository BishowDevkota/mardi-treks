"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Responsible Tourism", href: "/responsible-tourism" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
    { name: "Terms & Condition", href: "/terms" },
    { name: "Contact Us", href: "/contact" },
    { name: "B2B Listings", href: "/b2b-listings" },
  ];

  const destinations = [
    { name: "Nepal", href: "/destinations/nepal" },
    { name: "Bhutan", href: "/destinations/bhutan" },
    { name: "Tibet", href: "/destinations/tibet" },
  ];

  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com", icon: <Facebook size={20} /> },
    { name: "Twitter", href: "https://twitter.com", icon: <Twitter size={20} /> },
    { name: "Instagram", href: "https://instagram.com", icon: <Instagram size={20} /> },
  ];

  return (
    <footer className="backdrop-blur-xl bg-black/60 border-t border-white/20 shadow-lg text-white py-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center md:items-start"
        >
          <Link href="/" className="text-2xl font-bold text-white drop-shadow-lg mb-4">
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Nepal Treks and Tour
            </span>
          </Link>
          <p className="text-sm text-gray-300 text-center md:text-left">
            A Kathmandu-based tour company offering quality tour packages in Nepal, Tibet, and Bhutan for travelers.
          </p>
          <div className="flex gap-4 mt-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-200 group"
              >
                <motion.span
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">{social.icon}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center md:items-start"
        >
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="relative px-3 py-1 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                >
                  <motion.span
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Destinations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center md:items-start"
        >
          <h3 className="text-lg font-semibold mb-4">Destinations</h3>
          <ul className="flex flex-col gap-2 text-sm">
            {destinations.map((destination) => (
              <li key={destination.name}>
                <Link
                  href={destination.href}
                  className="relative px-3 py-1 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                >
                  <motion.span
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">{destination.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col items-center md:items-start"
        >
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="flex flex-col gap-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Leknath Marg, Kathmandu 44600, Nepal</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a href="mailto:info@nepaltreksandtour.com">info@nepaltreksandtour.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <a href="tel:+9779851013072">+977 9851013072</a>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8 text-center text-sm text-gray-400 border-t border-white/10 pt-4"
      >
        &copy; {new Date().getFullYear()} Nepal Treks and Tour Pvt Ltd. All rights reserved.
      </motion.div>
    </footer>
  );
}