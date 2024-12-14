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
        if (value && typeof value === "object") {
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

export { excludeKey, convertTypes, formatKeysInObjects };
