# ROADMAP — VOLATERÍA

> El tiro al pato de feria, reimaginado: atardecer de lona, zorro cómplice y un cargador que nunca sobra.

## En escena (v1.5.0)

Lo que ya luces bajo las bombillas de la feria:

- **La primera vez (V77)** — la guía susurra tres consejos en la ronda 1 de la primera visita (mira, engaños, recarga) y se despide para siempre al cerrar la tarde; la CADENA DE PERFECTAS multiplica la hazaña seguida (×2 y ×3).
- **La escalada (V76)** — rango de maestría por modo (APRENDIZ→LEYENDA) en el archivo y en el fin, el podio local con las cinco mejores tardes de cada modo (la diaria marca ☀), y el bestiario cuenta rebotes del espejo y bandas íntegras.
- **La feria calibrada (V75)** — Volada del Día planetaria de verdad: semilla UTC, modo FERIA fijo, un solo sello por día (el primero manda) y CONTINUAR restaura la semilla exacta de la tarde.
- **Puerta de vuelta** — botón CARTEL en pausa y fin: ajustes, archivo y continuar sin recargar.
- **Puntos honestos** — los jefes cobran su botín propio (sin volada perfecta regalada) y la última corona de la Bandada cuenta.
- **Pausa real** — ESC/P o botón: el mundo entero se congela de verdad (presa incluida) y el audio queda en suspenso.
- **EL PATO REAL** — entre cebos y señuelos se esconde la pieza que de verdad vuela; acertarle es honor de cazador.
- **Cuota progresiva** — cada acierto sube la apuesta: más riesgo, más premio, la feria nunca regala nada.
- **Globos de poder** — revienta los globos que ascienden al atardecer para activar poderes (o morder el PLOMO).
- **Engaños** — cebos que revolotean para que gastes balas en aire: puntería y paciencia, no agilidad de dedo.
- **Hitstop** — el impacto congela una pestaña de tiempo: cada acierto se siente en el pulso.
- **Resurrección WebGL** — si el cielo muere (context-lost), se recompila el shader y el atardecer vuelve a arder.
- **Sonda QA** — Playwright recorre la feria de punta a punta (cartel, disparo, pausa, caza, recarga, móvil) y firma con capturas.

## Ensayando (V70–V73)

Lo que se está templando en el taller, entre algodón de azúcar y soldadura:

- **Refactor modular del motor** — trocear el motor de 3.000+ líneas en módulos con contratos claros: feria más fácil de mantener.
- **RNG seedeable** — aleatoriedad con semilla: la misma feria, la misma bandada, partidas reproducibles.
- **Volada del Día** — una semilla diaria para todo el mundo: la misma bandada global, reta a tus cuñados.
- **Trofeos** — logros locales de cartón dorado: rachas, grazes, patos imposibles.
- **Archivo del cazador** — historial local de rondas y récords: tu trofeo de barraca persistente.
- **Run recuperable** — si la pestaña se cierra por la bulla, retoma la partida donde la dejaste.
- **Modos de dificultad** — de caseta infantil a tirador de salón: más engaños, menos balas, viento traicionero.
- **Viento** — ráfagas que curvan la bandada y el vuelo de la pieza: leer el aire será parte del oficio.
- **Combos aéreos** — encadenar aciertos en un solo barrido multiplica la cuota: duetos, tríos, bandadas enteras.
- **Especies nuevas** — patos nuevos con patrón de vuelo propio (el rapidez, el somormujo, el dormilón…).
- **PWA offline** — la feria en el bolsillo sin cobertura: service worker y la carpeta instalable.
- **Panel de ajustes de accesibilidad** — reduce-motion fino, tamaño de mira, contraste y remapeo de teclas en un solo toldo.
- **Haptics** — Vibration API en móvil: el retroceso del fusil en la palma de la mano.
- **Música adaptativa** — órganos y percusión de verbena que suben con la racha y callan con la desgracia.

## En el horizonte (ideas senior pendientes)

Apuntadas con tiza en la pared del taller; requieren capataz y calma:

- **i18n EN/ES** — traducir el marco manteniendo el argot de feria en español: las bandadas hablan en castellano.
- **gamepad API (ESTRENADO v1.2.0: stick, gatillo y Start)
- OffscreenCanvas + Web Worker** — mandar la capa 2D a un worker: el hilo principal respira y el 120 Hz es posible.
- **Gamepad API** — jugar con mando: gatillo analógico, mira con stick, vibración nativa.
- **Ports a portales de web games** — llevar la caseta a itch.io, Poki y CrazyGames: más feria, más público.
- **Analytics privacy-first** — telemetría propia sin cookies ni rastreadores: saber cuánta gente juega sin espiarla.
- **Reporte de errores** — captura de fallos del cliente con contexto mínimo (seed, fase, fps) para depurar de noche.
- **Replays deterministas visualizables** — con el RNG seedeado, grabar y reproducir la caza como un diálogo del zorro.
- **Modo duelo pase-el-teléfono** — dos tiradores, un cargador: turnos alternos en el mismo fusil para dirimir rivalidades.

---

*VOLATERÍA se templó a mano: Canvas 2D + WebGL + WebAudio, cero assets. El zorro siempre sube la presa al atardecer.*
