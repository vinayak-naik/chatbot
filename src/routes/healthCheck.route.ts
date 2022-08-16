import { Application, Request, Response } from "express";

export const healthCheck = (app: Application) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Server is running");
  });
};
