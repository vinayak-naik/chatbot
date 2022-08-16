import config from "config";
import { get } from "lodash";
import { Request, Response } from "express";
import { validateUserPassword } from "../service/authService/user.service";
import { validateAdminPassword } from "../service/authService/admin.service";
import {
  createSession,
  createUserAccessToken,
  updateSession,
  findSessions,
} from "../service/sessionService/userSession.service";
import { sign } from "../utils/jwt.utils";
import { createAdminAccessToken } from "../service/sessionService/adminSession.service";

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the email and password
  const user = await validateUserPassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid username or password");
  }
  // Create a session
  const session = await createSession(user._id, req.get("user-agent") || "");
  // create access token
  const accessToken = createUserAccessToken({
    user,
    session,
  });
  // create refresh token
  const refreshToken = sign(session, {
    expiresIn: process.env.REFRESH_TOKEN_PERIOD, // 1 year
  });
  // send refresh & access token back
  return res.send({ accessToken, refreshToken });
}
export async function createAdminSessionHandler(req: Request, res: Response) {
  // validate the email and password
  const admin = await validateAdminPassword(req.body);
  if (!admin) {
    return res.status(401).send("Invalid adminname or password");
  }
  // Create a session
  const session = await createSession(admin._id, req.get("admin-agent") || "");
  // create access token
  const accessToken = createAdminAccessToken({
    admin,
    session,
  });
  // create refresh token
  const refreshToken = sign(session, {
    expiresIn: process.env.REFRESH_TOKEN_PERIOD, // 1 year
  });
  // send refresh & access token back
  return res.send({ accessToken, refreshToken });
}

export async function invalidateUserSessionHandler(
  req: Request,
  res: Response
) {
  const sessionId = get(req, "user.session");
  await updateSession({ _id: sessionId }, { valid: false });
  return res.sendStatus(200);
}
export async function invalidateAdminSessionHandler(
  req: Request,
  res: Response
) {
  const sessionId = get(req, "admin.session");
  await updateSession({ _id: sessionId }, { valid: false });
  return res.sendStatus(200);
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
}
export async function getAdminSessionsHandler(req: Request, res: Response) {
  const adminId = get(req, "admin._id");
  const sessions = await findSessions({ admin: adminId, valid: true });
  return res.send(sessions);
}
