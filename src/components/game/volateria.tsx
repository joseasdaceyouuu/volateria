"use client";

/* VOLATERÍA — la sala del tiro al pato de feria (versión standalone).
   Extraída de la serie DEMO D-05 del portfolio Vuelo Propio. El motor
   (engine/volateria-engine) pinta el atardecer GL y la feria 2D; esta
   sala le pone marco, HUD y ceremonia:

   - HUD instrumental: ronda con pips de la volada (8) + cuota
     progresiva (5→8), PUNTOS grandes, racha ×multiplicador,
     cartuchos según la oleada (3 por pato) y chip del poder activo
     (ESCOPETA / TIEMPO LENTO)
   - overlay LISTO: el cartel de la feria — COMENZAR arma el audio
     DENTRO del gesto (regla de la casa) y SoundBtn queda a mano
   - overlay FIN: fin de la feria — puntos, ronda alcanzada, récord
     (localStorage del visitante) y REINTENTAR
   - overlay PAUSA (V69): ESC/P o el botón contienen el mundo —
     Reanudar sin perder ronda, puntos ni racha
   - el puntero MANDA: mover apunta, el clic DISPARA (el motor resuelve
     el hit síncronamente); touch = tap para disparar
   - cursor:native oculto mientras se juega — la mira dibujada ES el
     cursor (sin pointer lock)
   - telemetría window.__labD05Dbg — objeto plano, misma forma SIEMPRE
     (lección V62), la escribe la sala con cada stats del motor y
     alimenta las sondas QA de scripts/probe.mjs */

import { useCallback, useEffect, useRef, useState } from "react";
import { GameFrame, SoundBtn } from "./game-frame";
import {
  LETRAS_PREMIO,
  MODOS,
  PODER_DURACION,
  type ModoId,
} from "./engine/config";
import {
  guardaAjustes,
  leeAjustes,
  type Ajustes,
} from "./ajustes";
import PwaRegister from "./pwa-register";
import VolateriaEngine, {
  type VolateriaApi,
  type VolateriaStats,
} from "./engine/volateria-engine";
import {
  TROFEOS,
  comparteRun,
  fusionaArchivo,
  guardaArchivo,
  guardaTrofeos,
  leeArchivo,
  leeRun,
  leeSelloDiario,
  leeTrofeos,
  sellaDiario,
  trofeosGanados,
  type Archivo,
  type Trofeo,
} from "./meta";

const FASE_INICIAL: VolateriaStats = {
  ok: false,
  fase: "listo",
  ronda: 0,
  puntos: 0,
  record: 0,
  recordNuevo: false,
  racha: 0,
  mult: 1,
  balas: 3,
  recargando: false,
  pausa: false,
  hits: 0,
  escapes: 0,
  tiros: 0,
  volleyHits: 0,
  cuota: 5,
  enCola: 0,
  resultados: [],
  zorro: 0,
  poder: "",
  poderT: 0,
  globos: [],
  fps: 0,
  ms: 0,
  dpr: 1,
  quality: 1,
  reduced: false,
  muted: false,
  px: 0,
  py: 0,
  modo: "feria",
  viento: 0,
  letras: "",
  diaria: false,
  grazes: 0,
  jefes: 0,
  perfectas: 0,
  premios: 0,
  porEspecie: {},
  patos: [],
};

export default function Volateria() {
  const apiRef = useRef<VolateriaApi | null>(null);
  const [stats, setStats] = useState<VolateriaStats>(FASE_INICIAL);
  /* la sala viaja con ssr:false — window existe en el primer render,
     así que reduced se lee perezoso sin efectos en cascada */
  const [reduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [mounted, setMounted] = useState(false);
  /* V71: el modo se elige en el cartel y viaja al COMENZAR; los
     récords de la casa se leen una vez para pintar el selector */
  const [modoSel, setModoSel] = useState<ModoId>("feria");
  const [records] = useState<Record<ModoId, number>>(() => {
    const lee = (k: string) => {
      try {
        const v = Number(localStorage.getItem(k));
        return Number.isFinite(v) && v > 0 ? Math.floor(v) : 0;
      } catch {
        return 0;
      }
    };
    return {
      cabrito: lee(MODOS.cabrito.recordKey),
      feria: lee(MODOS.feria.recordKey),
      veterano: lee(MODOS.veterano.recordKey),
    };
  });

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 90);
    return () => clearTimeout(t);
  }, []);

  /* V72: la meta — run guardada, sello del día, archivo y trofeos */
  const [runGuardada] = useState(() => leeRun());
  const [sello] = useState(() => leeSelloDiario());
  const [archivoAbierto, setArchivoAbierto] = useState(false);
  const [archivo, setArchivo] = useState<Archivo>(() => leeArchivo());
  const [trofeos, setTrofeos] = useState<Record<string, boolean>>(() =>
    leeTrofeos(),
  );
  const [toast, setToast] = useState<{ txt: string; sub: string } | null>(null);
  const [shareTxt, setShareTxt] = useState("");
  /* V73: el panel del cazador — flash, temblor, mira, asistencia */
  const [ajustes, setAjustes] = useState<Ajustes>(() => leeAjustes());
  const [ajustesAbierto, setAjustesAbierto] = useState(false);
  const setAj = useCallback((p: Partial<Ajustes>) => {
    setAjustes((prev) => {
      const n = { ...prev, ...p };
      guardaAjustes(n);
      apiRef.current?.ajustes(p);
      return n;
    });
  }, []);

  /* trofeos — se vigilan en cada telemetría; el ref evita releer */
  const trofeosRef = useRef(trofeos);
  useEffect(() => {
    const gana = trofeosGanados(stats, trofeosRef.current);
    if (gana.length === 0) return;
    const nuevo = { ...trofeosRef.current };
    for (const t of gana) nuevo[t.id] = true;
    trofeosRef.current = nuevo;
    guardaTrofeos(nuevo);
    setTrofeos(nuevo);
    setToast({ txt: `TROFEO — ${gana[0].nombre}`, sub: gana[0].desc });
  }, [stats]);

  /* el archivo del cazador — se funde una vez por partida al caer */
  const mergeRef = useRef("");
  useEffect(() => {
    if (stats.fase !== "fin") return;
    const sig = `${stats.puntos}-${stats.tiros}-${stats.ronda}-${stats.diaria}`;
    if (mergeRef.current === sig) return;
    mergeRef.current = sig;
    const fus = fusionaArchivo(leeArchivo(), stats);
    guardaArchivo(fus);
    setArchivo(fus);
    if (stats.diaria) sellaDiario(stats);
  }, [stats.fase, stats]);

  /* el toast se despide solo */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const onCompartir = useCallback(async (s: VolateriaStats) => {
    setShareTxt(await comparteRun(s));
  }, []);

  /* telemetría para probes — objeto plano, los mismos campos SIEMPRE */
  useEffect(() => {
    (
      window as unknown as { __labD05Dbg?: Record<string, unknown> }
    ).__labD05Dbg = {
      ok: stats.ok,
      fase: stats.fase,
      ronda: stats.ronda,
      puntos: stats.puntos,
      record: stats.record,
      recordNuevo: stats.recordNuevo,
      racha: stats.racha,
      mult: stats.mult,
      balas: stats.balas,
      recargando: stats.recargando,
      pausa: stats.pausa,
      hits: stats.hits,
      escapes: stats.escapes,
      tiros: stats.tiros,
      volleyHits: stats.volleyHits,
      cuota: stats.cuota,
      enCola: stats.enCola,
      resultados: stats.resultados,
      zorro: stats.zorro,
      poder: stats.poder,
      poderT: stats.poderT,
      globos: stats.globos,
      fps: stats.fps,
      ms: stats.ms,
      dpr: stats.dpr,
      quality: stats.quality,
      reduced: stats.reduced,
      muted: stats.muted,
      px: stats.px,
      py: stats.py,
      modo: stats.modo,
      viento: stats.viento,
      letras: stats.letras,
      diaria: stats.diaria,
      grazes: stats.grazes,
      jefes: stats.jefes,
      perfectas: stats.perfectas,
      premios: stats.premios,
      porEspecie: stats.porEspecie,
      patos: stats.patos,
    };
  }, [stats]);

  /* ── el puntero manda: mover apunta, el clic dispara ─────────── */
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    apiRef.current?.puntero(e.clientX, e.clientY);
  }, []);
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const t = e.target as HTMLElement | null;
    if (t?.closest("[data-volateria-ui]")) return;
    apiRef.current?.disparo(e.clientX, e.clientY);
  }, []);
  const onPointerLeave = useCallback(() => {
    apiRef.current?.leave();
  }, []);

  const jugando = stats.fase === "jugando";
  const enPausa = jugando && stats.pausa;
  /* entrada escalonada de los carteles (una sola vez, tras el boot) */
  const entra = (delay: string) =>
    `transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${delay} ${
      reduced || mounted
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-4"
    }`;

  return (
    <GameFrame>
      <PwaRegister />
      <div
        role="application"
        aria-label="Escenario de VOLATERÍA: apunta con el cursor y dispara a los patos"
        className={`absolute inset-0 select-none touch-none ${
          jugando && !enPausa ? "cursor-none" : ""
        }`}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onPointerLeave={onPointerLeave}
      >
        {/* ── el atardecer GL + la feria 2D ── */}
        <VolateriaEngine
          onStats={setStats}
          apiRef={apiRef}
          className="absolute inset-0 h-full w-full"
        />

        {/* ── HUD instrumental (solo mientras se juega) ── */}
        <div
          aria-hidden={!jugando}
          className={`pointer-events-none absolute inset-0 z-[93] transition-opacity duration-700 ${
            jugando ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-start justify-between px-6 pt-16 md:px-16">
            {/* ronda + la volada en pips */}
            <div className="drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/70">
                Ronda{" "}
                <span className="text-copper">
                  {String(stats.ronda).padStart(2, "0")}
                </span>
                <span aria-hidden className="mx-2 text-line">·</span>
                cuota {stats.volleyHits}/{stats.cuota}
              </p>
              <div className="mt-2.5 flex gap-1.5">
                {stats.resultados.map((r, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-4 rounded-full transition-colors duration-300 ${
                      r === "acierto"
                        ? "bg-copper"
                        : r === "fuga"
                          ? "bg-faint/40"
                          : r === "vivo"
                            ? "animate-pulse bg-cream/60"
                            : "border border-line bg-transparent"
                    }`}
                  />
                ))}
              </div>
              {/* V71: las letras del PREMIO — la colección de la feria */}
              <div className="mt-2.5 flex gap-1" aria-label="Letras del premio">
                {LETRAS_PREMIO.split("").map((l) => (
                  <span
                    key={l}
                    className={`flex h-4 w-4 items-center justify-center rounded-sm border font-mono text-[8px] transition-colors duration-300 ${
                      stats.letras.includes(l)
                        ? "border-[#6f8f4a] bg-[#6f8f4a]/25 text-[#cfe3a0]"
                        : "border-line/70 text-faint/50"
                    }`}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* puntos — el marcador de la feria */}
            <div className="text-center drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                Puntos
              </p>
              <p className="font-mono text-3xl font-semibold tabular-nums text-cream md:text-4xl">
                {stats.puntos}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-faint/80">
                récord {stats.record}
              </p>
            </div>

            {/* racha — el multiplicador de la mano caliente */}
            <div className="text-right drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                Racha
              </p>
              <p
                key={stats.mult}
                className={`font-mono text-2xl font-semibold tabular-nums md:text-3xl ${
                  stats.mult > 1 ? "text-copper" : "text-cream/85"
                }`}
              >
                ×{stats.mult}
              </p>
              {stats.racha >= 2 && (
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-copper/90">
                  {stats.racha} seguidos
                </p>
              )}
            </div>
          </div>

          {/* balas — los cartuchos de la escopeta (3 por pato en vuelo) */}
          <div className="absolute bottom-6 left-6 drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)] md:bottom-9 md:left-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
              Balas
            </p>
            <div className="mt-2 flex items-end gap-1.5">
              {[...Array(Math.max(3, stats.balas)).keys()].map((i) => (
                <span
                  key={i}
                  className={`h-5 w-[7px] rounded-t-sm transition-colors duration-200 ${
                    i < stats.balas ? "bg-copper" : "bg-line/60"
                  }`}
                />
              ))}
              {stats.recargando && (
                <span className="ml-2 animate-pulse font-mono text-[10px] uppercase tracking-[0.2em] text-copper">
                  recargando…
                </span>
              )}
              {stats.balas === 0 && !stats.recargando && (
                <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-copper">
                  R — recargar
                </span>
              )}
            </div>
            {/* el poder activo — la feria premia al que revienta globos */}
            {stats.poder !== "" && (
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.25em] ${
                    stats.poder === "escopeta" ? "text-copper" : "text-[#7fd4c2]"
                  }`}
                >
                  {stats.poder === "escopeta" ? "escopeta ×2" : "tiempo lento"}
                </span>
                <span className="h-1 w-16 overflow-hidden rounded-full bg-line/60">
                  <span
                    className={`block h-full ${
                      stats.poder === "escopeta" ? "bg-copper" : "bg-[#7fd4c2]"
                    }`}
                    style={{
                      width: `${Math.min(
                        100,
                        (stats.poderT /
                          (stats.poder === "escopeta"
                            ? PODER_DURACION.escopeta
                            : PODER_DURACION.tiempo)) *
                          100,
                      )}%`,
                    }}
                  />
                </span>
              </div>
            )}
          </div>

          {/* hint táctil — sobre la línea del pie del marco */}
          <p className="absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.28em] text-faint/80 md:hidden">
            toca para disparar
          </p>
        </div>

        {/* ── cartel LISTO — la entrada de la feria ── */}
        {stats.fase === "listo" && (
          <div
            data-volateria-ui
            className="absolute inset-0 z-[94] grid place-items-center bg-[#0a0908]/55 backdrop-blur-[3px]"
          >
            <div className="mx-6 max-w-2xl text-center">
              <p
                className={`flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.34em] text-cream/70 ${entra("[transition-delay:60ms]")}`}
              >
                <span
                  aria-hidden
                  className="inline-block h-px w-8 bg-copper/70"
                />
                El tiro al pato de feria · la cacería real
                <span
                  aria-hidden
                  className="inline-block h-px w-8 bg-copper/70"
                />
              </p>
              <h1
                className={`mt-6 font-sans text-[clamp(3rem,9vw,6.5rem)] font-semibold leading-[0.92] tracking-tight ${entra("[transition-delay:180ms]")}`}
              >
                <span className="bg-[linear-gradient(180deg,#faf6ec_0%,#f0e9d8_52%,#d6c8a8_100%)] bg-clip-text text-transparent">
                  VOLATERÍA
                </span>
              </h1>
              <p
                className={`mt-4 font-serif text-lg italic text-cream/80 md:text-xl ${entra("[transition-delay:300ms]")}`}
              >
                El tiro al pato de feria, reimaginado — oleadas veloces,
                señuelos traidores, globos de poder y EL PATO REAL cada
                cuatro rondas, con jugo de arcade y sonido tejido a mano.
              </p>

              <div
                className={`mt-9 grid grid-cols-1 gap-3 text-left sm:grid-cols-3 ${entra("[transition-delay:420ms]")}`}
              >
                {[
                  {
                    k: "Apunta",
                    d: "la mira vive en tu cursor y engancha la presa",
                  },
                  {
                    k: "Dispara",
                    d: "3 balas por pato · R recarga · la cuota crece cada dos rondas",
                  },
                  {
                    k: "Desconfía",
                    d: "señuelos, cuervos, patos que se hacen los muertos… y cada cuatro rondas, EL PATO REAL",
                  },
                ].map((it) => (
                  <div
                    key={it.k}
                    className="border border-line/80 bg-ink/40 px-4 py-3 backdrop-blur-sm"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-copper">
                      {it.k}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-smoke">
                      {it.d}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className={`mt-9 flex flex-col items-center gap-4 ${entra("[transition-delay:540ms]")}`}
              >
                {/* V71: los tres modos de la feria — cada uno su récord */}
                <div
                  role="radiogroup"
                  aria-label="Modo de juego"
                  className="flex w-full max-w-md items-stretch justify-center gap-2"
                >
                  {Object.values(MODOS).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      role="radio"
                      aria-checked={modoSel === m.id}
                      onClick={() => setModoSel(m.id)}
                      className={`group flex-1 rounded-lg border px-3 py-2.5 text-center transition-colors duration-300 ${
                        modoSel === m.id
                          ? "border-copper/80 bg-copper/15"
                          : "border-line/80 bg-ink/40 hover:border-copper/40"
                      }`}
                    >
                      <span
                        className={`block font-mono text-[10px] uppercase tracking-[0.22em] ${
                          modoSel === m.id ? "text-copper" : "text-cream/75"
                        }`}
                      >
                        {m.nombre}
                      </span>
                      <span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.14em] text-faint/70">
                        {m.lema}
                      </span>
                      <span className="mt-1 block font-mono text-[9px] tabular-nums text-faint">
                        récord {records[m.id]}
                      </span>
                    </button>
                  ))}
                </div>
                {/* V72: la tarde guardada — CONTINUAR donde quedó */}
                {runGuardada && runGuardada.ronda > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      apiRef.current?.empezar(runGuardada.modo, {
                        continuar: runGuardada,
                      })
                    }
                    className="inline-flex items-center gap-3 rounded-full border border-[#7fd4c2]/60 bg-[#7fd4c2]/10 px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#7fd4c2] transition-colors duration-300 hover:bg-[#7fd4c2]/20"
                  >
                    Continuar — ronda {runGuardada.ronda} ·{" "}
                    {runGuardada.puntos} pts
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => apiRef.current?.empezar(modoSel)}
                  className="group inline-flex items-center gap-3 rounded-full border border-copper/70 bg-copper/10 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.3em] text-copper transition-colors duration-300 hover:bg-copper/20"
                >
                  Comenzar
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
                {/* V72: la volada del día + el archivo — la feria con memoria */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      apiRef.current?.empezar(modoSel, { diaria: true })
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/60 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke transition-colors duration-300 hover:border-copper/70 hover:text-copper"
                  >
                    <span aria-hidden>☀</span>
                    Volada del día
                    {sello && (
                      <span className="text-copper">
                        · {sello.puntos} pts
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setArchivoAbierto(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/60 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke transition-colors duration-300 hover:border-copper/70 hover:text-copper"
                  >
                    <span aria-hidden>▦</span>
                    El archivo
                  </button>
                  <button
                    type="button"
                    onClick={() => setAjustesAbierto(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/60 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke transition-colors duration-300 hover:border-copper/70 hover:text-copper"
                  >
                    <span aria-hidden>⚙</span>
                    Ajustes
                  </button>
                </div>
                <SoundBtn
                  on={!stats.muted}
                  onToggle={() => apiRef.current?.snd()}
                />
              </div>
              {/* V72: la medallera — los trofeos de la casa */}
              <div
                className={`mt-5 flex items-center justify-center gap-2 ${entra("[transition-delay:600ms]")}`}
                aria-label="Trofeos ganados"
              >
                {TROFEOS.map((t) => (
                  <span
                    key={t.id}
                    title={`${t.nombre} — ${t.desc}`}
                    className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] ${
                      trofeos[t.id]
                        ? "border-copper/80 bg-copper/20 text-copper"
                        : "border-line/60 text-faint/40"
                    }`}
                  >
                    ✦
                  </span>
                ))}
              </div>
              <p
                className={`mt-6 font-mono text-[9px] uppercase tracking-[0.25em] text-faint/70 ${entra("[transition-delay:640ms]")}`}
              >
                también: M silencio · ESC pausa · la mira vive en tu cursor
              </p>
            </div>
          </div>
        )}

        {/* ── cartel PAUSA — el mundo contiene el aliento (V69) ── */}
        {enPausa && (
          <div
            data-volateria-ui
            className="absolute inset-0 z-[94] grid place-items-center bg-[#0a0908]/60 backdrop-blur-[3px]"
          >
            <div className="mx-6 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-cream/70">
                la feria espera
              </p>
              <h2 className="mt-4 font-sans text-5xl font-semibold leading-[0.92] tracking-tight md:text-7xl">
                <span className="bg-[linear-gradient(180deg,#faf6ec_0%,#f0e9d8_52%,#d6c8a8_100%)] bg-clip-text text-transparent">
                  PAUSA
                </span>
              </h2>
              <p className="mt-3 font-serif text-lg italic text-cream/75">
                ronda {stats.ronda} · {stats.puntos} puntos — el zorro
                también descansa
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => apiRef.current?.pausa()}
                  className="group inline-flex items-center gap-3 rounded-full border border-copper/70 bg-copper/10 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.3em] text-copper transition-colors duration-300 hover:bg-copper/20"
                >
                  Reanudar
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
                <SoundBtn
                  on={!stats.muted}
                  onToggle={() => apiRef.current?.snd()}
                />
              </div>
              <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.25em] text-faint/70">
                ESC o P también reanudan
              </p>
            </div>
          </div>
        )}

        {/* ── cartel FIN — la feria cierra ── */}
        {stats.fase === "fin" && (
          <div
            data-volateria-ui
            className="absolute inset-0 z-[94] grid place-items-center bg-[#0a0908]/50 backdrop-blur-[3px]"
          >
            <div className="mx-6 max-w-xl text-center">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.34em] text-copper">
                Fin de la feria
              </h2>
              <p className="mt-6 font-mono text-6xl font-semibold tabular-nums text-cream md:text-7xl">
                {stats.puntos}
              </p>
              <p className="mt-3 font-serif text-lg italic text-cream/75">
                modo {stats.modo} ·{" "}
                {stats.recordNuevo
                  ? "el zorro no va a olvidar esta tarde — nuevo récord"
                  : `ronda ${stats.ronda} · récord ${stats.record}`}
              </p>
              {stats.recordNuevo && (
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-copper">
                  récord {stats.record} · ronda {stats.ronda}
                </p>
              )}
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => apiRef.current?.empezar(modoSel)}
                  className="group inline-flex items-center gap-3 rounded-full border border-copper/70 bg-copper/10 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.3em] text-copper transition-colors duration-300 hover:bg-copper/20"
                >
                  Reintentar
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
                {/* V72: el texto de la tarde — spoiler-free, al hombro */}
                <button
                  type="button"
                  onClick={() => onCompartir(stats)}
                  className="inline-flex items-center gap-3 rounded-full border border-line bg-ink/60 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-smoke transition-colors duration-300 hover:border-copper/70 hover:text-copper"
                >
                  <span aria-hidden>✉</span>
                  {shareTxt === "" ? "Compartir" : shareTxt}
                </button>
                <SoundBtn
                  on={!stats.muted}
                  onToggle={() => apiRef.current?.snd()}
                />
              </div>
            </div>
          </div>
        )}

        {/* botón de PAUSA a mano mientras se juega — táctil incluido (V69) */}
        {jugando && !enPausa && (
          <div
            data-volateria-ui
            className="absolute right-6 top-4 z-[95]"
          >
            <button
              type="button"
              onClick={() => apiRef.current?.pausa()}
              aria-label="Pausar la partida"
              className="rounded-full border border-line bg-ink/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke backdrop-blur-sm transition-colors duration-300 hover:border-copper/70 hover:text-copper"
            >
              <span aria-hidden className="mr-2 inline-block">
                ○
              </span>
              Pausa
            </button>
          </div>
        )}

        {/* SND a mano siempre — la feria también se disfruta muda */}
        {!jugando && (
          <div
            data-volateria-ui
            className="absolute right-6 top-20 z-[95] md:top-24"
          >
            <SoundBtn
              on={!stats.muted}
              onToggle={() => apiRef.current?.snd()}
            />
          </div>
        )}

        {/* V72: el toast de los trofeos — la feria aplaude bajito */}
        {toast && (
          <div
            data-volateria-ui
            aria-live="polite"
            className="pointer-events-none absolute left-1/2 top-4 z-[97] w-max -translate-x-1/2 rounded-lg border border-copper/60 bg-[#0a0908]/90 px-5 py-2.5 text-center backdrop-blur-sm"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-copper">
              {toast.txt}
            </p>
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
              {toast.sub}
            </p>
          </div>
        )}

        {/* V72: EL ARCHIVO DEL CAZADOR — la memoria de la feria */}
        {archivoAbierto && (
          <div
            data-volateria-ui
            className="absolute inset-0 z-[96] grid place-items-center bg-[#0a0908]/70 backdrop-blur-[3px]"
          >
            <div className="max-h-[86vh] max-w-2xl overflow-y-auto px-6 mx-6">
              <div className="border border-line/80 bg-ink/85 p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-copper">
                    El archivo del cazador
                  </p>
                  <button
                    type="button"
                    onClick={() => setArchivoAbierto(false)}
                    aria-label="Cerrar el archivo"
                    className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke transition-colors duration-300 hover:border-copper/70 hover:text-copper"
                  >
                    cerrar
                  </button>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    ["partidas", String(archivo.partidas)],
                    [
                      "puntería",
                      archivo.tiros > 0
                        ? `${Math.round((archivo.hits / archivo.tiros) * 100)}%`
                        : "—",
                    ],
                    ["al pelo", String(archivo.grazes)],
                    ["coronas", String(archivo.jefes)],
                    ["mejor ronda", String(archivo.mejorRonda)],
                    ["mejor racha", `×${1 + Math.min(3, Math.floor(archivo.mejorRacha / 3))}`],
                    ["máx puntos", String(archivo.maxPuntos)],
                    ["plomo gastado", String(archivo.tiros)],
                  ].map(([k, v]) => (
                    <div key={k} className="border border-line/60 bg-[#0d0c0a] px-3 py-2.5">
                      <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-faint">
                        {k}
                      </p>
                      <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-cream">
                        {v}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.28em] text-faint">
                  El bestiario — lo cazado en toda la historia
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(
                    [
                      "bronce",
                      "zafiro",
                      "dorada",
                      "humo",
                      "acorazado",
                      "real",
                      "espejo",
                      "banda",
                      "mensajero",
                      "senuelo",
                      "cuervo",
                    ] as const
                  ).map((t) => (
                    <span
                      key={t}
                      className={`rounded-sm border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] ${
                        (archivo.especie[t] ?? 0) > 0
                          ? "border-copper/60 text-copper"
                          : "border-line/60 text-faint/50"
                      }`}
                    >
                      {t} {(archivo.especie[t] ?? 0) > 0 ? `×${archivo.especie[t]}` : "·"}
                    </span>
                  ))}
                </div>
                <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.28em] text-faint">
                  Los trofeos de la feria
                </p>
                <div className="mt-2 grid max-h-40 gap-1.5 overflow-y-auto pr-1">
                  {TROFEOS.map((t: Trofeo) => (
                    <div
                      key={t.id}
                      className={`flex items-center justify-between gap-3 border px-3 py-1.5 ${
                        trofeos[t.id]
                          ? "border-copper/50 bg-copper/5"
                          : "border-line/50"
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                          trofeos[t.id] ? "text-copper" : "text-faint/60"
                        }`}
                      >
                        {trofeos[t.id] ? "✦" : "◇"} {t.nombre}
                      </span>
                      <span className="font-mono text-[9px] text-faint/70">
                        {t.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* V73: EL PANEL DEL CAZADOR — la feria se adapta a ti */}
        {ajustesAbierto && (
          <div
            data-volateria-ui
            className="absolute inset-0 z-[96] grid place-items-center bg-[#0a0908]/70 backdrop-blur-[3px]"
          >
            <div className="w-full max-w-md px-6">
              <div className="border border-line/80 bg-ink/85 p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-copper">
                    Ajustes
                  </p>
                  <button
                    type="button"
                    onClick={() => setAjustesAbierto(false)}
                    aria-label="Cerrar los ajustes"
                    className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke transition-colors duration-300 hover:border-copper/70 hover:text-copper"
                  >
                    cerrar
                  </button>
                </div>

                <div className="mt-5 space-y-3.5">
                  {(
                    [
                      ["flash", "Fogonazos", "la luz del cañón y el cielo"],
                      ["miraGrande", "Mira grande", "×1.5 — para ojos cansados"],
                      ["asistencia", "Asistencia", "la mira engancha un poco más"],
                      ["haptics", "Vibración", "en aparatos que la soporten"],
                    ] as const
                  ).map(([k, nombre, desc]) => (
                    <button
                      key={k}
                      type="button"
                      role="switch"
                      aria-checked={ajustes[k]}
                      onClick={() => setAj({ [k]: !ajustes[k] } as Partial<Ajustes>)}
                      className="flex w-full items-center justify-between gap-3 border border-line/70 bg-[#0d0c0a] px-3.5 py-2.5 text-left transition-colors duration-300 hover:border-copper/40"
                    >
                      <span>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-cream/90">
                          {nombre}
                        </span>
                        <span className="mt-0.5 block font-mono text-[9px] text-faint/70">
                          {desc}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={`flex h-5 w-9 shrink-0 items-center rounded-full border px-0.5 transition-colors duration-300 ${
                          ajustes[k]
                            ? "border-copper/70 bg-copper/30"
                            : "border-line bg-transparent"
                        }`}
                      >
                        <span
                          className={`h-3.5 w-3.5 rounded-full transition-all duration-300 ${
                            ajustes[k]
                              ? "translate-x-3.5 bg-copper"
                              : "translate-x-0 bg-faint/50"
                          }`}
                        />
                      </span>
                    </button>
                  ))}

                  {/* el temblor — tres niveles, como en la casa buena */}
                  <div className="border border-line/70 bg-[#0d0c0a] px-3.5 py-2.5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/90">
                      Temblor
                    </p>
                    <div
                      role="radiogroup"
                      aria-label="Intensidad del temblor"
                      className="mt-2 flex gap-2"
                    >
                      {(
                        [
                          [0, "Nada"],
                          [0.5, "Medio"],
                          [1, "Completo"],
                        ] as const
                      ).map(([v, nombre]) => (
                        <button
                          key={nombre}
                          type="button"
                          role="radio"
                          aria-checked={ajustes.shake === v}
                          onClick={() => setAj({ shake: v })}
                          className={`flex-1 rounded-sm border px-2 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                            ajustes.shake === v
                              ? "border-copper/70 bg-copper/15 text-copper"
                              : "border-line/70 text-faint/70 hover:border-copper/40"
                          }`}
                        >
                          {nombre}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* el volumen — el máster de la feria */}
                  <div className="border border-line/70 bg-[#0d0c0a] px-3.5 py-2.5">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/90">
                        Volumen
                      </p>
                      <p className="font-mono text-[10px] tabular-nums text-copper">
                        {Math.round(ajustes.volumen * 100)}%
                      </p>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.02}
                      value={ajustes.volumen}
                      onChange={(e) => setAj({ volumen: Number(e.target.value) })}
                      aria-label="Volumen general"
                      className="mt-2 w-full accent-[#d97a35]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </GameFrame>
  );
}
