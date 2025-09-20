/**
 * @type {import('postcss').PluginCreator}
 */
const pluginCreator = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-combine-rules',
    
    // Use the Root visitor to traverse the entire CSS file
    Root(root, postcss) {
      // Create a Map to store declarations as keys and their corresponding rules as values
      const declarationMap = new Map();

      // Iterate through each node in the CSS file
      root.walkRules(rule => {
        // --- ADDED LOGIC ---
        // Check if the rule's parent is an at-rule named "keyframes".
        // If it is, we skip this rule to prevent merging keyframe percentages.
        if (rule.parent && rule.parent.type === 'atrule' && rule.parent.name === 'keyframes') {
          return;
        }
        // -------------------

        // A rule must have at least one declaration to be considered
        if (rule.nodes.length === 0) {
          return;
        }

        // Generate a unique key for the rule's declarations. This key represents
        // the property-value pair(s) and is used to group identical rules.
        const key = rule.nodes.map(node => `${node.prop}:${node.value}`).join(';');

        // If the key already exists in our map, it means we have found
        // another rule with the same declarations.
        if (declarationMap.has(key)) {
          // Get the existing rule from the map
          const existingRule = declarationMap.get(key);
          // Append the new rule's selector to the existing rule's selector list
          existingRule.selector += `, ${rule.selector}`;
          // Remove the current rule since its selector has been merged
          rule.remove();
        } else {
          // If the key doesn't exist, this is the first time we've seen this
          // set of declarations. Add it to the map with the current rule.
          declarationMap.set(key, rule);
        }
      });
    }
  };
};

pluginCreator.postcss = true;

export default pluginCreator;