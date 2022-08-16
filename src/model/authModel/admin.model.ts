import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface AdminDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function (next) {
  let admin = this as AdminDocument;

  // only hash the password if it has been modified (or is new)
  if (!admin.isModified("password")) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(Number(process.env.SALT_WORK_FACTOR));

  const hash = await bcrypt.hashSync(admin.password, salt);

  // Replace the password with the hash
  admin.password = hash;

  return next();
});

// Used for logging in
AdminSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const admin = this as AdminDocument;

  return bcrypt.compare(candidatePassword, admin.password).catch((e) => false);
};

const Admin = mongoose.model<AdminDocument>("Admin", AdminSchema);

export default Admin;
