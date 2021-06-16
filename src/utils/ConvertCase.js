/**
 * Converts string value to kebab case.
 *
 * @param {string} value
 * @returns {string}
 */
export function toKebab(value) {
  return value.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    (str, ofs) => (ofs ? '-' : '') + str.toLowerCase()
  );
}
