/* Arnés forense VOLATERÍA — bandada (repro determinista del bug
   "un ave queda dando vueltas e inmatable", hallado en v1.9.0 y
   cerrado en v1.9.0/v1.10.0/v1.12.0). Vive en el repo para que el
   próximo reporte de jugador se pueda reproducir frame a frame, no
   de memoria.

   Test A: BANDADA REAL (ronda 8) — matar las 3 coronas, ver si la ronda cierra.
   Test B: matar 2 coronas y soltar la 3ª — ver cómo/cuándo acaba el juego.
   Test C: BANDA silvestre (ronda 4) sin tocar — ¿rebota para siempre?
   Test D (V84): la fuga se cobra — soltar la 3ª, esperar su fuga y
     dispararle ESCALANDO: el plomo la baja (o la mata) — jamás
     burlarse a quemarropa.

   Uso:   BASE=http://localhost:3000 node scripts/arnes/bandada.mjs
   Solo algunos: SOLO=BD node scripts/arnes/bandada.mjs
   (Next 16 en dev solo responde a `localhost`, nunca a 127.0.0.1.) */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3000";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`console: ${m.text()}`);
});

const sembrar = async (ronda, semilla, estado) => {
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 90_000 });
  await sleep(3500);
  await page.evaluate(([r, s, e]) => {
    try {
      localStorage.setItem(
        "vp-run",
        JSON.stringify({
          v: 2, ronda: r, puntos: 5000, racha: 0, hits: 0, escapes: 0,
          tiros: 0, letras: "", modo: "feria", diaria: false,
          semilla: s, estado: e,
        }),
      );
    } catch {}
  }, [ronda, semilla, estado]);
  await page.reload();
  await sleep(4000);
  await page.getByRole("button", { name: /Continuar/ }).click();
  await sleep(1500);
};

const tel = () =>
  page.evaluate(() => {
    const d = window.__labD05Dbg ?? {};
    return {
      fase: d.fase, ronda: d.ronda, balas: d.balas, jefes: d.jefes,
      volleyHits: d.volleyHits, cuota: d.cuota,
      patos: (d.patos ?? []).map((q) => ({
        id: q.id, tipo: q.tipo, est: q.est, x: +q.x.toFixed(3), y: +q.y.toFixed(3),
      })),
    };
  });

/* espera a que aparezcan N coronas vivas */
const esperarCoronas = async (n, timeout = 30000) => {
  const t0 = Date.now();
  while (Date.now() - t0 < timeout) {
    const st = await tel();
    const coronas = st.patos.filter((q) => q.tipo === "real" && q.est === "vuelo");
    if (coronas.length >= n) return { st, coronas };
    await sleep(300);
  }
  return null;
};

/* mata una corona: clics sobre su posición viva hasta que caiga */
const matarCorona = async (id, maxMs = 40000) => {
  const t0 = Date.now();
  while (Date.now() - t0 < maxMs) {
    const st = await tel();
    if (st.fase !== "jugando") return "fin-partida";
    const c = st.patos.find((q) => q.id === id && q.est === "vuelo");
    if (!c) return "muerta";
    if (st.balas <= 0) {
      await page.keyboard.press("r");
      await sleep(900);
      continue;
    }
    await page.mouse.click(c.x * 1440, c.y * 900);
    await sleep(330);
  }
  return "timeout";
};

const SOLO = process.env.SOLO ?? "ABCD";
const corre = (t) => SOLO.includes(t);

/* ── TEST A: BANDADA REAL completa ─────────────────────────────── */
if (corre("A")) {
console.log("══ TEST A: BANDADA REAL (ronda 8, semilla 42) ══");
await sembrar(8, 42, 42);
let st = await tel();
console.log("arranque:", JSON.stringify({ fase: st.fase, ronda: st.ronda, patos: st.patos.length }));
const rA = await esperarCoronas(3);
if (!rA) {
  console.log("FAIL: no aparecieron 3 coronas");
} else {
  console.log("coronas vivas:", rA.coronas.map((c) => c.id).join(","));
  const t0 = Date.now();
  const linea = [];
  while (Date.now() - t0 < 120000) {
    const s = await tel();
    const vivas = s.patos.filter((q) => q.tipo === "real" && q.est === "vuelo");
    linea.push(`${s.ronda}|${s.fase}|coronas=${vivas.length}|patos=${s.patos.length}|balas=${s.balas}|jefes=${s.jefes}`);
    if (s.fase !== "jugando") { console.log("FASE CAMBIÓ:", s.fase, "ronda", s.ronda); break; }
    if (s.ronda >= 9) { console.log("RONDA 9 ALCANZADA ✓"); break; }
    if (vivas.length > 0) {
      const c = vivas[0];
      if (s.balas <= 0) { await page.keyboard.press("r"); await sleep(900); continue; }
      await page.mouse.click(c.x * 1440, c.y * 900);
    }
    await sleep(300);
  }
  console.log(linea.filter((_, i) => i % 5 === 0).join("\n"));
  const fin = await tel();
  console.log("FINAL A:", JSON.stringify({ fase: fin.fase, ronda: fin.ronda, jefes: fin.jefes, patos: fin.patos }));
}
}

/* ── TEST B: 2 coronas caídas, la tercera se escapa ────────────── */
if (corre("B")) {
console.log("\n══ TEST B: matar 2, soltar la 3ª (ronda 8, semilla 77) ══");
await sembrar(8, 77, 77);
const rB = await esperarCoronas(3);
if (!rB) console.log("FAIL: sin coronas");
else {
  const ids = rB.coronas.map((c) => c.id);
  console.log("coronas:", ids.join(","));
  const r1 = await matarCorona(ids[0]);
  const r2 = await matarCorona(ids[1]);
  console.log("resultados kills:", r1, r2);
  // ahora NO disparamos más: esperar escape de la 3ª (~21.7s) + cierre
  const t0 = Date.now();
  while (Date.now() - t0 < 40000) {
    const s = await tel();
    if (s.fase !== "jugando") { console.log(`fase=${s.fase} ronda=${s.ronda} tras ${(Date.now() - t0) / 1000}s`); break; }
    await sleep(500);
  }
  const finB = await tel();
  console.log("FINAL B:", JSON.stringify({ fase: finB.fase, ronda: finB.ronda, patos: finB.patos.length }));
}
}

/* ── TEST C: BANDA silvestre sin tocar (ronda 4) ───────────────── */
if (corre("C")) {
console.log("\n══ TEST C: banda silvestre sin tocar (ronda 4, semilla 99) ══");
await sembrar(4, 99, 99);
let bandaVista = null;
const t0 = Date.now();
const muestras = [];
while (Date.now() - t0 < 45000) {
  const s = await tel();
  const banda = s.patos.filter((q) => q.tipo === "banda" && q.est === "vuelo");
  if (banda.length > 0 && !bandaVista) {
    bandaVista = { t: (Date.now() - t0) / 1000, n: banda.length };
    console.log(`banda apareció t=${bandaVista.t}s con ${banda.length} aves`);
  }
  if (banda.length > 0) muestras.push({ t: +((Date.now() - t0) / 1000).toFixed(1), xs: banda.map((b) => +b.x.toFixed(2)) });
  if (s.fase !== "jugando") { console.log("FASE:", s.fase, "ronda", s.ronda); break; }
  await sleep(600);
}
if (muestras.length > 0) {
  const primera = muestras[0], ultima = muestras[muestras.length - 1];
  console.log(`banda persiste de t=${primera.t}s a t=${ultima.t}s (${(ultima.t - primera.t).toFixed(0)}s), aves=${ultima.xs.length}`);
  console.log("muestras x (cada 6):");
  for (const m of muestras.filter((_, i) => i % 6 === 0).slice(0, 12))
    console.log(`  t=${m.t}s x=[${m.xs.join(",")}]`);
} else console.log("banda nunca apareció en 45s (semilla sin banda temprana)");
}

/* ── TEST D (V84): LA FUGA SE COBRA ────────────────────────── */
if (corre("D")) {
console.log("\n══ TEST D: la fuga se cobra (ronda 8, semilla 42) ══");
await sembrar(8, 42, 42);
const rD = await esperarCoronas(3);
if (!rD) console.log("FAIL: sin coronas");
else {
  const ids = rD.coronas.map((c) => c.id);
  console.log("coronas:", ids.join(","));
  const k1 = await matarCorona(ids[0]);
  const k2 = await matarCorona(ids[1]);
  console.log("kills:", k1, k2);
  // la tercera: esperar que su reloj expire y entre en fuga
  const id3 = ids[2];
  const t0 = Date.now();
  let enFuga = null;
  while (Date.now() - t0 < 40000 && !enFuga) {
    const s = await tel();
    if (s.fase !== "jugando") break;
    const c = s.patos.find((q) => q.id === id3);
    if (!c) break; // ya no está
    if (c.est === "fuga") enFuga = { x: c.x, y: c.y, t: (Date.now() - t0) / 1000 };
    else if (c.est === "vuelo" && s.balas <= 0) { await page.keyboard.press("r"); await sleep(900); }
    await sleep(150);
  }
  if (!enFuga) console.log("la 3ª nunca entró en fuga (o ya no está)");
  else {
    console.log(`fuga detectada t=${enFuga.t}s — disparando ESCALANDO…`);
    // disparar mientras escala: el plomo la baja o la mata
    let veredicto = "se escapó (FAIL)";
    const t1 = Date.now();
    while (Date.now() - t1 < 12000) {
      const s = await tel();
      const c = s.patos.find((q) => q.id === id3);
      if (!c || c.est === "caida" || c.est === "suelto") { veredicto = "MUERTA durante la fuga ✓"; break; }
      if (c.est === "vuelo") { veredicto = "EL PLOMO LA BAJÓ ✓ (reingresó en vuelo)"; break; }
      if (s.balas <= 0) { await page.keyboard.press("r"); await sleep(850); continue; }
      await page.mouse.click(c.x * 1440, c.y * 900);
      await sleep(120);
    }
    console.log("VEREDICTO D:", veredicto);
    // si reingresó, terminar el trabajo y verificar el cierre de ronda
    const t2 = Date.now();
    while (Date.now() - t2 < 60000) {
      const s = await tel();
      if (s.fase !== "jugando" || s.ronda >= 9) { console.log(`CIERRE ✓ fase=${s.fase} ronda=${s.ronda}`); break; }
      const vivas = s.patos.filter((q) => q.tipo === "real" && (q.est === "vuelo" || q.est === "fuga"));
      if (vivas.length > 0) {
        const c = vivas[0];
        if (s.balas <= 0) { await page.keyboard.press("r"); await sleep(850); continue; }
        await page.mouse.click(c.x * 1440, c.y * 900);
      }
      await sleep(280);
    }
  }
  const finD = await tel();
  console.log("FINAL D:", JSON.stringify({ fase: finD.fase, ronda: finD.ronda, jefes: finD.jefes }));
}
}

console.log("\nerrores de consola:", errors.length ? errors.slice(0, 5) : "ninguno");
await browser.close();
