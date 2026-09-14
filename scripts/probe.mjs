/* Probe VOLATERÍA standalone (extraída de probe-lab-d5 V68).
   Verifica de punta a punta la feria servida en la raíz:
   1. CARTEL LISTO: marco con firma, canvas vivo, __labD05Dbg objeto
      plano con fase=listo, botón COMENZAR.
   2. JUGANDO: COMENZAR → fase=jugando, ronda 1, 3 balas, un pato real
      (no-cebo) vivo en pantalla (telemetría normalizada).
   3. CONTRATO DEL PUNTERO: mouse a coords conocidas ⇒ px/py en px CSS
      exactos (tolerancia 2).
   4. DISPARO AL AIRE: balas 3→2, tiros=1, racha intacta.
  4b. PAUSA (V69): ESC detiene el mundo (presa congelada), P reanuda.
   5. CAZA REAL: se lee la posición de un pato REAL (cebo excluido),
      se le dispara ENCIMA → hits=1, puntos>0, racha=1, viva=false.
   6. RESOLUCIÓN: resultados[0]=acierto cuando toca el campo y el
      ZORRO sube con la presa (zorro>0).
   7. RECARGA: balas a cero → tecla R → cargador de nuevo (recargando).
   8. M silencio → muted on/off.
   8b. CONTRATO AMPLIADO: poder/poderT/globos[]/cebo/id/cuota.
   8d. V71: modo/viento/letras en telemetría + selector VETERANO (2 balas).
   8c. GLOBO DE PODER: aparece, se le dispara → poder activo o PLOMO.
   9. MÓVIL 390: la feria vive (fps>=3) y el tap dispara (balas--).
  10. ESC sin salida (el juego ES la raíz). Cero errores de consola.
   Capturas en download/audit-volateria/. */
import { chromium } from "playwright";
import { mkdirSync } from "fs";

const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = new URL("../../download/audit-volateria/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let pass = 0;
let fail = 0;
function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  — " + detail : ""}`);
  ok ? pass++ : fail++;
}

/* espera condicionada — la feria corre a dt de SwiftShader en local */
async function hasta(page, fn, timeoutMs = 30000, step = 400) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    try {
      const v = await page.evaluate(fn);
      if (v) return v;
    } catch {}
    await sleep(step);
  }
  return null;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`console: ${m.text()}`);
});

/* ── 1 · EL CARTEL LISTO (raíz) ──────────────────────────────── */
await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 90_000 });
await sleep(4000);
const s1 = await page.evaluate(() => {
  const d = window.__labD05Dbg ?? {};
  return {
    ok: d.ok ?? false,
    fase: d.fase ?? "",
    canvas: document.querySelectorAll("canvas").length,
    firma: document.body.textContent.toUpperCase().includes("LA FERIA"),
    cartel: document.body.textContent.toUpperCase().includes("VOLATERÍA"),
    patosTipo: typeof window.__labD05Dbg,
  };
});
check("cartel — marco con firma y lienzo doble", s1.firma && s1.canvas >= 2, `canvas=${s1.canvas}`);
check("cartel — telemetría objeto plano (no función)", s1.patosTipo === "object", `typeof=${s1.patosTipo}`);
check("cartel — motor vivo y en fase listo", s1.ok === true && s1.fase === "listo", `ok=${s1.ok} fase=${s1.fase}`);
check("cartel — VOLATERÍA en escena", s1.cartel);
await page.screenshot({ path: `${OUT}01-listo.png` });

/* ── 2 · COMENZAR → jugando ──────────────────────────────────── */
await page.getByRole("button", { name: "Comenzar" }).click();
await sleep(700);
const s2 = await page.evaluate(() => {
  const d = window.__labD05Dbg ?? {};
  return { fase: d.fase ?? "", ronda: d.ronda ?? 0, balas: d.balas ?? 0 };
});
check("juego — COMENZAR arranca (jugando, ronda 1, 3 balas)", s2.fase === "jugando" && s2.ronda === 1 && s2.balas === 3, `fase=${s2.fase} ronda=${s2.ronda} balas=${s2.balas}`);

/* el primer pato REAL entra en escena (cebo excluido: señuelos y
   cuervos no cuentan para la caza) */
const pato1 = await hasta(
  page,
  () => {
    const d = window.__labD05Dbg ?? {};
    const v = (d.patos ?? []).find((q) => q.viva && !q.cebo);
    return v ? { id: v.id, x: v.x, y: v.y } : null;
  },
  25000,
  200,
);
check("juego — un pato real vivo en pantalla (telemetría normalizada)", !!pato1, pato1 ? `id=${pato1.id} x=${pato1.x.toFixed(3)} y=${pato1.y.toFixed(3)}` : "sin pato");

/* ── 3 · CONTRATO DEL PUNTERO — px/py en píxeles CSS ─────────── */
await page.mouse.move(Math.round(1440 * 0.75), Math.round(900 * 0.4));
await sleep(500);
const pt = await page.evaluate(() => {
  const d = window.__labD05Dbg ?? {};
  return { px: d.px ?? -1, py: d.py ?? -1 };
});
check(
  "puntero — px/py exactos en px CSS",
  Math.abs(pt.px - 1440 * 0.75) <= 2 && Math.abs(pt.py - 900 * 0.4) <= 2,
  `px=${pt.px} esp=${1440 * 0.75} · py=${pt.py} esp=${900 * 0.4}`,
);

/* ── 4 · DISPARO AL AIRE — el plomo se gasta igual ───────────── */
await page.mouse.click(Math.round(1440 * 0.5), Math.round(900 * 0.94));
await sleep(500);
const s3 = await page.evaluate(() => {
  const d = window.__labD05Dbg ?? {};
  return { balas: d.balas ?? 0, tiros: d.tiros ?? 0, racha: d.racha ?? 0 };
});
check("tiro — al aire gasta balas (3→2) y cuenta el disparo", s3.balas === 2 && s3.tiros === 1 && s3.racha === 0, `balas=${s3.balas} tiros=${s3.tiros}`);
await page.screenshot({ path: `${OUT}02-jugando.png` });

/* ── 4b · PAUSA (V69) — ESC contiene el mundo, P lo reanuda ──── */
await page.keyboard.press("Escape");
await sleep(400);
const pz1 = await page.evaluate(() => {
  const d = window.__labD05Dbg ?? {};
  const p = (d.patos ?? []).find((q) => q.viva && !q.cebo);
  return { pausa: d.pausa ?? null, x: p ? p.x : null, y: p ? p.y : null };
});
await sleep(800);
const pz2 = await page.evaluate(() => {
  const d = window.__labD05Dbg ?? {};
  const p = (d.patos ?? []).find((q) => q.viva && !q.cebo);
  return { x: p ? p.x : null, y: p ? p.y : null };
});
check("pausa — ESC activa la pausa (V69)", pz1.pausa === true, `pausa=${pz1.pausa}`);
check(
  "pausa — el mundo congelado (la presa no vuela)",
  pz1.x === null || (pz1.x === pz2.x && pz1.y === pz2.y),
  pz1.x === null ? "sin presa viva" : `dx=${Math.abs(pz2.x - pz1.x).toFixed(4)}`,
);
await page.keyboard.press("p");
await sleep(400);
const pz3 = await page.evaluate(() => (window.__labD05Dbg ?? {}).pausa ?? null);
check("pausa — P reanuda la feria", pz3 === false, `pausa=${pz3}`);
await page.screenshot({ path: `${OUT}02b-pausa.png` });

/* ── 5 · CAZA REAL — se sigue al pato REAL y se le dispara encima ── */
const fresco = await hasta(
  page,
  () => {
    const d = window.__labD05Dbg ?? {};
    const v = (d.patos ?? []).find(
      (q) => q.viva && !q.cebo && q.y > 0.05 && q.y < 0.6,
    );
    return v ? { id: v.id, x: v.x, y: v.y } : null;
  },
  25000,
  150,
);
if (!fresco) {
  check("caza — pato localizado para el disparo", false, "sin telemetría del pato");
} else {
  const hits0 = await page.evaluate(() => (window.__labD05Dbg ?? {}).hits ?? 0);
  const tiros0 = await page.evaluate(() => (window.__labD05Dbg ?? {}).tiros ?? 0);
  let objetivoId = fresco.id;
  let s4 = null;
  for (let intento = 0; intento < 8; intento++) {
    const pos = await page.evaluate((id) => {
      const d = window.__labD05Dbg ?? {};
      const lista = d.patos ?? [];
      const p =
        lista.find((q) => q.id === id && q.viva) ??
        lista.find((q) => q.viva && !q.cebo && q.y > 0.05 && q.y < 0.6);
      return p ? { id: p.id, x: p.x, y: p.y } : null;
    }, objetivoId);
    if (!pos) break;
    objetivoId = pos.id;
    await page.mouse.click(Math.round(pos.x * 1440), Math.round(pos.y * 900));
    await sleep(400);
    const d = await page.evaluate((id) => {
      const dbg = window.__labD05Dbg ?? {};
      const p = (dbg.patos ?? []).find((q) => q.id === id);
      return {
        hits: dbg.hits ?? 0,
        puntos: dbg.puntos ?? 0,
        racha: dbg.racha ?? 0,
        viva: p ? p.viva : null,
      };
    }, pos.id);
    if (d.hits > hits0) {
      s4 = d;
      break;
    }
  }
  const tiros1 = await page.evaluate(() => (window.__labD05Dbg ?? {}).tiros ?? 0);
  check(
    "caza — el disparo al pato REGISTRA (hits+1, puntos>0, racha≥1)",
    !!s4 && s4.hits === hits0 + 1 && s4.puntos > 0 && s4.racha >= 1,
    s4 ? `hits=${s4.hits} pts=${s4.puntos} racha=${s4.racha}` : `sin hit en 8 intentos (tiros ${tiros0}→${tiros1})`,
  );
  check("caza — el pato tocado deja de volar (viva=false)", !!s4 && s4.viva === false, s4 ? `viva=${s4.viva}` : "sin hit");
  check("caza — el plomo se gastó en la caza (tiros++)", tiros1 > tiros0, `tiros ${tiros0}→${tiros1}`);
  await page.screenshot({ path: `${OUT}03-caza.png` });
}

/* ── 6 · RESOLUCIÓN — un pato cae al campo y el ZORRO sube ───── */
const resuelto = await hasta(
  page,
  () => {
    const d = window.__labD05Dbg ?? {};
    const ok1 = (d.resultados ?? []).some((r) => r === "acierto");
    const ok2 = (d.zorro ?? 0) > 0;
    return ok1 || ok2 ? { res: (d.resultados ?? []).find((r) => r === "acierto"), zorro: d.zorro } : null;
  },
  45000,
  500,
);
check(
  "resolución — hay acierto en la volada y el zorro sube",
  !!resuelto && resuelto.res === "acierto" && resuelto.zorro > 0,
  resuelto ? `res=${resuelto.res} zorro=${resuelto.zorro}` : "sin resolución",
);
await page.screenshot({ path: `${OUT}04-zorro.png` });

/* ── 7 · RECARGA — balas a cero, R repone ────────────────────── */
const vivoRecarga = await hasta(
  page,
  () => {
    const d = window.__labD05Dbg ?? {};
    return (d.patos ?? []).some((q) => q.viva && !q.cebo) ? true : null;
  },
  30000,
  200,
);
let vacio = -1;
for (let i = 0; i < 4; i++) {
  await page.mouse.click(Math.round(1440 * 0.5), Math.round(900 * 0.94));
  await sleep(250);
  vacio = await page.evaluate(() => (window.__labD05Dbg ?? {}).balas ?? -1);
  if (vacio === 0) break;
}
await page.keyboard.press("r");
const recargo = await hasta(
  page,
  () => {
    const d = window.__labD05Dbg ?? {};
    return d.balas === 3 && !d.recargando ? { balas: d.balas } : null;
  },
  12000,
  250,
);
check(
  "recarga — cargador vacío y R lo repone (balas=3)",
  !!vivoRecarga && vacio === 0 && !!recargo,
  `vacías=${vacio} → ${recargo ? recargo.balas : "?"}`,
);

/* ── 8 · M — silencio on/off ─────────────────────────────────── */
await page.keyboard.press("m");
await sleep(300);
const mute1 = await page.evaluate(() => (window.__labD05Dbg ?? {}).muted ?? null);
await page.keyboard.press("m");
await sleep(300);
const mute2 = await page.evaluate(() => (window.__labD05Dbg ?? {}).muted ?? null);
check("sonido — M alterna muted on/off", mute1 === true && mute2 === false, `m1=${mute1} m2=${mute2}`);

/* ── 8b · CONTRATO AMPLIADO — poder, globos, cebo, id y cuota ─── */
const ampliado = await page.evaluate(() => {
  const d = window.__labD05Dbg ?? {};
  return {
    poder: typeof d.poder,
    poderT: typeof d.poderT,
    globos: Array.isArray(d.globos),
    ceboOk: (d.patos ?? []).every((q) => typeof q.cebo === "boolean"),
    idOk: (d.patos ?? []).every((q) => typeof q.id === "number"),
    cuotaOk:
      typeof d.cuota === "number" && d.cuota >= 5 && d.cuota <= 8,
  };
});
check(
  "contrato — telemetría ampliada (poder, globos[], cebo, id, cuota)",
  ampliado.poder === "string" &&
    ampliado.poderT === "number" &&
    ampliado.globos &&
    ampliado.ceboOk &&
    ampliado.idOk &&
    ampliado.cuotaOk,
  JSON.stringify(ampliado),
);

/* ── 8c · GLOBO DE PODER — aparece, se le dispara y algo pasa ─── */
await page.keyboard.press("r"); /* balas frescas para la prueba */
await sleep(900);
const globo = await hasta(
  page,
  () => {
    const d = window.__labD05Dbg ?? {};
    return (d.globos ?? []).length > 0
      ? { x: d.globos[0].x, y: d.globos[0].y, poder: d.globos[0].poder }
      : null;
  },
  110000,
  250,
);
let globoOk = false;
let globoDetalle = "sin globo";
if (globo) {
  for (let intento = 0; intento < 3 && !globoOk; intento++) {
    const g2 = await page.evaluate(() => {
      const d = window.__labD05Dbg ?? {};
      const g = (d.globos ?? [])[0];
      return g ? { x: g.x, y: g.y } : null;
    });
    if (!g2) break;
    const t0 = await page.evaluate(() => (window.__labD05Dbg ?? {}).tiros ?? 0);
    await page.mouse.click(Math.round(g2.x * 1440), Math.round(g2.y * 900));
    await sleep(650);
    const r = await page.evaluate(() => {
      const d = window.__labD05Dbg ?? {};
      return {
        tiros: d.tiros ?? 0,
        poder: d.poder ?? "",
        globos: (d.globos ?? []).length,
      };
    });
    globoDetalle = `poder=${r.poder} globos=${r.globos} tiros=${r.tiros}`;
    if (r.tiros > t0 && (r.poder !== "" || r.globos === 0)) globoOk = true;
  }
}
check(
  "globo — revienta y activa poder (o recarga PLOMO)",
  globoOk,
  globoDetalle,
);
await page.screenshot({ path: `${OUT}05-globo.png` });

/* ── 8d · V71 — MODO, VIENTO Y LETRAS · el selector manda ────── */
const v71 = await page.evaluate(() => {
  const d = window.__labD05Dbg ?? {};
  return { modo: d.modo, viento: typeof d.viento, letras: typeof d.letras };
});
check(
  "v71 — telemetría nueva (modo, viento, letras)",
  v71.modo === "feria" && v71.viento === "number" && v71.letras === "string",
  JSON.stringify(v71),
);
const pg2 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
pg2.on("pageerror", (e) => errors.push(`pg2 pageerror: ${e.message}`));
await pg2.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
await sleep(3000);
await pg2.getByRole("radio", { name: /VETERANO/ }).click();
await sleep(300);
await pg2.getByRole("button", { name: "Comenzar" }).click();
await sleep(700);
const vet = await pg2.evaluate(() => {
  const d = window.__labD05Dbg ?? {};
  return { modo: d.modo, balas: d.balas, fase: d.fase };
});
check(
  "v71 — VETERANO arranca con su modo y 2 balas",
  vet.fase === "jugando" && vet.modo === "veterano" && vet.balas === 2,
  JSON.stringify(vet),
);
await pg2.screenshot({ path: `${OUT}06-veterano.png` });
await pg2.close();

/* ── 9 · MÓVIL 390 — la feria cabe en el bolsillo ────────────── */
const mob = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
mob.on("pageerror", (e) => errors.push(`mob pageerror: ${e.message}`));
await mob.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
await sleep(4000);
const m1 = await mob.evaluate(() => {
  const d = window.__labD05Dbg ?? {};
  return { ok: d.ok ?? false, fase: d.fase ?? "", fps: d.fps ?? 0 };
});
check("móvil — cartel vivo (ok, listo)", m1.ok === true && m1.fase === "listo", `ok=${m1.ok} fase=${m1.fase}`);
await mob.getByRole("button", { name: "Comenzar" }).click();
await sleep(900);
await hasta(
  mob,
  () => {
    const d = window.__labD05Dbg ?? {};
    return (d.patos ?? []).some((q) => q.viva && !q.cebo) ? true : null;
  },
  30000,
  200,
);
await mob.touchscreen.tap(195, 790); /* dentro del campo: tiro al aire seguro */
await sleep(500);
const m2 = await mob.evaluate(() => {
  const d = window.__labD05Dbg ?? {};
  return { balas: d.balas ?? 0, tiros: d.tiros ?? 0, fase: d.fase ?? "" };
});
check(
  "móvil — el tap dispara (balas 3→2)",
  m2.fase === "jugando" && m2.balas === 2 && m2.tiros === 1,
  `balas=${m2.balas} tiros=${m2.tiros} fase=${m2.fase}`,
);
const fpsM =
  (await hasta(
    mob,
    () => {
      const f = (window.__labD05Dbg ?? {}).fps ?? 0;
      return f > 0 ? f : null;
    },
    20000,
    500,
  )) ?? 0;
check("móvil — fps>=3 (SwiftShader local; prod 60)", fpsM >= 3, `fps=${fpsM}`);
await mob.screenshot({ path: `${OUT}05-movil.png` });
await mob.close();

/* ── 10 · ESC sin salida · cero errores ──────────────────────── */
await page.keyboard.press("Escape");
await sleep(1400);
const still = page.url();
check("esc — sin salida: el juego ES la raíz", still.replace(/\/$/, "") === BASE.replace(/\/$/, ""), still);
check("cero errores de consola/página", errors.length === 0, errors.slice(0, 3).join(" | "));

console.log(`\nRESULTADO VOLATERÍA: ${pass} PASS · ${fail} FAIL`);
await browser.close();
process.exit(fail === 0 ? 0 : 1);
