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
    return s && s.v === 1 && Number.isFinite(s.ronda) ? s : null;
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
});

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
  return gana.filter(Boolean);
};

/* ── el sello de la Volada del Día ── */
export type SelloDiario = { puntos: number; ronda: number; fecha: string };

export const leeSelloDiario = (): SelloDiario | null => {
  try {
    const raw = localStorage.getItem(dailyKey());
    return raw ? (JSON.parse(raw) as SelloDiario) : null;
  } catch {
    return null;
  }
};
export const sellaDiario = (s: VolateriaStats) => {
  try {
    const d = new Date();
    localStorage.setItem(
      dailyKey(d),
      JSON.stringify({
        puntos: s.puntos,
        ronda: s.ronda,
        fecha: `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`,
      } satisfies SelloDiario),
    );
  } catch {}
};

/* ── el texto de comparte — spoiler-free, al estilo de la casa ── */
export const textoDeRun = (s: VolateriaStats): string => {
  const acc = s.tiros > 0 ? Math.round((s.hits / s.tiros) * 100) : 0;
  const d = new Date();
  const dia = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
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
