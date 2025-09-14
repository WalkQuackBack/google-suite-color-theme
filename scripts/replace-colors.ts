import { Declaration, Root } from "postcss";

import { colorIndex } from "../color-index.ts";

const colorRegex: RegExp = new RegExp(Object.keys(colorIndex).join('|'), 'gi');

const processValue = (value: string): string => {
    if (value.includes('(')) {
        const newValue: string = value.replace(/(\w+\()(.+?)(\))/g, (match: string, funcName: string, content: string, closingParen: string): string => {
            const parts: string[] = content.split(',').map((p: string) => p.trim());
            const processedParts: string[] = parts.map((part: string) => processValue(part));
            return `${funcName}${processedParts.join(', ')}${closingParen}`;
        });
        return newValue;
    } else {
        return value.replace(colorRegex, (match: string): string => {
            return colorIndex[match.toLowerCase()] || match;
        });
    }
};

const postcssReplaceColors = () => {
    return {
        postcssPlugin: 'postcss-replace-colors',
        Once(root: Root) {
            root.walkDecls((decl: Declaration) => {
                decl.value = processValue(decl.value);
            });
        }
    };
};

postcssReplaceColors.postcss = true;

export default postcssReplaceColors;