/**
 * @type {import('postcss').PluginCreator}
 */
const pluginCreator = (opts = {}) => {
  // Work with options here
  return {
    postcssPlugin: 'postcss-remove-non-variables',

    Declaration(decl) {
      if (!decl.value.includes('var(')) {
        decl.remove();
      }
    }
  }
};

pluginCreator.postcss = true;

export default pluginCreator;