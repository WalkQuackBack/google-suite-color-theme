import playwright from 'playwright';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

import postcssReplaceColors from './replace-colors.ts';
import postcssRemoveNonVariables from './postcss-remove-non-variables.t.js';
import postcssTrimEmpty from './postcss-trim-empty.t.js';
import postcssMergeRules from './postcss-merge-rules.t.js';

// TODO: Define proper type for cssSources.
async function getSiteStyles(page: playwright.Page, url: string): Promise<[string[], any]> {
  await page.goto(url, { 
    timeout: 20000,
    waitUntil: 'load'
  });

  const cssSources = await page.evaluate(() => {
    const styleTags = Array.from(document.querySelectorAll('style')).map(tag => {
      const dataHref = tag.getAttribute('data-href');
      const absoluteHref = dataHref && new URL(dataHref, document.baseURI).href || '';
      return {
        content: tag.textContent,
        href: absoluteHref,
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

  const stylesheetHrefs: (string)[] = [
    ...cssSources.linkTags,
    ...cssSources.styleTags.filter(s => s.href).map(s => s.href)
  ];

  return [ stylesheetHrefs, cssSources ]
}

export async function dumpStylesheets(urls: string[], page: playwright.Page) {
  let combinedCss = '';

  console.log('\n')

  console.log('Extracting data from sites...');

  let allHrefsToFetch: string[] = []

  for (const url of urls) {
    const siteStyles = await getSiteStyles(page, url);
    allHrefsToFetch = allHrefsToFetch.concat(siteStyles[0])
    const cssSources = siteStyles[1]
    
    const inlineCss = cssSources.styleTags
      .filter((s: { href: any; }) => !s.href)
      .map((s: { content: any; }) => s.content)
      .join('\n');
      
      combinedCss += `${inlineCss}\n`;
      console.log(`Combined inline styles from ${url}`);
  }

  for (let i = 0; i < allHrefsToFetch.length; i++) {
    const href = allHrefsToFetch[i];
    const hrefSplit = href.split('/')
    if (hrefSplit.at(-1)?.startsWith('m=')) {
      hrefSplit.pop()
    }
    allHrefsToFetch[i] = hrefSplit.join('/')
  }

  allHrefsToFetch = allHrefsToFetch.filter((element, index) => {
    return allHrefsToFetch.indexOf(element) === index;
  })

  console.log('Deduplicated fetch list:', allHrefsToFetch)

  console.log('Fetching stylesheets from sites...');
  let linkedCssPromises = allHrefsToFetch.map(href =>
    fetch(href).then(res => res.text()).catch(err => {
      console.error(`Failed to fetch CSS from ${href}:`, err);
      return '';
    })
  );

  const linkedCss = (await Promise.all(linkedCssPromises)).join('\n');
  combinedCss += `${linkedCss}\n`

  console.log(`Successfully fetched stylesheets from ${urls}`);

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
