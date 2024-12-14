/**
 * Your logic for CARD will be here
 */

import { dbConfig } from "../config/db";
import Card from "../models/card";
import { safeFind } from "../utils/utils";

// get game names
const gameNames = Object.keys(dbConfig.gameSpecificAttributes);

export const filterCard = async ({ input }: any) => {
  if (input.game.length === 0) return [];

  // Generate the mongo query
  const query: any = {};

  // add game names, don't need to add filter if `refactoredInput.game` is full
  if (input.game.length < gameNames.length)
    query.game = input.game.length === 1 ? input.game[0] : { $in: input.game };

  // add name filter
  if (input.name?.length > 0)
    query.name = { $regex: input.name[0], $options: "i" };

  // add rarity
  if (input.rarity?.length > 0)
    query.rarity =
      input.rarity.length === 1 ? input.rarity[0] : { $in: input.rarity };

  // add color
  if (input.color?.length > 0)
    query["attributes.color"] =
      input.color.length === 1 ? input.color[0] : { $in: input.color };

  // add ink_cost
  if (input.ink_cost?.length > 0)
    query["attributes.ink_cost"] =
      input.ink_cost.length === 1
        ? input.ink_cost[0]
        : { $gte: input.ink_cost[0], $lte: input.ink_cost[1] };

  const cards = await safeFind(Card, query);
  // const cards = await Card.find(query, { _id: 0, __v: 0 }).lean();
  return cards;
};
