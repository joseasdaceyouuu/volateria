/* VOLATERÍA — la tarjeta social de la feria (V72).
   Next genera esta imagen al compilar (estática, sin funciones
   dinámicas): se ve cuando el juego se comparte en redes y chat. */

import { ImageResponse } from "next/og";

export const alt = "VOLATERÍA — el tiro al pato de feria, reimaginado";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0908",
          backgroundImage:
            "linear-gradient(180deg, #0a0908 0%, #150e09 55%, #241408 100%)",
          position: "relative",
        }}
      >
        {/* la banda de brasa en el horizonte */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 210,
            display: "flex",
            backgroundImage:
              "linear-gradient(180deg, rgba(214,120,50,0) 0%, rgba(158,74,26,0.32) 60%, rgba(10,9,8,0.9) 100%)",
          }}
        />
        {/* el sol que se hunde */}
        <div
          style={{
            position: "absolute",
            bottom: 128,
            width: 120,
            height: 120,
            borderRadius: 9999,
            backgroundImage:
              "linear-gradient(180deg, #f6c27a 0%, #d97a35 100%)",
            opacity: 0.9,
          }}
        />
        {/* el rubí de la corona */}
        <div
          style={{
            position: "absolute",
            top: 84,
            width: 12,
            height: 12,
            borderRadius: 9999,
            backgroundColor: "#c2492e",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "rgba(250,246,236,0.75)",
              fontSize: 22,
              letterSpacing: 12,
              marginBottom: 22,
            }}
          >
            EL TIRO AL PATO DE FERIA
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 148,
              fontWeight: 700,
              letterSpacing: -4,
              color: "#faf6ec",
              textShadow: "0 4px 40px rgba(214,120,50,0.35)",
            }}
          >
            VOLATERÍA
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              color: "#e0a35e",
              fontSize: 26,
              letterSpacing: 6,
            }}
          >
            OLEADAS · SEÑUELOS · EL PATO REAL
          </div>
        </div>
      </div>
    ),
    size,
  );
}
