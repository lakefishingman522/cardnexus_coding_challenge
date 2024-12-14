import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Function to connect to the MongoDB database
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("connected to DB!"))
    .catch((error) => console.error(error));
};

// Function to disconnect from the MongoDB database
const disconnectDB = async () => {
  await mongoose.disconnect();
};

// Load the db config
const dbConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./db.config.json"), "utf-8")
);

export { connectDB, disconnectDB, dbConfig };
