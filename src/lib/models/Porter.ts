// Updated Porter Model (create src/models/Porter.ts if not exists)
// Similar to Guide.

import mongoose, { Document, Schema } from "mongoose";

export interface IPorter extends Document {
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

const PorterSchema = new Schema<IPorter>({
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

PorterSchema.index({ mobile: 1 }, { unique: true });
PorterSchema.index({ nnid: 1 }, { unique: true });
PorterSchema.index({ 'assignments.start': 1, 'assignments.end': 1 });

const Porter = mongoose.models.Porter || mongoose.model<IPorter>("Porter", PorterSchema);

export default Porter;