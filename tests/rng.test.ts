/* VOLATERÍA — rng.test.ts (V83): la feria determinista con contrato.
   La Volada del Día vale exactamente lo que valga este archivo. */
import {
  mulberry32,
  hashStr,
  semillaDelDia,
} from "../src/components/game/engine/rng";

describe("mulberry32 — la feria sembrada", () => {
  it("misma semilla, mismo cielo", () => {
    const a = mulberry32(1234);
    const b = mulberry32(1234);
    for (let i = 0; i < 16; i++) expect(a()).toBe(b());
  });
  it("los números caen en [0,1)", () => {
    const f = mulberry32(42);
    for (let i = 0; i < 200; i++) {
      const v = f();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
  it("semillas distintas, cielos distintos", () => {
    const a = mulberry32(1);
    const b = mulberry32(2);
    const seqA = [a(), a(), a()];
    const seqB = [b(), b(), b()];
    expect(seqA.some((v, i) => v !== seqB[i])).toBeTruthy();
  });
  it("estado()/restaura() — la tarde guardada sigue exacta", () => {
    const a = mulberry32(777);
    a();
    a();
    a();
    const guardado = a.estado();
    const siguientes = [a(), a(), a()];
    const b = mulberry32(777);
    b.restaura(guardado);
    expect(b()).toBe(siguientes[0]);
    expect(b()).toBe(siguientes[1]);
    expect(b()).toBe(siguientes[2]);
  });
});

describe("hashStr — FNV-1a para semillas legibles", () => {
  it("el vacío es el offset basis", () => {
    expect(hashStr("")).toBe(2166136261);
  });
  it("estable: mismo texto, mismo hash", () => {
    expect(hashStr("volateria")).toBe(hashStr("volateria"));
    expect(hashStr("volateria") === hashStr("volatería")).toBeFalsy();
  });
});

describe("semillaDelDia — medianoche UTC", () => {
  it("misma fecha UTC, misma feria", () => {
    const d1 = new Date(Date.UTC(2026, 1, 6, 3, 0, 0));
    const d2 = new Date(Date.UTC(2026, 1, 6, 22, 59, 0));
    expect(semillaDelDia(d1)).toBe(semillaDelDia(d2));
  });
  it("otro día, otra feria", () => {
    const d1 = new Date(Date.UTC(2026, 1, 6));
    const d2 = new Date(Date.UTC(2026, 1, 7));
    expect(semillaDelDia(d1) === semillaDelDia(d2)).toBeFalsy();
  });
});
