/* VOLATERÍA — fantasma.ts (V78): el cuaderno de la tarde.
   La Volada del Día graba cada disparo con el reloj de la tarde y al
   caer deja un FANTASMA: la mejor tarde del día, revivible tiro a
   tiro porque la feria está sembrada (V75). Todo puro y con
   try/catch cortés: sin bolsillo no hay fantasma, pero hay feria. */

import { fechaUtcDeHoy } from "./engine/config";
import type { EventoFantasma } from "./engine/volateria-engine";

export type Fantasma = {
  v: 1;
  fecha: string; // fechaUtcDeHoy() — el fantasma vive UN solo día
  puntos: number; // la tarde que cuenta
  ronda: number;
  eventos: EventoFantasma[]; // disparos y recargas, con su reloj
};

const FANTASMA_PREFIJO = "vp-fantasma-";

export const fantasmaKeyDeHoy = () => `${FANTASMA_PREFIJO}${fechaUtcDeHoy()}`;

/* el fantasma de hoy — null si no hay, si está viejo o si no cuadra */
export const leeFantasma = (): Fantasma | null => {
  try {
    const raw = localStorage.getItem(fantasmaKeyDeHoy());
    if (!raw) return null;
    const f = JSON.parse(raw) as Fantasma;
    return f &&
      f.v === 1 &&
      f.fecha === fechaUtcDeHoy() &&
      Number.isFinite(f.puntos) &&
      Array.isArray(f.eventos) &&
      f.eventos.length > 0
      ? f
      : null;
  } catch {
    return null;
  }
};

/* deja el fantasma si supera al campeón del día — true si es nuevo */
export const guardaFantasma = (f: Fantasma): boolean => {
  if (f.eventos.length === 0) return false;
  const prev = leeFantasma();
  if (prev && prev.puntos >= f.puntos) return false;
  try {
    localStorage.setItem(fantasmaKeyDeHoy(), JSON.stringify(f));
    return true;
  } catch {
    return false;
  }
};
