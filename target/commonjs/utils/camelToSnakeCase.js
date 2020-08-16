"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelToSnakeCase = void 0;
exports.camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
