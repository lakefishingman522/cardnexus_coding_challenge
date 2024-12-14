/**
 * Your test data is here, feel free to add!
 */

interface validTestDataEntry {
  input: any; // input of query to the endpoint
  isExist: boolean; // set it to true if expected return value is not empty, otherwise false
}

interface ValidTestData {
  [key: string]: validTestDataEntry[];
}

export const validTestData: ValidTestData = {
  card: [
    {
      input: {
        rarity: ["uncommon", "common", "Uncommon"],
        color: ["R", "R", "B"],
      },
      isExist: true,
    },
    {
      input: {
        game: "mtg",
        name: "giant",
      },
      isExist: true,
    },
    {
      input: {
        name: "giant",
        ink_cost: [5, 7],
      },
      isExist: true,
    },
    {
      input: {
        color: "B",
        ink_cost: [5, 7],
      },
      isExist: false,
    },
  ],
};

interface invalidTestDataEntry {
  input: any; // input of query to the endpoint
  errorMessage?: string; // expected error message
  description?: string; // the field that expresses why it is not acceptable in request validation
}

interface invalidTestData {
  [key: string]: invalidTestDataEntry[];
}

export const invalidTestData: invalidTestData = {
  card: [
    {
      input: {
        game: "mtg",
        name: "giant",
        rarity: ["uncommon", "common"],
        color: ["R", "B", "V"],
      },
      errorMessage: "Invalid input",
      description: "'V' is not a possible color",
    },
    {
      input: {
        name: "giant",
        rarity: "uncommon",
        ink_cost: "5",
      },
      errorMessage: "Invalid input",
      description: "ink_cost must be a number",
    },
  ],
};
