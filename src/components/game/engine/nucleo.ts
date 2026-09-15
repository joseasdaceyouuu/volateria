/* VOLATERÍA — nucleo.ts (V83): el corazón puro del plomo.
   La geometría del disparo —radios, orden de presa, graze— vive
   aquí SIN React, sin canvas, sin audio: decisiones que los tests
   juzgan en milisegundos y que el motor solo ejecuta. La feria
   engaña, jamás roba: este archivo es la prueba matemática. */

import { MIRA } from "./config";

/* lo mínimo que una presa debe decirle al plomo */
export type Objetivo = { x: number; y: number; scale: number };

/* el radio de una ave según su tamaño: base × (fija + proporcional) */
export const escalaDeMira = (scale: number) =>
  MIRA.base * (MIRA.escala0 + scale * MIRA.escala1);

/* radio efectivo contra una ave de caza (escopeta/asistencia aparte) */
export const radioPato = (
  scale: number,
  escopeta = false,
  asistencia = false,
) =>
  escalaDeMira(scale) *
  (escopeta ? MIRA.escopeta : 1) *
  (asistencia ? MIRA.asistencia : 1);

/* ¿el plomo que cayó en (cx, cy) toca esa ave? — pura distancia² */
export const impactaPato = (
  cx: number,
  cy: number,
  o: Objetivo,
  escopeta = false,
  asistencia = false,
): boolean => {
  const dx = o.x - cx;
  const dy = o.y - cy;
  const R = radioPato(o.scale, escopeta, asistencia);
  return dx * dx + dy * dy < R * R;
};

/* radio de la madera: el cebo perdona algo menos */
export const radioCebo = (scale: number) =>
  MIRA.cebo * (MIRA.escala0 + scale * MIRA.escala1);

export const impactaCebo = (cx: number, cy: number, o: Objetivo): boolean => {
  const dx = o.x - cx;
  const dy = o.y - cy;
  const R = radioCebo(o.scale);
  return dx * dx + dy * dy < R * R;
};

/* el globo del premio flota con su propio radio — no necesita scale */
export const impactaGlobo = (
  cx: number,
  cy: number,
  g: { x: number; y: number },
): boolean => {
  const dx = g.x - cx;
  const dy = g.y - cy;
  return dx * dx + dy * dy < MIRA.globo * MIRA.globo;
};

/* LAS PRESAS — vivas, no-cebo, dentro del radio, ordenadas por
   cercanía: el plomo entra por el más cercano. `elegible` deja
   fuera cebo y humo transparente sin que el nucleo sepa de ellos */
export const presasDe = <T extends Objetivo>(
  patos: readonly T[],
  cx: number,
  cy: number,
  escopeta: boolean,
  asistencia: boolean,
  elegible: (p: T) => boolean,
): T[] => {
  const presas: T[] = [];
  const dists: number[] = [];
  for (const p of patos) {
    if (!elegible(p)) continue;
    const dx = p.x - cx;
    const dy = p.y - cy;
    const d2 = dx * dx + dy * dy;
    const R = radioPato(p.scale, escopeta, asistencia);
    if (d2 < R * R) {
      presas.push(p);
      dists.push(d2);
    }
  }
  return presas
    .map((p, i) => [p, dists[i]] as const)
    .sort((a, b) => a[1] - b[1])
    .map(([p]) => p);
};

/* el cebo más cercano que come el plomo — null si el tiro va limpio */
export const ceboDe = <T extends Objetivo>(
  patos: readonly T[],
  cx: number,
  cy: number,
  esCebo: (p: T) => boolean,
): T | null => {
  let cebo: T | null = null;
  let bc = Infinity;
  for (const p of patos) {
    if (!esCebo(p)) continue;
    const dx = p.x - cx;
    const dy = p.y - cy;
    const d2 = dx * dx + dy * dy;
    const R = radioCebo(p.scale);
    if (d2 < R * R && d2 < bc) {
      bc = d2;
      cebo = p;
    }
  }
  return cebo;
};

/* ¡AL PELO! — la presa más cercana silbada sin tocar (graze) */
export const grazeDe = <T extends Objetivo>(
  patos: readonly T[],
  cx: number,
  cy: number,
  visible: (p: T) => boolean,
): T | null => {
  let cerca: T | null = null;
  let bd = Infinity;
  for (const p of patos) {
    if (!visible(p)) continue;
    const dx = p.x - cx;
    const dy = p.y - cy;
    const d = Math.hypot(dx, dy);
    if (d < MIRA.alPelo && d < bd) {
      bd = d;
      cerca = p;
    }
  }
  return cerca;
};
