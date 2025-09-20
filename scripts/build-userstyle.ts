import { dumpStylesheets } from "./dump-stylesheets.ts";
import { readFile, writeFile } from "fs/promises";

import { format } from "prettier";

const template: string = await readFile('./template.css', 'utf8');

const TEMPLATE_REPLACE_STRING = '/**** Generated code REPLACE ****/'

async function main() {
    const stylesheet = await dumpStylesheets([
        "https://docs.google.com/document/d/1RDErYoVPRCvy2nRvWo8a1xa5m7NrxpWBzZirE97m_3g/"
    ])
    console.log('Templating stylesheets...')

    const date = new Date()
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    const output = await format(
        template.replace(TEMPLATE_REPLACE_STRING, stylesheet)
            .replace('<version>', `${year}.${month}.${day}`),
        { parser: "css" }
    )
    console.log('Writing output...')
    await writeFile('build.user.css', output)
    console.log('Wrote output')
}

main()