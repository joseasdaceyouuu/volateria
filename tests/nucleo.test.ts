/* VOLATERÍA — nucleo.test.ts (V83): la geometría del plomo, con
   contrato. Aquí se juzga —sin navegador, en milisegundos— que el
   plomo entre por el más cercano, que el cebo coma lo suyo y que
   el graze pague al audaz. La prueba matemática del ave "inmatable". */
import {
  radioPato,
  impactaPato,
  radioCebo,
  impactaGlobo,
  presasDe,
  ceboDe,
  grazeDe,
} from "../src/components/game/engine/nucleo";

type Blanco = { x: number; y: number; scale: number };
const blanco = (x: number, y: number, scale = 1): Blanco => ({ x, y, scale });

describe("radioPato — el radio del plomo", () => {
  it("46 × (0.82 + scale×0.3)", () => {
    expect(radioPato(1)).toBeCloseTo(46 * 1.12);
    expect(radioPato(0.5)).toBeCloseTo(46 * 0.97);
  });
  it("la ESCOPETA atraviesa: ×1.85", () => {
    expect(radioPato(1, true)).toBeCloseTo(46 * 1.12 * 1.85);
  });
  it("la asistencia agranda el mundo: ×1.35", () => {
    expect(radioPato(1, false, true)).toBeCloseTo(46 * 1.12 * 1.35);
  });
});

describe("impactaPato — dentro o fuera, sin ambigüedad", () => {
  const p = blanco(100, 0);
  it("al centro, cae", () => {
    expect(impactaPato(100, 0, p)).toBeTruthy();
  });
  it("justo dentro del radio, cae", () => {
    const R = radioPato(1);
    expect(impactaPato(100 + R - 0.01, 0, p)).toBeTruthy();
  });
  it("justo fuera, no cae", () => {
    const R = radioPato(1);
    expect(impactaPato(100 + R + 0.01, 0, p)).toBeFalsy();
  });
  it("la escopeta pesca lo que la mira sola no alcanza", () => {
    const R = radioPato(1);
    expect(impactaPato(100 + R + 5, 0, p, true)).toBeTruthy();
  });
});

describe("presasDe — el plomo entra por el más cercano", () => {
  const cerca = blanco(200, 0);
  const lejos = blanco(200, 40, 0.5); // 40 < radioPato(0.5)=44.6
  const cebo = blanco(200, 5);
  it("elige el más cercano primero", () => {
    const r = presasDe([lejos, cerca], 200, 0, false, false, () => true);
    expect(r.length).toBe(2);
    expect(r[0]).toBe(cerca);
    expect(r[1]).toBe(lejos);
  });
  it("respeta el filtro: cebo y humo no son presa", () => {
    const r = presasDe(
      [lejos, cerca, cebo],
      200,
      0,
      false,
      false,
      (p) => p !== cebo,
    );
    expect(r.length).toBe(2);
  });
  it("sin nada dentro, el tiro va limpio", () => {
    expect(presasDe([lejos], 0, 0, false, false, () => true).length).toBe(0);
  });
  it("con escopeta caen TODAS las de dentro", () => {
    const r = presasDe([lejos, cerca], 200, 0, true, false, () => true);
    expect(r.length).toBe(2);
    expect(r[0]).toBe(cerca);
  });
  it("la escopeta pesca una segunda ave fuera de la mira sola", () => {
    const extra = blanco(200, 70); // 70 > radioPato(1)=51.5
    expect(presasDe([extra, cerca], 200, 0, false, false, () => true).length)
      .toBe(1);
    expect(presasDe([extra, cerca], 200, 0, true, false, () => true).length)
      .toBe(2);
  });
});

describe("ceboDe — la madera come plomo", () => {
  it("el cebo más cercano", () => {
    const a = blanco(100, 0);
    const b = blanco(100, 20);
    expect(ceboDe([b, a], 100, 0, () => true)).toBe(a);
  });
  it("fuera del radio de la madera, nada", () => {
    const a = blanco(100, radioCebo(1) + 1);
    expect(ceboDe([a], 100, 0, () => true)).toBeNull();
  });
});

describe("impactaGlobo — el premio flota (radio 32)", () => {
  it("dentro revienta, fuera no", () => {
    expect(impactaGlobo(0, 31, blanco(0, 0))).toBeTruthy();
    expect(impactaGlobo(0, 33, blanco(0, 0))).toBeFalsy();
  });
});

describe("grazeDe — ¡al pelo!", () => {
  it("el plomo que silba cerca tiene dueño", () => {
    const p = blanco(50, 0);
    expect(grazeDe([p], 0, 0, () => true)).toBe(p);
  });
  it("a 70 px no hay graze (el radio es 66)", () => {
    const p = blanco(70, 0);
    expect(grazeDe([p], 0, 0, () => true)).toBeNull();
  });
  it("lo no visible no existe para el graze", () => {
    const p = blanco(50, 0);
    expect(grazeDe([p], 0, 0, () => false)).toBeNull();
  });
  it("gana el más cercano", () => {
    const a = blanco(50, 0);
    const b = blanco(30, 0);
    expect(grazeDe([a, b], 0, 0, () => true)).toBe(b);
  });
});
