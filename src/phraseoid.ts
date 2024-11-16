import { capitalize, Filter, indefinite, optional, plural } from "./filters";

export class Phraseoid {
  terms: Record<string, string[]> = {};
  phrases: string[] = [];
  seed: number = Math.floor(Math.random() * 10000);
  filters: Record<string, Filter> = {
    plural,
    indefinite,
    capitalize,
    optional,
  };
  constructor({ seed: seed }: { seed?: number } = {}) {
    if (seed) {
      this.setSeed(seed);
    }
  }

  setSeed(seed: number): void {
    this.seed = seed;
  }

  private getRandomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(
      Math.abs(Math.sin(this.seed++) * 10000) % array.length
    );
    return array[randomIndex];
  }

  private resolveTerm(term: string): string {
    if (this.terms[term]) {
      const randomEntry = this.getRandomElement(this.terms[term]);
      return this.replacePlaceholders(randomEntry);
    }
    return term;
  }

  private applyFilters(term: string, filterChain: string): string {
    const filters = filterChain.split("|");
    return filters.reduce((currentTerm, filter) => {
      if (this.filters[filter]) {
        return this.filters[filter](currentTerm);
      }
      return currentTerm;
    }, term);
  }

  private replacePlaceholders(input: string): string {
    return input.replace(
      /{{([^{}|]+?)(?:\|([^{}]+?))?}}/g,
      (_match: string, term: string, filterChain: string): string => {
        const resolvedTerm = this.resolveTerm(term);
        return filterChain
          ? this.applyFilters(resolvedTerm, filterChain)
          : resolvedTerm;
      }
    );
  }

  generatePhrase(): string {
    const phrase = this.getRandomElement(this.phrases);
    return this.replacePlaceholders(phrase).replace(/\s+/g, " ").trim();
  }
}
