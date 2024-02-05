const separatedWords = (string) => string.replace(/([a-z])([A-Z])/g, "$1 $2");

export { separatedWords };
