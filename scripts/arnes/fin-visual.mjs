/* Arnés forense VOLATERÍA — cartel del fin con el motivo visible
   (V81): juega sin disparar, deja que la volada escape entera y
   comprueba que el cartel del fin dice POR QUÉ acabó. Guarda una
   captura como evidencia (OUT o artefactos/ junto al arnés).

   Uso:   OUT=/tmp/fin.png node scripts/arnes/fin-visual.mjs */
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = process.env.OUT ?? resolve(import.meta.dirname, "artefactos/fin-con-motivo.png");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 90_000 });
await sleep(3500);
await page.getByRole("button", { name: "Comenzar" }).click();
await sleep(900);
// no disparar: la volada entera escapa y el fin llega con su motivo
const t0 = Date.now();
let motivo = "";
while (Date.now() - t0 < 60000) {
  const s = await page.evaluate(() => {
    const d = window.__labD05Dbg ?? {};
    return { fase: d.fase, motivo: d.motivoFin ?? "" };
  });
  if (s.fase === "fin") { motivo = s.motivo; break; }
  await sleep(600);
}
console.log("MOTIVO FIN:", motivo);
mkdirSync(dirname(OUT), { recursive: true });
await page.screenshot({ path: OUT });
console.log("captura:", OUT);
const cartelTxt = await page.evaluate(() =>
  (document.body.textContent ?? "").replace(/\s+/g, " "),
);
console.log("cartel contiene el motivo:", cartelTxt.includes(motivo) && motivo.length > 0);
console.log("errores:", errors.length ? errors : "ninguno");
await browser.close();
