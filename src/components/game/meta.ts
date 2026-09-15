/* VOLATERÍA — meta.ts (V72): la memoria de la feria.
   Trofeos, archivo del cazador y el texto de comparte. Todo puro y
   con try/catch cortés: si el navegador no guarda nada, la feria
   sigue abierta. */

import {
  ARCHIVO_KEY,
  RUN_KEY,
  TROFEOS_KEY,
  dailyKey,
  type RunSnapshot,
} from "./engine/config";
import type { VolateriaStats } from "./engine/volateria-engine";

/* la run guardada — null si no hay o si está vieja */
export const leeRun = (): RunSnapshot | null => {
  try {
    const raw = localStorage.getItem(RUN_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as RunSnapshot;
    /* v1 (V72) y v2 (V75, con semilla+estado) siguen vivas */
    return s && (s.v === 1 || s.v === 2) && Number.isFinite(s.ronda)
      ? s
      : null;
  } catch {
    return null;
  }
};

/* ── los trofeos de la feria ── */
export type Trofeo = { id: string; nombre: string; desc: string };

export const TROFEOS: Trofeo[] = [
  {
    id: "primera",
    nombre: "PRIMERA SANGRE",
    desc: "termina una partida con caza",
  },
  {
    id: "mano",
    nombre: "MANO CALIENTE",
    desc: "racha de 9 seguidos (×4)",
  },
  {
    id: "regicida",
    nombre: "REGICIDA",
    desc: "derriba al PATO REAL",
  },
  {
    id: "perfecta",
    nombre: "VOLADA PERFECTA",
    desc: "8 de 8 sin una fuga",
  },
  {
    id: "coleccionista",
    nombre: "COLECCIONISTA",
    desc: "completa la palabra PREMIO",
  },
  {
    id: "alpelo",
    nombre: "AL PELO",
    desc: "10 silbidos sin tocar en una tarde",
  },
  {
    id: "veterano10",
    nombre: "VETERANO DE LA FERIA",
    desc: "alcanza la ronda 10",
  },
  {
    id: "diezmil",
    nombre: "DIEZ MIL",
    desc: "10.000 puntos en una tarde",
  },
  {
    id: "lastrado",
    nombre: "A LA SEGUNDA",
    desc: "reventó 3 lastrados en una tarde",
  },
  {
    id: "suerte",
    nombre: "LA SUERTE EXISTE",
    desc: "la galleta salvó tu racha",
  },
];

/* ── el archivo del cazador — estadísticas de vida ── */
export type Archivo = {
  partidas: number;
  tiros: number;
  hits: number;
  grazes: number;
  jefes: number;
  mejorRonda: number;
  mejorRacha: number;
  maxPuntos: number;
  especie: Record<string, number>;
  perfectas: number; // V76: voladas perfectas de toda la vida
  premios: number; // V76: PREMIOS completados de toda la vida
  rebotes: number; // V76: plomo que el espejo mandó de vuelta
  bandas: number; // V76: formaciones completas caídas por el guía
  lastrados: number; // V79: lastrados reventados del todo
  galletas: number; // V79: fallos que la galleta perdonó
};

export const ARCHIVO_VACIO: Archivo = {
  partidas: 0,
  tiros: 0,
  hits: 0,
  grazes: 0,
  jefes: 0,
  mejorRonda: 0,
  mejorRacha: 0,
  maxPuntos: 0,
  especie: {},
  perfectas: 0,
  premios: 0,
  rebotes: 0,
  bandas: 0,
  lastrados: 0,
  galletas: 0,
};

export const leeArchivo = (): Archivo => {
  try {
    const raw = localStorage.getItem(ARCHIVO_KEY);
    if (!raw) return { ...ARCHIVO_VACIO };
    const p = JSON.parse(raw) as Partial<Archivo>;
    return {
      ...ARCHIVO_VACIO,
      ...p,
      especie: { ...(p.especie ?? {}) },
    };
  } catch {
    return { ...ARCHIVO_VACIO };
  }
};

export const guardaArchivo = (a: Archivo) => {
  try {
    localStorage.setItem(ARCHIVO_KEY, JSON.stringify(a));
  } catch {}
};

export const fusionaArchivo = (a: Archivo, s: VolateriaStats): Archivo => ({
  partidas: a.partidas + 1,
  tiros: a.tiros + s.tiros,
  hits: a.hits + s.hits,
  grazes: a.grazes + s.grazes,
  jefes: a.jefes + s.jefes,
  mejorRonda: Math.max(a.mejorRonda, s.ronda),
  mejorRacha: Math.max(a.mejorRacha, s.racha),
  maxPuntos: Math.max(a.maxPuntos, s.puntos),
  especie: (() => {
    const e = { ...a.especie };
    for (const [k, v] of Object.entries(s.porEspecie ?? {})) {
      e[k] = (e[k] ?? 0) + v;
    }
    return e;
  })(),
  perfectas: a.perfectas + s.perfectas,
  premios: a.premios + s.premios,
  rebotes: a.rebotes + s.rebotes,
  bandas: a.bandas + s.bandas,
  lastrados: a.lastrados + s.lastrados,
  galletas: a.galletas + s.galletas,
});

/* ── V76: LA ESCALADA — el rango de maestría que paga cada récord.
   V80: peldaños post-LEYENDA — la escalera no termina en la leyenda.
   MITO y RAYO son para el cazador de verdad; EL FERIAL solo lo paga
   LA CUENTA LARGA (la suma de los tres récords). ── */
export const ESCALERA_MAESTRIA = [
  { min: 0, nombre: "APRENDIZ" },
  { min: 2500, nombre: "CAZADOR" },
  { min: 6000, nombre: "DIESTRO" },
  { min: 12000, nombre: "MAESTRO" },
  { min: 25000, nombre: "LEYENDA" },
  { min: 50000, nombre: "MITO" },
  { min: 90000, nombre: "RAYO" },
  { min: 150000, nombre: "EL FERIAL" },
] as const;

export const maestriaDe = (
  record: number,
): { nombre: string; min: number; proximo: number | null } => {
  const r = Number.isFinite(record) ? Math.max(0, Math.floor(record)) : 0;
  let i = 0;
  for (let k = 0; k < ESCALERA_MAESTRIA.length; k++) {
    if (r >= ESCALERA_MAESTRIA[k].min) i = k;
  }
  const actual = ESCALERA_MAESTRIA[i];
  const proximo = ESCALERA_MAESTRIA[i + 1] ?? null;
  return { nombre: actual.nombre, min: actual.min, proximo: proximo?.min ?? null };
};

/* ── V80: LA CUENTA LARGA — la maestría que paga la SUMA de los tres
   récords. Ningún modo solo alcanza estos cielos: es el marcador del
   cazador que juega la feria entera, no una sola caseta. ── */
export const cuentaLarga = (
  cabrito: number,
  feria: number,
  veterano: number,
): { total: number; nombre: string; min: number; proximo: number | null } => {
  const s = (n: number) =>
    Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
  const total = s(cabrito) + s(feria) + s(veterano);
  return { total, ...maestriaDe(total) };
};

/* ── V80: LAS TASAS DE LA CASA — lo que el archivo sabe contar solo.
   Derivadas, jamás guardadas: un porcentaje no ocupa memoria. ── */
export const tasasDeCasa = (a: Archivo) => {
  const espejo = a.especie.espejo ?? 0;
  const cruces = espejo + a.rebotes; // todo cruce con el espejo, ganado o devuelto
  const porTarde = (n: number): number | null =>
    a.partidas > 0 ? Math.round((n / a.partidas) * 10) / 10 : null;
  return {
    crucesEspejo: cruces,
    espejoGana: cruces > 0 ? Math.round((a.rebotes / cruces) * 100) : null,
    bandas: porTarde(a.bandas),
    galletas: porTarde(a.galletas),
    lastrados: porTarde(a.lastrados),
    premios: porTarde(a.premios),
    coronas: porTarde(a.jefes),
    totalCazado: Object.values(a.especie).reduce((x, y) => x + y, 0),
  };
};

/* ── V76: EL PODIO — las 5 mejores tardes de cada modo ── */
export type PodioRun = {
  puntos: number;
  ronda: number;
  fecha: string;
  diaria: boolean;
};
export const PODIO_KEY = "vp-podio";

export const leePodio = (): Record<string, PodioRun[]> => {
  try {
    const raw = localStorage.getItem(PODIO_KEY);
    return raw ? (JSON.parse(raw) as Record<string, PodioRun[]>) : {};
  } catch {
    return {};
  }
};

export const meteEnPodio = (
  modo: string,
  run: PodioRun,
): Record<string, PodioRun[]> => {
  const p = leePodio();
  const lista = [...(p[modo] ?? []), run]
    .sort((x, y) => y.puntos - x.puntos)
    .slice(0, 5);
  const nuevo = { ...p, [modo]: lista };
  try {
    localStorage.setItem(PODIO_KEY, JSON.stringify(nuevo));
  } catch {}
  return nuevo;
};

/* ── los trofeos ganados — un objeto plano en el bolsillo ── */
export const leeTrofeos = (): Record<string, boolean> => {
  try {
    const raw = localStorage.getItem(TROFEOS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
};
export const guardaTrofeos = (t: Record<string, boolean>) => {
  try {
    localStorage.setItem(TROFEOS_KEY, JSON.stringify(t));
  } catch {}
};

/* ¿trofeos que esta run acaba de ganar? — puro, sin efectos */
export const trofeosGanados = (
  s: VolateriaStats,
  ya: Record<string, boolean>,
): Trofeo[] => {
  const gana: Trofeo[] = [];
  const add = (id: string, cond: boolean) => {
    const t = TROFEOS.find((x) => x.id === id);
    if (cond && !ya[id] && t) gana.push(t);
  };
  add("primera", s.fase === "fin" && s.hits > 0);
  add("mano", s.racha >= 9);
  add("regicida", s.jefes >= 1);
  add("perfecta", s.perfectas >= 1);
  add("coleccionista", s.premios >= 1);
  add("alpelo", s.grazes >= 10);
  add("veterano10", s.ronda >= 10);
  add("diezmil", s.puntos >= 10000);
  add("lastrado", s.lastrados >= 3);
  add("suerte", s.galletas >= 1);
  return gana.filter(Boolean);
};

/* ── el sello de la Volada del Día ── */
export type SelloDiario = {
  puntos: number;
  ronda: number;
  fecha: string;
  modo: string; // V75: el modo con el que se selló (la diaria es feria)
};

export const leeSelloDiario = (): SelloDiario | null => {
  try {
    const raw = localStorage.getItem(dailyKey());
    return raw ? (JSON.parse(raw) as SelloDiario) : null;
  } catch {
    return null;
  }
};
/* V75: el PRIMER intento sella el día — la Volada del Día es una
   visita al estilo Wordle; repetir por gusto no reescribe el sello */
export const sellaDiario = (s: VolateriaStats) => {
  try {
    if (leeSelloDiario()) return;
    const d = new Date();
    localStorage.setItem(
      dailyKey(d),
      JSON.stringify({
        puntos: s.puntos,
        ronda: s.ronda,
        fecha: `${String(d.getUTCDate()).padStart(2, "0")}/${String(d.getUTCMonth() + 1).padStart(2, "0")}`,
        modo: s.modo,
      } satisfies SelloDiario),
    );
  } catch {}
};

/* ── el texto de comparte — spoiler-free, al estilo de la casa ── */
export const textoDeRun = (s: VolateriaStats): string => {
  const acc = s.tiros > 0 ? Math.round((s.hits / s.tiros) * 100) : 0;
  const d = new Date();
  /* la diaria comparte su fecha UTC — el mismo día para todo el planeta */
  const dia = s.diaria
    ? `${String(d.getUTCDate()).padStart(2, "0")}/${String(d.getUTCMonth() + 1).padStart(2, "0")}`
    : `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
  const linea1 = s.diaria
    ? `VOLATERÍA · Volada del Día ${dia}`
    : `VOLATERÍA · modo ${s.modo.toUpperCase()}`;
  const linea2 = `ronda ${s.ronda} · ${s.puntos} pts · ${acc}% de puntería`;
  const linea3 =
    s.jefes > 0
      ? `${s.jefes === 1 ? "la corona cayó" : `${s.jefes} coronas cayeron`} en la feria`
      : `racha máxima ×${s.mult}`;
  return `${linea1}\n${linea2}\n${linea3}`;
};

export const comparteRun = async (s: VolateriaStats): Promise<string> => {
  const txt = textoDeRun(s);
  try {
    const nav = navigator as Navigator & {
      share?: (d: { title?: string; text?: string }) => Promise<void>;
    };
    if (nav.share) {
      await nav.share({ title: "VOLATERÍA", text: txt });
      return "compartido";
    }
    await navigator.clipboard.writeText(txt);
    return "copiado";
  } catch {
    try {
      await navigator.clipboard.writeText(txt);
      return "copiado";
    } catch {
      return "no se pudo";
    }
  }
};
