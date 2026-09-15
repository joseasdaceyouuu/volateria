/* VOLATERÍA — rng.ts (V70): la feria determinista.
   mulberry32: PRNG de 32 bits, rápido y suficiente para patos.
   La partida normal vuela con Math.random (caos legítimo); la
   VOLADA DEL DÍA planta una semilla y TODA la feria repite el
   mismo vuelo para todo el planeta. Regla de la casa: solo la
   aleatoriedad que AFECTA AL ESTADO pasa por aquí — las plumas,
   chispas y temblores (cosmética, y su cantidad depende de la
   calidad del aparato) siguen usando Math.random para que la
   semilla reproduzca la misma partida en cualquier máquina. */

export type Rng = () => number;

/* V75: el rng sabe recordar dónde estaba — CONTINUAR restaura el
   estado exacto y la tarde guardada sigue el mismo cielo */
export type RngEstado = Rng & {
  estado: () => number;
  restaura: (a: number) => void;
};

export function mulberry32(seed: number): RngEstado {
  let a = seed >>> 0;
  const f = (() => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }) as RngEstado;
  f.estado = () => a;
  f.restaura = (s: number) => {
    a = s >>> 0;
  };
  return f;
}

/* FNV-1a — textos → 32 bits para semillas legibles */
export const hashStr = (s: string): number => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

/* la semilla del día — medianoche UTC (V75): la MISMA feria para
   todo el planeta, sin importar la franja horaria del visitante */
export const semillaDelDia = (d = new Date()): number =>
  hashStr(
    `volateria-${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`,
  );
