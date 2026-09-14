# VOLATERÍA 🦆

**El tiro al pato de feria, reimaginado.** Un arcade de caza completo en el
navegador: oleadas veloces con vuelo evasivo, señuelos traidores, globos de
poder y **EL PATO REAL** — un jefe coronado que aparece cada cuatro rondas.

Nació como la demo D-05 del lab del portfolio
[Vuelo Propio](https://github.com/joseasdaceyouuu/vuelopropio) y ahora vive
como proyecto independiente.

## La feria

- **Oleadas progresivas** — la cuota crece (5 → 8 aciertos), la velocidad no
  tiene techo y desde la ronda 8 entran volleys de 4 patos con cargador de 12.
- **5 especies + 2 engaños** — bronce, zafiro, acorazado, humo y dorada;
  señuelos que se hacen los muertos y cuervos que no valen nada.
- **EL PATO REAL** 👑 — gigante coronado con tres fases (escolta al 70 %,
  furia al 40 %): botín de 300×ronda, 2 globos garantizados y 26 plumas al caer.
- **Al pelo** — disparar a menos de 66 px de una presa viva paga +25 y no
  rompe la racha: jugar peligroso se premia.
- **Globos de poder** — ESCOPETA (anillo que atraviesa toda la presa del
  radio) y TIEMPO LENTO.
- **Volada perfecta** — 8/8 sin fugas: +200×ronda. **Racha ×4** con 9
  aciertos seguidos.
- **Telegráfo de fuga** — destello + tick 45 frames antes de que un pato
  escape: la escalada es difícil pero justa.
- **El zorro** — sube con la presa… o se ríe de tus fallos.
- **Pausa de feria** — ESC o P contienen el mundo y el audio; el chip
  de pausa (arriba a la derecha) también sirve en táctil.
- **Recarga automática en táctil** — sin tecla R en el bolsillo, el
  cargador se repone solo.

## Oficio

- Canvas 2D sobre atardecer WebGL que envejece a noche con las rondas.
- Audio 100 % sintetizado con WebAudio — cero assets, cero dependencias.
- Hitstop, screen-shake, plumas con gravedad y juice de arcade.
- `prefers-reduced-motion` respetado, táctil soportado (tap para disparar).
- Telemetría de QA en `window.__labD05Dbg` (objeto plano, forma estable) +
  sonda Playwright en `scripts/probe.mjs`.

## Novedades v1.1 — auditoría V69

- **Pausa real** — ESC/P o el botón detienen el mundo Y el audio
  (`AudioContext.suspend`), con cartel propio: ronda, puntos y REANUDAR.
- **El cielo resucita** — `webglcontextrestored` recompila el shader y
  re-localiza uniformes: antes un context-lost dejaba el atardecer en
  fallback estático para siempre.
- **Audio sin huérfanos** — el `AudioContext` se cierra al desmontar.
- **Teclado cortés** — los atajos con Cmd/Ctrl/Alt son del sistema; la
  feria no los toca.
- **Táctil sin atascos** — cargador que se repone solo en punteros
  `coarse`.
- **Motor memoizado** — la sala re-renderiza a ~10 Hz con los stats; el
  motor (refs/props estables) deja de seguirle el paso (`React.memo`).
- **Accesibilidad** — escenario con `role="application"` + etiqueta,
  y jerarquía de títulos en los carteles (h1/h2).
- **Sonda QA ampliada** — paso 4b: ESC congela la presa y P reanuda.

## Stack

Next.js 16 · React 19 · TypeScript strict · Tailwind CSS 4 · Bun.

## Desarrollo

```bash
bun install
bun run dev        # http://localhost:3000
bun run build      # build de producción (standalone)
bun run probe      # sonda QA (requiere servidor en :3000 o BASE=…)
```

## Controles

| Tecla / gesto | Acción |
| --- | --- |
| Mover el cursor | Apuntar (la mira ES el cursor) |
| Clic / tap | Disparar |
| `R` | Recargar |
| `M` | Silencio |
| `ESC` / `P` | Pausar / reanudar |
