import valueParser from 'postcss-value-parser';
import { colorIndex } from '../color-index.ts';

function extractAndCombineColors(parsedValue) {
  const colors = [];

  // A list of known color function names
  const colorFunctions = ['rgb', 'rgba', 'hsl', 'hsla', 'hwb', 'lab', 'lch', 'oklab', 'oklch', 'color'];

  // Walk all nodes in the parsed value tree
  parsedValue.walk(node => {
    // Check for color functions (e.g., `rgb(255, 0, 0)`)
    if (node.type === 'function' && colorFunctions.includes(node.value)) {
      // Reconstruct the function string and add to our list
      const colorString = valueParser.stringify(node);
      colors.push(colorString);
      return false; // Stop walking deeper into this function to avoid duplicate parsing
    }

    // Check for word type nodes that are hex colors or color names
    if (node.type === 'word' && isColorWord(node.value)) {
      colors.push(node.value);
    }
  });

  return colors.join(' ');
}

function isColorWord(value) {
  // Simple regex for hex codes (3, 4, 6, or 8 digits)
  const hexRegex = /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6,8})$/;

  // Exhaustive list of CSS color keywords from the CSS Color Module Level 4 specification
  const colorKeywords = new Set([
    'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige',
    'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown',
    'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral',
    'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue',
    'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey',
    'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange',
    'darkorchid', 'darkred', 'darksalmon', 'darkseagreen',
    'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise',
    'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey',
    'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia',
    'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green',
    'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo',
    'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen',
    'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan',
    'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey',
    'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue',
    'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow',
    'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine',
    'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen',
    'mediumslateblue', 'mediumspringgreen', 'mediumturquoise',
    'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose',
    'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab',
    'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen',
    'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru',
    'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red',
    'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown',
    'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue',
    'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan',
    'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white',
    'whitesmoke', 'yellow', 'yellowgreen', 'transparent', 'currentColor'
  ]);

  return hexRegex.test(value) || colorKeywords.has(value.toLowerCase());
}

/**
 * @type {import('postcss').PluginCreator}
 */
const pluginCreator = (opts = {}) => {
  // Work with options here

  return {
    postcssPlugin: 'postcss-replace-colors',
    /*
    Root (root, postcss) {
      // Transform CSS AST here
    }
    */

    Declaration(decl, postcss) {
      // The faster way to find Declaration node
      let value = valueParser(decl.value);
      let color = extractAndCombineColors(value);
      if (colorIndex[color]) {
        decl.value = decl.value.replace(color, colorIndex[color])
      }
    },

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  };
};

pluginCreator.postcss = true;

export default pluginCreator;