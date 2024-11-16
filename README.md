# phraseoid

A simple nodejs library to generate random phrases from a list of words.

## Installation

```bash
npm install phraseoid
```

## Usage

```javascript
import { Phraseoid } from "phraseoid";

const phraseoid = new Phraseoid();
phraseoid.terms = {
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
phraseoid.phrases = [
  "Hello, my name is {{name}} and I like {{thing}} and {{animal|plural}} amd I live in {{place|indefinite}}.",
];
const phrase = phraseoid.generatePhrase();
```
