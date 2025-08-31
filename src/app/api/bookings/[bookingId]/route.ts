// app/api/bookings/[bookingId]/route.ts
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const bookings: { [key: string]: any } = {};

export async function POST(req: Request) {
  try {
    const { trekKey, trekName, persons, pricePerPerson, totalPrice, originalPrice, discountedPrice, totalOriginalPrice } = await req.json();

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
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { bookingId: string } }) {
  const { bookingId } = params;

  if (!bookings[bookingId]) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  return NextResponse.json(bookings[bookingId]);
}