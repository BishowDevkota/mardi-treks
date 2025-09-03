// src/app/admin/page.tsx
import AdminDashboard from '@/components/Admin/AdminDashboard';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

// Booking type for the frontend (serialized)
export interface Booking {
  _id: string;
  trekKey: string;
  trekName: string;
  persons: number;
  pricePerPerson: number;
  totalPrice: number;
  originalPrice: number;
  discountedPrice: number;
  totalOriginalPrice: number;
  paymentStatus: string;
  status: string;
  fullName: string;
  email: string;
  country: string;
  phone: string;
  departureDate: string | null;
  createdAt: string | null;
}

// MongoDB document type (raw data from MongoDB)
interface MongoBooking {
  _id: ObjectId;
  trekKey?: string;
  trekName?: string;
  persons?: number;
  pricePerPerson?: number;
  totalPrice?: number;
  originalPrice?: number;
  discountedPrice?: number;
  totalOriginalPrice?: number;
  paymentStatus?: string;
  status?: string;
  fullName?: string;
  email?: string;
  country?: string;
  phone?: string;
  departureDate?: Date;
  createdAt?: Date;
}

// Serialize MongoDB docs
function serializeBookings(bookings: MongoBooking[]): Booking[] {
  return bookings.map((b) => ({
    _id: b._id instanceof ObjectId ? b._id.toString() : String(b._id),
    trekKey: b.trekKey || '',
    trekName: b.trekName || '',
    persons: b.persons || 0,
    pricePerPerson: b.pricePerPerson || 0,
    totalPrice: b.totalPrice || 0,
    originalPrice: b.originalPrice || 0,
    discountedPrice: b.discountedPrice || 0,
    totalOriginalPrice: b.totalOriginalPrice || 0,
    paymentStatus: b.paymentStatus || 'pending',
    status: b.status || 'pending',
    fullName: b.fullName || '',
    email: b.email || '',
    country: b.country || '',
    phone: b.phone || '',
    departureDate: b.departureDate
      ? new Date(b.departureDate).toISOString()
      : null,
    createdAt: b.createdAt ? new Date(b.createdAt).toISOString() : null,
  }));
}

// Fetch from MongoDB
async function getBookings(): Promise<Booking[]> {
  try {
    const client = await clientPromise;
    const db = client.db('trekdb');
    const bookings = (await db.collection('bookings').find({}).toArray()) as MongoBooking[];
    return serializeBookings(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
}

// Admin Page
export default async function AdminPage() {
  const bookings = await getBookings();
  return <AdminDashboard bookings={bookings} />;
}