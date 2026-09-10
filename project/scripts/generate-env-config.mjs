import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const outPath = resolve(root, "webapp/config/Env.js");

dotenv.config({ path: resolve(root, ".env") });

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY || "";

if (!OPENWEATHERMAP_API_KEY) {
    console.warn(
        "Aviso: OPENWEATHERMAP_API_KEY não definida. " +
        "Crie o arquivo .env (veja o README) ou defina a variável de ambiente."
    );
}

const escapeForJsString = (value) =>
    value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");

const content = `sap.ui.define([], function () {
    "use strict";

    /**
     * Gerado automaticamente por scripts/generate-env-config.mjs — não edite manualmente.
     * Configure as chaves em .env e execute: npm run env:config
     */
    return {
        OPENWEATHERMAP_API_KEY: "${escapeForJsString(OPENWEATHERMAP_API_KEY)}"
    };
});
`;

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, content, "utf8");
console.log("Arquivo webapp/config/Env.js gerado com sucesso.");
