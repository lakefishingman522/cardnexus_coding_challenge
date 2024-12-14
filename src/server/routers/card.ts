/**
 * Your logic for routing will be here
 */

import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { filterCard } from "../controllers/card";
import { toStringTuple, mergeEnum } from "../utils/utils";
import { dbConfig } from "../config/db";

// get game names
const gameNames = Object.keys(dbConfig.gameSpecificAttributes);
console.log(gameNames);

export const cardRouter = router({
  filter: publicProcedure
    .input(
      z
        .object({
          game: z
            .union([
              z.enum(toStringTuple(gameNames)),
              z.array(z.enum(toStringTuple(gameNames)).optional()),
            ])
            .optional(),
          name: z.string().optional(),
          rarity: z
            .union([
              z.enum(
                toStringTuple(
                  mergeEnum(
                    "rarity",
                    gameNames,
                    dbConfig.gameSpecificAttributes
                  )
                )
              ),
              z.array(
                z.enum(
                  toStringTuple(
                    mergeEnum(
                      "rarity",
                      gameNames,
                      dbConfig.gameSpecificAttributes
                    )
                  )
                )
              ),
            ])
            .optional(), // you can replace it with the simple validation `rarity: z.union([z.string(), z.array(z.string())]).optional(),`
          color: z
            .union([
              z.enum(
                toStringTuple(
                  mergeEnum("color", gameNames, dbConfig.gameSpecificAttributes)
                )
              ),
              z.array(
                z.enum(
                  toStringTuple(
                    mergeEnum(
                      "color",
                      gameNames,
                      dbConfig.gameSpecificAttributes
                    )
                  )
                )
              ),
            ])
            .optional(),
          // you can replace it with the simple validation `color: z.union([z.string(), z.array(z.string())]).optional(),`
          ink_cost: z
            .union([z.number(), z.array(z.number()).length(2)])
            .optional(),
        })
        .strict()
    )
    .query(filterCard),
  // add router for new TCG
});
