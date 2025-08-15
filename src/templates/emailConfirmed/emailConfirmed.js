import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

export const emailConfirmedTemplate = (name) => {
    const __filename = fileURLToPath(import.meta.url);
    const filePath = path.join(path.dirname(__filename), "emailConfirmed.html");
    let html = fs.readFileSync(filePath, "utf-8");
    html = html.replace("{{name}}", name);
    html = html.replace("{{homePage}}", `${process.env.CORS_ORIGIN}/home.html`);
    html = html.replace("{{loginPage}}", `${process.env.CORS_ORIGIN}/index.html`);
    return html;
}