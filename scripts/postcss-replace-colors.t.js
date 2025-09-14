import valueParser from 'postcss-value-parser';

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
      console.log(value);
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