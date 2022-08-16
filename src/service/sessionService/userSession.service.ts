import { FilterQuery, UpdateQuery } from "mongoose";
import config from "config";
import { get } from "lodash";
import Session, { SessionDocument } from "../../model/sessionModel/userSession.model";
import { sign, decode } from "../../utils/jwt.utils";
import { findUser } from "../authService/user.service";

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
}

export function createUserAccessToken({
  user,
  session,
}: {
  user: any;
  session: any;
}) {
  // Build and return the new access token
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: process.env.ACCESS_TOKEN_PERIOD } // 15 minutes
  );

  return accessToken;
}


export async function reIssueAccessToken({
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

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = createUserAccessToken({ user, session });

  return accessToken;
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
}
