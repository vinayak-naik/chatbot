import { Request, Response } from "express";
import { get } from "lodash";
import {
  createMessage,
  findMessage,
  findAndUpdate,
  deleteMessage,
  findAllMessages
} from "../service/message.service";

export async function createMessageHandler(req: Request, res: Response) {

  const userId = get(req, "user._id");
  const body = req.body;


  const message = await createMessage({ ...body, user: userId });


  return res.send(message);
}

export async function updateMessageHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const messageId = get(req, "params.messageId");
  const update = req.body;

  const message = await findMessage({ messageId });

  if (!message) {
    return res.sendStatus(404);
  }

  // if (String(message.user) !== userId) {
  //   return res.sendStatus(401);
  // }

  const updatedMessage = await findAndUpdate({ messageId }, update, { new: true });

  return res.send(updatedMessage);
}
export async function getMessageHandler(req: Request, res: Response) {
  const messageId = get(req, "params.messageId");
  const message = await findMessage({ messageId });

  if (!message) {
    return res.sendStatus(404);
  }

  return res.send(message);
}

export async function getAllMessageHandler(req: Request, res: Response) {
  const message = await findAllMessages(req);
  return res.send(message);
}

export async function deleteMessageHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const messageId = get(req, "params.messageId");

  const message = await findMessage({ messageId });

  if (!message) {
    return res.sendStatus(404);
  }

  // if (String(message.user) !== String(userId)) {
  //   return res.sendStatus(401);
  // }

  await deleteMessage({ messageId });

  return res.sendStatus(200);
}
