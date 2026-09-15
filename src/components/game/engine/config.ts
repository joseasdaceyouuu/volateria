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

/* la vida de la corona: 3 de base y +1 cada 8 rondas — el plomo
   pide más puntería conforme sube la escalera. V83: aquí, no
   escondida en el motor (la misma lección del 380 del poder) */
export const hpDeJefe = (r: number) => 3 + Math.floor(r / 8);

/* V71: las letras del PREMIO — el mensajero verde las trae una a una */
export const LETRAS_PREMIO = "PREMIO";

/* ── V72: LA RUN RECUPERABLE — la tarde no se pierde con un refresh ── */
export const RUN_KEY = "vp-run";
export type RunSnapshot = {
  v: 1 | 2; // v2 (V75) lleva semilla+estado: continuar reproduce el MISMO cielo
  ronda: number; // la ronda QUE VIENE (ya superada la anterior)
  puntos: number;
  racha: number;
  hits: number;
  escapes: number;
  tiros: number;
  letras: string; // "" · "PRE…" · "PREMIO"
  modo: ModoId;
  diaria: boolean;
  semilla?: number; // V75: semilla de la run (diaria UTC o caos sembrado)
  estado?: number; // V75: estado del rng al salvar — la tarde sigue exacta
};

/* ── V79: LA FERIA TRUCADA — trampas de la casa y engalos del
   cazador. Todo telegrafiado: la feria engaña, jamás roba. ── */
export const TRAMPA = {
  apagonDesde: 3, // ronda donde LA LÁMPARA QUE SIFA empieza
  apagonProb: 0.24, // por oleada no-jefe (rng, determinista)
  apagonAviso: 60, // frames de parpadeo-y-zumbido antes del brete
  apagonPleno: 210, // frames de oscuridad plena (~3.5 s)
  lastradoDesde: 3, // ronda donde el LASTRADO entra en escena
  lastradoProb: (r: number) => 0.11 + 0.015 * Math.min(r, 8),
  planchaMul: 1.28, // LA PLANCHA APRIETA al cierre de la cuota
  galletaPuntos: 150, // galleta extra cuando ya llevas una puesta
} as const;

/* ── V83: LA MIRA — los radios del plomo viven aquí y en ningún
   otro sitio. El motor mira; el nucleo calcula; los tests velan. ── */
export const MIRA = {
  base: 46, // radio base de acierto sobre la presa
  escala0: 0.82, // parte fija del tamaño
  escala1: 0.3, // parte proporcional al scale de cada ave
  escopeta: 1.85, // el anillo atraviesa: radio ×1.85
  asistencia: 1.35, // con asistencia el mundo pesca más fácil
  cebo: 34, // la madera come plomo, pero más cerca
  globo: 32, // el premio flota con radio propio
  alPelo: 66, // el graze: el plomo que silba cerca paga +25
} as const;

/* ── V83: LOS RELOJES DE FUGA — cuánto aguanta cada presa antes de
   cansarse del cazador y partir al cielo (frames, 60f ≙ dt 1) ── */
export const FUGA = {
  banda: 900, // banda silvestre: 900 + azar·bandaAzar
  bandaAzar: 240,
  real: 1150, // EL PATO REAL
  corona: 1300, // cada corona de LA BANDADA REAL
  escolta: 460, // la escolta del real
  eterno: 1e9, // señuelo y cuervo no se cansan jamás
  sostener: 260, // cada plomo en la corona le devuelve reloj
  nerviosa: 140, // mini tocado: la formación se espanta antes
  aviso: 300, // la corona lo grita a ~5 s de irse
  ultimoAviso: 45, // el telegráfo de siempre: 0.75 s antes
  telegrafo: 130, // anillo de fuga visible en el render
  oro: 320, // anillo de oro visible en el render
  resurge: 150, // el lastrado que resurge gana margen de trampilla
} as const;

/* llaves del localStorage de la meta (V72) */
export const ARCHIVO_KEY = "vp-archivo";
export const TROFEOS_KEY = "vp-trofeos";
/* V78: la fecha UTC de hoy en texto — la misma para todo el planeta;
   el sello diario y el fantasma comparten este reloj */
export const fechaUtcDeHoy = (d = new Date()) =>
  `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
export const dailyKey = (d = new Date()) => `vp-daily-${fechaUtcDeHoy(d)}`;
