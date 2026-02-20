import app from "./app.js";
import { env } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";
import logger from "./src/config/logger.js";

connectDB();

app.listen(env.PORT, () => {
  logger.info(
    `Server running on http://localhost:${env.PORT} (${env.NODE_ENV})`,
  );
});
