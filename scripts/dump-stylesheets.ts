import playwright from 'playwright';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

import postcssReplaceColors from './postcss-replace-colors.t.js';
import postcssRemoveNonVariables from './postcss-remove-non-variables.t.js';
import postcssTrimEmpty from './postcss-trim-empty.t.js';
import postcssMergeRules from './postcss-merge-rules.t.js';

async function getSiteStyles(page: playwright.Page, url: string): Promise<string> {
  await page.goto(url, { 
    timeout: 20000,
    waitUntil: 'domcontentloaded'
  });

  const cssSources = await page.evaluate(() => {
    const styleTags = Array.from(document.querySelectorAll('style')).map(tag => {
      return {
        content: tag.textContent,
        href: tag.getAttribute('data-href') || '',
      }
    }
  );

    const linkTags = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(tag => {
      const href = tag.getAttribute('href');
      if (!href) return '';
      const absoluteHref = new URL(href, document.baseURI).href;
      return absoluteHref;
    });

    return { styleTags, linkTags };
  });

  const allHrefsToFetch: (string)[] = [
    ...cssSources.linkTags,
    ...cssSources.styleTags.filter(s => s.href).map(s => s.href)
  ];

  console.log(allHrefsToFetch)

  let linkedCssPromises = allHrefsToFetch.map(href =>
    fetch(href).then(res => res.text()).catch(err => {
      console.error(`Failed to fetch CSS from ${href}:`, err);
      return '';
    })
  );

  const linkedCss = (await Promise.all(linkedCssPromises)).join('\n');
  
  const inlineCss = cssSources.styleTags
    .filter(s => !s.href)
    .map(s => s.content)
    .join('\n');

  return `${inlineCss}\n${linkedCss}`;
}

export async function dumpStylesheets(urls: string[], page: playwright.Page) {
  let combinedCss = '';

  console.log('Fetching stylesheets from sites...');
  for (const url of urls) {
    const css = await getSiteStyles(page, url);
    combinedCss += `${css}\n`;
    console.log(`Successfully fetched CSS from ${url}`);
  }

  console.log('Processing combined CSS with PostCSS...');
  try {
    const result = await postcss(
      [
        autoprefixer,
        postcssReplaceColors,
        postcssRemoveNonVariables,
        postcssTrimEmpty,
        // postcssMergeRules
      ]
    ).process(combinedCss, { from: undefined });
    console.log(`Successfully processed with PostCSS`);
    return result.css;
  } catch (error) {
    console.error('Error during PostCSS processing:', error);
    return ''
  }
}
