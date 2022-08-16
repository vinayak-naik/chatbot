import { Application } from "express";
import {
  createAdminSessionHandler,
  getAdminSessionsHandler,
  invalidateAdminSessionHandler,
} from "../controller/session.controller";
import { createAdminHandler } from "../controller/auth.controller";
import { requiresAdmin } from "../middleware/requiresAuth";
import { validateRequest } from "../middleware";
import {
  createAdminSchema,
  createAdminSessionSchema,
} from "../schema/auth.schema";

export const registerAdmin = (app: Application) => {
  app.post("/api/admin", validateRequest(createAdminSchema), createAdminHandler);
};
export const loginAdmin = (app: Application) => {
  app.post(
    "/api/admin-sessions",
    validateRequest(createAdminSessionSchema),
    createAdminSessionHandler
  );
};
export const getAdminSession = (app: Application) => {
  app.get("/api/admin-sessions", requiresAdmin, getAdminSessionsHandler);
};
export const logoutAdmin = (app: Application) => {
  app.delete("/api/admin-sessions", requiresAdmin, invalidateAdminSessionHandler);
};
