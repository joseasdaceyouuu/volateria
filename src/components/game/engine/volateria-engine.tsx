"use client";

/* SERIE DEMO · D-05 VOLATERÍA — V68: LA CACERÍA REAL (evaluar ·
   auditar · investigar · mejorar). Investigación aplicada — scoring
   shmup (jugar peligroso se premia, fórmula Touhou), diseño de bosses
   (fases con picos/valles que premian la maestría) y juice de impacto.
   Lo nuevo:

   EL PATO REAL — BOSS cada cuatro rondas (4·8·12…): gigante coronado
   (oro + rubí, escala ×3) que ES la volada entera. Fases con picos y
   valles: ESCOLTA real al 70% (dos zafiros defienden la corona),
   FURIA REAL al 40% (×1.45 de velocidad, aleteo frenético, brasa
   viva, evasión nerviosa). Cada impacto canta la corona restante;
   al caer: botín 300×ronda, dos globos garantizados, 26 plumas,
   fanfarria CORONA y la feria entera celebra. Rugido grave de
   doble sierra al entrar.

   AL PELO — el graze de la casa: un tiro que silba a <66px de una
   presa sin tocarla paga +25 y NO rompe la racha (evangelio shmup:
   jugar peligroso se paga).

   VOLADA PERFECTA — 8 de 8 sin fugas: +200×ronda y arpegio mayor.

   RACHA ×4 — el multiplicador ya no se aplasta en ×3: a 9 seguidos
   la mano caliente vale el cuádruple.

   ESCOPETA MULTI-PRESA — el anillo atraviesa: TODA la presa dentro
   cae con un cartucho (los cebos jamás roban).

   TELEGRÁFO DE FUGA — la presa avisa su huida: destello cremoso +
   tick de audio 45 frames antes de volar (justicia de la feria).

   V67: LA FERIA CRECE (dificultad
   progresiva, confirmación del usuario: «tiene que ser progresivo y
   cada vez más difícil»). Sobre la reforma V66 se añade:

   CUOTA QUE SUBE — como el Duck Hunt de NES: rondas 1-2 piden 5
   aciertos, 3-4 piden 6, 5-6 piden 7 y desde la 7 la ronda ha de ser
   PERFECTA (8 de 8). La cuota vive en la telemetría y en el HUD.

   VELOCIDAD SIN TECHO — la curva ya no se aplasta en la ronda 8:
   0.42/ronda hasta la 8 y +0.14/ronda para siempre después; el
   veterano nunca encuentra un plano máximo.

   OLEADAS GRUESAS — rondas 6-7 casi nunca sueltan un solitario y
   desde la 8 entran VOLLEY de 4 patos (12 cartuchos en el cargador):
   el caos es el premio del veterano.

   ENGAÑOS QUE ESCALAN — señuelo y cuervo salen MÁS SEGUIDO cada
   ronda (sus relojes encogen), la FINTA se vuelve más probable y la
   EVASIÓN más nerviosa hasta un tope; el tiempo antes de la fuga
   baja (250→180 frames de suelo): los patos veteranos no se
   entretienen.

   V66: LA FERIA NO PERDONA (feedback: «muy lento, más variedad,
   patos que salgan al azar de diferentes lugares, más cosas
   interactivas y más sistemas de engaño»). Lo que cambió:

   RITMO — patos ~60% más veloces desde la ronda 1; oleadas de 1-3
   patos SIMULTÁNEOS (plan por ronda); la siguiente oleada sale apenas
   se resuelve la anterior (10 frames desde la ronda 5, antes 15).

   ORÍGENES ALEATORIOS — cada pato entra por donde la feria decide:
   borde izq/der a cualquier altura, desde los JUNCOS (salta del
   campo), o picando desde el CIELO.

   VARIEDAD — 5 especies de pato: bronce, zafiro, dorada (bonus),
   HUMO (se desvanece: mientras es fantasma el plomo lo atraviesa) y
   ACORAZADO (casco remachado: aguanta 2 impactos). 4 patrones de
   vuelo: onda, zigzag, rasante (línea rápida y baja) y picado.

   INTERACTIVO — GLOBOS DE PODER que ascienden por la banda: ESCOPETA
   (radio ×1.85), TIEMPO LENTO (los patos van a cámara lenta) y PLOMO
   (recarga instantánea). La mira ENGANCHA: anillo cobre cuando hay
   presa al alcance.

   ENGAÑOS — SEÑUELO de madera que sale de los juncos (−150 y risa del
   zorro si le disparas), CUERVO (−200, se cuela entre los patos desde
   la ronda 2), y la FINTA: patos que se hacen los muertos a media
   aire para que gastes balas y luego se escapan.

   ARQUITECTURA HÍBRIDA (dos lienzos apilados):
   - ABAJO, WebGL2: el cielo de atardecer — gradiente tinta→brasa, sol
     que se hunde, estrellas que despiertan con la noche (el día pasa
     mientras juegas: uRound), dos capas de nubes fbm y crestas de
     silueta. Fogonazo cálido en cada disparo (uFlash).
   - ARRIBA, Canvas2D: la feria — patos vectoriales dibujados a mano,
     juncos que se mecen en dos planos, plumas con gravedad y vaivén,
     anillos de disparo, popups de puntos, el zorro de la feria que
     emerge con la presa o se ríe de tus fallos, y la mira que respira
     con el pulso.

   JUEGO: 8 patos por ronda en oleadas, CUOTA PROGRESIVA (5→8) para
   pasar. Racha ⇒ multiplicador ×2/×3. Récord en localStorage. La
   velocidad, la oscuridad, la cuota, la densidad de oleadas y los
   engaños crecen con la ronda — sin techo.

   HIGIENE DE LA CASA: dt=1 ≙ 60fps clampado (0.5–2), contabilidad de
   fps en TIEMPO REAL (lección V67), DPR cap 2 con gobernador por fps,
   pausa oculta (visibilitychange + suspend del audio), reduced-motion
   sin temblores ni vendavales, calidad adaptativa, context-lost
   declarado, NADA de estelas (ley de la casa). Telemetría única por
   emit() — mismos campos en TODAS las rutas (lección V62).

   AUDIO: se arma DENTRO del gesto (COMENZAR / REINTENTAR / SND) —
   nunca suena sin permiso del usuario, nunca lanza errores. Disparo
   = ráfaga de ruido con barrido + golpe grave; quack, silbido de
   caída, risa del zorro, golpecito de madera, graznido y jingle de
   poder tejidos a mano.

   V69 — AUDITORÍA: PAUSA real (ESC/P/botón — el mundo Y el audio se
   detienen), recarga automática en punteros coarse, el cielo RESUCITA
   tras webglcontextrestored (antes quedaba en fallback para siempre),
   cierre limpio del AudioContext al desmontar y teclado que respeta
   los atajos del sistema (Cmd/Ctrl/Alt).

   V70 — FUNDACIÓN: la casa ya no es un monolito. El motor se abre en
   módulos (config · rng · especies · audio · cielo) con la MISMA API
   pública y la misma partida: tunables en una sola fuente de verdad
   (el HUD ya no adivina), compresor en el máster, volumen continuo,
   bajo de mano caliente, grillos de noche, RNG seedeable solo para la
   aleatoriedad que afecta al estado (la Volada del Día llega en V72)
   y el cielo rinde a 0.66 — el fbm de nubes era lo más caro y no se
   ve la diferencia. */

import { memo, useEffect, useRef } from "react";
import { drawGlow, glowSprite } from "../lab-fx";
import { leeAjustes, type Ajustes } from "../ajustes";

/* ── módulos de la feria (V70) — la casa ya no es un monolito ── */
import {
  PODER_DURACION,
  VOLADA,
  esJefe,
  multOf,
  velocidadRonda,
  MODOS,
  LETRAS_PREMIO,
  cuotaModo,
  tipoDeJefe,
  TRAMPA,
  hpDeJefe,
  FUGA,
} from "./config";
import {
  RUN_KEY,
  type Modo,
  type ModoId,
  type RunSnapshot,
} from "./config";
import { mulberry32, semillaDelDia, type RngEstado } from "./rng";
import * as nucleo from "./nucleo";
import {
  ESPECIES,
  PATRON_VEL,
  PODER_COLOR,
  type EstadoPato,
  type GloboPoder,
  type Patron,
  type Poder,
  type TipoPato,
} from "./especies";
import { VolateriaAudio } from "./audio";
import { armaCielo } from "./cielo";

/* ── tipos públicos — la sala y los probes hablan esto ─────────── */

export type FaseJuego = "listo" | "jugando" | "fin";

export type PatoTelemetria = {
  id: number; // identidad estable durante la partida
  x: number; // 0..1 del ancho de la sala
  y: number; // 0..1 del alto
  viva: boolean; // ¿aún vuela?
  tipo: string; // bronce · zafiro · dorada · humo · acorazado · senuelo · cuervo
  cebo: boolean; // ¡NO DISPARES! señuelo o cuervo
  lastrado?: boolean; // V79: lleva plomo falso — pide DOS toques
  est?: string; // V79: vuelo · caida · suelto · fuga (QA del teatro)
  err?: boolean; // V81: vuelo errático (jalones impredecibles)
};

export type GloboTelemetria = { x: number; y: number; poder: string };

export type VolateriaStats = {
  ok: boolean;
  fase: FaseJuego;
  ronda: number;
  puntos: number;
  record: number;
  recordNuevo: boolean;
  racha: number;
  mult: number;
  balas: number;
  recargando: boolean;
  pausa: boolean; // V69: el mundo detenido por la sala
  hits: number;
  escapes: number;
  tiros: number;
  volleyHits: number; // aciertos de la ronda actual (cuota progresiva)
  cuota: number; // V67: aciertos exigidos esta ronda (5→8)
  enCola: number; // patos restantes por salir esta ronda
  resultados: string[]; // pendiente · vivo · acierto · fuga (8)
  zorro: number; // 0 oculto · 1 en escena
  poder: string; // "" · escopeta · tiempo
  poderT: number; // frames restantes del poder
  globos: GloboTelemetria[];
  fps: number;
  ms: number;
  dpr: number;
  quality: number; // 1 óptima · 2 a media · 3 a lo justo
  reduced: boolean;
  muted: boolean;
  px: number; // puntero CSS px (la feria es espacio PANTALLA)
  py: number;
  modo: string; // cabrito · feria · veterano (V71)
  viento: number; // fuerza del vendaval (V71)
  letras: string; // letras del PREMIO recogidas (V71)
  diaria: boolean; // ¿volada del día? (V72)
  semilla: number; // V75: semilla de la feria — la diaria es auditable
  grazes: number; // silbidos al pelo en la run (V72)
  jefes: number; // coronas abatidas en la run (V72)
  perfectas: number; // voladas perfectas en la run (V72)
  premios: number; // PREMIOS completados en la run (V72)
  rebotes: number; // V76: plomo rebotado por el espejo en la run
  bandas: number; // V76: bandas silvestres completas en la run
  replay: boolean; // V78: la feria se está reviviendo (sin input, sin honores)
  grabando: boolean; // V78: esta tarde deja fantasma (diaria fresca)
  lastrados: number; // V79: lastrados reventados del todo en la run
  galletas: number; // V79: fallos en vacío que la galleta perdonó
  galleta: boolean; // V79: ¿llevas la galleta de la suerte puesta?
  apagon: boolean; // V79: LA LÁMPARA QUE SIFA está (o llega) en escena
  plancha: boolean; // V79: LA PLANCHA APRIETA (cierre de cuota veloz)
  motivoFin: string; // V81: la feria explica por qué se cerró la tarde
  jefeCoronas: number; // V82: coronas de la BANDADA aún en vuelo (0 sin jefe)
  jefeVida: number; // V82: vidas de LA CORONA del PATO REAL (0 sin jefe)
  porEspecie: Record<string, number>; // cazados por especie (V72)
  patos: PatoTelemetria[];
};

/* V78: EL FANTASMA — un disparo/recarga anotado con el reloj de la
   tarde (segundos de mundo vivos, sin pausas). Con la semilla de la
   diaria basta para revivir la MISMA feria tiro a tiro. */
export type EventoFantasma = {
  t: number; // reloj de la tarde (tRun) en el que ocurrió
  x?: number; // pantalla CSS px — solo en disparos
  y?: number;
  tipo: "d" | "r"; // d disparo · r recarga (R)
};

export type VolateriaApi = {
  puntero: (cx: number, cy: number) => void;
  disparo: (cx: number, cy: number) => void;
  recargar: () => void;
  pausa: () => void;
  ajustes: (a: Partial<Ajustes>) => void;
  empezar: (
    m?: ModoId,
    opts?: {
      continuar?: RunSnapshot | null;
      diaria?: boolean;
      replay?: EventoFantasma[]; // V78: revivir la tarde grabada
    },
  ) => void;
  snd: () => void;
  leave: () => void;
  alCartel: () => void; // V75: volver al cartel desde la pausa o el fin
  /* V78: los eventos grabados de la tarde — null si no se grabó nada */
  eventos: () => { semilla: number; eventos: EventoFantasma[] } | null;
};

type Props = {
  onStats: (s: VolateriaStats) => void;
  apiRef?: { current: VolateriaApi | null };
  className?: string;
};

type Pato = {
  tid: number; // identidad estable para telemetría
  tipo: TipoPato;
  estado: EstadoPato;
  patron: Patron;
  idx: number; // slot de la volada (−1 = cebo suelto)
  hp: number;
  hp0?: number; // V68: vida inicial del PATO REAL (fases)
  enfada?: boolean; // V68: la furia real ya estalló
  escolta?: boolean; // V68: la escolta real ya salió
  x: number;
  y: number;
  vx: number;
  vy: number;
  ivx: number; // impulso de evasión/finta (se disipa)
  ivy: number;
  dir: 1 | -1;
  t: number;
  fase0: number; // fase del vaivén senoidal
  flap: number;
  flapRate: number;
  rot: number;
  fallDir: 1 | -1;
  bounced: boolean;
  restT: number;
  fadeT: number;
  targetY: number;
  retargetT: number;
  escapeT: number;
  evadeCd: number;
  fintaT: number;
  fintaCd: number;
  senT: number; // vida del señuelo en escena
  senBaja: boolean;
  scale: number;
  flashT: number;
  /* V71: identidad extra */
  letra?: string; // la letra del PREMIO que trae el mensajero
  mini?: boolean; // corona de la BANDADA REAL
  guia?: boolean; // guía de la banda silvestre
  lid?: number; // id de la formación
  dyForm?: number; // hueco en la formación
  /* V79: LA FERIA TRUCADA */
  lastrado?: boolean; // lleva plomo falso: se finge muerto al primer toque
  teatro?: boolean; // en caída teatral — RESURGE a mitad de vuelo
  erratico?: boolean; // V81: zafiro/espejo/mensajero — jalones bruscos
  jinkCd?: number; // V81: reloj hasta el próximo jalón errático
};

type Pluma = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  t: number;
  vida: number;
  c: string;
  s: number;
  sway: number;
};

type Chispa = { x: number; y: number; vx: number; vy: number; t: number; c: string };
type Anillo = { x: number; y: number; t: number };
type Popup = {
  x: number;
  y: number;
  txt: string;
  t: number;
  vida: number;
  color: string;
  serif: boolean;
};

type Globo = {
  x: number;
  y: number;
  vy: number;
  t: number;
  sway: number;
  poder: GloboPoder;
  c0: string;
  c1: string;
};

type Zorro = {
  estado: "oculto" | "sube" | "hold" | "baja";
  t: number;
  hold: boolean;
  risa: boolean;
  x: number;
};

type Banner = { txt: string; sub: string; t: number; vida: number };

type Junco = {
  x: number;
  h: number;
  lean: number;
  lw: number;
  c: string;
  espiga: boolean;
};

function VolateriaEngine({
  onStats,
  apiRef,
  className,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const glCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const onStatsRef = useRef(onStats);

  useEffect(() => {
    onStatsRef.current = onStats;
  }, [onStats]);

  /* ── montaje único: cielo GL + feria 2D + el bucle del juego ── */
  useEffect(() => {
    const root = rootRef.current;
    const cvG = glCanvasRef.current;
    const cvF = fgCanvasRef.current;
    if (!root || !cvG || !cvF) return;
    let disposed = false;
    let raf = 0;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const audio = new VolateriaAudio();

    /* el azar del juego — Math.random en la partida libre; la
       Volada del Día planta la semilla (V72) y la feria repite
       el mismo vuelo para todo el planeta */
    let semilla = 0; // V75: la semilla de la run (telemetría + continuar)
    let rng: RngEstado = mulberry32(1); // empezar() planta la verdadera

    /* V73: los ajustes del cazador — el motor obedece a la sala */
    let aj: Ajustes = leeAjustes();
    audio.setVolumen(aj.volumen);
    /* el temblor de la casa — respeta reduced-motion y el slider */
    const sacude = (n: number) => {
      const mul = reduced ? 0 : aj.shake;
      if (mul > 0) shakeA = Math.max(shakeA, n * mul);
    };
    /* la vibración — haptics corteses, solo donde el aparato ava */
    const vibra = (p: number | number[]) => {
      try {
        if (aj.haptics && !reduced && "vibrate" in navigator)
          navigator.vibrate(p as number);
      } catch {}
    };

    /* ── estado del juego — la única fuente de verdad ── */
    let w = 960;
    let h = 600;
    let dprNow = 1;
    let grassY = 530;
    let bandaTop = 80;
    let bandaBot = 320;
    let tGlobal = 0;

    let ok = false;
    let glOk = false;
    let fase: FaseJuego = "listo";
    let ronda = 0;
    let puntos = 0;
    let record = 0;
    let recordNuevo = false;
    let racha = 0;
    let balas = 3;
    let cargador = 3; // balas de la oleada viva (3 por pato)
    let recT = 0;
    let hits = 0;
    let escapes = 0;
    let tiros = 0;
    let volleyHits = 0;
    let lanzados = 0; // patos reales lanzados esta ronda
    let pendiente = 0; // patos de la oleada sin resolver
    let plan: number[] = [];
    let cerrarVuelta = false;
    let motivoFin = ""; // V81: el motivo del fin, contado en el cartel
    let spawnT = 0;
    let res: string[] = [];
    let quackT = 200;
    let tid = 0;

    /* V71: el modo manda en balas, cuota, velocidad y récord */
    let modo: Modo = MODOS.feria;
    let letras: string[] = [];
    let cadena = 0; // combo aéreo
    /* V71: el VIENTO de la feria — vendavales que empujan la banda */
    let vientoF = 0;
    let vientoObj = 0;
    let vientoT = 460 + rng() * 300;
    let vientoDuro = 0;
    let vientoDir: 1 | -1 = 1;
    let vientoActivo = false;
    /* V71: la banda silvestre */
    let bandT = 900;
    /* V72: la meta — contadores de la run para trofeos y archivo */
    let diaria = false;
    let grazesRun = 0;
    let jefesRun = 0;
    let perfectasRun = 0;
    let premiosRun = 0;
    let rebotesRun = 0; // V76: plomo que el espejo devolvió
    let bandasRun = 0; // V76: formaciones completas caídas por el guía
    let perfectasSeguidas = 0; // V77: la cadena de perfectas
    /* V79: LA FERIA TRUCADA — trampas de la casa y engalos del cazador */
    let lastradosRun = 0; // lastrados reventados del todo
    let galletasRun = 0; // fallos en vacío que la galleta perdonó
    let galleta = false; // la galleta de la suerte puesta
    let plancha = false; // LA PLANCHA APRIETA — cierre de cuota veloz
    let apagonProg = 0; // frames hasta el aviso del apagón
    let apagonT = 0; // reloj del apagón (aviso → pleno → retorno)
    /* V78: EL FANTASMA — reloj de la tarde, grabación y replay */
    let tRun = 0; // segundos de mundo vivos (sin pausas ni carteles)
    let grabando = false; // esta diaria deja fantasma
    let eventosGrabados: EventoFantasma[] | null = null;
    let replayActivo = false; // reviviendo: sin input y sin honores
    let eventosReplay: EventoFantasma[] = [];
    let idxReplay = 0;
    const porEspecie: Record<string, number> = {};

    /* poder activo y sus trampas */
    let poder: Poder = "";
    let poderT = 0;
    let globoT = 340;
    let senT = 700;
    let cuvT = 760;

    const patos: Pato[] = [];
    const globos: Globo[] = [];
    const plumas: Pluma[] = [];
    const chispas: Chispa[] = [];
    const anillos: Anillo[] = [];
    const popups: Popup[] = [];
    let banner: Banner | null = null;
    const zorro: Zorro = { estado: "oculto", t: 0, hold: false, risa: false, x: 0.5 };

    let freezeT = 0; // hitstop
    let pausado = false; // V69: la sala puede contener el mundo
    let shakeA = 0;
    let flash = 0;
    let kick = 0;
    const puntero = { x: 0, y: 0, inside: false };
    let xp = 480; // mira (persigue al puntero)
    let yp = 300;

    let quality = 1;
    let fpsEma = 60; /* pre-primer-frame: el EMA real converge en ~10 frames */
    let msEma = 16.7;
    let prevNow = 0;
    let fpsN = 0;
    let fpsAcc = 0;
    let frame = 0;

    let juncosBack: Junco[] = [];
    let juncosFront: Junco[] = [];

    const leerRecord = (k: string) => {
      try {
        const v = Number(localStorage.getItem(k));
        return Number.isFinite(v) && v > 0 ? Math.floor(v) : 0;
      } catch {
        return 0;
      }
    };
    const guardarRecord = (k: string, v: number) => {
      try {
        localStorage.setItem(k, String(Math.floor(v)));
      } catch {}
    };
    record = leerRecord(modo.recordKey);

    /* telemetría — UNA sola ruta, mismos campos SIEMPRE (lección V62) */
    const emit = () => {
      if (disposed) return;
      /* V70: la feria suena a feria — mano caliente y grillos de
         noche enganchados aquí (idempotentes, con detección de cambio) */
      audio.setRacha(multOf(racha));
      audio.setNoche(
        fase === "listo" ? 0 : Math.min(1, Math.max(0, (ronda - 1) / 8)),
      );
      onStatsRef.current({
        ok,
        fase,
        ronda,
        puntos,
        record,
        recordNuevo,
        racha,
        mult: multOf(racha),
        balas,
        recargando: recT > 0,
        pausa: pausado,
        hits,
        escapes,
        tiros,
        volleyHits,
        cuota: cuotaModo(Math.max(1, ronda), modo),
        modo: modo.id,
        viento: Math.round(vientoF * 100) / 100,
        letras: letras.join(""),
        diaria,
        semilla,
        grazes: grazesRun,
        jefes: jefesRun,
        perfectas: perfectasRun,
        premios: premiosRun,
        rebotes: rebotesRun,
        bandas: bandasRun,
        replay: replayActivo,
        grabando,
        lastrados: lastradosRun,
        galletas: galletasRun,
        galleta,
        apagon: apagonT > 0,
        plancha,
        motivoFin,
        jefeCoronas: patos.reduce(
          (s, p) => s + (p.tipo === "real" && p.mini && p.estado === "vuelo" ? 1 : 0),
          0,
        ),
        jefeVida: patos.reduce(
          (s, p) =>
            s + (p.tipo === "real" && !p.mini && p.estado === "vuelo" ? p.hp : 0),
          0,
        ),
        porEspecie: { ...porEspecie },
        enCola: Math.max(0, VOLADA - lanzados),
        resultados: res.slice(),
        zorro: zorro.estado === "oculto" ? 0 : 1,
        poder,
        poderT: Math.round(poderT),
        globos: globos.map((g) => ({
          x: g.x / w,
          y: g.y / h,
          poder: g.poder,
        })),
        fps: Math.round(fpsEma),
        ms: Math.round(msEma * 10) / 10,
        dpr: Math.round(dprNow * 100) / 100,
        quality,
        reduced,
        muted: audio.muted,
        px: puntero.x,
        py: puntero.y,
        patos: patos.map((p) => ({
          id: p.tid,
          x: p.x / w,
          y: p.y / h,
          viva: p.estado === "vuelo",
          tipo: p.tipo,
          cebo: ESPECIES[p.tipo].cebo,
          lastrado: !!p.lastrado,
          err: !!p.erratico,
          est: p.estado,
          hp: p.hp, // V82: la sonda lee el blindaje del jefe
        })),
      });
    };

    /* el humo se desvanece: mientras es fantasma el plomo lo atraviesa */
    const alphaHumo = (p: Pato) =>
      p.tipo !== "humo"
        ? 1
        : reduced
          ? 0.85
          : 0.26 + 0.74 * (0.5 + 0.5 * Math.sin(p.t * 0.085 + p.fase0));

    /* ── cielo GL — el atardecer que envejece ── */
    const gl = cvG.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    });
    let prog: WebGLProgram | null = null;
    let u: Record<string, WebGLUniformLocation | null> = {};
    /* V69: la construcción del cielo vive en una función — el contexto
       GL puede morir (webglcontextlost) y RESUCITAR
       (webglcontextrestored): recompila y re-localiza uniformes */
    const armaGL = (): boolean => {
      if (!gl) return false;
      /* V70: la compilación vive en cielo.ts — pura y sin estado */
      const c = armaCielo(gl);
      if (c) {
        prog = c.prog;
        u = c.u;
        glOk = true;
        return true;
      }
      glOk = false;
      return false;
    };
    if (gl) armaGL();

    /* respaldo sin GL: atardecer estático pre-pintado */
    const fbSky = document.createElement("canvas");
    const pintaCieloFallback = () => {
      fbSky.width = w;
      fbSky.height = h;
      const c = fbSky.getContext("2d");
      if (!c) return;
      const g = c.createLinearGradient(0, h, 0, 0);
      const night = Math.min(1, (ronda - 1) / 8);
      g.addColorStop(0, night > 0.5 ? "#0c0a10" : "#2a1a10");
      g.addColorStop(0.4, night > 0.5 ? "#08070d" : "#160f0b");
      g.addColorStop(1, "#0a0908");
      c.fillStyle = g;
      c.fillRect(0, 0, w, h);
      c.fillStyle = "rgba(232,166,87,0.55)";
      c.beginPath();
      c.arc(w * 0.5, h * 0.775, 26, 0, 6.2832);
      c.fill();
    };

    /* ── juncos — el field de la feria, dos planos ── */
    const construyeJuncos = () => {
      const mk = (
        n: number,
        c: string,
        hMin: number,
        hMax: number,
        lwMin: number,
        lwMax: number,
        espigas: number,
      ): Junco[] => {
        const arr: Junco[] = [];
        for (let i = 0; i < n; i++) {
          arr.push({
            x: Math.random() * (w + 40) - 20,
            h: hMin + Math.random() * (hMax - hMin),
            lean: (Math.random() - 0.5) * 46,
            lw: lwMin + Math.random() * (lwMax - lwMin),
            c,
            espiga: i < espigas,
          });
        }
        return arr;
      };
      juncosBack = mk(
        Math.max(24, Math.round(w / 34)),
        "#0d0a08",
        h * 0.05,
        h * 0.115,
        1.5,
        2.6,
        Math.max(3, Math.round(w / 260)),
      );
      juncosFront = mk(
        Math.max(14, Math.round(w / 54)),
        "#151009",
        h * 0.035,
        h * 0.075,
        2.6,
        4.4,
        Math.max(2, Math.round(w / 330)),
      );
    };

    const resize = () => {
      const r = root.getBoundingClientRect();
      w = Math.max(320, Math.round(r.width));
      h = Math.max(320, Math.round(r.height));
      dprNow = Math.min(2, window.devicePixelRatio || 1);
      if (quality >= 3) dprNow = Math.min(dprNow, 1.25);
      grassY = Math.round(h * 0.885);
      bandaTop = Math.round(h * 0.13);
      bandaBot = Math.round(h * 0.52);
      const pw = Math.round(w * dprNow);
      const ph = Math.round(h * dprNow);
      /* V70: el cielo rinde por debajo — el fbm de las nubes es lo
         más caro del pipeline y a 0.66 el gradiente no pierde nada
         visible; el CSS estira y el móvil respira */
      const pwG = Math.max(2, Math.round(pw * 0.66));
      const phG = Math.max(2, Math.round(ph * 0.66));
      if (cvG.width !== pwG || cvG.height !== phG) {
        cvG.width = pwG;
        cvG.height = phG;
      }
      if (cvF.width !== pw || cvF.height !== ph) {
        cvF.width = pw;
        cvF.height = ph;
      }
      const ctx = cvF.getContext("2d");
      if (ctx) ctx.setTransform(dprNow, 0, 0, dprNow, 0, 0);
      if (glOk && gl) gl.viewport(0, 0, pwG, phG);
      construyeJuncos();
      if (!glOk) pintaCieloFallback();
    };

    /* ── el plan de la ronda — oleadas de 1 a 4 patos a la vez ──
       V67: la densidad también escala — desde la 6 casi nunca hay
       solitarios y desde la 8 entran volley de CUATRO patos */
    const construirPlan = (r: number): number[] => {
      const p: number[] = [];
      let sum = 0;
      while (sum < VOLADA) {
        const queda = VOLADA - sum;
        const roll = rng();
        let s: number;
        if (r === 1) s = p.length < 2 ? 1 : roll < 0.72 ? 1 : 2;
        else if (r === 2) s = roll < 0.4 ? 1 : 2;
        else if (r < 6)
          s = roll < 0.28 ? 1 : roll < 0.78 ? 2 : 3;
        else if (r < 8) s = roll < 0.16 ? 1 : roll < 0.62 ? 2 : 3;
        else s = roll < 0.2 ? 4 : roll < 0.62 ? 2 : 3;
        s = Math.min(s, queda);
        p.push(s);
        sum += s;
      }
      return p;
    };

    /* ── los patos entran en escena — POR DONDE LA FERIA DECIDA ── */
    const spawnDuck = () => {
      const r = Math.max(1, ronda);
      let tipo: TipoPato = "bronce";
      const roll = rng();
      /* V67: el humo impera en rondas altas (ventana 0.37→0.41) */
      const humoTop = r >= 5 ? 0.41 : 0.37;
      if (r >= 2 && roll < 0.055) tipo = "mensajero";
      else if (r >= 3 && roll < 0.125) tipo = "espejo";
      else if (r >= 3 && roll < 0.215) tipo = "dorada";
      else if (r >= 2 && roll < 0.31) tipo = "acorazado";
      else if (r >= 2 && roll < humoTop + 0.09) tipo = "humo";
      else if (roll < 0.30 + 0.03 * Math.min(r, 6)) tipo = "zafiro";
      /* V79: EL PATO LASTRADO — la feria le mete plomo falso a los
         comunes: al primer toque se finge muerto y RESURVE. Se le
         delata: vuela lento y se balancea cargado */
      const lastrOk =
        r >= TRAMPA.lastradoDesde && (tipo === "bronce" || tipo === "humo");
      const lastr = lastrOk && rng() < TRAMPA.lastradoProb(r);
      const E = ESPECIES[tipo];
      /* origen aleatorio: bordes, juncos o cielo */
      const oR = rng();
      const origen =
        oR < 0.28 ? "izq" : oR < 0.56 ? "der" : oR < 0.79 ? "junco" : "cielo";
      const dir: 1 | -1 =
        origen === "izq" ? 1 : origen === "der" ? -1 : rng() < 0.5 ? 1 : -1;
      const pR = rng();
      const patron: Patron =
        origen === "cielo"
          ? pR < 0.62
            ? "pica"
            : "onda"
          : origen === "junco"
            ? "onda"
            : pR < 0.42
              ? "onda"
              : pR < 0.62
                ? "zigzag"
                : "rasante";
      const speed =
        velocidadRonda(r) * modo.velocidadMul *
        E.vel *
        PATRON_VEL[patron] *
        (reduced ? 0.85 : 1) *
        (coarse ? 0.92 : 1);
      let x: number, y: number, vx: number, vy: number;
      if (origen === "izq") {
        x = -70;
        y = bandaTop + rng() * (bandaBot - bandaTop);
        vx = dir * speed;
        vy = 0;
      } else if (origen === "der") {
        x = w + 70;
        y = bandaTop + rng() * (bandaBot - bandaTop);
        vx = dir * speed;
        vy = 0;
      } else if (origen === "junco") {
        x = w * (0.14 + rng() * 0.72);
        y = grassY - 16;
        vx = dir * speed * 0.55;
        vy = -2.6;
      } else {
        x = w * (0.1 + rng() * 0.8);
        y = -70;
        vx = dir * speed * 0.6;
        vy = 3.1;
      }
      const idx = lanzados;
      lanzados++;
      const nuevo: Pato = {
        tid: ++tid,
        tipo,
        estado: "vuelo",
        patron,
        idx,
        hp: lastr ? 2 : E.hp, // V79: el lastrado aguanta el teatro
        x,
        y,
        vx,
        vy,
        ivx: 0,
        ivy: 0,
        dir,
        t: 0,
        fase0: rng() * 6.2832,
        flap: rng() * 6.2832,
        flapRate: E.flap,
        rot: 0,
        fallDir: rng() < 0.5 ? 1 : -1,
        bounced: false,
        restT: 0,
        fadeT: 0,
        targetY: bandaTop + 20 + rng() * Math.max(40, bandaBot - bandaTop - 40),
        retargetT: 60 + rng() * 90,
        escapeT:
          Math.max(180, 350 - 16 * (ronda - 1)) + rng() * 50,
        evadeCd: 30 + rng() * 40,
        fintaT: 0,
        fintaCd: 60 + rng() * 60,
        senT: 0,
        senBaja: false,
        scale: (coarse ? 1.22 : 1.5) * (tipo === "dorada" ? 0.92 : 1),
        flashT: 0,
        lastrado: lastr,
        teatro: false,
        /* V81: desde la ronda 3, zafiro/espejo/mensajero vuelan con
           jalones que no se pueden leer — la feria tiene carácter */
        erratico: r >= 3 && E.erratico,
        jinkCd: 30 + rng() * 60,
      };
      if (lastr) {
        nuevo.vx *= 0.85; // cargado: más lento ybalanceante
        nuevo.vy *= 0.85;
      }
      patos.push(nuevo);
      if (idx >= 0 && idx < VOLADA) res[idx] = "vivo";
      /* el mensajero trae una letra que falte del PREMIO (V71) */
      if (tipo === "mensajero") {
        const falta = LETRAS_PREMIO.split("").filter((l) => !letras.includes(l));
        if (falta.length > 0)
          nuevo.letra = falta[Math.floor(rng() * falta.length)];
      }
      quackT = 120 + rng() * 160;
    };

    /* el SEÑUELO — madera pintada que sale de los juncos */
    const spawnSenuelo = () => {
      patos.push({
        tid: ++tid,
        tipo: "senuelo",
        estado: "vuelo",
        patron: "poste",
        idx: -1,
        hp: 1,
        x: w * (0.14 + rng() * 0.72),
        y: grassY - 10,
        vx: 0,
        vy: -1.2,
        ivx: 0,
        ivy: 0,
        dir: 1,
        t: 0,
        fase0: rng() * 6.2832,
        flap: 0,
        flapRate: 0,
        rot: 0,
        fallDir: 1,
        bounced: false,
        restT: 0,
        fadeT: 0,
        targetY: bandaTop + 30 + rng() * Math.max(30, bandaBot - bandaTop - 60),
        retargetT: 1e9,
        escapeT: FUGA.eterno,
        evadeCd: 1e9,
        fintaT: 0,
        fintaCd: 1e9,
        senT: 0,
        senBaja: false,
        scale: (coarse ? 1.1 : 1.35),
        flashT: 0,
      });
      audio.maderaS();
    };

    /* el CUERVO — se cuela entre los patos desde la ronda 2 */
    const spawnCuervo = () => {
      const dir: 1 | -1 = rng() < 0.5 ? 1 : -1;
      patos.push({
        tid: ++tid,
        tipo: "cuervo",
        estado: "vuelo",
        patron: "cruce",
        idx: -1,
        hp: 1,
        x: dir === 1 ? -60 : w + 60,
        y: bandaTop + rng() * (bandaBot - bandaTop),
        vx: dir * (4.6 + rng() * 1.8) * (reduced ? 0.85 : 1),
        vy: 0,
        ivx: 0,
        ivy: 0,
        dir,
        t: 0,
        fase0: rng() * 6.2832,
        flap: rng() * 6.2832,
        flapRate: ESPECIES.cuervo.flap,
        rot: 0,
        fallDir: rng() < 0.5 ? 1 : -1,
        bounced: false,
        restT: 0,
        fadeT: 0,
        targetY: 0,
        retargetT: 1e9,
        escapeT: FUGA.eterno,
        evadeCd: 1e9,
        fintaT: 0,
        fintaCd: 1e9,
        senT: 0,
        senBaja: false,
        scale: (coarse ? 1.05 : 1.3),
        flashT: 0,
      });
      audio.caw();
    };

    /* LA BANDA (V71) — cinco minis en formación cerrada; no cuentan
       para la cuota pero pagan bien, y sin guía se desparraman */
    let lidGen = 0;
    const spawnBanda = () => {
      const dir: 1 | -1 = rng() < 0.5 ? 1 : -1;
      const lid = ++lidGen;
      const vel = velocidadRonda(ronda) * modo.velocidadMul * 1.35;
      const y0 = bandaTop + 40 + rng() * Math.max(60, bandaBot - bandaTop - 80);
      const offs: [number, number, boolean][] = [
        [0, 0, true],
        [-42, 16, false],
        [-80, -12, false],
        [42, -18, false],
        [80, 14, false],
      ];
      for (const [dx, dy, esGuia] of offs) {
        patos.push({
          tid: ++tid,
          tipo: "banda",
          estado: "vuelo",
          patron: "rasante",
          idx: -1,
          hp: 1,
          x: (dir === 1 ? -90 : w + 90) - dir * dx,
          y: y0 + dy,
          vx: dir * vel,
          vy: 0,
          ivx: 0,
          ivy: 0,
          dir,
          t: 0,
          fase0: rng() * 6.2832,
          flap: rng() * 6.2832,
          flapRate: ESPECIES.banda.flap,
          rot: 0,
          fallDir: rng() < 0.5 ? 1 : -1,
          bounced: false,
          restT: 0,
          fadeT: 0,
          targetY: y0,
          retargetT: 1e9,
          /* V81: la banda silvestre respeta el reloj de la feria — si
             nadie la caza, se va al cielo (~16 s) en vez de dar vueltas
             eternas rebotando de borde en borde */
          escapeT: FUGA.banda + rng() * FUGA.bandaAzar,
          evadeCd: 1e9,
          fintaT: 0,
          fintaCd: 1e9,
          senT: 0,
          senBaja: false,
          scale: coarse ? 0.72 : 0.88,
          flashT: 0,
          guia: esGuia,
          lid,
          dyForm: dy,
        });
      }
      audio.quack(true);
      audio.whoosh();
    };

    /* EL PATO REAL (V68) — la corona de la feria baja a exigir tributo:
       gigante, coronado, con FASES (escolta al 70%, furia al 40%) */
    const spawnJefe = () => {
      const hp = Math.min(11, 5 + Math.floor(ronda / 4) * 2);
      patos.push({
        tid: ++tid,
        tipo: "real",
        estado: "vuelo",
        patron: "onda",
        idx: 0,
        hp,
        hp0: hp,
        enfada: false,
        escolta: false,
        x: w * 0.5,
        y: bandaTop - 60,
        vx: (rng() < 0.5 ? 1 : -1) * velocidadRonda(ronda) * modo.velocidadMul * 0.55,
        vy: 0,
        ivx: 0,
        ivy: 0,
        dir: 1,
        t: 0,
        fase0: rng() * 6.2832,
        flap: rng() * 6.2832,
        flapRate: ESPECIES.real.flap,
        rot: 0,
        fallDir: rng() < 0.5 ? 1 : -1,
        bounced: false,
        restT: 0,
        fadeT: 0,
        targetY: bandaTop + 60 + rng() * Math.max(50, bandaBot - bandaTop - 90),
        retargetT: 80 + rng() * 70,
        escapeT: FUGA.real,
        evadeCd: 40,
        fintaT: 0,
        fintaCd: 1e9,
        senT: 0,
        senBaja: false,
        scale: (coarse ? 2.5 : 3.0),
        flashT: 0,
      });
      lanzados = VOLADA; // el jefe ES la volada entera
      res[0] = "vivo";
      pendiente = 1;
      cargador = Math.max(9, hp + 2);
      balas = cargador;
      recT = 0;
      audio.jefe();
      banner = {
        txt: "EL PATO REAL",
        sub: "derriba la corona",
        t: 0,
        vida: 140,
      };
      sacude(5);
      vibra([60, 40, 60]);
    };

    /* LA BANDADA REAL (V71) — tres coronas que vuelan juntas desde la
       ronda 8: cada una aguanta lo suyo y el botín se reparte */
    const spawnJefeBanda = () => {
      const hp = hpDeJefe(ronda);
      const dir0: 1 | -1 = rng() < 0.5 ? 1 : -1;
      const offs: [number, number][] = [[0, 0], [-66, 24], [66, -28]];
      for (let i = 0; i < 3; i++) {
        patos.push({
          tid: ++tid,
          tipo: "real",
          estado: "vuelo",
          patron: "onda",
          idx: i,
          hp,
          hp0: hp,
          mini: true,
          enfada: false,
          escolta: true, // las mini no llaman escolta propia
          x: w * 0.5 + offs[i][0],
          y: bandaTop + 60 + offs[i][1],
          vx: dir0 * velocidadRonda(ronda) * modo.velocidadMul * 0.5,
          vy: 0,
          ivx: 0,
          ivy: 0,
          dir: dir0,
          t: 0,
          fase0: rng() * 6.2832,
          flap: rng() * 6.2832,
          flapRate: ESPECIES.real.flap,
          rot: 0,
          fallDir: rng() < 0.5 ? 1 : -1,
          bounced: false,
          restT: 0,
          fadeT: 0,
          targetY: bandaTop + 60 + rng() * Math.max(50, bandaBot - bandaTop - 90),
          retargetT: 60 + rng() * 60,
          escapeT: FUGA.corona,
          evadeCd: 30 + rng() * 30,
          fintaT: 0,
          fintaCd: 1e9,
          senT: 0,
          senBaja: false,
          scale: coarse ? 1.5 : 1.8,
          flashT: 0,
        });
        res[i] = "vivo";
      }
      lanzados = VOLADA;
      pendiente = 3;
      cargador = Math.max(12, hp * 3 + 3);
      balas = cargador;
      recT = 0;
      audio.jefe();
      banner = {
        txt: "LA BANDADA REAL",
        sub: "tres coronas, una furia",
        t: 0,
        vida: 150,
      };
      sacude(6);
      vibra([60, 40, 60]);
    };

    /* escolta del PATO REAL — zafiros que defienden la corona (idx −1) */
    const spawnEscolta = () => {
      const dir: 1 | -1 = rng() < 0.5 ? 1 : -1;
      patos.push({
        tid: ++tid,
        tipo: "zafiro",
        estado: "vuelo",
        patron: "zigzag",
        idx: -1,
        hp: 1,
        x: dir === 1 ? -70 : w + 70,
        y: bandaTop + rng() * (bandaBot - bandaTop),
        vx: dir * velocidadRonda(ronda) * modo.velocidadMul * 1.15,
        vy: 0,
        ivx: 0,
        ivy: 0,
        dir,
        t: 0,
        fase0: rng() * 6.2832,
        flap: rng() * 6.2832,
        flapRate: ESPECIES.zafiro.flap,
        rot: 0,
        fallDir: rng() < 0.5 ? 1 : -1,
        bounced: false,
        restT: 0,
        fadeT: 0,
        targetY: bandaTop + 20 + rng() * Math.max(40, bandaBot - bandaTop - 40),
        retargetT: 34 + rng() * 50,
        escapeT: FUGA.escolta,
        evadeCd: 30 + rng() * 40,
        fintaT: 0,
        fintaCd: 1e9,
        senT: 0,
        senBaja: false,
        scale: (coarse ? 1.22 : 1.5),
        flashT: 0,
      });
    };

    /* el GLOBO DE PODER — asciende por la banda esperando plomo */
    const spawnGlobo = () => {
      const roll = rng();
      /* V79: la GALLETA entra al carrusel de globos (18%) */
      const pw: GloboPoder =
        roll < 0.34
          ? "escopeta"
          : roll < 0.62
            ? "tiempo"
            : roll < 0.8
              ? "plomo"
              : "galleta";
      const [, c0, c1] = PODER_COLOR[pw];
      globos.push({
        x: w * (0.1 + rng() * 0.8),
        y: grassY + 6,
        vy: -(0.5 + rng() * 0.18),
        t: 0,
        sway: rng() * 6.2832,
        poder: pw,
        c0,
        c1,
      });
      audio.aviso();
    };

    /* el disparo se resuelve AQUÍ — síncrono, como debe ser */
    const acierta = (p: Pato) => {
      const E = ESPECIES[p.tipo];
      /* el ESPEJO (V71) — a veces el plomo rebota y el vanidoso
         se teletransporta una banda más allá, sano y riéndose */
      if (p.tipo === "espejo" && p.estado === "vuelo" && rng() < 0.4) {
        rebotesRun++; // V76: el plomo vuelve — el archivo lo cuenta
        p.flashT = 3;
        p.x = Math.max(
          w * 0.1,
          Math.min(w * 0.9, p.x + (rng() < 0.5 ? -1 : 1) * 90),
        );
        popups.push({
          x: p.x,
          y: p.y - 26,
          txt: "¡reflejo!",
          t: 0,
          vida: 50,
          color: "#dfe4ee",
          serif: true,
        });
        audio.tinc();
        vibra(10);
        return;
      }
      /* LA BANDA (V71) — al guía se le cae la formación entera;
       a un mini, el resto se desparrama y vuela nervioso */
      if (p.tipo === "banda") {
        racha++;
        const multB = multOf(racha);
        const ptsB = E.ptos * multB;
        puntos += ptsB;
        hits++;
        porEspecie.banda = (porEspecie.banda ?? 0) + 1;
        popups.push({
          x: p.x,
          y: p.y - 20,
          txt: multB > 1 ? `+${ptsB} ×${multB}` : `+${ptsB}`,
          t: 0,
          vida: 50,
          color: E.popup,
          serif: false,
        });
        if (p.guia) {
          bandasRun++; // V76: la formación entera, por el suelo
          let extra = 0;
          for (const q of patos) {
            if (
              q !== p &&
              q.tipo === "banda" &&
              q.lid === p.lid &&
              q.estado === "vuelo"
            ) {
              q.estado = "caida";
              q.vy = -1.1 + rng() * 0.6;
              q.flashT = 3;
              extra++;
              puntos += Math.round(E.ptos * multB * 0.6);
              for (let i = 0; i < 4; i++) {
                const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.4;
                plumas.push({
                  x: q.x,
                  y: q.y,
                  vx: Math.cos(a) * (1.4 + Math.random() * 2),
                  vy: Math.sin(a) * (1.4 + Math.random() * 2),
                  rot: Math.random() * 6.2832,
                  vr: (Math.random() - 0.5) * 0.24,
                  t: 0,
                  vida: 45 + Math.random() * 25,
                  c: Math.random() < 0.6 ? E.ala : E.cuerpo0,
                  s: 0.6 + Math.random() * 0.5,
                  sway: Math.random() * 6.2832,
                });
              }
            }
          }
          popups.push({
            x: p.x,
            y: p.y - 44,
            txt: `¡la bandada! +${Math.round(E.ptos * multB * 0.6) * extra}`,
            t: 0,
            vida: 66,
            color: "#f2c08c",
            serif: true,
          });
          audio.ronda();
        } else {
          for (const q of patos) {
            if (q.tipo === "banda" && q.estado === "vuelo")
              q.escapeT = Math.min(q.escapeT, FUGA.nerviosa);
          }
        }
        freezeT = reduced ? 0 : 2;
        sacude(4);
        vibra(10);
        audio.silbido();
        audio.plumas();
        audio.quack();
        emit();
        return;
      }
      /* EL PATO REAL — cada impacto le arranca una vida; la feria
         cuenta la corona en voz alta y la furia espera abajo */
      if (p.tipo === "real" && p.hp > 1) {
        p.hp--;
        p.flashT = 3;
        p.ivx += (p.x < xp ? -1 : 1) * 4.2;
        p.ivy -= 1.4;
        /* V81: el plomo SOSTIENE la corona — mientras la trabajes no
           se escapa; cada impacto le devuelve tiempo (260f ≈ 4 s) */
        p.escapeT = Math.max(p.escapeT, FUGA.sostener);
        /* V84: si el impacto cae sobre la corona ESCALANDO, el plomo
           la devuelve a la feria — reingresa con el reloj en la mano
           y la caza sigue. La fuga nunca fue una salida. */
        if (p.estado === "fuga") {
          p.estado = "vuelo";
          p.vy = 0;
          popups.push({
            x: Math.min(w - 110, Math.max(110, p.x)),
            y: Math.max(120, p.y - 40 * p.scale * 0.5),
            txt: "¡el plomo la bajó!",
            t: 0,
            vida: 70,
            color: "#ffe9b0",
            serif: true,
          });
        }
        freezeT = reduced ? 0 : 4;
        sacude(6);
        vibra(12);
        popups.push({
          x: p.x,
          y: p.y - 40 * p.scale * 0.5,
          txt: `corona ${p.hp - 1}/${p.hp0 ?? p.hp}`,
          t: 0,
          vida: 50,
          color: "#ffe9b0",
          serif: true,
        });
        for (let i = 0; i < 14; i++) {
          const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.4;
          plumas.push({
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * (1.6 + Math.random() * 2.2),
            vy: Math.sin(a) * (1.6 + Math.random() * 2.2),
            rot: Math.random() * 6.2832,
            vr: (Math.random() - 0.5) * 0.22,
            t: 0,
            vida: 50 + Math.random() * 25,
            c: E.ala,
            s: 0.8 + Math.random() * 0.6,
            sway: Math.random() * 6.2832,
          });
        }
        audio.tinc();
        return;
      }
      /* el ACORAZADO aguanta el primer impacto — y se enfada */
      if (E.hp > 1 && p.hp > 1) {
        p.hp--;
        p.flashT = 3;
        p.ivx += (p.x < xp ? -1 : 1) * 3.6;
        p.ivy -= 1.2;
        freezeT = reduced ? 0 : 2;
        popups.push({
          x: p.x,
          y: p.y - 26,
          txt: "¡blindado!",
          t: 0,
          vida: 46,
          color: "#d7dbe2",
          serif: true,
        });
        for (let i = 0; i < 6; i++) {
          const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
          plumas.push({
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * (1.2 + Math.random() * 1.6),
            vy: Math.sin(a) * (1.2 + Math.random() * 1.6),
            rot: Math.random() * 6.2832,
            vr: (Math.random() - 0.5) * 0.22,
            t: 0,
            vida: 45 + Math.random() * 25,
            c: E.ala,
            s: 0.6 + Math.random() * 0.5,
            sway: Math.random() * 6.2832,
          });
        }
        audio.tinc();
        return;
      }
      /* V79: EL PATO LASTRADO — al primer toque SE FINGE MUERTO y
         a mitad de caída resurge con risa de la feria. Sin racha,
         sin puntos: la feria cobra el plomo y el teatro */
      if (p.lastrado && p.hp > 1) {
        p.hp--;
        p.teatro = true; // conserva lastrado: el plomo falso sigue a la vista
        p.flashT = 3;
        p.estado = "caida";
        p.vy = -1.2;
        p.vx *= 0.3;
        freezeT = reduced ? 0 : 2;
        sacude(4);
        vibra(12);
        popups.push({
          x: p.x,
          y: p.y - 30,
          txt: "¡LASTRADO!",
          t: 0,
          vida: 74,
          color: "#e0b184",
          serif: true,
        });
        popups.push({
          x: p.x,
          y: p.y - 52,
          txt: "se finge muerto…",
          t: 0,
          vida: 74,
          color: "rgba(250,246,236,0.75)",
          serif: true,
        });
        for (let i = 0; i < 7; i++) {
          const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
          plumas.push({
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * (1.2 + Math.random() * 1.8),
            vy: Math.sin(a) * (1.2 + Math.random() * 1.8),
            rot: Math.random() * 6.2832,
            vr: (Math.random() - 0.5) * 0.22,
            t: 0,
            vida: 45 + Math.random() * 20,
            c: E.ala,
            s: 0.6 + Math.random() * 0.5,
            sway: Math.random() * 6.2832,
          });
        }
        audio.madera();
        convocaZorro(p.x, false, true); // el feriante se ríe del truco
        emit();
        return;
      }
      p.estado = "caida";
      p.flashT = 3;
      p.vy = -1.3;
      porEspecie[p.tipo] = (porEspecie[p.tipo] ?? 0) + 1;
      if (p.lastrado) lastradosRun++; // V79: el lastrado cae DEL TODO — a la segunda
      freezeT = reduced ? 0 : 3; // hitstop — el mundo contiene el aliento
      vibra(15);
      racha++;
      const mult = multOf(racha);
      const pts = E.ptos * mult;
      puntos += pts;
      hits++;
      volleyHits++;
      /* V79: LA PLANCHA APRIETA — al quedar UNA presa para la cuota,
         el feriante acelera la plancha: cierre de ronda con pulso.
         La campanita lo anuncia (la feria avisa, jamás roba) */
      if (!plancha && !esJefe(ronda)) {
        const cq = cuotaModo(Math.max(1, ronda), modo);
        if (cq > 1 && volleyHits === cq - 1) {
          plancha = true;
          audio.campana();
          popups.push({
            x: w * 0.5,
            y: bandaBot + 44,
            txt: "¡la plancha aprieta!",
            t: 0,
            vida: 80,
            color: "rgba(250,246,236,0.9)",
            serif: true,
          });
          emit();
        }
      }
      popups.push({
        x: p.x,
        y: p.y - 26,
        txt: mult > 1 ? `+${pts} ×${mult}` : `+${pts}`,
        t: 0,
        vida: 58,
        color: E.popup,
        serif: false,
      });
      /* CADENA AÉREA (V71) — cazar antes de que el cadáver anterior
         toque el campo: la puntería rápida cobra interés compuesto */
      const aire = patos.some((q) => q !== p && q.estado === "caida");
      if (aire) {
        cadena++;
        const bonus = 60 * cadena * Math.max(1, ronda);
        puntos += bonus;
        popups.push({
          x: p.x,
          y: p.y - 48,
          txt: `cadena ×${cadena} +${bonus}`,
          t: 0,
          vida: 62,
          color: "#e08a52",
          serif: false,
        });
        audio.tinc();
      } else cadena = 0;
      /* el MENSAJERO entrega su letra (V71) — juntar PREMIO paga */
      if (p.tipo === "mensajero" && p.letra && !letras.includes(p.letra)) {
        letras.push(p.letra);
        popups.push({
          x: p.x,
          y: p.y - 44,
          txt: `letra ${p.letra}`,
          t: 0,
          vida: 60,
          color: "#cfe3a0",
          serif: true,
        });
        audio.poder();
        if (letras.length >= LETRAS_PREMIO.length) {
          const premio = 250 * Math.max(1, ronda);
          puntos += premio;
          banner = {
            txt: "¡PREMIO DE LA FERIA!",
            sub: `colección completa · +${premio}`,
            t: 0,
            vida: 120,
          };
          spawnGlobo();
          spawnGlobo();
          letras = []; // la colección vuelve a empezar
          premiosRun++;
          audio.corona();
        }
      }
      audio.silbido();
      audio.plumas();
      audio.quack();
      const n = quality >= 3 ? 8 : p.tipo === "dorada" ? 20 : 14;
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.4;
        const s = 1.4 + Math.random() * 2.4;
        plumas.push({
          x: p.x + (Math.random() - 0.5) * 20,
          y: p.y + (Math.random() - 0.5) * 14,
          vx: Math.cos(a) * s + p.vx * 0.2,
          vy: Math.sin(a) * s,
          rot: Math.random() * 6.2832,
          vr: (Math.random() - 0.5) * 0.24,
          t: 0,
          vida: 55 + Math.random() * 35,
          c: Math.random() < 0.6 ? E.ala : E.cuerpo0,
          s: 0.7 + Math.random() * 0.7,
          sway: Math.random() * 6.2832,
        });
      }
      /* LA CORONA CAE (V68) — la feria entera celebra al rey vencido:
         botín de ronda, dos globos garantizados y la volada al completo */
      if (p.tipo === "real" && p.mini) {
        /* una corona de la BANDADA REAL cae (V71) — botín propio;
           la última reparte globos y cierra la cuota entera */
        const botin = 100 * ronda;
        puntos += botin;
        if (p.idx >= 0 && p.idx < 3) res[p.idx] = "acierto";
        popups.push({
          x: p.x,
          y: p.y - 54,
          txt: `corona caída +${botin}`,
          t: 0,
          vida: 80,
          color: "#ffe9b0",
          serif: true,
        });
        freezeT = reduced ? 0 : 5;
        sacude(9);
        /* V84: la corona ESCALANDO (fuga) sigue viva a todos los
           efectos — el botín final no se canta con una aún en el aire */
        const quedan = patos.some(
          (q) =>
            q.mini && q !== p && (q.estado === "vuelo" || q.estado === "fuga"),
        );
        if (!quedan) {
          jefesRun++; // V75: la última corona también cuenta
          volleyHits = cuotaModo(ronda, modo);
          banner = {
            txt: "¡LA BANDADA REAL CAE!",
            sub: `tres coronas por el suelo · +${botin}`,
            t: 0,
            vida: 130,
          };
          spawnGlobo();
          spawnGlobo();
          spawnGlobo();
          freezeT = reduced ? 0 : 7;
          sacude(13);
          vibra([30, 30, 30, 30, 90]);
          audio.corona();
        } else {
          /* V81: jefesRun SOLO cuando cae la ÚLTIMA corona — antes
             contaba tres jefes por bandada (regresión del V75) */
          audio.tinc();
          vibra(20);
        }
        return;
      }
      if (p.tipo === "real") {
        jefesRun++;
        for (let i = 0; i < VOLADA; i++) res[i] = "acierto";
        volleyHits = cuotaModo(ronda, modo);
        const botin = 300 * ronda;
        puntos += botin;
        popups.push({
          x: p.x,
          y: p.y - 58,
          txt: `botín real +${botin}`,
          t: 0,
          vida: 90,
          color: "#ffe9b0",
          serif: true,
        });
        banner = {
          txt: "¡LA CORONA CAE!",
          sub: `la feria aplaude · +${botin}`,
          t: 0,
          vida: 120,
        };
        spawnGlobo();
        spawnGlobo();
        freezeT = reduced ? 0 : 6;
        sacude(13);
        vibra([30, 30, 30, 30, 90]);
        for (let i = 0; i < 26; i++) {
          const a = Math.random() * 6.2832;
          const s = 1.8 + Math.random() * 3.4;
          plumas.push({
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * s,
            vy: Math.sin(a) * s - 1.2,
            rot: Math.random() * 6.2832,
            vr: (Math.random() - 0.5) * 0.3,
            t: 0,
            vida: 70 + Math.random() * 40,
            c: Math.random() < 0.5 ? E.ala : "#e8c04f",
            s: 0.9 + Math.random() * 0.8,
            sway: Math.random() * 6.2832,
          });
        }
        audio.corona();
      }
    };

    /* le diste al ENGAÑO — la feria cobra su precio */
    const pegaCebo = (p: Pato) => {
      racha = 0;
      vibra(30);
      if (p.tipo === "senuelo") {
        puntos = Math.max(0, puntos - 150);
        popups.push({
          x: p.x,
          y: p.y - 24,
          txt: "¡señuelo! −150",
          t: 0,
          vida: 70,
          color: "#e0b184",
          serif: true,
        });
        for (let i = 0; i < 12; i++) {
          const a = Math.random() * 6.2832;
          const s = 1.2 + Math.random() * 2.4;
          chispas.push({
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * s,
            vy: Math.sin(a) * s - 0.6,
            t: 0,
            c: "150,100,55",
          });
        }
        audio.madera();
        convocaZorro(p.x, false, true); // el zorro se ríe… otra vez
        const i = patos.indexOf(p);
        if (i >= 0) patos.splice(i, 1);
      } else {
        puntos = Math.max(0, puntos - 200);
        popups.push({
          x: p.x,
          y: p.y - 24,
          txt: "¡cuervo! −200",
          t: 0,
          vida: 70,
          color: "#b9b3c9",
          serif: true,
        });
        for (let i = 0; i < 12; i++) {
          const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.4;
          plumas.push({
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * (1.4 + Math.random() * 2),
            vy: Math.sin(a) * (1.4 + Math.random() * 2),
            rot: Math.random() * 6.2832,
            vr: (Math.random() - 0.5) * 0.24,
            t: 0,
            vida: 50 + Math.random() * 30,
            c: Math.random() < 0.7 ? "#221f26" : "#4a4552",
            s: 0.7 + Math.random() * 0.6,
            sway: Math.random() * 6.2832,
          });
        }
        p.estado = "caida";
        p.vy = -0.8;
        p.flashT = 3;
        audio.caw();
      }
    };

    /* el globo revienta — la feria premia la puntería fina */
    const explotaGlobo = (gi: number) => {
      const g = globos[gi];
      if (!g) return;
      globos.splice(gi, 1);
      const [rgb] = PODER_COLOR[g.poder];
      for (let i = 0; i < 14; i++) {
        const a = Math.random() * 6.2832;
        const s = 1.6 + Math.random() * 2.8;
        chispas.push({
          x: g.x,
          y: g.y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          t: 0,
          c: rgb,
        });
      }
      puntos += 120;
      popups.push({
        x: g.x,
        y: g.y - 18,
        txt: "+120",
        t: 0,
        vida: 50,
        color: "rgba(250,246,236,0.95)",
        serif: false,
      });
      popups.push({
        x: g.x,
        y: g.y - 40,
        txt:
          g.poder === "escopeta"
            ? "ESCOPETA ×2"
            : g.poder === "tiempo"
              ? "TIEMPO LENTO"
              : g.poder === "plomo"
                ? "PLOMO +TODO"
                : "GALLETA DE LA SUERTE",
        t: 0,
        vida: 78,
        color: g.c0,
        serif: false,
      });
      if (g.poder === "plomo") {
        balas = cargador;
        recT = 0;
      } else if (g.poder === "galleta") {
        /* V79: LA GALLETA DE LA SUERTE — el próximo disparo en vacío
           NO corta la racha. Si ya llevas una, la extra son oro */
        if (!galleta) {
          galleta = true;
          audio.crunch();
        } else {
          puntos += TRAMPA.galletaPuntos;
          popups.push({
            x: g.x,
            y: g.y - 58,
            txt: `+${TRAMPA.galletaPuntos}`,
            t: 0,
            vida: 50,
            color: "#ef9fae",
            serif: false,
          });
          audio.tinc();
        }
      } else {
        poder = g.poder;
        poderT = PODER_DURACION[g.poder];
      }
      audio.pop();
      audio.poder();
    };

    /* V78: el plomo real — disparo sin cortafuegos del replay; el
       consumidor del fantasma y la Sala (vía disparo) llegan aquí */
    const disparaInterno = (cx: number, cy: number) => {
      puntero.x = cx;
      puntero.y = cy;
      puntero.inside = true;
      xp = cx;
      yp = cy;
      if (recT > 0 || balas <= 0) {
        audio.clic();
        kick = 0.45;
        /* V82: EL CAÑÓN SECO — un clic sin balas arma la recarga y lo
           grita junto a la mira. En táctil el cargador ya se reponía
           solo: escritorio iguala. Nada de aves "inmatables" por un
           cargador vacío — la feria avisa, jamás roba. El fantasma no
           toca el cañón: el replay queda byte a byte */
        if (balas <= 0 && recT <= 0 && !replayActivo) {
          recargarInterno();
          popups.push({
            x: Math.min(w - 80, Math.max(80, cx)),
            y: Math.max(72, cy - 30),
            txt: "¡sin plomo! recargando",
            t: 0,
            vida: 62,
            color: "#e0b184",
            serif: true,
          });
        }
        emit();
        return;
      }
      balas--;
      tiros++;
      kick = 1;
      flash = aj.flash ? 1 : 0;
      sacude(7);
      anillos.push({ x: cx, y: cy, t: 0 });
      const escopeta = poder === "escopeta";
      for (let i = 0, n = escopeta ? 12 : 6; i < n; i++) {
        const a = Math.random() * 6.2832;
        const s = 1.8 + Math.random() * 2.6;
        chispas.push({
          x: cx,
          y: cy,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          t: 0,
          c: "255,196,120",
        });
      }
      audio.disparo();
      /* 1) patos reales — la mira manda. Con ESCOPETA el anillo
         atraviesa: TODA la presa dentro cae (los cebos jamás roban) */
      /* V83: la geometría del plomo vive en nucleo.ts — pura y
         juzgable por tests. El motor solo dispara lo que decide. */
      const presas = nucleo.presasDe(
        patos,
        cx,
        cy,
        escopeta,
        aj.asistencia,
        (p) =>
          /* V84: la fuga es cobrable — mientras el ave siga en pantalla
             el plomo la alcanza (la promesa V81, ahora verdad). Jamás
             más un ave burlándose a quemarropa. */
          (p.estado === "vuelo" || p.estado === "fuga") &&
          !ESPECIES[p.tipo].cebo &&
          !(p.tipo === "humo" && alphaHumo(p) < 0.4),
      );
      if (presas.length > 0) {
        /* el plomo entra por el más cercano */
        const n = escopeta ? presas.length : 1;
        for (let i = 0; i < n; i++) acierta(presas[i]);
        emit();
        return;
      }
      /* 2) globos — el premio flota */
      const gi = globos.findIndex((g) => nucleo.impactaGlobo(cx, cy, g));
      if (gi >= 0) {
        explotaGlobo(gi);
        emit();
        return;
      }
      /* 3) el cebo — madera y plumas negras comen plomo */
      const cebo = nucleo.ceboDe(
        patos,
        cx,
        cy,
        (p) => p.estado === "vuelo" && ESPECIES[p.tipo].cebo,
      );
      if (cebo) pegaCebo(cebo);
      else {
        /* AL PELO (V68) — el plomo que silba cerca sin tocar premia
           la audacia: +25 y la racha NO se rompe (evangelio shmup:
           jugar peligroso se paga) */
        const cerca = nucleo.grazeDe(
          patos,
          cx,
          cy,
          (p) =>
            p.estado === "vuelo" &&
            !ESPECIES[p.tipo].cebo &&
            !(p.tipo === "humo" && alphaHumo(p) < 0.4),
        );
        if (cerca) {
          puntos += 25;
          grazesRun++;
          popups.push({
            x: cerca.x,
            y: cerca.y - 34,
            txt: "¡al pelo! +25",
            t: 0,
            vida: 46,
            color: "rgba(250,246,236,0.95)",
            serif: true,
          });
          audio.whoosh();
        } else if (galleta) {
          /* V79: LA GALLETA SE ROMPE en lugar de la racha — la suerte
             del bolsillo solo cubre el plomo en vacío, jamás el cebo */
          galleta = false;
          galletasRun++;
          popups.push({
            x: xp,
            y: yp - 30,
            txt: "la galleta se rompe",
            t: 0,
            vida: 62,
            color: "#ef9fae",
            serif: true,
          });
          popups.push({
            x: xp,
            y: yp - 52,
            txt: "la racha vive",
            t: 0,
            vida: 62,
            color: "rgba(250,246,236,0.85)",
            serif: false,
          });
          audio.crunch();
          vibra(8);
        } else racha = 0; // el plomo perdido, sin presa cerca, corta
      }
      emit();
    };

    const recargarInterno = () => {
      if (balas >= cargador || recT > 0) return;
      recT = 27;
      audio.recarga();
      emit();
    };

    /* V78: las puertas de la Sala — cortan el paso al fantasma y
       anotan el evento en el cuaderno cuando la tarde se graba */
    const disparo = (cx: number, cy: number) => {
      if (replayActivo) return; // el fantasma manda en el plomo
      if (fase !== "jugando" || pausado) return;
      if (grabando && eventosGrabados)
        eventosGrabados.push({ t: tRun, x: cx, y: cy, tipo: "d" });
      disparaInterno(cx, cy);
    };
    const recargar = () => {
      if (replayActivo) return;
      if (fase !== "jugando" || pausado) return;
      if (grabando && eventosGrabados)
        eventosGrabados.push({ t: tRun, tipo: "r" });
      recargarInterno();
    };

    /* V69: la PAUSA de la sala — el mundo contiene el aliento, el
       audio se duerme, y ni spawnT ni fugas avanzan mientras tanto.
       La sala manda (ESC/P/botón); el motor obedece. */
    /* V74: EL MANDO DE LA FERIA — stick mueve la mira, A o gatillo
       derecho dispara, Start pausa. Poll barato en cada frame. */
    let padFire = false;
    let padStart = false;
    const pollPad = () => {
      try {
        const pads = navigator.getGamepads?.() ?? [];
        const gp = Array.from(pads).find((g) => g && g.connected);
        if (!gp) return;
        const ax = gp.axes[0] ?? 0;
        const ay = gp.axes[1] ?? 0;
        if (Math.abs(ax) > 0.18 || Math.abs(ay) > 0.18) {
          puntero.x = Math.max(0, Math.min(w, puntero.x + ax * 14));
          puntero.y = Math.max(0, Math.min(h, puntero.y + ay * 14));
          puntero.inside = true;
        }
        const fire =
          (gp.buttons[0]?.pressed ?? false) ||
          (gp.buttons[7]?.value ?? 0) > 0.4;
        if (fire && !padFire) disparo(puntero.x, puntero.y);
        padFire = fire;
        const st = gp.buttons[9]?.pressed ?? false;
        if (st && !padStart) togglePausa();
        padStart = st;
      } catch {}
    };

    const togglePausa = () => {
      if (fase !== "jugando") return;
      pausado = !pausado;
      if (pausado) audio.suspend();
      else audio.resume();
      emit();
    };

    /* V75: volver al cartel LISTO desde la pausa o el fin — los ajustes
       y el archivo vuelven a estar al alcance sin recargar la feria */
    const irAlCartel = () => {
      /* V78: el replay también tiene puerta — salir del fantasma */
      const enPausa = fase === "jugando" && pausado;
      if (fase !== "fin" && !enPausa && !replayActivo) return;
      pausado = false;
      audio.suspend();
      patos.length = 0;
      plumas.length = 0;
      chispas.length = 0;
      anillos.length = 0;
      popups.length = 0;
      globos.length = 0;
      letras = [];
      zorro.estado = "oculto";
      zorro.t = 0;
      banner = null;
      freezeT = 0;
      shakeA = 0;
      flash = 0;
      /* V78: cualquier fantasma en escena se disuelve al volver */
      grabando = false;
      eventosGrabados = null;
      replayActivo = false;
      eventosReplay = [];
      idxReplay = 0;
      tRun = 0;
      fase = "listo";
      emit();
    };

    /* el zorro: con la presa… o riéndose de ti */
    const convocaZorro = (x: number, hold: boolean, risa: boolean) => {
      zorro.estado = "sube";
      zorro.t = 0;
      zorro.hold = hold;
      zorro.risa = risa;
      zorro.x = Math.min(w * 0.82, Math.max(w * 0.18, x));
      if (risa) audio.risa();
    };

    /* un pato real quedó resuelto — la oleada avanza */
    const resueltoPato = () => {
      if (pendiente <= 0) return; // cadáver de otra ronda: no cuenta
      pendiente--;
      if (pendiente > 0) return;
      if (lanzados >= VOLADA) {
        cerrarVuelta = true;
        spawnT = 46;
      } else {
        /* V67: desde la ronda 5 la siguiente oleada aún tarda menos */
        spawnT = ronda >= 5 ? 10 : 15;
      }
    };

    /* V72: el autoguardado de la feria — snapshot al pasar ronda.
       V78: el fantasma espectáculo, no tarde — no escribe nada */
    const salvaRun = () => {
      if (replayActivo) return;
      try {
        const s: RunSnapshot = {
          v: 2,
          ronda,
          puntos,
          racha,
          hits,
          escapes,
          tiros,
          letras: letras.join(""),
          modo: modo.id,
          diaria,
          semilla, // V75: continuar reproduce el mismo cielo
          estado: rng.estado(), // V75: el estado exacto del rng
        };
        localStorage.setItem(RUN_KEY, JSON.stringify(s));
      } catch {}
    };

    const finDelJuego = () => {
      fase = "fin";
      /* V81: la feria EXPLICA el final — se acaba el juego cuando una
         volada cierra sin llegar a la cuota, y se dice cuánta quedó */
      const cuFin = cuotaModo(Math.max(1, ronda), modo);
      motivoFin =
        volleyHits <= 0
          ? `la volada entera escapó sin plomo · pedía ${cuFin}`
          : `cuota corta: ${volleyHits} de ${cuFin} · así acaba la tarde`;
      /* V78: revivir la tarde no concede honores ni borra la run real
         que el cazador tenga guardada — el fantasma solo mira */
      recordNuevo = !replayActivo && puntos > record;
      if (recordNuevo) {
        record = puntos;
        guardarRecord(modo.recordKey, puntos);
      }
      if (!replayActivo) {
        try {
          localStorage.removeItem(RUN_KEY);
        } catch {}
      }
      audio.fin();
      emit();
    };

    const finDeVuelta = () => {
      cerrarVuelta = false;
      for (const q of patos) q.idx = -1; // los cadáveres dejan de contar
      if (volleyHits >= cuotaModo(ronda, modo)) {
        /* VOLADA PERFECTA (V68) — ocho de ocho sin una fuga: la feria
           paga el respeto en puntos y en fanfarria */
        /* V75: las rondas de jefe cobran su botín propio — no regalan
           también la volada perfecta (era inflación de puntos) */
        const perfecta =
          !esJefe(ronda) &&
          res.length === VOLADA &&
          res.every((x) => x === "acierto");
        /* V77: la CADENA DE PERFECTAS — repetir la hazaña en rondas
           seguidas multiplica el premio (×2 y ×3, techo en ×3) */
        if (perfecta) perfectasSeguidas++;
        else perfectasSeguidas = 0;
        const multPerfecta = perfecta ? Math.min(3, perfectasSeguidas) : 1;
        const premio = perfecta ? 200 * ronda * multPerfecta : 0;
        if (premio > 0) {
          puntos += premio;
          perfectasRun++;
          audio.perfecta();
          sacude(5);
          vibra(20);
        }
        ronda++;
        volleyHits = 0;
        plancha = false; // V79: la plancha descansa entre rondas
        apagonProg = 0; // V79: la lámpara se reprograma por oleada
        res = new Array(VOLADA).fill("pendiente");
        lanzados = 0;
        pendiente = 0;
        plan = construirPlan(ronda);
        /* los hitos de la escalada — el cartel anuncia lo nuevo */
        const subs: Record<number, string> = {
          2: "vuelan más vivos · cuervos a la vista",
          3: "cuota 6 · cuidado con los señuelos",
          4: "¡EL PATO REAL!",
          5: "cuota 7 · la noche cae",
          6: "oleadas gruesas",
          7: "8 de 8 · ronda perfecta",
          8: "tres coronas buscan revancha",
          10: "el zorro ya te teme",
        };
        banner = {
          txt:
            esJefe(ronda)
              ? tipoDeJefe(ronda) === "banda"
                ? "LA BANDADA REAL"
                : "EL PATO REAL"
              : `RONDA ${ronda}`,
          sub:
            esJefe(ronda)
              ? tipoDeJefe(ronda) === "banda"
                ? "tres coronas, una furia"
                : "derriba la corona"
              : (premio > 0
                  ? `volada perfecta${
                      multPerfecta > 1 ? ` ×${multPerfecta}` : ""
                    } +${premio} · `
                  : "") +
                (subs[ronda] ??
                  (ronda > 10
                    ? `veterano · ronda ${ronda}`
                    : "la feria no perdona")),
          t: 0,
          vida: 130,
        };
        if (esJefe(ronda)) audio.jefe();
        audio.ronda();
        spawnT = 56;
        /* V72: la tarde se guarda — un refresh ya no la mata */
        salvaRun();
      } else {
        convocaZorro(w * 0.5, false, true);
        finDelJuego();
        return;
      }
      emit();
    };

    /* la oleada sale ENTERA — patos simultáneos, balas 3×pato.
       Cada cuatro rondas (V68) la volada entera es UNA: el PATO REAL */
    const lanzarOleada = () => {
      if (esJefe(ronda)) {
        if (tipoDeJefe(ronda) === "banda") spawnJefeBanda();
        else spawnJefe();
        emit();
        return;
      }
      const size = plan.length > 0 ? (plan.shift() ?? 1) : 1;
      pendiente = size;
      cargador = modo.balasBase * size;
      balas = cargador;
      recT = 0;
      for (let i = 0; i < size; i++) spawnDuck();
      /* V79: LA LÁMPARA QUE SIFA — a veces la feria apaga las luces
         a mitad de oleada. Jefes jamás: la corona es espectáculo */
      if (
        ronda >= TRAMPA.apagonDesde &&
        apagonT <= 0 &&
        apagonProg <= 0 &&
        rng() < TRAMPA.apagonProb
      ) {
        apagonProg = 240 + rng() * 240;
      }
      emit();
    };

    const empezar = (
      m?: ModoId,
      opts?: {
        continuar?: RunSnapshot | null;
        diaria?: boolean;
        replay?: EventoFantasma[];
      },
    ) => {
      audio.gesto();
      /* V72/V75: la Volada del Día planta la semilla — la MISMA feria
         para todo el planeta (medianoche UTC) y SIEMPRE en modo FERIA;
         la partida libre siembra su propio caos; CONTINUAR restaura la
         semilla y el estado exactos — la tarde no cambia de cielo */
      const c = opts?.continuar ?? null;
      diaria = !!(c ? c.diaria : opts?.diaria);
      /* V78: relojes y cuadernos a cero en cada arranque. Graban las
         diarias FRESCAS (una tarde continua, sin CONTINUAR); revivir
         reproduce el cuaderno y come el input; lo demás no deja rastro */
      tRun = 0;
      idxReplay = 0;
      replayActivo = !!opts?.replay;
      eventosReplay = replayActivo
        ? [...(opts?.replay ?? [])].sort((a, b) => a.t - b.t)
        : [];
      grabando = diaria && !c && !replayActivo;
      eventosGrabados = grabando ? [] : null;
      if (
        c &&
        c.v === 2 &&
        typeof c.semilla === "number" &&
        typeof c.estado === "number"
      ) {
        semilla = c.semilla;
        rng = mulberry32(semilla);
        rng.restaura(c.estado);
      } else if (diaria) {
        semilla = semillaDelDia();
        rng = mulberry32(semilla);
      } else {
        semilla = (Math.random() * 0x100000000) >>> 0;
        rng = mulberry32(semilla);
      }
      if (diaria) modo = MODOS.feria;
      else if (m && MODOS[m]) modo = MODOS[m];
      letras = [];
      cadena = 0;
      bandT = 900;
      vientoF = 0;
      vientoObj = 0;
      vientoActivo = false;
      vientoDuro = 0;
      vientoT = 460 + rng() * 300;
      grazesRun = 0;
      jefesRun = 0;
      perfectasRun = 0;
      premiosRun = 0;
      rebotesRun = 0;
      bandasRun = 0;
      perfectasSeguidas = 0;
      /* V79: la feria trucada arranca limpia en cada tarde */
      motivoFin = "";
      lastradosRun = 0;
      galletasRun = 0;
      galleta = false;
      plancha = false;
      apagonProg = 0;
      apagonT = 0;
      for (const k of Object.keys(porEspecie)) delete porEspecie[k];
      if (c && (c.v === 1 || c.v === 2) && MODOS[c.modo]) {
        modo = diaria ? MODOS.feria : MODOS[c.modo];
        ronda = Math.max(1, Math.floor(c.ronda));
        puntos = Math.max(0, Math.floor(c.puntos));
        racha = Math.max(0, Math.floor(c.racha));
        hits = Math.max(0, Math.floor(c.hits));
        escapes = Math.max(0, Math.floor(c.escapes));
        tiros = Math.max(0, Math.floor(c.tiros));
        letras = c.letras.split("");
        plan = construirPlan(ronda);
      } else {
        ronda = 1;
        puntos = 0;
        racha = 0;
        hits = 0;
        escapes = 0;
        tiros = 0;
        plan = construirPlan(1);
      }
      recordNuevo = false;
      volleyHits = 0;
      lanzados = 0;
      pendiente = 0;
      cargador = modo.balasBase;
      balas = modo.balasBase;
      recT = 0;
      poder = "";
      poderT = 0;
      globos.length = 0;
      globoT = 340;
      senT = 700;
      cuvT = 760;
      cerrarVuelta = false;
      spawnT = 36;
      res = new Array(VOLADA).fill("pendiente");
      patos.length = 0;
      plumas.length = 0;
      chispas.length = 0;
      anillos.length = 0;
      popups.length = 0;
      banner = {
        txt: `RONDA ${ronda}`,
        sub: c
          ? "la tarde continúa donde quedó"
          : diaria
            ? "la volada del día · todos al mismo cielo"
            : `${modo.lema} · ${modo.nombre}`,
        t: 0,
        vida: 130,
      };
      zorro.estado = "oculto";
      zorro.t = 0;
      freezeT = 0;
      shakeA = 0;
      flash = 0;
      record = leerRecord(modo.recordKey);
      fase = "jugando";
      audio.empieza();
      emit();
    };

    /* ── actualizar — un paso del mundo (dt=1 ≙ 60fps, clamp 0.5-2) ── */
    const actualizar = (dt: number) => {
      /* recarga en curso */
      if (recT > 0) {
        recT -= dt;
        if (recT <= 0) {
          recT = 0;
          balas = cargador;
          emit();
        }
      }
      /* V69: en táctil no hay tecla R — el cargador se repone solo */
      if (coarse && balas <= 0 && recT <= 0) recargar();

      /* el poder activo se gasta */
      if (poderT > 0) {
        poderT -= dt;
        if (poderT <= 0) {
          poder = "";
          poderT = 0;
          emit();
        }
      }

      /* aparición de la siguiente oleada / cierre de la vuelta */
      if (spawnT > 0) {
        spawnT -= dt;
        if (spawnT <= 0) {
          if (cerrarVuelta) {
            finDeVuelta();
          } else {
            lanzarOleada();
          }
        }
      }

      /* los engaños y los poderes aparecen solos */
      if (lanzados >= 2 && ronda >= 1) {
        senT -= dt;
        if (senT <= 0) {
          if (!patos.some((p) => p.tipo === "senuelo" && p.estado === "vuelo"))
            spawnSenuelo();
          /* V67: el señuelo sale MÁS SEGUIDO cada ronda */
          senT =
            Math.max(340, 560 - 40 * (ronda - 1)) + rng() * 380;
        }
      }
      if (ronda >= 2 && lanzados >= 1) {
        cuvT -= dt;
        if (cuvT <= 0) {
          if (!patos.some((p) => p.tipo === "cuervo" && p.estado === "vuelo"))
            spawnCuervo();
          /* V67: el cuervo también aprieta con las rondas */
          cuvT =
            Math.max(300, 640 - 60 * (ronda - 2)) + rng() * 480;
        }
      }
      globoT -= dt;
      if (globoT <= 0) {
        if (globos.length === 0 && lanzados >= 1) spawnGlobo();
        globoT = 560 + rng() * 420;
      }
      /* V79: LA LÁMPARA QUE SIFA — cuenta atrás al apagón, luego el
         reloj: aviso (parpadeo+zumbido) → pleno → retorno */
      if (apagonProg > 0) {
        apagonProg -= dt;
        if (apagonProg <= 0) {
          apagonT = TRAMPA.apagonAviso + TRAMPA.apagonPleno + 40;
          audio.zumbido();
          emit();
        }
      }
      if (apagonT > 0) apagonT -= dt;
      /* V71: la banda silvestre — desde la ronda 4, sin límite de cuota */
      if (ronda >= 4 && lanzados >= 1 && !esJefe(ronda)) {
        bandT -= dt;
        if (bandT <= 0) {
          if (!patos.some((p) => p.tipo === "banda" && p.estado === "vuelo"))
            spawnBanda();
          bandT = 760 + rng() * 520;
        }
      }

      /* V71: EL VIENTO — vendavales que empujan la banda; los juncos
         son el telegráfo y el silbido el aviso. Desde la ronda 2. */
      if (vientoT > 0) vientoT -= dt;
      if (vientoActivo) {
        vientoF += (vientoObj - vientoF) * (1 - Math.pow(0.94, dt));
        vientoDuro -= dt;
        if (vientoDuro <= 0) {
          vientoActivo = false;
          vientoT = 480 + rng() * 420;
        }
      } else {
        vientoF *= Math.pow(0.9, dt);
        if (vientoT <= 0 && ronda >= 2) {
          vientoActivo = true;
          vientoDir = rng() < 0.5 ? -1 : 1;
          vientoObj = vientoDir * Math.min(1.5, 0.55 + rng() * 0.7);
          vientoDuro = 200 + rng() * 120;
          audio.whoosh();
          popups.push({
            x: w * 0.5,
            y: bandaTop - 14,
            txt: vientoDir > 0 ? "VIENTO →" : "← VIENTO",
            t: 0,
            vida: 80,
            color: "rgba(250,246,236,0.6)",
            serif: true,
          });
        }
      }

      /* quack ambiental — la feria está habitada */
      if (quackT > 0) {
        quackT -= dt;
        if (quackT <= 0) {
          audio.quack(true);
          quackT = 170 + Math.random() * 260;
        }
      }

      /* TIEMPO LENTO: los patos viven a otra velocidad */
      const dtD = dt * (poder === "tiempo" ? 0.38 : 1);

      /* ── patos ── */
      for (let i = patos.length - 1; i >= 0; i--) {
        const p = patos[i];
        p.t += dtD;
        p.flashT = Math.max(0, p.flashT - dt);

        if (p.estado === "vuelo") {
          /* V71: la BANDA sigue al guía — sin guía, libre y nerviosa */
          if (p.tipo === "banda" && !p.guia) {
            p.flap += p.flapRate * dtD;
            const guia = patos.find(
              (q) => q.tipo === "banda" && q.guia && q.lid === p.lid,
            );
            if (guia && guia.estado === "vuelo") {
              p.vx = guia.vx;
              p.x += (guia.vx + p.ivx + vientoF * 0.8) * dtD;
              p.y +=
                (guia.y + (p.dyForm ?? 0) - p.y) * Math.min(1, 0.14 * dtD);
            } else {
              p.x += (p.vx + vientoF * 0.8) * dtD;
              p.y += Math.sin(p.t * 0.2 + p.fase0) * 1.1 * dtD;
            }
            /* V81: el reloj corre también sin guía — la banda nerviosa
               se esparce al cielo en vez de orbitar para siempre */
            p.escapeT -= dtD;
            if (p.escapeT <= 0) {
              p.estado = "fuga";
              p.vy = -2.2;
              emit();
              continue;
            }
            if (p.x < -110 || p.x > w + 110) {
              patos.splice(i, 1);
              emit();
            }
          } else if (p.patron === "poste") {
            /* el SEÑUELO: sube rígido, flota un rato, se hunde */
            if (p.senBaja) {
              p.vy = 1.9;
              p.y += p.vy * dtD;
              p.rot = Math.sin(p.t * 0.12) * 0.12;
              if (p.y > grassY + 8) {
                patos.splice(i, 1);
                emit();
              }
            } else if (p.y > p.targetY) {
              p.vy = Math.max(p.vy - 0.12 * dtD, -2.3);
              p.y += p.vy * dtD;
            } else {
              p.senT += dtD;
              p.y += Math.sin(p.t * 0.055) * 0.34 * dtD;
              p.x += Math.sin(p.t * 0.031) * 0.5 * dtD;
              if (p.senT > 400) p.senBaja = true;
            }
          } else if (p.patron === "cruce") {
            /* el CUERVO: atraviesa la banda con zigzag cerrado */
            p.flap += p.flapRate * dtD;
            const vyC = Math.sin(p.t * 0.11 + p.fase0) * 1.7;
            p.x += (p.vx + vientoF * 0.9) * dtD;
            p.y += (vyC + p.ivy) * dtD;
            p.ivy *= Math.pow(0.9, dtD);
            if (p.y < bandaTop - 20) p.y = bandaTop - 20;
            if (p.y > bandaBot + 16) p.y = bandaBot + 16;
            if (p.x < -90 || p.x > w + 90) {
              patos.splice(i, 1);
              emit();
            }
          } else {
            /* patos reales — onda · zigzag · pica · rasante */
            p.flap += p.flapRate * (plancha ? 1.45 : 1) * dtD;
            /* FASES DEL PATO REAL (V68) — la escolta al 70% y la FURIA
               al 40%: picos y valles que premian la maestría */
            if (p.tipo === "real" && p.hp0) {
              const frac = p.hp / p.hp0;
              if (frac <= 0.7 && !p.escolta) {
                p.escolta = true;
                spawnEscolta();
                spawnEscolta();
                popups.push({
                  x: p.x,
                  y: p.y - 46,
                  txt: "¡escolta real!",
                  t: 0,
                  vida: 62,
                  color: "#8fe6d8",
                  serif: true,
                });
                audio.caw();
              }
              if (frac <= 0.4 && !p.enfada) {
                p.enfada = true;
                p.vx *= 1.45;
                p.flapRate *= 1.55;
                p.retargetT = Math.min(p.retargetT, 30);
                popups.push({
                  x: p.x,
                  y: p.y - 46,
                  txt: "¡FURIA REAL!",
                  t: 0,
                  vida: 70,
                  color: "#ff8a5c",
                  serif: true,
                });
                sacude(7);
                vibra(25);
                audio.caw();
                audio.whoosh();
              }
            }
            const picaYendo = p.patron === "pica" && p.y < bandaTop + 50;
            p.retargetT -= dtD;
            if (p.retargetT <= 0) {
              p.targetY =
                bandaTop +
                20 +
                rng() * Math.max(40, bandaBot - bandaTop - 40);
              p.retargetT =
                (p.tipo === "dorada"
                  ? 42
                  : p.patron === "zigzag"
                    ? 34
                    : 70) +
                rng() * 80;
            }
            /* el impulso de evasión se disipa */
            const dis = Math.pow(0.93, dtD);
            p.ivx *= dis;
            p.ivy *= dis;
            /* FINTA — se hace la muerta para que gastes plomo */
            let fintaMul = 1;
            if (p.fintaT > 0) {
              p.fintaT -= dtD;
              fintaMul = 0.2;
              p.y += 0.85 * dtD;
              if (p.fintaT <= 0) {
                const dx = p.x - puntero.x;
                const dy = p.y - puntero.y;
                const dd = Math.max(1, Math.hypot(dx, dy));
                p.ivx += (dx / dd) * 4.4;
                p.ivy += (dy / dd) * 1.6 - 1.2;
                popups.push({
                  x: p.x,
                  y: p.y - 30,
                  txt: "¡finta!",
                  t: 0,
                  vida: 42,
                  color: "rgba(250,246,236,0.9)",
                  serif: true,
                });
                audio.whoosh();
                audio.quack();
              }
            } else {
              p.fintaCd -= dtD;
              if (
                p.fintaCd <= 0 &&
                puntero.inside &&
                ronda >= 2 &&
                p.tipo !== "dorada"
              ) {
                const dx = p.x - puntero.x;
                const dy = p.y - puntero.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < 150 * 150) {
                  /* V67: la finta se vuelve más probable hasta la ronda 7 */
                  const probFinta =
                    0.045 + 0.012 * Math.min(Math.max(0, ronda - 2), 5);
                  if (rng() < probFinta) {
                    p.fintaT = 24 + rng() * 8;
                    p.fintaCd = Math.max(
                      110,
                      150 - 8 * Math.max(0, ronda - 2),
                    ) + rng() * 90;
                    audio.whoosh();
                  } else {
                    p.fintaCd = 12;
                  }
                }
              }
            }
            /* patrón vertical según el sello del pato */
            let vyPat: number;
            if (picaYendo) vyPat = 2.6;
            else if (p.patron === "zigzag")
              vyPat =
                Math.sin(p.t * 0.16 + p.fase0) * 1.25 +
                (p.targetY - p.y) * 0.004;
            else if (p.patron === "rasante")
              vyPat =
                Math.sin(p.t * 0.03 + p.fase0) * 0.18 +
                (p.targetY - p.y) * 0.003;
            else
              vyPat =
                Math.sin(p.t * 0.05 + p.fase0) * 0.42 +
                (p.targetY - p.y) * 0.0045;
            p.x +=
              (p.vx * fintaMul * (plancha ? TRAMPA.planchaMul : 1) +
                p.ivx +
                vientoF * 1.05) *
              dtD;
            p.y += (vyPat * fintaMul + p.ivy) * dtD;
            /* bordes — el pato regresa a la feria */
            if (p.dir === 1 && p.x > w * 0.94) {
              p.dir = -1;
              p.vx = -Math.abs(p.vx);
            } else if (p.dir === -1 && p.x < w * 0.06) {
              p.dir = 1;
              p.vx = Math.abs(p.vx);
            }
            if (p.y < bandaTop - 26) p.targetY = bandaTop + 10;
            else if (p.y > bandaBot + 30) p.targetY = bandaBot - 10;
            /* EVASIÓN — la mira cerca espanta (ronda 2+, la dorada siempre) */
            p.evadeCd -= dtD;
            if (p.evadeCd <= 0 && puntero.inside) {
              const dx = p.x - puntero.x;
              const dy = p.y - puntero.y;
              const d2 = dx * dx + dy * dy;
              if (d2 < 120 * 120) {
                /* V67: la evasión se vuelve nerviosa con las rondas */
                const probEva =
                  (p.tipo === "dorada"
                    ? 0.05 + 0.008 * Math.min(Math.max(1, ronda) - 1, 6)
                    : ronda >= 2
                      ? 0.028 + 0.006 * Math.min(ronda - 2, 6)
                      : 0) * (reduced ? 0.4 : 1);
                if (probEva > 0 && rng() < probEva) {
                  const d = Math.sqrt(Math.max(1, d2));
                  const imp = p.tipo === "real" ? 4.6 : 3.2;
                  p.ivx += (dx / d) * imp;
                  p.ivy += (dy / d) * imp;
                  p.evadeCd = p.tipo === "real" && p.enfada
                    ? 22
                    : 46 + rng() * 40;
                } else {
                  p.evadeCd = 12;
                }
              }
            }
            /* V81: VUELOS IMPREDECIBLES — zafiro, espejo y mensajero
               juegan a lo suyo: jalones bruscos que no se dejan leer.
               El destello de una frame es el aviso justo; el tiempo
               lento los dobla igual que a cualquiera */
            if (p.erratico && p.fintaT <= 0) {
              p.jinkCd = (p.jinkCd ?? 40) - dtD;
              if (p.jinkCd <= 0) {
                p.ivx += (rng() - 0.5) * 5.2;
                p.ivy += (rng() - 0.5) * 3.6 - 0.5;
                p.jinkCd = 34 + rng() * 66;
                p.flashT = Math.max(p.flashT, 1);
              }
            }
            /* la volada se acaba: se escapa hacia el cielo */
            const preEsc = p.escapeT;
            p.escapeT -= dtD;
            /* TELEGRÁFO (V68) — la presa anuncia su huida: la feria
               avisa una vez y el plomo veloz todavía la alcanza */
            if (
              preEsc > FUGA.ultimoAviso &&
              p.escapeT <= FUGA.ultimoAviso &&
              p.escapeT > 0 &&
              p.idx >= 0 &&
              p.idx < VOLADA
            )
              audio.aviso();
            /* V81: LA FUGA AVISADA — las coronas lo gritan TEMPRANO:
               a 5 s de irse, la feria lo canta. Nada de aves inmatables:
               la huida se ve venir y el plomo veloz la alcanza */
            if (
              p.tipo === "real" &&
              preEsc > FUGA.aviso &&
              p.escapeT <= FUGA.aviso &&
              p.escapeT > 0
            ) {
              audio.aviso();
              popups.push({
                x: Math.min(w - 90, Math.max(90, p.x)),
                y: Math.max(96, p.y - 46 * p.scale * 0.6),
                txt: "¡la corona se escapa!",
                t: 0,
                vida: 80,
                color: "#ffe9b0",
                serif: true,
              });
            }
            if (p.escapeT <= 0) {
              p.estado = "fuga";
              p.vy = -2.4;
              cadena = 0;
              /* V84: el "voló" ya no se canta aquí — el ave SIGUE en
                 pantalla y el plomo la alcanza. La cuenta del escape
                 se hace cuando de verdad se va (y < -90). */
              emit();
            }
          }
        } else if (p.estado === "fuga") {
          p.flap += p.flapRate * 1.7 * dtD;
          p.vy = Math.max(-8.2, p.vy - 0.09 * dtD);
          p.y += p.vy * dtD;
          p.x += p.vx * 0.6 * dtD;
          if (p.y < -90) {
            /* V84: la cuenta del escape al SALIR de pantalla — hasta
               ese último frame el ave fue cobrable (nada de inmatables) */
            if (p.idx >= 0 && p.idx < VOLADA) {
              res[p.idx] = "fuga";
              escapes++;
              racha = 0;
              vibra(18);
              popups.push({
                x: Math.min(w - 80, Math.max(80, p.x)),
                y: 96,
                txt: "¡voló!",
                t: 0,
                vida: 70,
                color: "rgba(250,246,236,0.85)",
                serif: true,
              });
              resueltoPato();
            }
            patos.splice(i, 1);
            emit();
          }
        } else if (p.estado === "caida") {
          /* V79: el LASTRADO RESURVE a mitad de caída — la feria se
             ríe, el pato queda escopeteado (hp 1) y la caza sigue */
          if (p.teatro && (p.vy >= 2.3 || p.y >= grassY - 40)) {
            p.teatro = false;
            p.estado = "vuelo";
            p.hp = 1;
            p.vy = 0;
            p.ivy = -2.8;
            p.ivx = (p.x < w * 0.5 ? 1 : -1) * 2.2;
            p.rot = 0;
            p.bounced = false;
            p.flashT = 3;
            /* V79: la feria le da margen a su trampilla — el resurgido
               NO se escapa sin dejarse cobrar el segundo toque */
            p.escapeT = Math.max(p.escapeT, FUGA.resurge);
            for (let k = 0; k < 10; k++) {
              const a = Math.random() * 6.2832;
              plumas.push({
                x: p.x,
                y: p.y,
                vx: Math.cos(a) * (1.4 + Math.random() * 2),
                vy: Math.sin(a) * (1.4 + Math.random() * 2) - 0.8,
                rot: Math.random() * 6.2832,
                vr: (Math.random() - 0.5) * 0.24,
                t: 0,
                vida: 48 + Math.random() * 22,
                c: ESPECIES[p.tipo].ala,
                s: 0.7 + Math.random() * 0.5,
                sway: Math.random() * 6.2832,
              });
            }
            popups.push({
              x: p.x,
              y: p.y - 42,
              txt: "¡¡LA FERIA TRAMPOSA!!",
              t: 0,
              vida: 76,
              color: "#e0b184",
              serif: true,
            });
            audio.quack();
            sacude(3);
            emit();
          } else {
            p.flap += dtD;
            p.vy = Math.min(7.2, p.vy + 0.27 * dtD);
            p.y += p.vy * dtD;
            p.x += p.fallDir * 0.55 * dtD;
            p.rot += 0.13 * p.fallDir * dtD;
            if (p.y >= grassY - 14) {
              if (!p.bounced) {
                p.bounced = true;
                p.vy *= -0.36;
                p.y = grassY - 14;
                audio.golpeTierra();
                sacude(4);
              } else {
                p.estado = "suelto";
                p.restT = 46;
                cadena = 0;
                p.y = grassY - 14;
                p.rot = p.fallDir > 0 ? 2.6 : -2.6;
                if (p.idx >= 0 && p.idx < VOLADA) {
                  res[p.idx] = "acierto";
                  convocaZorro(p.x, true, false);
                  resueltoPato();
                }
                emit();
              }
            }
          }
        } else {
          /* suelto — descansa sobre el campo y se desvanece */
          p.restT -= dt;
          if (p.restT <= 0) {
            p.fadeT += dt;
            if (p.fadeT >= 30) patos.splice(i, 1);
          }
        }
      }

      /* globos — ascienden, se mecen, se van */
      for (let i = globos.length - 1; i >= 0; i--) {
        const g = globos[i];
        g.t += dt;
        g.y += g.vy * dt;
        g.x += Math.sin(g.t * 0.04 + g.sway) * 0.35 * dt;
        if (g.y < bandaTop - 90) globos.splice(i, 1);
      }

      /* plumas — gravedad, fricción y vaivén */
      for (let i = plumas.length - 1; i >= 0; i--) {
        const f = plumas[i];
        f.t += dt;
        f.vy += 0.055 * dt;
        f.vx *= Math.pow(0.985, dt);
        f.vy *= Math.pow(0.99, dt);
        f.x += f.vx * dt + Math.sin((f.t + f.sway) * 0.15) * 0.5 + vientoF * 0.5 * dt;
        f.y += f.vy * dt;
        f.rot += f.vr * dt;
        if (f.t > f.vida || f.y > grassY + 8) plumas.splice(i, 1);
      }

      /* chispas y anillos del disparo */
      for (let i = chispas.length - 1; i >= 0; i--) {
        const s = chispas[i];
        s.t += dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vy += 0.06 * dt;
        if (s.t > 12) chispas.splice(i, 1);
      }
      for (let i = anillos.length - 1; i >= 0; i--) {
        anillos[i].t += dt;
        if (anillos[i].t > 14) anillos.splice(i, 1);
      }

      /* popups y rótulo de ronda */
      for (let i = popups.length - 1; i >= 0; i--) {
        popups[i].t += dt;
        if (popups[i].t > popups[i].vida) popups.splice(i, 1);
      }
      if (banner) {
        banner.t += dt;
        if (banner.t > banner.vida) banner = null;
      }

      /* el zorro sube, muestra, y baja */
      if (zorro.estado !== "oculto") {
        zorro.t += dt;
        if (zorro.estado === "sube" && zorro.t >= 26) {
          zorro.estado = "hold";
          zorro.t = 0;
        } else if (zorro.estado === "hold" && zorro.t >= (zorro.risa ? 96 : 70)) {
          zorro.estado = "baja";
          zorro.t = 0;
        } else if (zorro.estado === "baja" && zorro.t >= 26) {
          zorro.estado = "oculto";
          zorro.t = 0;
          emit();
        }
      }

      /* decaimientos del jugo */
      shakeA *= Math.pow(0.86, dt);
      flash *= Math.pow(0.885, dt);
      kick *= Math.pow(0.85, dt);
      /* la mira persigue al puntero */
      const lerp = 1 - Math.pow(0.58, dt);
      xp += (puntero.x - xp) * lerp;
      yp += (puntero.y - yp) * lerp;
    };

    /* ── dibujo — la feria en Canvas2D sobre el cielo GL ──────────── */

    const SPR = {
      dorada: glowSprite("232,183,102"),
      fuego: glowSprite("255,166,87", true),
    };

    function patoAla(c: CanvasRenderingContext2D) {
      c.beginPath();
      c.moveTo(0, 0);
      c.quadraticCurveTo(-10, -22, -30, -24);
      c.quadraticCurveTo(-23, -14, -26, -9);
      c.quadraticCurveTo(-15, -7, -13, -2);
      c.quadraticCurveTo(-7, 2, 0, 3);
      c.closePath();
    }

    function dibujarPato(c: CanvasRenderingContext2D, p: Pato) {
      const E = ESPECIES[p.tipo];
      const muerto = p.estado === "caida" || p.estado === "suelto";
      const al = alphaHumo(p);
      if (p.fadeT > 0) {
        c.globalAlpha = Math.max(0, Math.min(1, p.fadeT / 30));
      }
      if (al < 1) c.globalAlpha *= al;
      /* la dorada llega anunciada — un halo que la feria sigue */
      if (p.tipo === "dorada" && p.estado === "vuelo") {
        c.save();
        c.globalAlpha *= 0.4 + 0.12 * Math.sin(p.t * 0.11);
        drawGlow(c, SPR.dorada, p.x, p.y, 62 * p.scale);
        c.restore();
      }
      /* el PATO REAL en FURIA — brasa viva bajo la corona (V68) */
      if (
        p.tipo === "real" &&
        p.estado === "vuelo" &&
        p.enfada &&
        p.hp0 &&
        p.hp / p.hp0 <= 0.4
      ) {
        c.save();
        c.globalAlpha *= 0.5 + 0.22 * Math.sin(p.t * 0.2);
        drawGlow(c, SPR.fuego, p.x, p.y, 130);
        c.restore();
      }
      c.save();
      c.translate(p.x, p.y);
      c.scale(p.dir * p.scale, p.scale);
      const finta = p.fintaT > 0;
      const rigido = p.tipo === "senuelo";
      /* el alabeo vive en el espacio espejado: nariz arriba siempre.
         V79: el lastrado se DELATA — se balancea cargado */
      c.rotate(
        muerto
          ? p.rot
          : finta
            ? Math.sin((24 - p.fintaT) * 0.6) * 0.5
            : rigido
              ? Math.sin(p.t * 0.12) * 0.07
              : p.lastrado
                ? Math.sin(p.t * 0.09) * 0.24
                : Math.max(
                  -0.32,
                  Math.min(
                    0.32,
                    (p.targetY - p.y) * 0.002 +
                      Math.sin(p.t * 0.05 + p.fase0) * 0.1,
                  ),
                ),
      );
      const wingAng = muerto
        ? 0.95
        : finta
          ? 0.85
          : rigido
            ? 0.5
            : Math.sin(p.flap) * 0.92 - 0.14;
      const wingFar = muerto
        ? 0.7
        : finta
          ? 0.6
          : rigido
            ? 0.35
            : Math.sin(p.flap + 2.6) * 0.55 - 0.1;

      /* ala lejana — detrás del cuerpo, fase contraria */
      c.save();
      c.translate(-3, -3);
      c.rotate(wingFar);
      c.fillStyle = E.alaLejos;
      patoAla(c);
      c.fill();
      c.restore();

      /* cola (el cuervo la lleva horquillada) */
      c.fillStyle = E.cuerpo1;
      c.beginPath();
      c.moveTo(-21, -3);
      c.quadraticCurveTo(-34, -11, -37, -2);
      c.quadraticCurveTo(-33, 3, -21, 4);
      c.closePath();
      c.fill();
      if (p.tipo === "cuervo") {
        c.beginPath();
        c.moveTo(-30, -1);
        c.lineTo(-44, -9);
        c.lineTo(-33, 0);
        c.lineTo(-44, 6);
        c.closePath();
        c.fill();
      }

      /* cuerpo */
      const g = c.createLinearGradient(0, -15, 0, 15);
      g.addColorStop(0, E.cuerpo0);
      g.addColorStop(1, E.cuerpo1);
      c.fillStyle = g;
      c.beginPath();
      c.ellipse(0, 0, 25, 14.5, -0.06, 0, 6.2832);
      c.fill();
      c.strokeStyle = "rgba(8,6,5,0.5)";
      c.lineWidth = 1.4;
      c.stroke();

      /* panza clara */
      c.fillStyle = E.panza;
      c.beginPath();
      c.ellipse(-2, 6, 16, 6.4, 0, 0, 6.2832);
      c.fill();

      /* V79: el LASTRADO lleva el plomo falso a la vista — cuerda y
         bola gris balanceándose bajo el cuerpo: el tell honesto */
      if (p.lastrado) {
        const sw = Math.sin(p.t * 0.09) * 5;
        c.strokeStyle = "rgba(40,34,28,0.8)";
        c.lineWidth = 1.2;
        c.beginPath();
        c.moveTo(2, 12);
        c.quadraticCurveTo(2 + sw * 0.6, 20, 4 + sw, 26);
        c.stroke();
        c.fillStyle = "#5a5e66";
        c.beginPath();
        c.arc(4 + sw, 28.5, 4.4, 0, 6.2832);
        c.fill();
        c.strokeStyle = "rgba(12,10,8,0.6)";
        c.lineWidth = 1;
        c.stroke();
        c.fillStyle = "rgba(255,255,255,0.28)";
        c.beginPath();
        c.arc(2.6 + sw, 27, 1.3, 0, 6.2832);
        c.fill();
      }

      /* el señuelo delata su madera: veta y palo */
      if (p.tipo === "senuelo") {
        c.strokeStyle = "rgba(40,24,10,0.55)";
        c.lineWidth = 1.1;
        c.beginPath();
        c.moveTo(-19, 2.5);
        c.quadraticCurveTo(0, 5.5, 20, 1.5);
        c.stroke();
        c.beginPath();
        c.moveTo(-12, 8.5);
        c.quadraticCurveTo(0, 10.5, 12, 7.5);
        c.stroke();
        c.strokeStyle = "#3a2410";
        c.lineWidth = 2.2;
        c.beginPath();
        c.moveTo(0, 13);
        c.lineTo(0, 27);
        c.stroke();
      }

      /* cuello y cabeza */
      c.fillStyle = E.cuerpo0;
      c.beginPath();
      c.ellipse(19, -8, 7.5, 8.5, 0.5, 0, 6.2832);
      c.fill();
      c.beginPath();
      c.arc(23, -15, 8.6, 0, 6.2832);
      c.fill();

      /* pico */
      c.fillStyle = E.pico;
      c.beginPath();
      c.moveTo(30, -17.5);
      c.quadraticCurveTo(40, -15.5, 39.5, -13);
      c.quadraticCurveTo(36, -11.5, 30, -12);
      c.closePath();
      c.fill();
      c.strokeStyle = "rgba(8,6,5,0.4)";
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(31, -14.6);
      c.lineTo(38.5, -14);
      c.stroke();

      /* ojo — vivo, pintado, ardiendo o cruzado */
      if (muerto) {
        c.strokeStyle = "#120d0a";
        c.lineWidth = 1.7;
        c.beginPath();
        c.moveTo(21.5, -19);
        c.lineTo(27.5, -13.5);
        c.moveTo(27.5, -19);
        c.lineTo(21.5, -13.5);
        c.stroke();
      } else if (p.tipo === "senuelo") {
        /* ojo PINTADO — anillo que no parpadea jamás */
        c.strokeStyle = "rgba(250,246,236,0.8)";
        c.lineWidth = 1.6;
        c.beginPath();
        c.arc(24.5, -16.5, 3.1, 0, 6.2832);
        c.stroke();
        c.fillStyle = "#1c120b";
        c.beginPath();
        c.arc(24.5, -16.5, 1.4, 0, 6.2832);
        c.fill();
      } else if (p.tipo === "cuervo") {
        c.fillStyle = "#2a2733";
        c.beginPath();
        c.arc(24.5, -16.5, 2.9, 0, 6.2832);
        c.fill();
        c.fillStyle = "#ff5a3c";
        c.beginPath();
        c.arc(25.2, -16.6, 1.5, 0, 6.2832);
        c.fill();
      } else {
        c.fillStyle = "#f4efe2";
        c.beginPath();
        c.arc(24.5, -16.5, 2.9, 0, 6.2832);
        c.fill();
        c.fillStyle = "#14100c";
        c.beginPath();
        c.arc(25.2, -16.6, 1.5, 0, 6.2832);
        c.fill();
        c.fillStyle = "rgba(255,255,255,0.8)";
        c.beginPath();
        c.arc(24.6, -17.4, 0.6, 0, 6.2832);
        c.fill();
      }

      /* el ACORAZADO lleva casco remachado (agrieta al primer golpe) */
      if (p.tipo === "acorazado") {
        c.fillStyle = "#6a6e78";
        c.beginPath();
        c.ellipse(23, -18.5, 10.6, 8.4, 0.12, Math.PI, 0);
        c.closePath();
        c.fill();
        c.strokeStyle = "#3c3f47";
        c.lineWidth = 1.2;
        c.stroke();
        c.fillStyle = "#54575f";
        c.beginPath();
        c.arc(17, -21.5, 0.9, 0, 6.2832);
        c.arc(23.5, -24.5, 0.9, 0, 6.2832);
        c.arc(30, -21.5, 0.9, 0, 6.2832);
        c.fill();
        if (p.hp === 1) {
          c.strokeStyle = "#23262c";
          c.lineWidth = 1.3;
          c.beginPath();
          c.moveTo(20, -25.5);
          c.lineTo(23, -20.5);
          c.lineTo(21, -17.5);
          c.moveTo(27, -24.5);
          c.lineTo(25.5, -20);
          c.stroke();
        }
      }

      /* la dorada lleva la anilla de la feria */
      if (p.tipo === "dorada") {
        c.strokeStyle = "#b08a3e";
        c.lineWidth = 1.6;
        c.beginPath();
        c.moveTo(5, 11);
        c.lineTo(6, 17);
        c.stroke();
        c.fillStyle = "#fff3d0";
        c.fillRect(4.2, 13, 4, 2.4);
      }

      /* V71 — el ESPEJO: veta de luz vanidosa que titila */
      if (p.tipo === "espejo") {
        c.strokeStyle = "rgba(255,255,255,0.72)";
        c.lineWidth = 2.2;
        c.beginPath();
        c.moveTo(-13, -7);
        c.lineTo(9, -13);
        c.stroke();
        c.globalAlpha = 0.45 + 0.3 * Math.sin(p.t * 0.3);
        c.strokeStyle = "#ffffff";
        c.lineWidth = 1.1;
        c.beginPath();
        c.arc(24.5, -16.5, 4.6, 0, 6.2832);
        c.stroke();
        c.globalAlpha = 1;
      }

      /* V71 — el MENSAJERO: la carta del PREMIO al cuello (letra
         legible: se desespeja el contexto antes de escribir) */
      if (p.tipo === "mensajero" && p.letra) {
        c.strokeStyle = "rgba(60,44,18,0.75)";
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(14, -6);
        c.quadraticCurveTo(8, 10, 2, 14);
        c.stroke();
        c.fillStyle = "#f3e6c2";
        c.save();
        c.translate(2, 19);
        c.rotate(0.12);
        c.fillRect(-7, -5.5, 14, 11);
        c.strokeStyle = "#8a6522";
        c.lineWidth = 1;
        c.strokeRect(-7, -5.5, 14, 11);
        c.scale(p.dir, 1);
        c.fillStyle = "#3a2410";
        c.font = "700 9px \"JetBrains Mono\", ui-monospace, monospace";
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText(p.letra, 0, 0.5);
        c.restore();
      }

      /* la corona del PATO REAL — oro macizo con rubí (V68) */
      if (p.tipo === "real") {
        c.fillStyle = "#e8c04f";
        c.beginPath();
        c.moveTo(15.5, -23.5);
        c.lineTo(18.5, -31.5);
        c.lineTo(22.5, -25.5);
        c.lineTo(26, -33);
        c.lineTo(29.5, -25.5);
        c.lineTo(33.5, -31.5);
        c.lineTo(36.5, -23.5);
        c.closePath();
        c.fill();
        c.strokeStyle = "#8a6522";
        c.lineWidth = 1.1;
        c.stroke();
        c.fillStyle = "#c2492e";
        c.beginPath();
        c.arc(26, -27, 1.7, 0, 6.2832);
        c.fill();
        /* collar real — la cadena del rey de la feria */
        c.strokeStyle = "#e8c04f";
        c.lineWidth = 1.3;
        c.beginPath();
        c.arc(23, -15, 10.5, 0.5, 2.6);
        c.stroke();
      }

      /* ala cercana — la que lee el aleteo */
      c.save();
      c.translate(-1, -4);
      c.rotate(wingAng);
      c.fillStyle = E.ala;
      patoAla(c);
      c.fill();
      c.strokeStyle = "rgba(8,6,5,0.35)";
      c.lineWidth = 1.1;
      c.stroke();
      c.restore();

      /* flash blanco del impacto */
      if (p.flashT > 0) {
        c.globalAlpha = Math.min(1, p.flashT / 3) * 0.85;
        c.fillStyle = "#fff8ec";
        c.beginPath();
        c.ellipse(0, 0, 26, 15.5, 0, 0, 6.2832);
        c.fill();
        c.globalAlpha = 1;
      }
      /* TELEGRÁFO DE FUGA (V68) — destello cremoso: ¡se va, dispárale!
         V81: ventana honesta (2 s) y las coronas ARDEN EN ORO desde
         los 5 s — la fuga se ve venir, jamás se sufre */
      if (
        p.estado === "vuelo" &&
        p.idx >= 0 &&
        p.idx < VOLADA &&
        p.patron !== "poste" &&
        p.escapeT > 0 &&
        p.escapeT < FUGA.telegrafo
      ) {
        const bl = 0.5 + 0.5 * Math.sin(p.t * 0.55);
        c.globalAlpha = 0.4 + 0.5 * bl;
        c.fillStyle = "#faf6ec";
        c.beginPath();
        c.moveTo(0, -48);
        c.lineTo(5.5, -37);
        c.lineTo(-5.5, -37);
        c.closePath();
        c.fill();
        c.globalAlpha = 1;
      }
      /* V81: el anillo de oro de la corona — avisa del reloj de fuga
         mientras esté por agotarse (los impactos lo sostienen) */
      if (
        p.estado === "vuelo" &&
        p.tipo === "real" &&
        p.escapeT > 0 &&
        p.escapeT < FUGA.oro
      ) {
        const bl = 0.5 + 0.5 * Math.sin(p.t * 0.28);
        c.globalAlpha = 0.26 + 0.34 * bl;
        c.strokeStyle = "#ffe9b0";
        c.lineWidth = 2.5;
        c.beginPath();
        c.arc(0, 0, 40, 0, 6.2832);
        c.stroke();
        c.globalAlpha = 1;
      }
      c.restore();
      c.globalAlpha = 1;
    }

    function dibujarGlobo(c: CanvasRenderingContext2D, g: Globo) {
      c.save();
      c.translate(g.x, g.y);
      c.rotate(Math.sin(g.t * 0.05 + g.sway) * 0.08);
      /* cuerda */
      c.strokeStyle = "rgba(250,246,236,0.45)";
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(0, 18);
      c.quadraticCurveTo(2.5, 25, 0, 32);
      c.stroke();
      /* la gota del globo */
      const grad = c.createLinearGradient(0, -20, 0, 16);
      grad.addColorStop(0, g.c0);
      grad.addColorStop(1, g.c1);
      c.fillStyle = grad;
      c.beginPath();
      c.moveTo(0, -21);
      c.bezierCurveTo(15, -21, 17, 2, 0, 17);
      c.bezierCurveTo(-17, 2, -15, -21, 0, -21);
      c.fill();
      c.strokeStyle = "rgba(8,6,5,0.45)";
      c.lineWidth = 1.1;
      c.stroke();
      /* brillo */
      c.fillStyle = "rgba(255,255,255,0.3)";
      c.beginPath();
      c.ellipse(-5.5, -9, 3.6, 6.4, 0.32, 0, 6.2832);
      c.fill();
      /* nudo */
      c.fillStyle = g.c1;
      c.beginPath();
      c.moveTo(-3.2, 16.5);
      c.lineTo(3.2, 16.5);
      c.lineTo(0, 21);
      c.closePath();
      c.fill();
      c.restore();
    }

    function dibujarPluma(c: CanvasRenderingContext2D, f: Pluma) {
      const a = Math.min(1, (f.vida - f.t) / 26);
      if (a <= 0) return;
      c.save();
      c.globalAlpha = a * 0.9;
      c.translate(f.x, f.y);
      c.rotate(f.rot + Math.sin(f.t * 0.12 + f.sway) * 0.4);
      c.fillStyle = f.c;
      c.beginPath();
      c.ellipse(0, 0, 5.4 * f.s, 2.1 * f.s, 0, 0, 6.2832);
      c.fill();
      c.restore();
    }

    function dibujarJuncos(c: CanvasRenderingContext2D, arr: Junco[]) {
      c.lineCap = "round";
      for (const j of arr) {
        const sway =
          Math.sin(tGlobal * 0.9 + j.x * 0.012) * (2.2 + j.h * 0.02) +
          vientoF * (13 + j.h * 0.16);
        c.strokeStyle = j.c;
        c.lineWidth = j.lw;
        c.beginPath();
        c.moveTo(j.x, grassY + 12);
        c.quadraticCurveTo(
          j.x + j.lean * 0.35,
          grassY + 12 - j.h * 0.55,
          j.x + j.lean + sway,
          grassY + 12 - j.h,
        );
        c.stroke();
        /* espiga de junco — la cabeza del cattail */
        if (j.espiga) {
          const tx = j.x + j.lean + sway;
          const ty = grassY + 12 - j.h;
          c.strokeStyle = "rgba(110,68,38,0.95)";
          c.lineWidth = j.lw + 3.4;
          c.beginPath();
          c.moveTo(tx, ty);
          c.lineTo(tx + sway * 0.15, ty - 13);
          c.stroke();
        }
      }
    }

    function dibujarCampo(c: CanvasRenderingContext2D) {
      const g = c.createLinearGradient(0, grassY - 4, 0, h);
      g.addColorStop(0, "#0d0a08");
      g.addColorStop(1, "#050404");
      c.fillStyle = g;
      c.fillRect(0, grassY - 4, w, h - grassY + 4);
      /* la luz del atardecer besa el campo */
      c.fillStyle = "rgba(214,163,92,0.13)";
      c.fillRect(0, grassY - 4, w, 1.2);
    }

    function dibujarZorro(c: CanvasRenderingContext2D) {
      if (zorro.estado === "oculto") return;
      const prog =
        zorro.estado === "sube"
          ? zorro.t / 26
          : zorro.estado === "baja"
            ? Math.max(0, 1 - zorro.t / 26)
            : 1;
      const ease = 1 - Math.pow(1 - prog, 3);
      const risa = zorro.risa;
      c.save();
      /* sube de DETRÁS del lomo del campo — la berma lo oculta (dibujar
         pinta la franja del terreno DESPUÉS del zorro) */
      c.translate(zorro.x, grassY + 130 - ease * 125);
      c.scale(1.55, 1.55);
      /* cuerpo */
      c.fillStyle = "#8f5426";
      c.beginPath();
      c.roundRect(-30, -34, 60, 42, 12);
      c.fill();
      c.fillStyle = "rgba(250,240,220,0.85)";
      c.beginPath();
      c.roundRect(-16, -20, 32, 26, 10);
      c.fill();
      /* orejas con puntas oscuras */
      c.fillStyle = "#7c4620";
      c.beginPath();
      c.moveTo(-19, -58);
      c.lineTo(-25, -82);
      c.lineTo(-7, -66);
      c.closePath();
      c.fill();
      c.beginPath();
      c.moveTo(19, -58);
      c.lineTo(25, -82);
      c.lineTo(7, -66);
      c.closePath();
      c.fill();
      c.fillStyle = "#241811";
      c.beginPath();
      c.moveTo(-22.5, -72);
      c.lineTo(-25, -82);
      c.lineTo(-16, -74.5);
      c.closePath();
      c.fill();
      c.beginPath();
      c.moveTo(22.5, -72);
      c.lineTo(25, -82);
      c.lineTo(16, -74.5);
      c.closePath();
      c.fill();
      /* cabeza */
      c.fillStyle = "#9a5b29";
      c.beginPath();
      c.ellipse(0, -48, 21, 18.5, 0, 0, 6.2832);
      c.fill();
      /* mejillas y hocico crema */
      c.fillStyle = "#f0e3cc";
      c.beginPath();
      c.ellipse(-12, -44, 6.4, 5.4, 0, 0, 6.2832);
      c.fill();
      c.beginPath();
      c.ellipse(12, -44, 6.4, 5.4, 0, 0, 6.2832);
      c.fill();
      c.beginPath();
      c.moveTo(-8, -42);
      c.quadraticCurveTo(0, -30, 8, -42);
      c.quadraticCurveTo(0, -46, -8, -42);
      c.closePath();
      c.fill();
      /* nariz */
      c.fillStyle = "#1c120b";
      c.beginPath();
      c.ellipse(0, -37.5, 2.7, 2.1, 0, 0, 6.2832);
      c.fill();
      /* ojos — puntos vivos o arcos de carcajada */
      if (risa) {
        c.strokeStyle = "#241811";
        c.lineWidth = 2.2;
        c.lineCap = "round";
        c.beginPath();
        c.arc(-8.5, -51, 3.6, Math.PI * 1.12, Math.PI * 1.88);
        c.stroke();
        c.beginPath();
        c.arc(8.5, -51, 3.6, Math.PI * 1.12, Math.PI * 1.88);
        c.stroke();
        c.fillStyle = "#3a1f12";
        c.beginPath();
        c.ellipse(0, -39.5, 5.6, 4.6, 0, 0, Math.PI);
        c.fill();
      } else {
        c.fillStyle = "#f6efdf";
        c.beginPath();
        c.arc(-8.5, -51, 2.9, 0, 6.2832);
        c.fill();
        c.beginPath();
        c.arc(8.5, -51, 2.9, 0, 6.2832);
        c.fill();
        c.fillStyle = "#14100c";
        c.beginPath();
        c.arc(-8, -51.4, 1.5, 0, 6.2832);
        c.fill();
        c.beginPath();
        c.arc(9, -51.4, 1.5, 0, 6.2832);
        c.fill();
      }
      /* la presa en el hocico */
      if (zorro.hold && !risa && prog > 0.4) {
        c.save();
        c.translate(0, -24);
        c.rotate(0.14);
        c.scale(0.52, 0.52);
        c.fillStyle = "#5a381d";
        c.beginPath();
        c.ellipse(0, 0, 24, 14, 0, 0, 6.2832);
        c.fill();
        c.fillStyle = "#a06a3a";
        c.beginPath();
        c.arc(22, -14, 8.4, 0, 6.2832);
        c.fill();
        c.fillStyle = "#d99a4e";
        c.beginPath();
        c.moveTo(29, -16.5);
        c.lineTo(39, -13.5);
        c.lineTo(29, -11);
        c.closePath();
        c.fill();
        c.fillStyle = "#d9a95f";
        c.save();
        c.translate(-2, -4);
        c.rotate(0.9);
        patoAla(c);
        c.fill();
        c.restore();
        c.strokeStyle = "#120d0a";
        c.lineWidth = 2;
        c.beginPath();
        c.moveTo(20, -18);
        c.lineTo(26, -12);
        c.moveTo(26, -18);
        c.lineTo(20, -12);
        c.stroke();
        c.restore();
      }
      c.restore();
    }

    function dibujarPopups(c: CanvasRenderingContext2D) {
      for (const p of popups) {
        const a = Math.max(0, 1 - p.t / p.vida);
        if (a <= 0) continue;
        c.save();
        c.globalAlpha = a;
        c.fillStyle = p.color;
        c.textAlign = "center";
        c.font = p.serif
          ? 'italic 400 22px "Instrument Serif", Georgia, serif'
          : '600 14px "JetBrains Mono", ui-monospace, monospace';
        c.fillText(p.txt, p.x, p.y - p.t * 0.6);
        c.restore();
      }
    }

    function dibujarBanner(c: CanvasRenderingContext2D) {
      if (!banner) return;
      const a = Math.min(1, banner.t / 12, (banner.vida - banner.t) / 22);
      if (a <= 0) return;
      c.save();
      c.globalAlpha = Math.max(0, Math.min(1, a));
      c.textAlign = "center";
      c.fillStyle = "rgba(250,246,236,0.95)";
      c.font = '600 34px "Space Grotesk", system-ui, sans-serif';
      c.fillText(banner.txt, w / 2, h * 0.3);
      c.fillStyle = "rgba(232,199,147,0.8)";
      c.font = '400 13px "JetBrains Mono", ui-monospace, monospace';
      c.fillText(banner.sub.toUpperCase().split("").join(" "), w / 2, h * 0.3 + 26);
      c.restore();
    }

    function dibujarMira(c: CanvasRenderingContext2D) {
      if (fase !== "jugando" || !puntero.inside) return;
      const k = (1 + kick * 0.45) * (aj.miraGrande ? 1.5 : 1);
      const col =
        balas > 0 && recT <= 0
          ? "rgba(250,246,236,0.92)"
          : "rgba(205,98,64,0.92)";
      c.save();
      c.translate(xp, yp);
      if (recT > 0) c.rotate((1 - recT / 27) * 6.2832);
      c.scale(k, k);
      /* ANILLO DE ENGANCHE — la mira avisa cuando hay presa al alcance */
      if (balas > 0 && recT <= 0) {
        let hay = false;
        for (const p of patos) {
          if (p.estado !== "vuelo" || ESPECIES[p.tipo].cebo) continue;
          if (alphaHumo(p) < 0.4) continue;
          const dx = p.x - xp;
          const dy = p.y - yp;
          if (dx * dx + dy * dy < 118 * 118) {
            hay = true;
            break;
          }
        }
        if (hay) {
          c.strokeStyle = "rgba(217,123,74,0.6)";
          c.lineWidth = 1.2;
          c.beginPath();
          c.arc(0, 0, 19, 0, 6.2832);
          c.stroke();
        }
        /* el alcance de la ESCOPETA se lee en la mira */
        if (poder === "escopeta") {
          c.strokeStyle = "rgba(224,138,82,0.55)";
          c.setLineDash([5, 4]);
          c.beginPath();
          c.arc(0, 0, 25, 0, 6.2832);
          c.stroke();
          c.setLineDash([]);
        }
      }
      c.strokeStyle = col;
      c.lineWidth = 1.5;
      c.beginPath();
      c.arc(0, 0, 13, 0, 6.2832);
      c.stroke();
      c.beginPath();
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        c.moveTo(Math.cos(a) * 6.5, Math.sin(a) * 6.5);
        c.lineTo(Math.cos(a) * 12, Math.sin(a) * 12);
      }
      c.stroke();
      c.fillStyle = col;
      c.beginPath();
      c.arc(0, 0, 1.6, 0, 6.2832);
      c.fill();
      c.restore();
    }

    const dibujar = () => {
      const c = cvF.getContext("2d");
      if (!c) return;
      c.clearRect(0, 0, w, h);
      if (!glOk) c.drawImage(fbSky, 0, 0, w, h);

      /* el cielo de atardecer — GL directo a la pantalla */
      if (glOk && gl && prog) {
        gl.useProgram(prog);
        gl.uniform1f(u.time ?? null, tGlobal);
        gl.uniform2f(u.res ?? null, cvG.width, cvG.height);
        gl.uniform1f(
          u.round ?? null,
          Math.min(1, Math.max(0, (ronda - 1) / 8)),
        );
        gl.uniform1f(u.flash ?? null, flash);
        gl.uniform1f(u.low ?? null, quality >= 2 ? 1 : 0);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }

      c.save();
      if (shakeA > 0.3) {
        c.translate(
          (Math.random() - 0.5) * shakeA,
          (Math.random() - 0.5) * shakeA,
        );
      }
      dibujarJuncos(c, juncosBack);
      for (const p of patos) dibujarPato(c, p);
      for (const g of globos) dibujarGlobo(c, g);
      for (const f of plumas) dibujarPluma(c, f);
      dibujarCampo(c);
      dibujarZorro(c);
      /* la berma — el lomo del campo tras el que el zorro se esconde */
      const gb = c.createLinearGradient(0, grassY + 2, 0, grassY + 36);
      gb.addColorStop(0, "#0b0908");
      gb.addColorStop(1, "#060505");
      c.fillStyle = gb;
      c.fillRect(0, grassY + 2, w, 34);
      dibujarJuncos(c, juncosFront);
      for (const a of anillos) {
        const al = 1 - a.t / 14;
        if (a.t < 5 && aj.flash) {
          /* fogonazo — el cañón respira luz (cortesía si hay ajuste) */
          c.save();
          c.globalAlpha = al * 0.85;
          drawGlow(c, SPR.fuego, a.x, a.y, 22 + a.t * 12);
          c.restore();
        }
        c.strokeStyle = `rgba(255,214,150,${(al * 0.6).toFixed(3)})`;
        c.lineWidth = 2;
        c.beginPath();
        c.arc(a.x, a.y, 8 + a.t * 3.4, 0, 6.2832);
        c.stroke();
      }
      for (const s of chispas) {
        const al = 1 - s.t / 12;
        c.fillStyle = `rgba(${s.c},${(al * 0.9).toFixed(3)})`;
        c.fillRect(s.x - 1.2, s.y - 1.2, 2.4, 2.4);
      }
      dibujarPopups(c);
      dibujarBanner(c);
      c.restore();
      /* el velo del TIEMPO LENTO — la feria entera contiene el aliento */
      if (poder === "tiempo") {
        c.fillStyle = "rgba(127,212,194,0.05)";
        c.fillRect(0, 0, w, h);
        c.fillStyle = "rgba(127,212,194,0.35)";
        c.fillRect(0, 0, w, 2);
      }
      /* V79: LA LÁMPARA QUE SIFA — la feria a oscuras. Aviso: parpadeo
         suave (cortés con reduced-motion). Pleno: siluetas — solo los
         OJOS de la presa viva lucen como luciérnagas, y los globos
         siguen brillando. La mira se dibuja después: jamás se apaga */
      if (apagonT > 0) {
        let a: number;
        if (apagonT > TRAMPA.apagonAviso + TRAMPA.apagonPleno) {
          a = reduced
            ? 0.05
            : 0.1 + 0.07 * Math.sin(apagonT * 0.5);
        } else if (apagonT > 40) {
          a = 0.84;
        } else {
          a = 0.84 * (apagonT / 40);
        }
        c.fillStyle = `rgba(4,3,8,${a.toFixed(3)})`;
        c.fillRect(0, 0, w, h);
        if (a > 0.4) {
          for (const p of patos) {
            if (p.estado !== "vuelo" && !p.teatro) continue;
            const ex = p.x + p.dir * p.scale * 24.5;
            const ey = p.y - p.scale * 16.5;
            c.save();
            c.globalAlpha =
              0.55 + 0.25 * Math.sin(tGlobal * 6 + p.tid * 1.7);
            drawGlow(
              c,
              p.tipo === "cuervo" ? SPR.fuego : SPR.dorada,
              ex,
              ey,
              10 * p.scale,
            );
            c.fillStyle = p.tipo === "cuervo" ? "#ff7a5a" : "#ffd97a";
            c.beginPath();
            c.arc(ex, ey, 1.7 * p.scale, 0, 6.2832);
            c.fill();
            c.restore();
          }
          for (const g of globos) {
            c.save();
            c.globalAlpha = 0.5;
            drawGlow(c, SPR.dorada, g.x, g.y, 24);
            c.restore();
          }
        }
      }
      /* la mira NUNCA tiembla con la sala — apunta firme */
      dibujarMira(c);
    };

    /* ── el bucle — físico clampado, contabilidad real (V67) ──────── */
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const msFrame = prevNow ? Math.min(200, now - prevNow) : 16.7;
      prevNow = now;
      msEma = msEma * 0.9 + msFrame * 0.1;
      fpsEma = 1000 / Math.max(1, msEma);
      fpsN++;
      fpsAcc += msFrame / 1000;

      const dt = Math.min(2, Math.max(0.5, msFrame / 16.667));
      tGlobal += dt / 60;

      if (fase === "jugando" && !pausado) {
        /* V78: el reloj de la tarde corre — y el fantasma cobra sus
           disparos justo cuando los hubo (antes de mover el mundo) */
        tRun += dt / 60;
        while (idxReplay < eventosReplay.length && eventosReplay[idxReplay].t <= tRun) {
          const ev = eventosReplay[idxReplay++];
          if (ev.tipo === "d") disparaInterno(ev.x ?? w / 2, ev.y ?? h * 0.4);
          else recargarInterno();
        }
        pollPad();
        if (freezeT > 0) {
          freezeT -= dt; /* hitstop — el mundo contiene el aliento */
        } else {
          actualizar(dt);
        }
      }

      dibujar();

      /* gobernador de calidad (histéresis, cada 2 s reales) */
      if (fpsAcc >= 2) {
        const f = fpsN / fpsAcc;
        if (f < 30 && quality < 3) {
          quality++;
          resize();
        } else if (f > 52 && quality > 1) {
          quality--;
          resize();
        }
        fpsN = 0;
        fpsAcc = 0;
      }

      /* telemetría viva — ~10 Hz jugando, 2 Hz en reposo */
      frame++;
      if ((fase === "jugando" && frame % 6 === 0) || frame % 30 === 0) emit();
    };

    /* ── API para la sala ── */
    if (apiRef) {
      apiRef.current = {
        puntero: (cx, cy) => {
          puntero.x = cx;
          puntero.y = cy;
          puntero.inside = true;
        },
        disparo,
        recargar,
        pausa: togglePausa,
        ajustes: (a: Partial<Ajustes>) => {
          aj = { ...aj, ...a };
          audio.setVolumen(aj.volumen);
          emit();
        },
        empezar, /* V78: firma con replay — la propia función local */
        snd: () => {
          audio.snd();
          emit();
        },
        alCartel: irAlCartel,
        /* V78: el cuaderno de la tarde — la Sala lo guarda al fin si
           la diaria dejó fantasma (y solo si fue su mejor tarde) */
        eventos: () =>
          eventosGrabados && eventosGrabados.length > 0
            ? { semilla, eventos: eventosGrabados }
            : null,
        leave: () => {
          puntero.inside = false;
        },
      };
    }

    /* teclado del juego — R recarga, M silencio, ESC/P pausa (V69:
       la pausa vive aquí — y los atajos con Cmd/Ctrl/Alt son del
       sistema, la feria no los toca) */
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "r" || e.key === "R") {
        recargar();
      } else if ((e.key === "m" || e.key === "M") && !e.repeat) {
        audio.snd();
        emit();
      } else if (
        (e.key === "Escape" || e.key === "p" || e.key === "P") &&
        !e.repeat
      ) {
        togglePausa();
      }
    };
    window.addEventListener("keydown", onKey);

    /* higiene: resize, pausa oculta, context-lost */
    const ro = new ResizeObserver(() => resize());
    ro.observe(root);
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (document.hidden) {
        audio.suspend();
      } else {
        prevNow = 0;
        raf = requestAnimationFrame(loop);
        audio.resume();
      }
    };
    const onLost = (e: Event) => {
      e.preventDefault();
      ok = false;
      glOk = false;
      pintaCieloFallback();
      emit();
    };
    /* V69: el cielo resucita — antes el GL quedaba muerto para siempre */
    const onRestored = () => {
      if (armaGL()) {
        gl?.viewport(0, 0, cvG.width, cvG.height);
        ok = true;
        emit();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    cvG.addEventListener("webglcontextlost", onLost);
    cvG.addEventListener("webglcontextrestored", onRestored);

    resize();
    ok = true;
    emit();
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVis);
      cvG.removeEventListener("webglcontextlost", onLost);
      cvG.removeEventListener("webglcontextrestored", onRestored);
      audio.cerrar(); // V69: sin hilos de audio huérfanos
      if (apiRef) apiRef.current = null;
      if (gl && prog) gl.deleteProgram(prog);
    };
    /* V82: apiRef en dependencias — la ref del padre es estable
       (useRef): el motor nace una vez y el lint queda honesto */
  }, [apiRef]);

  return (
    <div ref={rootRef} className={className}>
      <canvas
        ref={glCanvasRef}
        aria-hidden
        className="absolute inset-0 h-full w-full"
      />
      <canvas
        ref={fgCanvasRef}
        aria-hidden
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

/* V69: memo — la sala re-renderiza a ~10 Hz con los stats, pero el
   motor (refs y props estables) no tiene por qué seguirle el paso */
export default memo(VolateriaEngine);
