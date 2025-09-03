import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
  _id: string;
  trekKey: string;
  trekName: string;
  persons: number;
  pricePerPerson: number;
  totalPrice: number;
  originalPrice: number;
  discountedPrice: number;
  totalOriginalPrice: number;
  travelerId: mongoose.Types.ObjectId;
  departureDate: Date;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  bookingDate: Date;
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

const BookingSchema = new Schema<IBooking>({
  trekKey: {
    type: String,
    required: [true, "Trek key is required"],
    trim: true
  },
  trekName: {
    type: String,
    required: [true, "Trek name is required"],
    trim: true,
    maxlength: [100, "Trek name cannot exceed 100 characters"]
  },
  persons: {
    type: Number,
    required: [true, "Number of persons is required"],
    min: [1, "At least 1 person is required"],
    max: [50, "Maximum 50 persons allowed"]
  },
  pricePerPerson: {
    type: Number,
    required: [true, "Price per person is required"],
    min: [0, "Price cannot be negative"]
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required"],
    min: [0, "Total price cannot be negative"]
  },
  originalPrice: {
    type: Number,
    required: [true, "Original price is required"],
    min: [0, "Original price cannot be negative"]
  },
  discountedPrice: {
    type: Number,
    required: [true, "Discounted price is required"],
    min: [0, "Discounted price cannot be negative"]
  },
  totalOriginalPrice: {
    type: Number,
    required: [true, "Total original price is required"],
    min: [0, "Total original price cannot be negative"]
  },
  travelerId: {
    type: Schema.Types.ObjectId,
    ref: 'Traveler',
    required: [true, "Traveler ID is required"]
  },
  departureDate: {
    type: Date,
    required: [true, "Departure date is required"],
    validate: {
      validator: function(date: Date) {
        return date > new Date();
      },
      message: "Departure date must be in the future"
    }
  },
  status: {
    type: String,
    enum: ["Pending", "Confirm", "Cancelled", ],
    default: "Pending"
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Not Paid"],
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    maxlength: [500, "Notes cannot exceed 500 characters"]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
BookingSchema.index({ travelerId: 1 });
BookingSchema.index({ trekKey: 1 });
BookingSchema.index({ departureDate: 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ createdAt: -1 });

// Virtual to populate traveler details
BookingSchema.virtual('traveler', {
  ref: 'Traveler',
  localField: 'travelerId',
  foreignField: '_id',
  justOne: true
});

// Pre-save middleware to update updatedAt
BookingSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

// Post-save middleware to update traveler's booking count
BookingSchema.post('save', async function(booking) {
  try {
    const Traveler = mongoose.model('Traveler');
    await Traveler.findByIdAndUpdate(
      booking.travelerId,
      {
        $inc: { totalBookings: 1 },
        lastBookingDate: booking.bookingDate
      }
    );
  } catch (error) {
    console.error('Error updating traveler booking count:', error);
  }
});

// Instance method to calculate savings
BookingSchema.methods.calculateSavings = function() {
  return this.totalOriginalPrice - this.totalPrice;
};

// Static method to get bookings by date range
BookingSchema.statics.getBookingsByDateRange = function(startDate: Date, endDate: Date) {
  return this.find({
    departureDate: {
      $gte: startDate,
      $lte: endDate
    }
  }).populate('travelerId');
};

const Booking = mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;