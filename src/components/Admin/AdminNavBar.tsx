"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AdminNavbar() {
  const router = useRouter();

const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' }); // ✅ FIXED
    router.push('admin/sign-in');
    toast.success('Logged out successfully');
  };

  return (
    <header className="admin-header bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <nav className="flex space-x-4 items-center">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/users" className="hover:underline">
            Users
          </Link>
          <Link href="/" className="hover:underline">
            Back to Main Site
          </Link>
          <motion.button
            onClick={handleLogout}
            className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </nav>
      </div>
    </header>
  );
}