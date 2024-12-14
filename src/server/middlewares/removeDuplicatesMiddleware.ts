import { removeDuplicates } from "../utils/utils";

// remove duplicated elements in query fields, and convert not-list value into one-element list
const removeDuplicatesMiddleware = async (opts: Record<string, any>) => {
  const { input } = opts;

  const refactoredInput: Record<string, Array<any>> = {};
  Object.entries(input).forEach(([key, field]) => {
    if (Array.isArray(field))
      refactoredInput[key] = removeDuplicates(field as []);
    else refactoredInput[key] = [field];
  });

  return await opts.next({ input: refactoredInput });
};

export default removeDuplicatesMiddleware;
