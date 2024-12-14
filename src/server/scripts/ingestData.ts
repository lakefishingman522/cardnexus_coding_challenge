import { dbConfig, connectDB, disconnectDB } from "../config/db";
import fs from "fs";
import path from "path";
import { formatKeysInObjects } from "../utils/utils";
import Card from "../models/card";

const loadAndUploadCardData = async (dataPath: string, gameName: string) => {
  const data = JSON.parse(
    fs.readFileSync(path.join("./src/server/config", dataPath), "utf-8")
  );

  // format the data aligned to schema
  const formattedData = formatKeysInObjects(
    data,
    Object.keys(dbConfig.commonAttributes),
    {
      game: gameName,
    }
  );

  // store data into db
  const insertResponse = await Card.insertMany(formattedData, {
    ordered: false,
  });

  console.log(
    `${insertResponse.length} ${gameName} cards ingested successfully.`
  );
};

const ingestData = async () => {
  const gameNames: string[] = Object.keys(dbConfig.gameSpecificAttributes);

  await connectDB();
  await Promise.all(
    gameNames.map((gameName) => {
      return loadAndUploadCardData(dbConfig.gameDataPaths[gameName], gameName);
    })
  );
  await disconnectDB();
};

ingestData();
