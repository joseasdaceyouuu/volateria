/* Arnés forense VOLATERÍA — fin de partida en ronda 9 (v1.9.0):
   por qué la última ronda no cerraba con fin + motivoFin. Si vuelve
   a reportarse un "el juego no termina", este es el primer bisturí.

   Uso:   BASE=http://localhost:3000 node scripts/arnes/fin-ronda9.mjs */
import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:3000";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 90_000 });
await sleep(3500);
await page.evaluate(() => {
  localStorage.setItem(
    "vp-run",
    JSON.stringify({
      v: 2, ronda: 9, puntos: 6000, racha: 0, hits: 0, escapes: 0,
      tiros: 0, letras: "", modo: "feria", diaria: false,
      semilla: 42, estado: 42,
    }),
  );
});
await page.reload();
await sleep(4000);
await page.getByRole("button", { name: /Continuar/ }).click();
await sleep(1200);
const t0 = Date.now();
let vistos = [];
while (Date.now() - t0 < 100000) {
  const s = await page.evaluate(() => {
    const d = window.__labD05Dbg ?? {};
    return {
      fase: d.fase, ronda: d.ronda, motivo: d.motivoFin ?? "",
      res: (d.resultados ?? []).join(","),
      vivos: (d.patos ?? []).filter((q) => q.viva).map((q) => q.tipo + ":" + q.est + (q.err ? "*" : "")).join(","),
      enCola: d.enCola,
    };
  });
  vistos.push(`${((Date.now() - t0) / 1000).toFixed(0)}s fase=${s.fase} r=${s.ronda} cola=${s.enCola} res=[${s.res}] vivos=[${s.vivos}] motivo="${s.motivo}"`);
  if (s.fase === "fin") break;
  await sleep(2000);
}
console.log(vistos.filter((_, i) => i % 2 === 0).join("\n"));
const fin = vistos[vistos.length - 1];
console.log("\nÚLTIMO:", fin);
console.log("errores:", errors.length ? errors.slice(0, 3) : "ninguno");
await browser.close();
