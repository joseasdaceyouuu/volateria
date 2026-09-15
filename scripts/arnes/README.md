# EL ARNÉS FORENSE — diagnóstico determinista, para siempre

Los reportes de jugadores ("esta ave no muere", "el juego no acaba")
no se debuggean de memoria: se reproducen con semilla fija y
telemetría. Estos tres bisturíes nacieron del caso real de v1.9.0
(una corona dando vueltas, inmatable) y del fin sin motivo — y viven
en el repo para el próximo caso.

La regla: **antes de tocar el motor, corre el arnés que toque.**
Si el arnés reproduce, la semilla hace el resto; si no reproduce,
el reporte habla de otra cosa y ahorramos una cirugía a ciegas.

## Cómo se corre

Necesitan una feria servida (dev o standalone). Playwright NO es
dependencia del repo (misma postura que la sonda): en CI se instala
al margen y se enlaza en `node_modules/`; en local, o lo tienes
global (`npm i -g playwright`) o se enlaza igual:

```bash
ln -s "$(npm root -g)/playwright" node_modules/playwright
ln -s "$(npm root -g)/playwright-core" node_modules/playwright-core
```

```bash
# servidor (Next 16 en dev SOLO responde a `localhost`, nunca a 127.0.0.1)
bun run dev   # o: bun run build && bun run start

# los tres bisturíes
node scripts/arnes/bandada.mjs      # o: bun run arnes:bandada
node scripts/arnes/fin-ronda9.mjs   # o: bun run arnes:fin9
node scripts/arnes/fin-visual.mjs   # o: bun run arnes:finvisual
```

`BASE` cambia el servidor (por defecto `http://localhost:3000`).
`OUT` cambia dónde cae la captura del fin visual (por defecto
`scripts/arnes/artefactos/fin-con-motivo.png` — no se versiona).

## Qué reproduce cada uno

| Arnés           | Caso original | Qué siembra |
|-----------------|---------------|-------------|
| `bandada.mjs`   | "mato 2 de 3 y la tercera es inmatable" (v1.9.0, cerrado v1.10.0: cañón seco silencioso en escritorio) | A: ronda 8 semilla 42, las 3 coronas a tierra · B: ronda 8 semilla 77, matar 2 y soltar la 3ª · C: ronda 4 semilla 99, banda silvestre sin tocar |
| `fin-ronda9.mjs`| "llegué a la 9 y nunca termina" (v1.9.0, cerrado con motivoFin) | ronda 9 semilla 42, observar fase/motivo/resultados hasta `fin` |
| `fin-visual.mjs`| el cartel del fin no explicaba el porqué (V81) | partida sin disparar; captura + texto del cartel contiene el motivo |

Siembran la partida vía `localStorage["vp-run"]` (mismo formato que
"Continuar partida") y leen `window.__labD05Dbg` — la telemetría que
el motor expone siempre. Nada de humo: todo determinista.

## Relación con la sonda (`scripts/probe.mjs`)

La sonda es el **portón de CI**: 49 checks, corre en cada push, y
desde v1.9.0/v1.10.0 lleva las regresiones de bandada (8k funde el
cargador y derriba la bandada sin tocar R). El arnés NO corre en
CI: es la caja negra para el caso nuevo que todavía no tiene
regresión. Flujo: reporte → arnés reproduce → arnés se convierte en
check de la sonda → arnés queda ahí para la posteridad.
