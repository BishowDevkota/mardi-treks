"use client";

import { motion } from "framer-motion";
import { useState, ChangeEvent, FormEvent } from "react";
import GlassButton from "../Bottons/GlassButton";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="py-20 px-8 md:px-20 relative overflow-hidden min-h-screen flex items-center">
      {/* Mountain Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')"
          }}
        ></div>
        {/* Dark Overlay for better readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-10 left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif tracking-tight">
            Contact Us
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Reach out to plan your next adventure or inquire about our Himalayan experiences.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="group relative h-full"
          >
            <div className="relative rounded-2xl overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] p-8 h-full">
              {/* Shining effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-white mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                        placeholder="Your Email"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-200 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                      placeholder="Subject of your message"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <div className="pt-2">
                    <GlassButton label="Send Message" href="#" />
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Information Only */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="group relative h-full"
          >
            <div className="relative rounded-2xl overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] p-8 h-full">
              {/* Shining effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-blue-500/20 mr-4 transition-transform duration-300">
                      <MapPin className="text-blue-300" size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">Address</h4>
                      <p className="text-gray-200">Leknath Marg, Kathmandu 44600, Nepal</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-green-500/20 mr-4 transition-transform duration-300">
                      <Phone className="text-green-300" size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">Phone</h4>
                      <p className="text-gray-200">+977 9851013072</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-purple-500/20 mr-4 transition-transform duration-300">
                      <Mail className="text-purple-300" size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">Email</h4>
                      <p className="text-gray-200">info@nepaltreksandtour.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-amber-500/20 mr-4 transition-transform duration-300">
                      <Clock className="text-amber-300" size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">Office Hours</h4>
                      <p className="text-gray-200">Mon - Fri: 9 AM - 5 PM</p>
                      <p className="text-gray-200">Sat: 10 AM - 2 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}