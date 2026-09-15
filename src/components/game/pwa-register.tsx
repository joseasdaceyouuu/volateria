"use client";

import { useEffect } from "react";

/* VOLATERÍA — registro del service worker (V70-b).
   Componente cliente sin props que no pinta nada: solo despierta al
   acomodador de caché ("/sw.js") cuando el juego corre en producción
   (cableado en src/app/layout.tsx desde V73).
   En desarrollo no hace nada — la feria no necesita doble fila. */
export default function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    try {
      // Silencio de feria: si el SW no arranca, el juego sigue igual.
      void navigator.serviceWorker.register("/sw.js").catch(() => {});
    } catch {
      // Navegadores raros o contexto no seguro: aplausos corteses y fuera.
    }
  }, []);

  return null;
}
