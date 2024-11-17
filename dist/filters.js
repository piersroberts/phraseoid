"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = exports.singular = exports.plural = exports.optional = exports.indefinite = void 0;
const pluralize_1 = __importDefault(require("pluralize"));
const indefinite = (word) => "aeiou".includes(word[0].toLowerCase()) ? `an ${word}` : `a ${word}`;
exports.indefinite = indefinite;
const optional = (word) => (Math.random() > 0.5 ? word : "");
exports.optional = optional;
const plural = (word) => (0, pluralize_1.default)(word);
exports.plural = plural;
const singular = (word) => pluralize_1.default.singular(word);
exports.singular = singular;
const capitalize = (word) => word[0].toUpperCase() + word.slice(1);
exports.capitalize = capitalize;
