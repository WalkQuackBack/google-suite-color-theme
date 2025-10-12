import valueParser, { type Node, type FunctionNode, type ParsedValue, type WordNode } from 'postcss-value-parser';
import { type PluginCreator, type Declaration } from 'postcss';
import { colorIndex } from '../color-index.ts';

interface ColorIndex {
    [key: string]: string;
}
const colorMap: ColorIndex = colorIndex as ColorIndex;

// Quite bad, don't use this technique
const NAMED_COLORS: Set<string> = new Set([
    "red", "green", "blue", "yellow", "cyan", "magenta", "black", "white", 
    "gray", "grey", "silver", "maroon", "navy", "teal", "aqua", "fuchsia",
    "lime", "olive", "purple", "darkgray", "lightgray", "transparent"
]);

const hexRegex = /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6,8})$/i;

function isHexColor(value: string): boolean {
  return hexRegex.test(value);
}

function isNamedColor(value: string): boolean {
    return NAMED_COLORS.has(value.toLowerCase());
}

const roundColorComponent = (component: string): string => {
    const match = component.match(/(-?\d*\.?\d+)(%?)/);
    
    if (match) {
        const num = parseFloat(match[1]);
        const unit = match[2];
        const roundedNum = Math.round(num);
        
        return `${roundedNum}${unit}`;
    }
    return component;
}

function normalizeRgbaString(node: FunctionNode): string {
    const rawContent = valueParser.stringify(node.nodes);

    let normalizedContent = rawContent.replace(/\s+/g, ''); 
    normalizedContent = normalizedContent.split(',').map(roundColorComponent).join(',');
    
    return `${node.value}(${normalizedContent})`; 
}

function normalizeHslString(node: FunctionNode): string {
    const rawContent = valueParser.stringify(node.nodes);

    let normalizedContent = rawContent.replace(/\//g, ',').replace(/\s+/g, '');
    normalizedContent = normalizedContent.split(',').map(roundColorComponent).join(',');
    
    return `${node.value}(${normalizedContent})`;
}

function extractAllColors(parsedValue: ParsedValue): Map<string, string> {
    const replacements = new Map<string, string>();

    parsedValue.walk((node: Node) => {
        const value = node.value.trim();
        let originalColorString: string | null = null;
        let canonicalKey: string | null = null;

        if (node.type === 'word') {
            const wordNode = node as WordNode;
            
            if (isHexColor(value)) {
                canonicalKey = value.toLowerCase();
                originalColorString = wordNode.value;
            } else if (isNamedColor(value)) {
                canonicalKey = value.toLowerCase();
                originalColorString = wordNode.value;
            }
        } 
        else if (node.type === 'function') {
            const funcNode = node as FunctionNode;

            if (funcNode.value === 'rgb' || funcNode.value === 'rgba') {
                canonicalKey = normalizeRgbaString(funcNode);
                originalColorString = valueParser.stringify(node);
            } 
            else if (funcNode.value === 'hsl' || funcNode.value === 'hsla') {
                canonicalKey = normalizeHslString(funcNode);
                originalColorString = valueParser.stringify(node);
            }
        }

        if (canonicalKey && originalColorString) {
            const replacement = colorMap[canonicalKey];
            if (replacement) {
                replacements.set(originalColorString, replacement);
            }
        }
        
        if (node.type === 'function') {
             return false;
        }
    });

    return replacements;
}

const pluginCreator: PluginCreator<object> = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-replace-colors',

    Declaration(decl: Declaration, postcss) {
      const parsedValue: ParsedValue = valueParser(decl.value);
      
      const replacements = extractAllColors(parsedValue);

      if (replacements.size === 0) {
          return;
      }

      let newValue = decl.value;
      
      replacements.forEach((replacementVar, originalColorString) => {
          const escapedColor = originalColorString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const replaceRegex = new RegExp(escapedColor, 'g');
          
          newValue = newValue.replace(replaceRegex, replacementVar);
      });
      
      decl.value = newValue;
    },
  };
};

pluginCreator.postcss = true;

export default pluginCreator;