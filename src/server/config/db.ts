import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { convertTypes } from "../utils/utils";
import DBConfigInteface from "../types/DBConfig";

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
const jsonConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./db.config.json"), "utf-8")
);
const dbConfig = convertTypes(jsonConfig) as DBConfigInteface;

export { connectDB, disconnectDB, dbConfig };
