"use client";

/* VISTA CLIENTE — la feria viaja en su propio chunk (ssr:false +
   dynamic, lección del lab): el documento nunca descarga el motor
   hasta que hace falta, y mientras viaja muestra el boot de cobre. */

import dynamic from "next/dynamic";

function Boot() {
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-[#0a0908] text-cream">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-smoke">
        <span className="pulse-copper inline-block h-1.5 w-1.5 rounded-full bg-copper" />
        Abriendo la volatería
        <span className="tw-caret" aria-hidden />
      </div>
    </div>
  );
}

const VolateriaGame = dynamic(
  () => import("@/components/game/volateria"),
  { ssr: false, loading: () => <Boot /> },
);

export default function VolateriaView() {
  return <VolateriaGame />;
}
