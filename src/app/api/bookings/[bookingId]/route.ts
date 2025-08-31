// app/api/bookings/[bookingId]/route.ts
import { NextResponse, NextRequest } from 'next/server'; // Added NextRequest
import { v4 as uuidv4 } from 'uuid';

// Define the Booking interface
interface Booking {
  bookingId: string;
  trekKey: string;
  trekName: string;
  persons: number;
  pricePerPerson: number;
  totalPrice: number;
  originalPrice: number;
  discountedPrice: number;
  totalOriginalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled'; // Add other possible statuses as needed
}

const bookings: { [key: string]: Booking } = {};

export async function POST(req: Request) {
  try {
    const { 
      trekKey, 
      trekName, 
      persons, 
      pricePerPerson, 
      totalPrice, 
      originalPrice, 
      discountedPrice, 
      totalOriginalPrice 
    } = await req.json();

    if (!trekKey || !trekName || !persons || !pricePerPerson || !totalPrice || !originalPrice || !discountedPrice || !totalOriginalPrice) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const bookingId = uuidv4();
    bookings[bookingId] = {
      bookingId,
      trekKey,
      trekName,
      persons,
      pricePerPerson,
      totalPrice,
      originalPrice,
      discountedPrice,
      totalOriginalPrice,
      status: 'pending',
    };

    return NextResponse.json({ bookingId });
  } catch {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params; // Await params to resolve the Promise

  if (!bookings[bookingId]) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  return NextResponse.json(bookings[bookingId]);
}