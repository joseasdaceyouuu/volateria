/* VOLATERÍA — config.ts (V70): los tunables de la feria, UNA sola
   fuente de verdad. El motor y la sala leen aquí; el HUD jamás
   adivina constantes del motor (lección de la auditoría: el 380 del
   poder vivía duplicado y el cartel podía mentir). */

export const RECORD_KEY = "vp-volateria-record";

/* la CUOTA PROGRESIVA (V67) — como el Duck Hunt de NES: pasar la
   ronda exige más puntería cada dos rondas; la 7+ ha de ser perfecta */
export const CUOTAS = [5, 5, 6, 6, 7, 7, 8] as const;
export const quotaOf = (r: number) =>
  CUOTAS[Math.min(CUOTAS.length - 1, Math.max(0, r - 1))];

/* velocidad base SIN TECHO (V67): 0.42/ronda hasta la 8, +0.14 para
   siempre — el veterano nunca encuentra un plano máximo */
export const velocidadRonda = (r: number) =>
  3.9 + 0.42 * Math.min(Math.max(1, r) - 1, 7) + 0.14 * Math.max(0, r - 8);

export const VOLADA = 8; // patos por ronda

/* la mano caliente — ×2 a los 3 seguidos, ×4 a los 9 (V68) */
export const multOf = (racha: number) => 1 + Math.min(3, Math.floor(racha / 3));

/* EL PATO REAL baja cada cuatro rondas — la cacería de la corona */
export const esJefe = (r: number) => r >= 4 && r % 4 === 0;

/* duración de los poderes activos, en frames (60fps ≙ dt 1) —
   PLOMO no figura: su efecto es instantáneo, no tiene reloj */
export const PODER_DURACION = { escopeta: 380, tiempo: 330 } as const;

/* ── V71: LOS MODOS DE LA FERIA — cada uno con su récord propio ── */
export type ModoId = "cabrito" | "feria" | "veterano";
export type Modo = {
  id: ModoId;
  nombre: string;
  lema: string;
  balasBase: number; // cartuchos por pato en la oleada
  cuotaAjuste: number; // −1 feria amable · +1 sin piedad
  velocidadMul: number;
  recordKey: string;
};
export const MODOS: Record<ModoId, Modo> = {
  cabrito: {
    id: "cabrito",
    nombre: "CABRITO",
    lema: "la feria amable",
    balasBase: 5,
    cuotaAjuste: -1,
    velocidadMul: 0.85,
    recordKey: "vp-volateria-record-cabrito",
  },
  feria: {
    id: "feria",
    nombre: "FERIA",
    lema: "la casa manda",
    balasBase: 3,
    cuotaAjuste: 0,
    velocidadMul: 1,
    recordKey: "vp-volateria-record",
  },
  veterano: {
    id: "veterano",
    nombre: "VETERANO",
    lema: "sin piedad",
    balasBase: 2,
    cuotaAjuste: 1,
    velocidadMul: 1.15,
    recordKey: "vp-volateria-record-veterano",
  },
};

/* la cuota de la ronda según el modo — el suelo es 3 para que el
   cabrito no se ahogue, el techo 9 porque la perfección ya es 8 */
export const cuotaModo = (r: number, m: Modo) =>
  Math.max(3, Math.min(9, quotaOf(r) + m.cuotaAjuste));

/* V71: los jefes rotan — ronda 4 EL PATO REAL, ronda 8 LA BANDADA
   REAL, y así alternando cada cuatro rondas para siempre */
export const tipoDeJefe = (r: number): "real" | "banda" =>
  r % 8 === 0 ? "banda" : "real";

/* V71: las letras del PREMIO — el mensajero verde las trae una a una */
export const LETRAS_PREMIO = "PREMIO";

/* ── V72: LA RUN RECUPERABLE — la tarde no se pierde con un refresh ── */
export const RUN_KEY = "vp-run";
export type RunSnapshot = {
  v: 1;
  ronda: number; // la ronda QUE VIENE (ya superada la anterior)
  puntos: number;
  racha: number;
  hits: number;
  escapes: number;
  tiros: number;
  letras: string; // "" · "PRE…" · "PREMIO"
  modo: ModoId;
  diaria: boolean;
};

/* llaves del localStorage de la meta (V72) */
export const ARCHIVO_KEY = "vp-archivo";
export const TROFEOS_KEY = "vp-trofeos";
export const dailyKey = (d = new Date()) =>
  `vp-daily-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
