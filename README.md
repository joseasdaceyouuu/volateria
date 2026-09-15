# VOLATERÍA 🦆

**El tiro al pato de feria, reimaginado.** Un arcade de caza completo en el
navegador: oleadas veloces con vuelo evasivo, señuelos traidores, trampas de
la casa (apagones, lastrados y la plancha apretada), globos de poder,
jefes rotativos (EL PATO REAL y LA BANDADA REAL), viento de feria,
tres modos de juego, Volada del Día con FANTASMA revivible y una feria con
memoria. Instalable como app (PWA) y jugable offline.

Nació como la demo D-05 del lab del portfolio
[Vuelo Propio](https://github.com/joseasdaceyouuu/vuelopropio) y ahora vive
como proyecto independiente.

## La feria (v1.7.0)

- **LA FERIA TRUCADA (V79)** — trampas de la casa y engalos del cazador,
  todo telegrafiado: la feria engaña, jamás roba.
  - **LA LÁMPARA QUE SIFA** — desde la ronda 3, la feria apaga las luces
    a mitad de oleada: zumbido y parpadeo lo anuncian, y en el pleno solo
    los OJOS de la presa viva lucen como luciérnagas (el cuervo, rojo).
    La mira jamás se apaga. Jefes nunca: la corona es espectáculo.
  - **EL PATO LASTRADO** — bronce y humo pueden venir con plomo falso:
    se delatan balanceándose con la bola colgante. Al primer toque SE
    FINGE MUERTO y resurge con risa de la feria; a la segunda cae del
    todo y el archivo lo cuenta. El trofeo A LA SEGUNDA espera.
  - **LA PLANCHA APRIETA** — al quedar una sola presa para la cuota,
    la campanita suena y la oleada acelera ×1.28: cierre con pulso.
  - **LA GALLETA DE LA SUERTE** — el globo rosado del carrusel (18%):
    el próximo disparo en vacío NO rompe la racha (si ya llevas una,
    la extra paga +150). El cebo sigue cobrando: la suerte no perdona
    maderas ni cuervos.
- **Auditoría de diseño aplicada** — el cartel SCROLLEA en pantallas
  bajas (nada pisa ya la firma en móvil), el SONIDO del cartel vive solo
  en su esquina (había dos) y la pausa ganó su botón ⚙ AJUSTES.
- **El fantasma de la feria (V78)** — tu mejor Volada del Día del día queda
  grabada tiro a tiro: el cartel ofrece **☾ EL FANTASMA** y la tarde se
  revive sola (mismo cielo sembrado, mismos disparos en el mismo instante).
  El replay bloquea el input y no toca honores: ni récord, ni sello, ni
  podio, ni archivo — solo espectáculo y una cortina propia al terminar.
- **La escalada (V76)** — rango de maestría por modo (APRENDIZ → LEYENDA) en
  el archivo y en el fin; el podio local: las cinco mejores tardes de cada
  modo (la diaria marca ☀); el bestiario cuenta rebotes del espejo y bandas
  íntegras, y el grid del archivo llega a 12 estatuillas.
- **La feria calibrada (V75)** — la Volada del Día ahora es de verdad
  planetaria: semilla por medianoche UTC, SIEMPRE en modo FERIA, un solo
  sello por día (el PRIMER intento manda, estilo Wordle) y la tarde
  recuperable restaura su semilla exacta: CONTINUAR repite el mismo cielo.
- **Puerta de vuelta** — botón CARTEL en la pausa y en el fin: ajustes,
  archivo y continuar sin recargar la feria.
- **Puntos honestos** — las rondas de jefe ya no regalan la volada perfecta
  (cobran su botín propio) y la última corona de la Bandada Real sí cuenta.

- **Tres modos** — CABRITO (5 balas, cuota−1), FERIA (la casa manda) y
  VETERANO (2 balas, cuota+1, ×1.15): cada uno con su récord.
- **Volada del Día** — semilla diaria compartida: todos los cazadores del
  planeta vuelan los mismos patos; sello del resultado y texto
  spoiler-free para compartir (Web Share API con fallback a copiar).
- **La feria con memoria** — trofeos con medallera y toast, EL ARCHIVO DEL
  CAZADOR (estadísticas de vida + bestiario) y run recuperable si un
  refresh interrumpe la tarde (CONTINUAR en el cartel).
- **Viento de feria** — vendavales desde la ronda 2: los juncos son el
  telegráfo, el silbido el aviso, y los patos no vuelan en línea recta.
- **Cadena aérea** — cazar antes de que el cadáver anterior toque el campo
  paga interés compuesto (×ronda por eslabón).
- **Bestiario nuevo** — la BANDA (5 minis en formación: al guía se le cae
  la bandada entera), el ESPEJO (a veces el plomo rebota) y el MENSAJERO
  (trae letras del PREMIO: complétalo y la feria paga).
- **Jefes rotativos** — ronda 4 EL PATO REAL, ronda 8 LA BANDADA REAL
  (tres coronas), alternando cada cuatro rondas para siempre.
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

- Canvas 2D sobre atardecer WebGL que envejece a noche con las rondas
  (a resolución reducida: el fbm de las nubes era lo más caro).
- **Motor modular** — config · rng · especies · audio · cielo · ajustes ·
  meta, con la misma partida y la misma API pública.
- Audio 100 % sintetizado con WebAudio: compresor en el máster, volumen
  continuo, bajo de mano caliente con el ×3/×4 y grillos de noche.
- **Ajustes de accesibilidad persistidos** — fogonazos, temblor
  (nada/medio/completo), mira grande, asistencia de puntería, volumen y
  vibración (pautas de Game Accessibility Guidelines).
- **PWA instalable y offline** — manifest + service worker + iconos.
- **CI** — GitHub Actions: tsc strict + eslint + build standalone + sonda
  Playwright end-to-end en cada push; CSP dura y LICENSE MIT.
- Hitstop, screen-shake, plumas con gravedad y juice de arcade.
- `prefers-reduced-motion` respetado, táctil soportado (tap para disparar).
- RNG seedeable (mulberry32) solo para la aleatoriedad que afecta al
  estado: la Volada del Día es reproducible en cualquier máquina.
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
