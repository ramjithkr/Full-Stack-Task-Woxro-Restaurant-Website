import "dotenv/config";

export const env = {
  //APP
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",

  // Database
  MONGO_URI: process.env.MONGO_URI 
};
