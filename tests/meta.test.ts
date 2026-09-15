/* VOLATERÍA — meta.test.ts (V83): el bolsillo de la meta con
   contrato. Podio ordenado y honesto, fantasma que vive un día y
   no se deja pisar por una tarde peor. localStorage de mentira,
   reglas de verdad. */
import {
  meteEnPodio,
  leePodio,
  trofeosGanados,
  type PodioRun,
} from "../src/components/game/meta";
import {
  leeFantasma,
  guardaFantasma,
  fantasmaKeyDeHoy,
  type Fantasma,
} from "../src/components/game/fantasma";
import { fechaUtcDeHoy } from "../src/components/game/engine/config";
import type { VolateriaStats } from "../src/components/game/engine/volateria-engine";

/* el bolsillo del navegador, de mentira pero limpio */
let bolsillo: Map<string, string>;
beforeEach(() => {
  bolsillo = new Map();
  (globalThis as { localStorage?: unknown }).localStorage = {
    getItem: (k: string) => bolsillo.get(k) ?? null,
    setItem: (k: string, v: string) => void bolsillo.set(k, v),
    removeItem: (k: string) => void bolsillo.delete(k),
  };
});

describe("meteEnPodio — el podio local", () => {
  const run = (puntos: number): PodioRun => ({
    puntos,
    ronda: 3,
    fecha: "2026-2-6",
    diaria: false,
  });
  it("ordena por puntos y corta a 5", () => {
    for (const p of [10, 50, 30, 20, 40, 60, 25]) meteEnPodio("feria", run(p));
    const lista = leePodio().feria;
    expect(lista.length).toBe(5);
    expect(lista[0].puntos).toBe(60);
    expect(lista[3].puntos).toBe(30);
    expect(lista[4].puntos).toBe(25);
  });
  it("cada modo su propio podio", () => {
    meteEnPodio("feria", run(100));
    meteEnPodio("cabrito", run(7));
    expect(leePodio().feria.length).toBe(1);
    expect(leePodio().cabrito[0].puntos).toBe(7);
  });
});

describe("el fantasma — cuaderno de la tarde", () => {
  const fantasma = (puntos: number, n = 3): Fantasma => ({
    v: 1,
    fecha: fechaUtcDeHoy(),
    puntos,
    ronda: 2,
    eventos: Array.from({ length: n }, (_, i) => ({
      t: i * 100,
      x: 60,
      y: 60,
      tipo: "d" as const,
    })),
  });
  it("sin tarde guardada, no hay fantasma", () => {
    expect(leeFantasma()).toBeNull();
  });
  it("la primera tarde se guarda", () => {
    expect(guardaFantasma(fantasma(500))).toBeTruthy();
    expect(leeFantasma()?.puntos).toBe(500);
  });
  it("una tarde peor no borra al campeón", () => {
    guardaFantasma(fantasma(500));
    expect(guardaFantasma(fantasma(400))).toBeFalsy();
    expect(leeFantasma()?.puntos).toBe(500);
  });
  it("una tarde mejor reina", () => {
    guardaFantasma(fantasma(500));
    expect(guardaFantasma(fantasma(600))).toBeTruthy();
    expect(leeFantasma()?.puntos).toBe(600);
  });
  it("sin eventos no hay fantasma que valga", () => {
    expect(guardaFantasma(fantasma(900, 0))).toBeFalsy();
  });
  it("un fantasma viejo (ayer) no revive", () => {
    guardaFantasma(fantasma(500));
    const k = fantasmaKeyDeHoy();
    const raw = JSON.parse(bolsillo.get(k) ?? "{}") as { fecha?: string };
    raw.fecha = "1999-12-31";
    bolsillo.set(k, JSON.stringify(raw));
    expect(leeFantasma()).toBeNull();
  });
  it("basura en el bolsillo no tumba la feria", () => {
    bolsillo.set(fantasmaKeyDeHoy(), "{no soy json");
    expect(leeFantasma()).toBeNull();
  });
});

describe("trofeosGanados — puro, sin efectos", () => {
  const stats = (p: Partial<VolateriaStats>): VolateriaStats =>
    ({
      fase: "fin",
      hits: 0,
      racha: 0,
      jefes: 0,
      perfectas: 0,
      premios: 0,
      grazes: 0,
      ronda: 1,
      puntos: 0,
      lastrados: 0,
      galletas: 0,
      ...p,
    }) as unknown as VolateriaStats;
  it("la primera caza se celebra", () => {
    const ids = trofeosGanados(stats({ hits: 1 }), {}).map((t) => t.id);
    expect(ids).toContain("primera");
  });
  it("regicida: una corona por el suelo", () => {
    const ids = trofeosGanados(stats({ jefes: 1 }), {}).map((t) => t.id);
    expect(ids).toContain("regicida");
  });
  it("lo ya ganado no se repite", () => {
    expect(trofeosGanados(stats({ jefes: 5 }), { regicida: true }).length)
      .toBe(0);
  });
  it("sin caza no hay primera", () => {
    const ids = trofeosGanados(stats({ fase: "fin", hits: 0 }), {}).map(
      (t) => t.id,
    );
    expect(ids).not.toContain("primera");
  });
});
