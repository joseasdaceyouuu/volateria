# ROADMAP — VOLATERÍA

> El tiro al pato de feria, reimaginado: atardecer de lona, zorro cómplice y un cargador que nunca sobra.

## En escena (v1.11.0)

Lo que ya luces bajo las bombillas de la feria:

- **EL NÚCLEO DESNUDO (V83)** — el corazón puro del plomo extraído del monolito: `nucleo.ts` (geometría del disparo: radios, orden de presa, graze, cebo — sin React ni canvas ni audio), LA MIRA y LOS RELOJES DE FUGA y hpDeJefe en config como única fuente de verdad, **57 tests unitarios con `bun test`** (config/rng/nucleo/podio/fantasma/trofeos) con paso nuevo en CI, y `CACHE_NAME` sellado con la versión del paquete en el postbuild — el shell offline ya no queda viejo. Sonda e2e 49/49: el motor no cambió un frame.

- **EL CAÑÓN SECO (V82)** — adiós al ave "inmatable" de verdad: un clic sin balas arma la recarga sola (escritorio iguala a táctil) y lo grita junto a la mira ("¡sin plomo! recargando"); el jefe se lee con chip de coronas/vidas y la sonda 8k derriba la bandada sin tocar R jamás. El replay del fantasma queda intacto (el cañón seco no actúa reviviendo).
- **LA FUGA AVISADA (V81)** — la fuga se ve venir y el fin se explica: las coronas de la Bandada Real arden en oro a 5 s de irse ("¡la corona se escapa!"), cada impacto les devuelve reloj, el telegráfo de fuga de toda la volada destella 2 s, la banda silvestre sin dueño se esparce al cielo en vez de orbitar eterna, el cartel del fin CANTA el motivo ("cuota corta: 3 de 5"), zafiro/espejo/mensajero vuelan con jalones impredecibles desde la ronda 3, y jefes vuelve a contar UNA corona por bandada (regresión V75 cerrada).

- **LA CUENTA LARGA (V80)** — la maestría del cazador de la feria entera: la suma de los tres récords (CABRITO + FERIA + VETERANO) paga su propia escalera, con barra de peldaño en el archivo y chip vivo en la sala y en el fin. La escalera ya no termina en LEYENDA: **MITO (50.000) · RAYO (90.000) · EL FERIAL (150.000)** — ningún modo solo llega a esos cielos. El bestiario deriva sus tasas sin sembrarlas: composición de la caza en %, cruces con el espejo y cuántos ganó él, coronas/bandas/galletas/lastrados por tarde. Y los récords del cartel se releen del bolsillo al volver a la sala: tras una tarde con récord, cero mentiras. Auditoría de diseño V80: fin y fantasma sin botón de sonido duplicado, y esquina SND compacta en móvil que ya no pisa el título.

- **LA FERIA TRUCADA (V79)** — trampas de la casa y engalos del cazador, todo telegrafiado: **LA LÁMPARA QUE SIFA** apaga las luces a mitad de oleada (zumbido + parpadeo lo anuncian; en el pleno solo los ojos de la presa viva lucen, el cuervo en rojo, y la mira jamás se apaga); **EL PATO LASTRADO** viene con la bola colgante a la vista, se finge muerto al primer toque y resurge con risa de la feria (a la segunda cae del todo — trofeo A LA SEGUNDA); **LA PLANCHA APRIETA** al cierre de cuota (campanita + velocidad ×1.28); y **LA GALLETA DE LA SUERTE**, el globo rosado que perdona un disparo en vacío sin romper la racha (trofeo LA SUERTE EXISTE). El archivo cuenta lastrados y galletas.
- **Diseño auditado** — el cartel scrollea en pantallas bajas (adiós al solape móvil), un solo botón de sonido en el cartel y ⚙ AJUSTES alcanzable desde la pausa.
- **El fantasma de la feria (V78)** — la Volada del Día graba cada disparo con el reloj de la tarde y al caer deja un fantasma: tu mejor diaria del día, revivible tiro a tiro desde el cartel (☾). El replay dispara solo (input bloqueado) y sin tocar honores: ni récord, ni sello, ni podio, ni archivo.
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
- **Fantasma-rival de la casa** — compartir el cuaderno de la tarde (JSON del fantasma) para revivir las tardes de otros cazadores.
- **Modo duelo pase-el-teléfono** — dos tiradores, un cargador: turnos alternos en el mismo fusil para dirimir rivalidades.

---

*VOLATERÍA se templó a mano: Canvas 2D + WebGL + WebAudio, cero assets. El zorro siempre sube la presa al atardecer.*
