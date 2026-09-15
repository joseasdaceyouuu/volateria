/* VOLATERÍA — especies.ts (V70): el bestiario de la feria.
   Datos puros extraídos del motor para que el bestiario se pueda
   leer, tunear y testear sin tocar una línea del bucle. */

export type TipoPato =
  | "bronce"
  | "zafiro"
  | "dorada"
  | "humo"
  | "acorazado"
  | "real"
  | "senuelo"
  | "cuervo"
  | "espejo"
  | "banda"
  | "mensajero";
export type EstadoPato = "vuelo" | "caida" | "suelto" | "fuga";
export type Patron = "onda" | "zigzag" | "pica" | "rasante" | "cruce" | "poste";
export type Poder = "" | "escopeta" | "tiempo";
/* V79: la GALLETA se suma a los globos de poder — la suerte
   portátil: el próximo disparo en vacío no romperá la racha */
export type GloboPoder = "escopeta" | "tiempo" | "plomo" | "galleta";

export type Especie = {
  cuerpo0: string;
  cuerpo1: string;
  ala: string;
  alaLejos: string;
  pico: string;
  panza: string;
  ptos: number;
  vel: number; // multiplicador de velocidad
  flap: number; // radianes de fase por frame
  popup: string; // color del popup de puntos
  hp: number; // impactos que aguanta
  cebo: boolean; // ¡NO DISPARES!
};

export const ESPECIES: Record<TipoPato, Especie> = {
  bronce: {
    cuerpo0: "#a06a3a",
    cuerpo1: "#5a381d",
    ala: "#d9a95f",
    alaLejos: "#77501f",
    pico: "#d99a4e",
    panza: "rgba(250,246,236,0.30)",
    ptos: 100,
    vel: 1,
    flap: 0.21,
    popup: "#e8c793",
    hp: 1,
    cebo: false,
  },
  zafiro: {
    cuerpo0: "#3d827a",
    cuerpo1: "#1d4641",
    ala: "#74d2c4",
    alaLejos: "#2b5c55",
    pico: "#d99a4e",
    panza: "rgba(234,252,248,0.26)",
    ptos: 250,
    vel: 1.3,
    flap: 0.26,
    popup: "#8fe6d8",
    hp: 1,
    cebo: false,
  },
  dorada: {
    cuerpo0: "#d4ab55",
    cuerpo1: "#8a6522",
    ala: "#f6e6b0",
    alaLejos: "#a8853c",
    pico: "#e8b060",
    panza: "rgba(255,250,235,0.42)",
    ptos: 500,
    vel: 1.55,
    flap: 0.3,
    popup: "#ffe9b0",
    hp: 1,
    cebo: false,
  },
  humo: {
    cuerpo0: "#7d7390",
    cuerpo1: "#3f3852",
    ala: "#b3a8c9",
    alaLejos: "#544a6b",
    pico: "#c9a06a",
    panza: "rgba(240,236,250,0.22)",
    ptos: 220,
    vel: 1.12,
    flap: 0.24,
    popup: "#c9bfe6",
    hp: 1,
    cebo: false,
  },
  acorazado: {
    cuerpo0: "#8d9099",
    cuerpo1: "#4a4d55",
    ala: "#c3c7cf",
    alaLejos: "#5d6069",
    pico: "#b8894a",
    panza: "rgba(240,244,250,0.25)",
    ptos: 300,
    vel: 0.8,
    flap: 0.19,
    popup: "#d7dbe2",
    hp: 2,
    cebo: false,
  },
  /* EL PATO REAL — la corona de la feria (V68): cada cuatro rondas
     baja a exigir tributo. Fases: escolta al 70%, FURIA al 40% */
  real: {
    cuerpo0: "#2e6b4f",
    cuerpo1: "#14382a",
    ala: "#5fae8a",
    alaLejos: "#1f4a37",
    pico: "#e0b45c",
    panza: "rgba(240,252,244,0.28)",
    ptos: 1200,
    vel: 0.55,
    flap: 0.15,
    popup: "#ffe9b0",
    hp: 7,
    cebo: false,
  },
  senuelo: {
    cuerpo0: "#8a5a2c",
    cuerpo1: "#5e3a18",
    ala: "#a97a42",
    alaLejos: "#6b4420",
    pico: "#7a4a20",
    panza: "rgba(250,240,215,0.14)",
    ptos: 0,
    vel: 1,
    flap: 0,
    popup: "#e0b184",
    hp: 1,
    cebo: true,
  },
  cuervo: {
    cuerpo0: "#221f26",
    cuerpo1: "#0f0e13",
    ala: "#4a4552",
    alaLejos: "#1a181f",
    pico: "#8f8f98",
    panza: "rgba(220,220,235,0.10)",
    ptos: 0,
    vel: 1.7,
    flap: 0.33,
    popup: "#b9b3c9",
    hp: 1,
    cebo: true,
  },
  /* V71 — el ESPEJO: plateado y vanidoso, a veces el plomo rebota */
  espejo: {
    cuerpo0: "#c9cdd6",
    cuerpo1: "#7d828e",
    ala: "#eef1f6",
    alaLejos: "#9aa0ac",
    pico: "#b8894a",
    panza: "rgba(255,255,255,0.50)",
    ptos: 400,
    vel: 1.25,
    flap: 0.27,
    popup: "#dfe4ee",
    hp: 1,
    cebo: false,
  },
  /* V71 — la BANDA: mini patos que vuelan en formación cerrada;
     al guía se le cae TODA la bandada encima */
  banda: {
    cuerpo0: "#b0642f",
    cuerpo1: "#5e3315",
    ala: "#e0a35e",
    alaLejos: "#8a4f22",
    pico: "#d99a4e",
    panza: "rgba(255,240,220,0.30)",
    ptos: 60,
    vel: 1.4,
    flap: 0.34,
    popup: "#f2c08c",
    hp: 1,
    cebo: false,
  },
  /* V71 — el MENSAJERO: verde y manso, trae una letra del PREMIO */
  mensajero: {
    cuerpo0: "#6f8f4a",
    cuerpo1: "#3a5222",
    ala: "#a9c47a",
    alaLejos: "#557031",
    pico: "#d99a4e",
    panza: "rgba(240,250,220,0.30)",
    ptos: 150,
    vel: 1.05,
    flap: 0.22,
    popup: "#cfe3a0",
    hp: 1,
    cebo: false,
  },
};

/* el sello de cada patrón de vuelo sobre la velocidad base */
export const PATRON_VEL: Record<Patron, number> = {
  onda: 1,
  zigzag: 1.12,
  pica: 1.2,
  rasante: 1.5,
  cruce: 1,
  poste: 1,
};

/* los globos de poder — colores rgb (chispas) + hex (dibujo).
   V79: la galleta llega rosada — el único dulce de la feria */
export const PODER_COLOR: Record<GloboPoder, [string, string, string]> = {
  escopeta: ["224,138,82", "#e08a52", "#8a3d20"],
  tiempo: ["127,212,194", "#7fd4c2", "#2a6e60"],
  plomo: ["236,200,106", "#ecc86a", "#8f6a1e"],
  galleta: ["239,159,174", "#ef9fae", "#8f4250"],
};
