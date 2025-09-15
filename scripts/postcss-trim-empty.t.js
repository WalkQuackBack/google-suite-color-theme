/**
 * @type {import('postcss').PluginCreator}
 */
const pluginCreator = (opts = {}) => {
    // Work with options here
    return {
        postcssPlugin: 'postcss-replace-colors',
        Root(root) {
            root.walkRules((rule) => {
                if (rule.nodes.length === 0) {
                    rule.remove();
                }
            });

            root.walkAtRules((atRule) => {
                if (
                    !atRule.nodes ||
                    atRule.nodes.length === 0
                    || atRule.name === 'charset'
                ) {
                    atRule.remove();
                }
            });
        }
    }
}

pluginCreator.postcss = true;

export default pluginCreator;