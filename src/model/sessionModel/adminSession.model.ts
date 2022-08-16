import mongoose from "mongoose";
import { AdminDocument } from "../authModel/admin.model";

export interface AdminSessionDocument extends mongoose.Document {
  admin: AdminDocument["_id"];
  valid: boolean;
  adminAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSessionSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    valid: { type: Boolean, default: true },
    adminAgent: { type: String },
  },
  { timestamps: true }
);

const AdminSession = mongoose.model<AdminSessionDocument>("AdminSession", AdminSessionSchema);

export default AdminSession;
