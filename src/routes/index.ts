import { Application } from "express";
import { healthCheck } from "./healthCheck.route";
import { getSession, loginUser, logoutUser, registerUser } from "./user.route";
import {
  addMessage,
  deleteMessage,
  getAllMessage,
  getMessage,
  updateMessage,
} from "./message.route";
import { getAdminSession, loginAdmin, logoutAdmin, registerAdmin } from "./admin.route";

export default function (app: Application) {
  // <==========>HEALTH CHECK<==========>
  healthCheck(app);
  // <==========>USER ROUTES<==========>
  registerUser(app);
  // Login
  loginUser(app);
  // Get the user's sessions
  getSession(app);
  // Logout
  logoutUser(app);
  // <==========>ADMIN ROUTES<==========>
  registerAdmin(app);
  // Login Admin
  loginAdmin(app);
  // Get the Admin's sessions
  getAdminSession(app);
  // Logout Admin
  logoutAdmin(app);
  // <==========>MESSAGE ROUTES<==========>
  // add a message
  addMessage(app);
  // Update a message
  updateMessage(app);
  // Get a message
  getMessage(app);
  // Get all messages
  getAllMessage(app);
  // Delete a message
  deleteMessage(app);
}
