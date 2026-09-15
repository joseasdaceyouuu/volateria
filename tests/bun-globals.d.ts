/* VOLATERÍA — bun-globals.d.ts (V83): bun test inyecta describe/it/
   expect como globals en runtime; esto le enseña a tsc lo que Bun
   ya sabe, sin dependencias nuevas (bun-types choca con @types/node). */
declare function describe(name: string, fn: () => void): void;
declare function it(name: string, fn: () => void | Promise<void>): void;
declare function beforeEach(fn: () => void): void;
declare interface Expectaciones<T> {
  toBe(v: T): void;
  toEqual(v: T): void;
  toBeCloseTo(v: number, digits?: number): void;
  toBeGreaterThan(v: T): void;
  toBeGreaterThanOrEqual(v: T): void;
  toBeLessThan(v: T): void;
  toBeTruthy(): void;
  toBeFalsy(): void;
  toBeNull(): void;
  toHaveLength(n: number): void;
  toContain(v: unknown): void;
  not: Expectaciones<T>;
}
declare function expect<T>(v: T): Expectaciones<T>;
