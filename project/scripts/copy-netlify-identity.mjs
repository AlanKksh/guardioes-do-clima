import { copyFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const source = resolve(root, "node_modules/@netlify/identity/dist/main.js");
const targets = [
    resolve(root, "webapp/lib/netlify-identity.js"),
    resolve(root, "dist/lib/netlify-identity.js")
];

mkdirSync(dirname(targets[0]), { recursive: true });
copyFileSync(source, targets[0]);
console.log("Arquivo webapp/lib/netlify-identity.js copiado com sucesso.");

if (existsSync(resolve(root, "dist"))) {
    mkdirSync(dirname(targets[1]), { recursive: true });
    copyFileSync(source, targets[1]);
    console.log("Arquivo dist/lib/netlify-identity.js copiado com sucesso.");
}
