import { describe, it, expect, vi } from "vitest";
import { indefinite, optional, plural, capitalize } from "./filters";

describe("indefinite", () => {
  it('should return "an" for words starting with a vowel', () => {
    expect(indefinite("apple")).toBe("an apple");
    expect(indefinite("orange")).toBe("an orange");
  });

  it('should return "a" for words starting with a consonant', () => {
    expect(indefinite("banana")).toBe("a banana");
    expect(indefinite("car")).toBe("a car");
  });
});

describe("optional", () => {
  it("should return the word or an empty string", () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0.6);
    expect(optional("test")).toBe("test");

    vi.spyOn(Math, "random").mockReturnValueOnce(0.4);
    expect(optional("test")).toBe("");
  });
});

describe("plural", () => {
  it("should return the correct plural for special cases", () => {
    expect(plural("child")).toBe("children");
    expect(plural("man")).toBe("men");
    expect(plural("woman")).toBe("women");
  });

  it("should return the correct plural for regular cases", () => {
    expect(plural("cat")).toBe("cats");
    expect(plural("dog")).toBe("dogs");
  });

  it('should return the correct plural for words ending in "s"', () => {
    expect(plural("bus")).toBe("buses");
    expect(plural("class")).toBe("classes");
  });

  it('should return the correct plural for words ending in "y"', () => {
    expect(plural("city")).toBe("cities");
    expect(plural("baby")).toBe("babies");
  });

  it('should return the correct plural for words ending in "f" or "fe"', () => {
    expect(plural("leaf")).toBe("leaves");
    expect(plural("life")).toBe("lives");
  });

  it('should return the correct plural for words ending in "o"', () => {
    expect(plural("tomato")).toBe("tomatoes");
    expect(plural("potato")).toBe("potatoes");
  });
});

describe("capitalize", () => {
  it("should capitalize the first letter of the word", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("world")).toBe("World");
  });
});
