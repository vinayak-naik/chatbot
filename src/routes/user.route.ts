import { Application } from "express";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  invalidateUserSessionHandler,
} from "../controller/session.controller";
import { createUserHandler } from "../controller/auth.controller";
import { requiresUser } from "../middleware/requiresAuth";
import { validateRequest } from "../middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "../schema/auth.schema";

export const registerUser = (app: Application) => {
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);
};
export const loginUser = (app: Application) => {
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );
};
export const getSession = (app: Application) => {
  app.get("/api/sessions", getUserSessionsHandler);
};
export const logoutUser = (app: Application) => {
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);
};
