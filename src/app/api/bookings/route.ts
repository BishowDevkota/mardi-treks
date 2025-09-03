import clientPromise from '@/lib/mongodb';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('trekdb'); // Database name

    const data = await request.json();

    // Extract traveler info for separate storage (for marketing), excluding departureDate
    const { fullName, email, country, phone } = data;
    const travelerData = { fullName, email, country, phone, createdAt: new Date() };

    // Normalize fields for duplicate check (trim and lowercase)
    const normalizedFullName = fullName.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();

    // Check for existing traveler with same fullName, email, and phone
    const existingTraveler = await db.collection('travelers').findOne({
      fullName: { $regex: `^${normalizedFullName}$`, $options: 'i' },
      email: { $regex: `^${normalizedEmail}$`, $options: 'i' },
      phone: normalizedPhone
    });

    // Only insert traveler info if no duplicate exists
    if (!existingTraveler) {
      await db.collection('travelers').insertOne(travelerData);
    }

    // Store full booking info (including traveler details, paymentStatus, and status) in 'bookings' collection
    const bookingData = { ...data, createdAt: new Date() };
    const result = await db.collection('bookings').insertOne(bookingData);

    console.log(`Booking created: ${result.insertedId}`);
    return new Response(JSON.stringify({ bookingId: result.insertedId.toString() }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) { // Changed 'any' to 'unknown'
    console.error('Error creating booking:', error);
    return new Response(JSON.stringify({ error: 'Failed to create booking' }), { status: 500 });
  }
}