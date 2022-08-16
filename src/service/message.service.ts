import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Message, { MessageDocument } from "../model/message.model";
import { Request, Response } from "express";


export function createMessage(input: DocumentDefinition<MessageDocument>) {
  return Message.create(input);
}

export function findMessage(
  query: FilterQuery<MessageDocument>,
  options: QueryOptions = { lean: true }
) {
  return Message.findOne(query, {}, options);
}
export async function findAllMessages(req: Request) {
  // return Message.find({});

  const { limit, skip, search } = req.query;
  const fileLimit = limit?Number(limit):4;
  const fileSkip = skip?Number(skip):0;

  const query = search
    ? { question: { $regex:`(?i)${search}(?-i)`} }
    : {};
  const find = await Message.find(query);
  let result = await Message.find(query)
    .limit(fileLimit)
    .skip(fileLimit * fileSkip);
  // return result;
  return {total:find.length,result};













}

export function findAndUpdate(
  query: FilterQuery<MessageDocument>,
  update: UpdateQuery<MessageDocument>,
  options: QueryOptions
) {
  return Message.findOneAndUpdate(query, update, options);
}

export function deleteMessage(query: FilterQuery<MessageDocument>) {
  return Message.deleteOne(query);
}
