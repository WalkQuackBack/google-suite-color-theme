import { Declaration, Root } from "postcss";
import { colorIndex } from "../color-index.ts";

const colorRegex: RegExp = new RegExp(`(?<!\\w)(${Object.keys(colorIndex).join('|')})(?!\\w)`, 'gi');

/**
 * Recursively processes a CSS value, handling nested color functions.
 * @param value The CSS value string to process.
 * @returns The processed CSS value string.
 */
const processValue = (value: string): string => {
  const functionRegex = /(\w+)\(([^)]+)\)/g;
  let processedValue = value;
  let match;

  while ((match = functionRegex.exec(processedValue)) !== null) {
    const fullMatch = match[0];
    const funcName = match[1];
    const content = match[2];

    // Split the content by commas, respecting parentheses within arguments
    const parts = splitWithRespectToParens(content);
    const processedParts = parts.map((part: string) => processValue(part.trim()));
    const newContent = processedParts.join(', ');

    // Replace the original function call with the new one
    processedValue = processedValue.replace(fullMatch, `${funcName}(${newContent})`);
    
    // Reset the regex index to re-scan the modified string
    functionRegex.lastIndex = 0;
  }

  // After processing functions, replace individual color names
  return processedValue.replace(colorRegex, (match: string): string => {
    return colorIndex[match.toLowerCase()] || match;
  });
};

/**
 * Splits a string by commas, but only at the top level,
 * ignoring commas within nested parentheses.
 * @param str The string to split.
 * @returns An array of strings representing the top-level arguments.
 */
const splitWithRespectToParens = (str: string): string[] => {
  const result = [];
  let balance = 0;
  let current = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === '(') {
      balance++;
    } else if (char === ')') {
      balance--;
    } else if (char === ',' && balance === 0) {
      result.push(current);
      current = '';
      continue;
    }
    current += char;
  }
  result.push(current);
  return result;
};

const postcssReplaceColors = () => {
  return {
    postcssPlugin: 'postcss-replace-colors',
    Once(root: Root) {
      root.walkDecls((decl: Declaration) => {
        decl.value = processValue(decl.value);
      });
    },
  };
};

postcssReplaceColors.postcss = true;

export default postcssReplaceColors;