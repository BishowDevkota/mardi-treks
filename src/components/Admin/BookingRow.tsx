"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';

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

interface BookingRowProps {
  booking: Booking;
}

export default function BookingRow({ booking }: BookingRowProps) {
  const [status, setStatus] = useState(booking.status);
  const [paymentStatus, setPaymentStatus] = useState(booking.paymentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`${baseUrl}/api/bookings/${booking._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, paymentStatus }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      toast.success('Booking updated successfully');
      if (paymentStatus === 'Paid' && status !== 'Confirm') {
        setStatus('Confirm');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update booking');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (booking.status === 'Confirm') {
      toast.error('Cannot delete Confirmed booking');
      return;
    }
    setIsDeleting(true);
    try {
      const response = await fetch(`${baseUrl}/api/bookings/${booking._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      toast.success('Booking deleted successfully');
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete booking');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="p-3 text-sm">{booking._id}</td>
      <td className="p-3 text-sm">{booking.trekName}</td>
      <td className="p-3 text-sm">{booking.persons}</td>
      <td className="p-3 text-sm">${booking.totalPrice}</td>
      <td className="p-3 text-sm">
        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          className="p-1 border rounded-md"
        >
          <option value="Pending">Pending</option>
          <option value="Not Paid">Not Paid</option>
          <option value="Paid">Paid</option>
        </select>
      </td>
      <td className="p-3 text-sm">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-1 border rounded-md"
          disabled={paymentStatus === 'Paid'}
        >
          <option value="Pending">Pending</option>
          <option value="Confirm">Confirm</option>
          <option value="Cancel">Cancel</option>
        </select>
      </td>
      <td className="p-3 text-sm">{booking.fullName}</td>
      <td className="p-3 text-sm">{booking.email}</td>
      <td className="p-3 text-sm">{booking.phone}</td>
      <td className="p-3 text-sm">
        {booking.departureDate
          ? new Date(booking.departureDate).toLocaleDateString()
          : 'N/A'}
      </td>
      <td className="p-3 text-sm">
        {booking.createdAt
          ? new Date(booking.createdAt).toLocaleDateString()
          : 'N/A'}
      </td>
      <td className="p-3 text-sm space-x-2">
        <motion.button
          onClick={handleUpdate}
          disabled={isUpdating}
          className={`bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isUpdating ? 'Updating...' : 'Update'}
        </motion.button>
        <motion.button
          onClick={handleDelete}
          disabled={isDeleting || booking.status === 'Confirm'}
          className={`bg-red-600 text-white p-2 rounded-md hover:bg-red-700 disabled:bg-gray-400`}
          whileHover={{ scale: booking.status === 'Confirm' ? 1 : 1.05 }}
          whileTap={{ scale: booking.status === 'Confirm' ? 1 : 0.95 }}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </motion.button>
      </td>
    </tr>
  );
}