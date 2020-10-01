const fs = require('fs');

const indexFilePath = "./public/texts/index.json";
const outputTsFileDir = "./src/generated/";
const outputFileName = "texts.ts";

if (!fs.existsSync(indexFilePath)) {
    throw new Error(`Index file does not exist at [${indexFilePath}]`);
}

const index = JSON.parse(fs.readFileSync(indexFilePath));

if (index.length == 0) {
    throw new Error("Index file is empty or incorrectly formatted");
}

function toJsTextDefinitionEntry(textDef) {
    return JSON.stringify(textDef.id) + ": { "
        + (textDef.text
            ? ("text: " + JSON.stringify(textDef.text))
            : ("path : " + JSON.stringify(textDef.path)))
        + "}";
}

let output = "export type TextId = " + index.map(textDef => JSON.stringify(textDef.id)).join("\n  | ") + ";"
    + "\n"
    + "\n" + "interface TextDefinition {"
    + "\n" + "  text?: string"
    + "\n" + "  path?: string"
    + "\n" + "}"
    + "\n"
    + "\n" + "export const textDefinitions: { [id in TextId]: TextDefinition } = {"
    + "\n" + "  " + index.map(toJsTextDefinitionEntry).join(",\n  ")
    + "\n" + "}"

fs.mkdirSync(outputTsFileDir, {recursive: true});
fs.writeFileSync(outputTsFileDir + outputFileName, output);

console.log(`Wrote generated text types to ${outputTsFileDir + outputFileName}`);