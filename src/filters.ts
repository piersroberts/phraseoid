import pluralize from "pluralize";

export interface Filter {
  (word: string): string;
}

export const indefinite: Filter = (word) =>
  "aeiou".includes(word[0].toLowerCase()) ? `an ${word}` : `a ${word}`;

export const optional: Filter = (word) => (Math.random() > 0.5 ? word : "");

export const plural: Filter = (word: string) => pluralize(word);

export const singular: Filter = (word: string) => pluralize.singular(word);

export const capitalize: Filter = (word: string) =>
  word[0].toUpperCase() + word.slice(1);
