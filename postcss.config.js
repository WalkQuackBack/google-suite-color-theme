// postcss.config.mjs
import replaceColors from './scripts/replace-colors';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    replaceColors,
    autoprefixer,
  ],
};