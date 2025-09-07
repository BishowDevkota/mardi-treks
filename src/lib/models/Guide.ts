// Updated Guide Model (create src/models/Guide.ts if not exists)
// Note: Based on your route fields, adding assignments array for availability tracking.

import mongoose, { Document, Schema } from "mongoose";

export interface IGuide extends Document {
  name: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  mobile: string;
  salary: number;
  nnid: string;
  createdAt: Date;
  updatedAt?: Date;
  assignments: {
    booking: mongoose.Types.ObjectId;
    start: Date;
    end: Date;
  }[];
}

const GuideSchema = new Schema<IGuide>({
  name: { type: String, required: true, trim: true },
  dateOfBirth: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true, unique: true },
  salary: { type: Number, required: true },
  nnid: { type: String, required: true, trim: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  assignments: [{
    booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  }]
}, { timestamps: true });

GuideSchema.index({ mobile: 1 }, { unique: true });
GuideSchema.index({ nnid: 1 }, { unique: true });
GuideSchema.index({ 'assignments.start': 1, 'assignments.end': 1 });

const Guide = mongoose.models.Guide || mongoose.model<IGuide>("Guide", GuideSchema);

export default Guide;