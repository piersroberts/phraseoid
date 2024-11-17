"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phraseoid = void 0;
const filters_1 = require("./filters");
class Phraseoid {
    constructor({ seed: seed } = {}) {
        this.terms = {};
        this.phrases = [];
        this.seed = Math.floor(Math.random() * 10000);
        this.filters = {
            plural: filters_1.plural,
            indefinite: filters_1.indefinite,
            capitalize: filters_1.capitalize,
            optional: filters_1.optional,
        };
        if (seed) {
            this.setSeed(seed);
        }
    }
    setSeed(seed) {
        this.seed = seed;
    }
    getRandomElement(array) {
        const randomIndex = Math.floor(Math.abs(Math.sin(this.seed++) * 10000) % array.length);
        return array[randomIndex];
    }
    resolveTerm(term) {
        if (this.terms[term]) {
            const randomEntry = this.getRandomElement(this.terms[term]);
            return this.replacePlaceholders(randomEntry);
        }
        return term;
    }
    applyFilters(term, filterChain) {
        const filters = filterChain.split("|");
        return filters.reduce((currentTerm, filter) => {
            if (this.filters[filter]) {
                return this.filters[filter](currentTerm);
            }
            return currentTerm;
        }, term);
    }
    replacePlaceholders(input) {
        return input.replace(/{{([^{}|]+?)(?:\|([^{}]+?))?}}/g, (_match, term, filterChain) => {
            const resolvedTerm = this.resolveTerm(term);
            return filterChain
                ? this.applyFilters(resolvedTerm, filterChain)
                : resolvedTerm;
        });
    }
    generatePhrase() {
        const phrase = this.getRandomElement(this.phrases);
        return this.replacePlaceholders(phrase).replace(/\s+/g, " ").trim();
    }
}
exports.Phraseoid = Phraseoid;
