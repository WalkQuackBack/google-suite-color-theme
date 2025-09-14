import { dumpStylesheets } from "./dump-stylesheets.ts";
import { readFile, writeFile } from "fs/promises";

const template: string = await readFile('./template.css', 'utf8');

const TEMPLATE_REPLACE_STRING = '/**** Generated code REPLACE ****/'

async function main() {
    const stylesheet = await dumpStylesheets([
        "https://docs.google.com/document/d/1RDErYoVPRCvy2nRvWo8a1xa5m7NrxpWBzZirE97m_3g/"
    ])
    console.log('Templating stylesheets...')
    const output = template.replace(TEMPLATE_REPLACE_STRING, stylesheet)
    console.log('Writing output...')
    await writeFile('output.css', output)
}

main()