"use client";

/* VOLATERÍA — marco del juego (standalone).
   Extraído del LabFrame del portfolio (Ola 1, V49 · V52 viva) para la
   versión independiente: el juego ES el documento completo, así que no
   hay salida de emergencia ni numeración de serie — queda lo esencial:

   - bloqueo de scroll
   - esquinas de registro tipo instrumental
   - VIÑETA cinematográfica CSS (costo cero en canvas): oscurece los
     bordes, centra la mirada, hace que el glow aditivo se sienta
     proyectado en una sala oscura
   - SoundBtn: el botón SND — el audio siempre es opt-in
   El canvas y el HUD los aporta la sala como children. */

type Corner = "tl" | "tr" | "bl" | "br";

const CORNER_POS: Record<Corner, string> = {
  tl: "left-3 top-3",
  tr: "right-3 top-3",
  bl: "left-3 bottom-3",
  br: "right-3 bottom-3",
};

function CornerTick({ at }: { at: Corner }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-[96] h-3 w-3 ${CORNER_POS[at]}`}
    >
      <span className="absolute left-0 top-0 h-px w-full bg-copper/40" />
      <span className="absolute left-0 top-0 h-full w-px bg-copper/40" />
    </span>
  );
}

/* botón SND — arma el motor de audio dentro del gesto */
export function SoundBtn({
  on,
  onToggle,
}: {
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm transition-colors duration-300 ${
        on
          ? "border-copper/70 bg-copper/10 text-copper"
          : "border-line bg-ink/60 text-smoke hover:border-copper/70 hover:text-copper"
      }`}
    >
      <span aria-hidden className="mr-2 inline-block">
        {on ? "◉" : "○"}
      </span>
      Sonido
    </button>
  );
}

export function GameFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[90] bg-[#0a0908] text-cream">
      {/* las esquinas hablan el idioma del instrumento, no de la web */}
      <CornerTick at="tl" />
      <CornerTick at="tr" />
      <CornerTick at="bl" />
      <CornerTick at="br" />

      {children}

      {/* viñeta — la sala oscura donde se proyecta la luz de las cámaras */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[92]"
        style={{
          background:
            "radial-gradient(ellipse 72% 62% at 50% 46%, transparent 52%, rgba(10,9,8,0.42) 82%, rgba(10,9,8,0.72) 100%)",
        }}
      />

      {/* firma — esquina inferior derecha */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-5 right-6 z-[96] font-mono text-[10px] uppercase tracking-[0.3em] text-faint/70"
      >
        VOLATERÍA — la feria
      </span>
    </div>
  );
}
