export const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
