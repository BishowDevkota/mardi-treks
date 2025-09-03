"use client";

import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Table from './Table';

interface Booking {
  _id: string;
  trekName: string;
  persons: number;
  totalPrice: number;
  paymentStatus: string;
  status: string;
  fullName: string;
  email: string;
  phone: string;
  departureDate: string | null;
  createdAt: string | null;
}

interface AdminDashboardProps {
  bookings: Booking[];
}

export default function AdminDashboard({ bookings }: AdminDashboardProps) {
  return (
    <div className="p-8">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Manage Bookings</h1>
        <Table bookings={bookings} />
      </motion.div>
    </div>
  );
}