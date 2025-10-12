/**
 * @type {import('postcss').PluginCreator}
 */
const pluginCreator = (opts = {}) => {
  const COLOR_PROPERTIES = [
    'color',
    'background',
    'background-color',
    'border',
    'border-color',
    'border-top',
    'border-right',
    'border-bottom',
    'border-left',
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
    'outline',
    'outline-color',
    'box-shadow',
    'text-shadow',
    'caret-color',
    'column-rule',
    'column-rule-color',
    'text-decoration-color',
    'fill',
    'stroke',
  ];

  return {
    postcssPlugin: 'postcss-remove-non-variables',

    Declaration(decl) {
      const prop = decl.prop.toLowerCase();
      if (COLOR_PROPERTIES.includes(prop)) {
        if (!decl.value.includes('var(')) {
          decl.remove();
        }
      } else {
        decl.remove();
      }
    }
  }
};

pluginCreator.postcss = true;

export default pluginCreator;