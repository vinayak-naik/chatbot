import { Application } from "express";
import { requiresAdmin, requiresUser, validateRequest } from "../middleware";
import {
  createMessageSchema,
  deleteMessageSchema,
  updateMessageSchema,
} from "../schema/message.schema";
import {
  createMessageHandler,
  deleteMessageHandler,
  getAllMessageHandler,
  getMessageHandler,
  updateMessageHandler,
} from "../controller/message.controller";

export const addMessage = (app: Application) => {
  app.post(
    "/api/message",
    [validateRequest(createMessageSchema)],
    createMessageHandler
  );
};
export const updateMessage = (app: Application) => {
  app.put(
    "/api/message/:messageId",
    [validateRequest(updateMessageSchema)],
    updateMessageHandler
  );
};
export const getMessage = (app: Application) => {
  app.get("/api/message/:messageId",  getMessageHandler);
};
export const getAllMessage = (app: Application) => {
  app.get("/api/messages", getAllMessageHandler);
};
export const deleteMessage = (app: Application) => {
  app.delete(
    "/api/message/:messageId",
    [ validateRequest(deleteMessageSchema)],
    deleteMessageHandler
  );
};
