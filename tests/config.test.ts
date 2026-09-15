/* VOLATERÍA — config.test.ts (V83): los números de la casa, ahora
   con contrato. Si alguien mueve una fórmula sin querer, aquí chilla. */
import {
  MODOS,
  quotaOf,
  cuotaModo,
  velocidadRonda,
  multOf,
  esJefe,
  tipoDeJefe,
  hpDeJefe,
  fechaUtcDeHoy,
  dailyKey,
} from "../src/components/game/engine/config";

describe("quotaOf — la cuota progresiva", () => {
  it("sube cada dos rondas: 5,5,6,6,7,7,8", () => {
    expect(quotaOf(1)).toBe(5);
    expect(quotaOf(2)).toBe(5);
    expect(quotaOf(3)).toBe(6);
    expect(quotaOf(4)).toBe(6);
    expect(quotaOf(5)).toBe(7);
    expect(quotaOf(6)).toBe(7);
    expect(quotaOf(7)).toBe(8);
  });
  it("la 7+ exige la volada entera (techo de la escalera)", () => {
    expect(quotaOf(8)).toBe(8);
    expect(quotaOf(99)).toBe(8);
  });
  it("el suelo protege: ronda 0 o negativa cae en la primera", () => {
    expect(quotaOf(0)).toBe(5);
    expect(quotaOf(-3)).toBe(5);
  });
});

describe("cuotaModo — la cuota según la feria", () => {
  it("FERIA manda la cuota limpia", () => {
    expect(cuotaModo(1, MODOS.feria)).toBe(5);
    expect(cuotaModo(7, MODOS.feria)).toBe(8);
  });
  it("CABRITO la baja, VETERANO la sube", () => {
    expect(cuotaModo(1, MODOS.cabrito)).toBe(4);
    expect(cuotaModo(1, MODOS.veterano)).toBe(6);
  });
  it("el techo es 9 (la perfección ya es 8)", () => {
    expect(cuotaModo(7, MODOS.veterano)).toBe(9);
  });
});

describe("velocidadRonda — sin techo para el veterano", () => {
  it("arranca en 3.9", () => {
    expect(velocidadRonda(1)).toBeCloseTo(3.9);
  });
  it("+0.42 por ronda hasta la 8", () => {
    expect(velocidadRonda(8)).toBeCloseTo(3.9 + 0.42 * 7);
  });
  it("+0.14 para siempre desde la 9", () => {
    expect(velocidadRonda(9)).toBeCloseTo(3.9 + 0.42 * 7 + 0.14);
    expect(velocidadRonda(20)).toBeCloseTo(3.9 + 0.42 * 7 + 0.14 * 12);
  });
});

describe("multOf — la mano caliente", () => {
  it("×1 antes de la 3ª seguida", () => {
    expect(multOf(0)).toBe(1);
    expect(multOf(2)).toBe(1);
  });
  it("×2 a los 3, ×3 a los 6", () => {
    expect(multOf(3)).toBe(2);
    expect(multOf(6)).toBe(3);
  });
  it("×4 a los 9 y no crece más", () => {
    expect(multOf(9)).toBe(4);
    expect(multOf(900)).toBe(4);
  });
});

describe("jefes — la cacería de la corona", () => {
  it("baja cada cuatro rondas desde la 4", () => {
    expect(esJefe(4)).toBeTruthy();
    expect(esJefe(8)).toBeTruthy();
    expect(esJefe(12)).toBeTruthy();
    expect(esJefe(3)).toBeFalsy();
    expect(esJefe(6)).toBeFalsy();
  });
  it("rotan: real en la 4, banda en la 8", () => {
    expect(tipoDeJefe(4)).toBe("real");
    expect(tipoDeJefe(8)).toBe("banda");
    expect(tipoDeJefe(12)).toBe("real");
    expect(tipoDeJefe(16)).toBe("banda");
  });
  it("hpDeJefe: 3 de base y +1 cada 8 rondas", () => {
    expect(hpDeJefe(4)).toBe(3);
    expect(hpDeJefe(7)).toBe(3);
    expect(hpDeJefe(8)).toBe(4);
    expect(hpDeJefe(15)).toBe(4);
    expect(hpDeJefe(16)).toBe(5);
    expect(hpDeJefe(32)).toBe(7);
  });
});

describe("el reloj UTC de la Volada del Día", () => {
  it("fecha sin relleno de ceros", () => {
    expect(fechaUtcDeHoy(new Date(Date.UTC(2026, 1, 6)))).toBe("2026-2-6");
    expect(fechaUtcDeHoy(new Date(Date.UTC(2025, 11, 31)))).toBe(
      "2025-12-31",
    );
  });
  it("dailyKey lleva el prefijo vp-daily-", () => {
    expect(dailyKey(new Date(Date.UTC(2026, 1, 6)))).toBe(
      "vp-daily-2026-2-6",
    );
  });
});
