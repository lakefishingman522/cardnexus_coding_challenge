import { dbConfig } from "../config/db";
import {
  excludeKey,
  findCommonElements,
  isSublist,
  removeDuplicates,
} from "../utils/utils";

// get game names
const gameNames = Object.keys(dbConfig.gameSpecificAttributes);

// return game list where the query fields are located
const filterGameNameMiddleware = async (opts: Record<string, any>) => {
  const { input } = opts;

  // refactor game names where it has to iterate
  const inputNames: string[] = !input.game
    ? gameNames
    : Array.isArray(input.game)
    ? input.game
    : [input.game];

  // exclude the key `game`
  const gameExcludedInput = excludeKey(input, "game");
  const gameExcludedInputKeys = Object.keys(gameExcludedInput);

  const filteredGames = inputNames.filter((gameName: string) => {
    const gameDataKeys = removeDuplicates([
      ...Object.keys(dbConfig.gameSpecificAttributes[gameName]),
      ...Object.keys(dbConfig.commonAttributes),
    ]);

    // compare keys
    if (!isSublist<string>(gameDataKeys, gameExcludedInputKeys)) return false;

    const excludeValues = gameExcludedInputKeys.filter((inputKey: string) => {
      // compare enum fields
      if (dbConfig.gameSpecificAttributes[gameName][inputKey]?.enum?.length) {
        if (
          !findCommonElements(
            dbConfig.gameSpecificAttributes[gameName][inputKey].enum,
            input[inputKey]
          ).length
        )
          return true;
      }
    });

    if (excludeValues.length > 0) return false;
    return true;
  });

  const refactoredInput = { game: filteredGames, ...gameExcludedInput };

  return await opts.next({ input: refactoredInput });
};

export default filterGameNameMiddleware;
