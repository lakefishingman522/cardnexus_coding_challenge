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
const convertTypes = (jsonConfig: Record<string, any>): Record<string, any> => {
  const typeMap: Record<string, any> = {
    string: String,
    number: Number,
    boolean: Boolean,
    object: Object,
    array: Array,
    sbject: Object, // Fixing the typo here ("sbject" -> "object")
  };

  const processSchema = (obj: Record<string, any>): Record<string, any> => {
    const result: Record<string, any> = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value && typeof value === "object") {
          // If the value is an object (like "gameSpecificAttributes"), process it recursively
          result[key] = processSchema(value);
        } else if (
          key === "type" &&
          typeof value === "string" &&
          typeMap[value]
        ) {
          // Convert the 'type' string to a TypeScript type
          result[key] = typeMap[value];
        } else {
          result[key] = value;
        }
      }
    }

    return result;
  };

  return processSchema(jsonConfig);
};

export { excludeKey, convertTypes };
