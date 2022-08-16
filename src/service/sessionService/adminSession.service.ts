import { LeanDocument, FilterQuery, UpdateQuery } from "mongoose";
import config from "config";
import { get } from "lodash";
import Session, { AdminSessionDocument } from "../../model/sessionModel/adminSession.model";
import { sign, decode } from "../../utils/jwt.utils";
import { findAdmin } from "../authService/admin.service";

export async function createAdminSession(adminId: string, adminAgent: string) {
  const session = await Session.create({ admin: adminId, adminAgent });

  return session.toJSON();
}


export function createAdminAccessToken({
  admin,
  session,
}: {
  admin: any;
  session: any;
}) {
  // Build and return the new access token
  const accessToken = sign(
    { ...admin, session: session._id },
    { expiresIn: process.env.ACCESS_TOKEN_PERIOD } // 15 minutes
  );

  return accessToken;
}

export async function reIssueAdminAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  // Decode the refresh token
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, "_id")) return false;

  // Get the session
  const session = await Session.findById(get(decoded, "_id"));

  // Make sure the session is still valid
  if (!session || !session.valid) return false;

  const admin = await findAdmin({ _id: session.admin });

  if (!admin) return false;

  const accessToken = createAdminAccessToken({ admin, session });

  return accessToken;
}

export async function updateSession(
  query: FilterQuery<AdminSessionDocument>,
  update: UpdateQuery<AdminSessionDocument>
) {
  return Session.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<AdminSessionDocument>) {
  return Session.find(query).lean();
}
