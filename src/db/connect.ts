import mongoose from "mongoose";
import config from "config";
import log from "../logger";

function connect() {
  const mongodbLocal = process.env.MONGODB_LOCAL || ""
  const mongodbAtlas = process.env.MONGODB_ATLAS || ""

  return mongoose
    .connect(mongodbAtlas)
    .then(() => {
      log.info("Database connected");
    })
    .catch((error) => {
      log.error("db error", error);
      process.exit(1);
    });
}

export default connect;
