import type { Metadata } from "next";
import VolateriaView from "@/components/game/view";

/* VOLATERÍA — la feria completa en la raíz del dominio. */

export const metadata: Metadata = {
  title: "VOLATERÍA — el tiro al pato de feria, reimaginado",
};

export default function Home() {
  return <VolateriaView />;
}
