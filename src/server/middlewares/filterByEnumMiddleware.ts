import { dbConfig } from "../config/db";
import { mergeEnum } from "../utils/utils";
import { excludeKey, findCommonElements } from "../utils/utils";

// filter the query fields in enum list
const filterByEnumMiddleware = async (opts: Record<string, any>) => {
  const { input } = opts;

  const refactoredInput: Record<string, Array<any>> = { game: input.game };

  // find common enum list across the games
  Object.entries(excludeKey(input, "game")).forEach(
    ([inputKey, inputField]) => {
      // merge enums across the games
      const mergedEnum = mergeEnum(
        inputKey,
        input.game,
        dbConfig.gameSpecificAttributes
      );

      refactoredInput[inputKey] = mergedEnum.length
        ? findCommonElements(inputField, mergedEnum)
        : inputField;
    }
  );

  return await opts.next({ input: refactoredInput });
};

export default filterByEnumMiddleware;
