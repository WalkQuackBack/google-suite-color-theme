import { dumpStylesheets } from './dump-stylesheets.ts';
import { readFile, writeFile } from 'fs/promises';

import { format } from 'prettier';
import { chromium, devices, type Browser, type BrowserContext } from 'playwright';

const TEMPLATE_REPLACE_STRING = '/**** Generated code REPLACE ****/'

const buildList = {
    'mail': [
        'https://mail.google.com/mail/u/0/#inbox'
    ],
    'build': [
        'https://docs.google.com/document/d/1RDErYoVPRCvy2nRvWo8a1xa5m7NrxpWBzZirE97m_3g/'
    ],
    'slides': [
        'https://docs.google.com/presentation/d/1-jVYOX5SuCT9hU9sOKgPEMOJ5W6X3bWD5SnMm7Kz6Sc/'
    ],
    'sheets': [
        'https://docs.google.com/spreadsheets/d/193-MPXvRvu9rCsRXsXHCoeMxuXmSF8jcZw9Er0EaVSo/'
    ],
}

let browser: Browser;
let context: BrowserContext;

async function buildSite(id: string, sites: string[]) {
    const page = await context.newPage();
    const stylesheet = await dumpStylesheets(sites, page)
    page.close();
    return stylesheet
}

async function googleAuth() {
    const page = await context.newPage();
    if (process.env.GOOGLE_USER && process.env.GOOGLE_PWD) {
        console.log('Logging into Google...')

        await page.goto('https://accounts.google.com/signin');
        
        await page.fill('input[type="email"]', process.env.GOOGLE_USER);
        await page.press('input[type="email"]', 'Enter');

        await page.fill('input[type="password"]', process.env.GOOGLE_PWD);
        await page.press('input[type="password"]', 'Enter');

        console.log('Waiting for Google authentication...')

        await page.waitForURL(/https:\/\/myaccount\.google\.com\//);

        console.log('Authenticated')
    } else {
        console.log('Missing enviornment tokens, skipping Google auth')
    }
    await page.close();
}

async function main() {
    browser = await chromium.launch({
        headless: true,
        args: [
            '--disable-blink-features=AutomationControlled',
        ]
    });
    
    const device = devices['Desktop Chrome HiDPI']
    context = await browser.newContext({
        ...device,
        locale: 'en-GB',
    });

    await googleAuth()

    for (const [id, sites] of Object.entries(buildList)) {
        console.log('Building site ' + sites + ' to ' + id)
        const stylesheet = await buildSite(id, sites)
        
        const date = new Date()
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();

        const template: string = await readFile(`./templates/${id}.css`, 'utf8');

        const userstyle = await format(
            template.replace(TEMPLATE_REPLACE_STRING, stylesheet)
                .replace('<version>', `${year}.${month}.${day}`),
            { parser: 'css' }
        )
        const raw = await format(
            stylesheet,
            { parser: 'css' }
        )

        console.log('Writing output...')
        await writeFile(id + '.user.css', userstyle)
        await writeFile(id + '.raw.css', raw)
        console.log('Wrote output\n')
    }

    console.log('Finished building, cleaning up session')

    const signoutPage = await context.newPage();
    await signoutPage.goto('https://accounts.google.com/Logout?continue=https://www.google.com/')
    await signoutPage.waitForURL('https://www.google.com/')

    console.log('Signed out successfully')

    await context.close()
    await browser.close()

    console.log('Browser closed')
}

main()