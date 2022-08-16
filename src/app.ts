import express, { Application } from "express";
import routes from "./routes";
import connect from "./db/connect";
import { deserializeUser } from "./middleware";
import log from "./logger";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config()
const port = process.env.PORT || 1337
const host = process.env.HOST || "localhost"
const app: Application = express();

app.use(cors());
app.use(deserializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(port,() => {
  log.info(`Server listing at http://${host}:${port}`);
  connect();
  routes(app);
});
