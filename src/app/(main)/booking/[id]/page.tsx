import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

async function getBooking(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db('trekdb');
    return await db.collection('bookings').findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return null;
  }
}

export default async function BookingPage({ params }: { params: { id: string } }) {
  const booking = await getBooking(params.id);

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="relative overflow-hidden group
          backdrop-blur-xl bg-white/70 
          border border-gray-200/50 rounded-2xl
          shadow-[0_20px_50px_rgba(0,0,0,0.1)]
          p-8 transition-all duration-500
          hover:scale-105 hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]">
          
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
          <h1 className="text-2xl font-bold text-gray-800 relative z-10">Booking Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Booking Details</h1>
          <div className="w-20 h-1 bg-gray-400 mx-auto rounded-full"></div>
        </div>
        
        {/* Single row on large screens, stacked on smaller screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Booking Information Card */}
          <div className="group relative">
            <div className="relative backdrop-blur-xl bg-white/70 
              border border-gray-200/50 rounded-3xl
              shadow-[0_20px_50px_rgba(0,0,0,0.1)]
              p-8 transition-all duration-500
              hover:scale-105 hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]
              overflow-hidden">
              
              {/* Shining effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold mb-8 text-gray-800 pb-4 border-b border-gray-200/50">
                  Booking Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gray-50/50 backdrop-blur-sm">
                    <span className="font-medium text-gray-600">Booking ID:</span>
                    <span className="text-gray-800 font-mono text-sm bg-white/80 px-3 py-1 rounded-lg shadow-sm">{params.id}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gray-50/50 backdrop-blur-sm">
                    <span className="font-medium text-gray-600">Trek Name:</span>
                    <span className="text-gray-800 font-semibold">{booking.trekName}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gray-50/50 backdrop-blur-sm">
                    <span className="font-medium text-gray-600">Number of Persons:</span>
                    <span className="text-gray-800 bg-white/80 px-4 py-2 rounded-full font-semibold shadow-sm">{booking.persons}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gray-50/50 backdrop-blur-sm">
                    <span className="font-medium text-gray-600">Price per Person:</span>
                    <div className="flex items-center gap-3">
                      <span className="line-through text-gray-400 bg-gray-100 px-2 py-1 rounded text-sm">${booking.originalPrice}</span>
                      <span className="text-gray-800 font-bold bg-white/80 px-3 py-1 rounded-lg shadow-sm">${booking.discountedPrice}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gray-50/50 backdrop-blur-sm">
                    <span className="font-medium text-gray-600">Total Price:</span>
                    <div className="flex items-center gap-3">
                      <span className="line-through text-gray-400 bg-gray-100 px-2 py-1 rounded text-sm">${booking.totalOriginalPrice}</span>
                      <span className="text-gray-800 font-bold text-lg bg-white/80 px-4 py-2 rounded-lg shadow-md">${booking.totalPrice}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gray-50/50 backdrop-blur-sm">
                    <span className="font-medium text-gray-600">Payment Status:</span>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
                      booking.paymentStatus === 'paid' 
                        ? 'bg-white/80 text-gray-800 border border-gray-300' 
                        : 'bg-white/80 text-gray-800 border border-gray-300'
                    }`}>
                      {booking.paymentStatus}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gray-50/50 backdrop-blur-sm">
                    <span className="font-medium text-gray-600">Status:</span>
                    <span className="bg-white/80 text-gray-800 px-4 py-2 rounded-full text-sm font-medium border border-gray-300 shadow-sm">
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Traveler Information Card */}
          <div className="group relative">
            <div className="relative backdrop-blur-xl bg-white/70 
              border border-gray-200/50 rounded-3xl
              shadow-[0_20px_50px_rgba(0,0,0,0.1)]
              p-8 transition-all duration-500
              hover:scale-105 hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]
              overflow-hidden">
              
              {/* Shining effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold mb-8 text-gray-800 pb-4 border-b border-gray-200/50">
                  Traveler Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gray-50/50 backdrop-blur-sm">
                    <span className="font-medium text-gray-600">Full Name:</span>
                    <span className="text-gray-800 font-semibold">{booking.fullName}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gray-50/50 backdrop-blur-sm">
                    <span className="font-medium text-gray-600">Email:</span>
                    <span className="text-gray-800 break-all">{booking.email}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gray-50/50 backdrop-blur-sm">
                    <span className="font-medium text-gray-600">Country:</span>
                    <span className="text-gray-800">{booking.country}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gray-50/50 backdrop-blur-sm">
                    <span className="font-medium text-gray-600">Phone Number:</span>
                    <span className="text-gray-800">{booking.phone}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gray-50/50 backdrop-blur-sm">
                    <span className="font-medium text-gray-600">Departure Date:</span>
                    <span className="text-gray-800 font-semibold bg-white/80 px-3 py-1 rounded-lg shadow-sm">{booking.departureDate}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gray-50/50 backdrop-blur-sm">
                    <span className="font-medium text-gray-600">Created At:</span>
                    <span className="text-gray-700 text-sm">{new Date(booking.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}