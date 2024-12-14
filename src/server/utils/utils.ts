import CardInterface from "../types/Card";

// Exclude a specific key from an object
type ExcludeKey<T, K extends keyof T> = Omit<T, K>;
const excludeKey = <T, K extends keyof T>(
  obj: T,
  keyToExclude: K
): ExcludeKey<T, K> => {
  const { [keyToExclude]: _, ...rest } = obj;
  return rest as ExcludeKey<T, K>;
};

// convert string value of type key into Type
const convertTypes = (jsonConfig: Record<string, any>) => {
  const typeMap: Record<string, any> = {
    string: String,
    number: Number,
    boolean: Boolean,
    object: Object,
    array: Array,
    sbject: Object, // Fixing the typo here ("sbject" -> "object")
  };

  const refactor = (obj: Record<string, any>): Record<string, any> => {
    const refactoredSchema: Record<string, any> = {};

    Object.keys(obj).forEach((key) => {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value && typeof value === "object" && !Array.isArray(value)) {
          // If the value is an object (like "gameSpecificAttributes"), process it recursively
          refactoredSchema[key] = refactor(value);
        } else if (
          key === "type" &&
          typeof value === "string" &&
          typeMap[value]
        ) {
          // Convert the 'type' string to a TypeScript type
          refactoredSchema[key] = typeMap[value];
        } else {
          refactoredSchema[key] = value;
        }
      }
    });

    return refactoredSchema;
  };

  return refactor(jsonConfig);
};

// Reformat each object based on a provided list of keys, add the addtional object
const formatKeysInObjects = (
  list: Record<string, any>[],
  filteringKeys: string[],
  addtionalObject?: Record<string, any>
): Record<string, any>[] => {
  return list.map((obj) => {
    const filteredObj: Record<string, any> = { attributes: {} };

    Object.keys(obj).forEach((key: string) => {
      if (filteringKeys.includes(key)) {
        filteredObj[key] = obj[key];
      } else filteredObj.attributes[key] = obj[key];
    });
    return { ...filteredObj, ...addtionalObject };
  });
};

// Function to convert a string array into a tuple type ([string, ...string[]]), it is used to create the valid input of z.enum().
const toStringTuple = (arr: string[] | undefined): [string, ...string[]] => {
  // Check if the array is undefined or empty
  if (!arr || arr.length === 0) {
    throw new Error("Array must be a non-empty string array");
  }

  // Ensure the array is treated as a tuple
  return arr as [string, ...string[]];
};

// Remove duplicated elements
const removeDuplicates = <T>(list: T[]): T[] => {
  return [...new Set(list)];
};

// Function to merge enum values for a specific key from all TCGs
const mergeEnum = (
  keyName: string,
  games: string[],
  gameFieldsMap: Record<string, CardInterface>
) => {
  return removeDuplicates(
    games
      .map((gameName) => {
        return gameFieldsMap[gameName][keyName]?.enum
          ? gameFieldsMap[gameName][keyName].enum
          : [];
      })
      .flat()
  );
};

// Check if the elements of sublist is in mainlist
const isSublist = <T>(mainList: Array<T>, subList: Array<T>): boolean => {
  const excludeElements = subList.filter((ele: T) => !mainList.includes(ele));

  if (excludeElements.length > 0) return false;
  return true;
};

// Fid common Elements
const findCommonElements = <T>(...arrays: T[][]): T[] => {
  if (arrays.length === 0) {
    return [];
  }

  return arrays.reduce((commonElements, currentArray) => {
    return commonElements.filter((element) => currentArray.includes(element));
  });
};

export {
  excludeKey,
  convertTypes,
  formatKeysInObjects,
  toStringTuple,
  removeDuplicates,
  mergeEnum,
  isSublist,
  findCommonElements,
};
