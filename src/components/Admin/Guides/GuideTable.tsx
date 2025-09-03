"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { calculateAge } from '@/functions/calculateAge';

interface Guide {
  _id: string;
  name: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  mobile: string;
  salary: number;
  nnid: string;
  createdAt: string;
}

interface GuideTableProps {
  guides: Guide[];
}

export default function GuideTable({ guides: initialGuides }: GuideTableProps) {
  const [guides, setGuides] = useState<Guide[]>(initialGuides);
  const [newGuide, setNewGuide] = useState({
    name: '',
    dateOfBirth: '',
    gender: 'Male',
    mobile: '',
    salary: '',
    nnid: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const url = searchTerm ? `${baseUrl}/api/guides?name=${encodeURIComponent(searchTerm)}` : `${baseUrl}/api/guides`;
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to fetch guides');
        }
        const data = await response.json();
        setGuides(data);
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch guides');
      }
    };

    const debounce = setTimeout(fetchGuides, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleAddGuide = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/guides`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGuide),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add guide');
      }
      toast.success('Guide added successfully');
      setNewGuide({ name: '', dateOfBirth: '', gender: 'Male', mobile: '', salary: '', nnid: '' });
      const updatedGuides = await fetch(`${baseUrl}/api/guides`, { cache: 'no-store' }).then(res => res.json());
      setGuides(updatedGuides);
    } catch (error: any) {
      toast.error(error.message || 'Failed to add guide');
    }
  };

  return (
    <div className="p-8">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6">Manage Guides</h1>
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search guides by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        {/* Add Guide Form */}
        <div className="mb-6 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newGuide.name}
              onChange={(e) => setNewGuide({ ...newGuide, name: e.target.value })}
              className="p-2 border rounded-md"
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={newGuide.dateOfBirth}
              onChange={(e) => setNewGuide({ ...newGuide, dateOfBirth: e.target.value })}
              className="p-2 border rounded-md"
            />
            <select
              value={newGuide.gender}
              onChange={(e) => setNewGuide({ ...newGuide, gender: e.target.value })}
              className="p-2 border rounded-md"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Mobile"
              value={newGuide.mobile}
              onChange={(e) => setNewGuide({ ...newGuide, mobile: e.target.value })}
              className="p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Salary"
              value={newGuide.salary}
              onChange={(e) => setNewGuide({ ...newGuide, salary: e.target.value })}
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="NNID (e.g., 123-456-789)"
              value={newGuide.nnid}
              onChange={(e) => setNewGuide({ ...newGuide, nnid: e.target.value })}
              className="p-2 border rounded-md"
            />
          </div>
          <motion.button
            onClick={handleAddGuide}
            className="mt-4 bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Guide
          </motion.button>
        </div>
        {/* Guide Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-3 text-sm font-semibold">Name</th>
                <th className="p-3 text-sm font-semibold">Date of Birth</th>
                <th className="p-3 text-sm font-semibold">Age</th>
                <th className="p-3 text-sm font-semibold">Gender</th>
                <th className="p-3 text-sm font-semibold">Mobile</th>
                <th className="p-3 text-sm font-semibold">Salary</th>
                <th className="p-3 text-sm font-semibold">NNID</th>
                <th className="p-3 text-sm font-semibold">Created At</th>
                <th className="p-3 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guides.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-3 text-center text-gray-500">
                    No guides found
                  </td>
                </tr>
              ) : (
                guides.map((guide) => (
                  <GuideRow key={guide._id} guide={guide} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

function GuideRow({ guide }: { guide: Guide }) {
  const [data, setData] = useState({
    mobile: guide.mobile,
    salary: guide.salary.toString(),
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`${baseUrl}/api/guides/${guide._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      toast.success('Guide updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update guide');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${baseUrl}/api/guides/${guide._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      toast.success('Guide deleted successfully');
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete guide');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="p-3 text-sm">{guide.name}</td>
      <td className="p-3 text-sm">{guide.dateOfBirth}</td>
      <td className="p-3 text-sm">{calculateAge(guide.dateOfBirth)}</td>
      <td className="p-3 text-sm">{guide.gender}</td>
      <td className="p-3 text-sm">
        <input
          type="text"
          value={data.mobile}
          onChange={(e) => setData({ ...data, mobile: e.target.value })}
          className="p-1 border rounded-md w-full"
        />
      </td>
      <td className="p-3 text-sm">
        <input
          type="number"
          value={data.salary}
          onChange={(e) => setData({ ...data, salary: e.target.value })}
          className="p-1 border rounded-md w-full"
        />
      </td>
      <td className="p-3 text-sm">{guide.nnid}</td>
      <td className="p-3 text-sm">
        {guide.createdAt ? new Date(guide.createdAt).toLocaleDateString() : 'N/A'}
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
          disabled={isDeleting}
          className={`bg-red-600 text-white p-2 rounded-md hover:bg-red-700 disabled:bg-gray-400`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </motion.button>
      </td>
    </tr>
  );
}