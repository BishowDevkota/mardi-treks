
// app/booking/[bookingId]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mountain } from 'lucide-react';

// Interface for booking data
interface BookingData {
  bookingId: string;
  trekKey: string;
  trekName: string;
  persons: number;
  pricePerPerson: number;
  totalPrice: number;
  originalPrice: number;
  discountedPrice: number;
  totalOriginalPrice: number;
  status: string;
}

const BookingPage: React.FC = () => {
  const params = useParams();
  const bookingId = params.bookingId as string;
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/bookings/${bookingId}`);
        if (!response.ok) throw new Error('Failed to fetch booking');
        const data = await response.json();
        setBooking(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching booking:', error);
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return <div className="text-center text-gray-100 p-4">Loading booking...</div>;
  }

  if (!booking) {
    return <div className="text-center text-gray-100 p-4">Booking not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="max-w-md mx-auto p-4 bg-black/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
    >
      <div className="p-4 space-y-4">
        <h2 className="text-2xl font-bold text-white">Booking Details</h2>
        <div className="flex items-center gap-2 text-sm text-gray-100">
          <Mountain className="w-4 h-4" />
          <span>{booking.trekName}</span>
        </div>
        <div className="space-y-2 text-gray-100">
          <p><strong>Booking ID:</strong> {booking.bookingId}</p>
          <p><strong>Persons:</strong> {booking.persons}</p>
          <p><strong>Price per Person:</strong> ${booking.discountedPrice} <span className="text-gray-400 line-through">${booking.originalPrice}</span></p>
          <p><strong>Total:</strong> ${booking.totalPrice} (Save ${booking.totalOriginalPrice - booking.totalPrice})</p>
          <p><strong>Status:</strong> {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingPage;
