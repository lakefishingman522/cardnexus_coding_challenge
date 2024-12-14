import mongoose from "mongoose";
import { dbConfig } from "../config/db";

const CardSchema = new mongoose.Schema({
  ...dbConfig.commonAttributes,
  ...{ discriminatorKey: "game" }, // Field used for discriminators
});

// indexing
dbConfig.indexing.forEach((index: object) => {
  CardSchema.index(index as mongoose.IndexDefinition);
});

// Create Universal Model
const Card = mongoose.model("card", CardSchema);

export default Card;
