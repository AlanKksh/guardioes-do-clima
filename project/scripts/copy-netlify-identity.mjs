import { copyFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const files = [
    {
        source: resolve(root, "node_modules/@netlify/identity/dist/main.js"),
        targetName: "netlify-identity.js"
    },
    {
        source: resolve(root, "node_modules/gotrue-js/lib/index.js"),
        targetName: "gotrue-js.js"
    }
];

function copyToDir(sTargetDir) {
    mkdirSync(sTargetDir, { recursive: true });

    files.forEach(function (oFile) {
        var sTarget = resolve(sTargetDir, oFile.targetName);
        copyFileSync(oFile.source, sTarget);
        console.log("Arquivo " + sTarget + " copiado com sucesso.");
    });
}

copyToDir(resolve(root, "webapp/lib"));

if (existsSync(resolve(root, "dist"))) {
    copyToDir(resolve(root, "dist/lib"));

    var sAuthBootstrapSource = resolve(root, "webapp/auth-bootstrap.js");
    var sAuthBootstrapTarget = resolve(root, "dist/auth-bootstrap.js");
    copyFileSync(sAuthBootstrapSource, sAuthBootstrapTarget);
    console.log("Arquivo " + sAuthBootstrapTarget + " copiado com sucesso.");
}
