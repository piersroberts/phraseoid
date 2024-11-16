import { describe, it, expect, beforeEach } from "vitest";
import { Phraseoid } from "./phraseoid";

const terms = {
  name: ["Alice", "Bob"],
  place: ["park", "library"],
  colour: ["red", "blue"],
  animal: ["cat", "dog"],
  adjective: ["happy", "sad", "angry"],
  vehicle: ["car", "bike", "ambulance"],
  verb: ["run", "jump"],
  thing: ["car", "bike"],
  colouredThing: ["{{colour}} {{thing}}"],
};

describe("phraseoid", () => {
  let phraseoid: Phraseoid;

  beforeEach(() => {
    phraseoid = new Phraseoid();
    phraseoid.terms = terms;

    phraseoid.phrases = [];
  });

  it("should generate a phrase with a name", () => {
    phraseoid.phrases = ["Hello, my name is {{name}}."];
    const phrase = phraseoid.generatePhrase();
    expect(phrase).toMatch(/Hello, my name is (Alice|Bob)\./);
  });

  it("should generate a phrase with a place", () => {
    phraseoid.phrases = ["I live in {{place|indefinite}}."];
    const phrase = phraseoid.generatePhrase();
    expect(phrase).toMatch(/I live in a (park|library)\./);
  });

  it("should generate a phrase with a colour", () => {
    phraseoid.phrases = ["My favourite colour is {{colour}}."];
    const phrase = phraseoid.generatePhrase();
    expect(phrase).toMatch(/My favourite colour is (red|blue)\./);
  });

  it("should generate a phrase with a verb", () => {
    phraseoid.phrases = ["I like to {{verb}}."];
    const phrase = phraseoid.generatePhrase();
    expect(phrase).toMatch(/I like to (run|jump)\./);
  });

  it("should generate a phrase with a vehicle", () => {
    phraseoid.phrases = ["I drive {{vehicle|indefinite}}."];
    const phrase = phraseoid.generatePhrase();
    expect(phrase).toMatch(/I drive (a car|a bike|an ambulance)\./);
  });

  it("should generate a phrase with a thing", () => {
    phraseoid.phrases = ["I have {{adjective|indefinite}} {{animal}}."];
    const phrase = phraseoid.generatePhrase();
    expect(phrase).toMatch(/I have (a happy|a sad|an angry) (cat|dog)\./);
  });

  it("should generate a phrase with a coloured thing", () => {
    phraseoid.phrases = ["I have a {{colouredThing}}."];
    const phrase = phraseoid.generatePhrase();
    expect(phrase).toMatch(/I have a (red|blue) (car|bike)\./);
  });

  it("should generate a phrase with a plural thing", () => {
    phraseoid.phrases = ["I have {{thing|plural}}."];
    const phrase = phraseoid.generatePhrase();
    expect(phrase).toMatch(/I have (cars|bikes)\./);
  });

  it("should generate a phrase with a capitalised plural thing", () => {
    phraseoid.phrases = ["{{thing|plural|capitalize}} are my favourite."];
    const phrase = phraseoid.generatePhrase();
    expect(phrase).toMatch(/(Cars|Bikes) are my favourite\./);
  });

  it("should be different each time", () => {
    phraseoid.phrases = [
      "Hello, my name is {{name}} and I like {{thing}} and {{animal|plural}} amd I live in {{place|indefinite}}.",
    ];
    const phrases = Array.from({ length: 10 }, () =>
      phraseoid.generatePhrase()
    );
    const uniquePhrases = new Set(phrases);
    expect(uniquePhrases.size).toBeGreaterThan(1);
  });
});

describe("phraseoid with seed", () => {
  let phraseoid: Phraseoid;

  beforeEach(() => {
    phraseoid = new Phraseoid({ seed: 1234 });
    phraseoid.terms = terms;
    phraseoid.phrases = [];
  });

  it("should generate a phrase with a name", () => {
    phraseoid.phrases = [
      "Hello, my name is {{name}} and I like {{thing}} and {{animal|plural}} amd I live in {{place|indefinite}}.",
    ];
    const phrase = phraseoid.generatePhrase();
    expect(phrase).toMatch(
      "Hello, my name is Bob and I like car and dogs amd I live in a park."
    );
  });
});
