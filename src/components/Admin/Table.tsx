import BookingRow from "./BookingRow";

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

interface TableProps {
  bookings: Booking[];
}

export default function Table({ bookings }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 text-sm font-semibold">Booking ID</th>
            <th className="p-3 text-sm font-semibold">Trek Name</th>
            <th className="p-3 text-sm font-semibold">Persons</th>
            <th className="p-3 text-sm font-semibold">Total Price</th>
            <th className="p-3 text-sm font-semibold">Payment Status</th>
            <th className="p-3 text-sm font-semibold">Booking Status</th>
            <th className="p-3 text-sm font-semibold">Full Name</th>
            <th className="p-3 text-sm font-semibold">Email</th>
            <th className="p-3 text-sm font-semibold">Phone</th>
            <th className="p-3 text-sm font-semibold">Departure Date</th>
            <th className="p-3 text-sm font-semibold">Created At</th>
            <th className="p-3 text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={12} className="p-3 text-center text-gray-500">
                No bookings found
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <BookingRow key={booking._id} booking={booking} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}