import { dumpStylesheets } from "./dump-stylesheets.ts";
import { readFile, writeFile } from "fs/promises";

import { format } from "prettier";

const TEMPLATE_REPLACE_STRING = '/**** Generated code REPLACE ****/'

const buildList = {
    "build": [
        "https://docs.google.com/document/d/1RDErYoVPRCvy2nRvWo8a1xa5m7NrxpWBzZirE97m_3g/"
    ],
    "slides": [
        "https://docs.google.com/presentation/d/1-jVYOX5SuCT9hU9sOKgPEMOJ5W6X3bWD5SnMm7Kz6Sc/"
    ],
    "sheets": [
        "https://docs.google.com/spreadsheets/d/193-MPXvRvu9rCsRXsXHCoeMxuXmSF8jcZw9Er0EaVSo/"
    ],
}

async function buildSite(id: string, sites: string[]) {
    const stylesheet = await dumpStylesheets(sites)
    console.log('Templating stylesheets...')

    const date = new Date()
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    const template: string = await readFile(`./templates/${id}.css`, 'utf8');

    const output = await format(
        template.replace(TEMPLATE_REPLACE_STRING, stylesheet)
            .replace('<version>', `${year}.${month}.${day}`),
        { parser: "css" }
    )
    return output
}

async function main() {
    for (const [id, sites] of Object.entries(buildList)) {
        console.log('Building site ' + sites + ' to ' + id)
        const output = await buildSite(id, sites)
        console.log('Writing output...')
        await writeFile(id + '.user.css', output)
        console.log('Wrote output')
    }
}

main()