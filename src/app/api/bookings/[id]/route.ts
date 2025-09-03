import clientPromise from '@/lib/mongodb';
import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';

export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('trekdb');
    const { status: initialStatus, paymentStatus } = await request.json(); // Renamed 'status' to 'initialStatus' for clarity
    let status = initialStatus; // Use 'let' to allow reassignment
    const url = new URL(request.url);
    const bookingId = url.pathname.split('/').pop();

    console.log('PUT request received:', { bookingId, status, paymentStatus });

    if (!bookingId || !ObjectId.isValid(bookingId)) {
      console.error('Invalid booking ID:', bookingId);
      return new Response(JSON.stringify({ error: 'Invalid booking ID' }), { status: 400 });
    }

    // Capitalize allowed values
    const validStatuses = ['Pending', 'Confirm', 'Cancel'];
    const validPaymentStatuses = ['Pending', 'Not Paid', 'Paid'];

    if (!validStatuses.includes(status) || !validPaymentStatuses.includes(paymentStatus)) {
      console.error('Invalid status or paymentStatus:', { status, paymentStatus });
      return new Response(JSON.stringify({ error: 'Invalid status or paymentStatus' }), { status: 400 });
    }

    // If paymentStatus is 'Paid', force status to 'Confirm'
    if (paymentStatus === 'Paid') {
      status = 'Confirm';
    }

    const result = await db.collection('bookings').updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status, paymentStatus } }
    );

    if (result.matchedCount === 0) {
      console.error('Booking not found:', bookingId);
      return new Response(JSON.stringify({ error: 'Booking not found' }), { status: 404 });
    }

    console.log(`Booking ${bookingId} updated: status=${status}, paymentStatus=${paymentStatus}`);
    return new Response(JSON.stringify({ message: 'Booking updated successfully' }), { status: 200 });
  } catch (error: unknown) {
    console.error('Error updating booking:', error);
    return new Response(JSON.stringify({ error: 'Failed to update booking' }), { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('trekdb');
    const url = new URL(request.url);
    const bookingId = url.pathname.split('/').pop();

    console.log('DELETE request received:', { bookingId });

    if (!bookingId || !ObjectId.isValid(bookingId)) {
      console.error('Invalid booking ID:', bookingId);
      return new Response(JSON.stringify({ error: 'Invalid booking ID' }), { status: 400 });
    }

    // Check if booking status is 'Confirm'
    const booking = await db.collection('bookings').findOne({ _id: new ObjectId(bookingId) });
    if (!booking) {
      console.error('Booking not found:', bookingId);
      return new Response(JSON.stringify({ error: 'Booking not found' }), { status: 404 });
    }

    if (booking.status === 'Confirm') {
      console.error('Cannot delete Confirmed booking:', bookingId);
      return new Response(JSON.stringify({ error: 'Cannot delete Confirmed booking' }), { status: 403 });
    }

    const result = await db.collection('bookings').deleteOne({ _id: new ObjectId(bookingId) });

    if (result.deletedCount === 0) {
      console.error('Booking not found:', bookingId);
      return new Response(JSON.stringify({ error: 'Booking not found' }), { status: 404 });
    }

    console.log(`Booking ${bookingId} deleted successfully`);
    return new Response(JSON.stringify({ message: 'Booking deleted successfully' }), { status: 200 });
  } catch (error: unknown) {
    console.error('Error deleting booking:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete booking' }), { status: 500 });
  }
}