import { object, string } from "yup";

const payload = {
  body: object({
    question: string().required("Question is required")
  }),
};
const answer = {
  body: object({
    question: string().required("Question is required"),
    answer: string().required("answer is required")
  }),
};

const params = {
  params: object({
    messageId: string().required("messageId is required"),
  }),
};

export const createMessageSchema = object({
  ...payload,
});

export const updateMessageSchema = object({
  ...params,
  ...payload,
});

export const deleteMessageSchema = object({
  ...params,
});
