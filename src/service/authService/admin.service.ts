import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import Admin, { AdminDocument } from "../../model/authModel/admin.model";

export async function createAdmin(input: AdminDocument) {
  try {
    return await Admin.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findAdmin(query: FilterQuery<AdminDocument>) {
  return Admin.findOne(query).lean();
}

export async function validateAdminPassword({
  email,
  password,
}: {
  email: AdminDocument["email"];
  password: string;
}) {
  const admin = await Admin.findOne({ email });

  if (!admin) {
    return false;
  }

  const isValid = await admin.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(admin.toJSON(), "password");
}
