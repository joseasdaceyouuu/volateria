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
