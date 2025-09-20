import valueParser from 'postcss-value-parser';
import { colorIndex } from '../color-index.ts';

/**
 * A regex to check for hex codes (3, 4, 6, or 8 digits).
 */
const hexRegex = /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6,8})$/i; // Added 'i' flag for case-insensitive matching

/**
 * Checks if a value is a valid hexadecimal color.
 * @param {string} value The string to check.
 * @returns {boolean} True if the value is a hex color.
 */
function isHexColor(value) {
  return hexRegex.test(value);
}

/**
 * Extracts all hex colors from a parsed CSS value.
 * @param {object} parsedValue The value from `valueParser`.
 * @returns {string[]} An array of found hex color strings.
 */
function extractHexColors(parsedValue) {
  const colors = [];
  parsedValue.walk(node => {
    if (node.type === 'word' && isHexColor(node.value)) {
      colors.push(node.value);
    }
  });
  return colors;
}

/**
 * Extracts and combines rgba function color strings from a parsed CSS value.
 * @param {object} parsedValue The value from `valueParser`.
 * @returns {string[]} An array of found rgba color strings.
 */
function extractRgbaColors(parsedValue) {
  const rgbaColors = [];
  parsedValue.walk(node => {
    if (node.type === 'function' && node.value === 'rgba') {
      const rgbaString = valueParser.stringify(node);
      rgbaColors.push(rgbaString);
      return false; // Prevents walking deeper into this function node
    }
  });
  return rgbaColors;
}

/**
 * @type {import('postcss').PluginCreator}
 */
const pluginCreator = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-replace-colors',

    Declaration(decl, postcss) {
      const parsedValue = valueParser(decl.value);

      // Step 1: Process Hex Colors
      const hexColors = extractHexColors(parsedValue);
      hexColors.forEach(color => {
        const replacement = colorIndex[color.toLowerCase()];
        if (replacement) {
          decl.value = decl.value.replace(color, replacement);
        }
      });
      
      // Re-parse the value after the hex replacement to ensure
      // our next walk operates on the updated string.
      const updatedValue = valueParser(decl.value);

      // Step 2: Process rgba() Colors
      const rgbaColors = extractRgbaColors(updatedValue);
      rgbaColors.forEach(color => {
        const replacement = colorIndex[color.toLowerCase()];
        if (replacement) {
          decl.value = decl.value.replace(color, replacement);
        }
      });
    },
  };
};

pluginCreator.postcss = true;

export default pluginCreator;