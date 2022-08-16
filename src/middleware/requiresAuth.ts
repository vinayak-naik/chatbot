import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import Admin from "../model/authModel/admin.model";
import User from "../model/authModel/user.model";

export const requiresUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = get(req, "user");
  if (!user) {
    return res.sendStatus(403);
  }
  const valid = await User.findOne({ email: user.email });

  if (!valid) {
    return res.sendStatus(403);
  }
  return next();
};
// =============================ADMIN=================================
export const requiresAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admin = get(req, "admin");
  if (!admin) {
    return res.sendStatus(403);
  }
  const valid = await Admin.findOne({ email: admin.email });

  if (!valid) {
    return res.sendStatus(403);
  }

  return next();
};
