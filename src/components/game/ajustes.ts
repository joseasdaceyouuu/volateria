/* VOLATERÍA — ajustes.ts (V73): el panel del cazador exigente.
   Accesibilidad y comodidad persistidas: flash, temblor, mira
   grande, asistencia de puntería, volumen y haptics. Todo con
   valores por defecto que no cambian la feria original. */

export const AJUSTES_KEY = "vp-ajustes";

export type Ajustes = {
  flash: boolean; // fogonazos del cielo y del cañón
  shake: 0 | 0.5 | 1; // intensidad del temblor
  miraGrande: boolean; // mira ×1.5 para baja visión
  asistencia: boolean; // imán de puntería suave (GAG: aim assist)
  volumen: number; // 0..1 — el máster de la feria
  haptics: boolean; // vibración en táctil que la soporte
};

export const AJUSTES_DEFECTO: Ajustes = {
  flash: true,
  shake: 1,
  miraGrande: false,
  asistencia: false,
  volumen: 0.62,
  haptics: true,
};

export const leeAjustes = (): Ajustes => {
  try {
    const raw = localStorage.getItem(AJUSTES_KEY);
    if (!raw) return { ...AJUSTES_DEFECTO };
    const p = JSON.parse(raw) as Partial<Ajustes>;
    return { ...AJUSTES_DEFECTO, ...p };
  } catch {
    return { ...AJUSTES_DEFECTO };
  }
};

export const guardaAjustes = (a: Ajustes) => {
  try {
    localStorage.setItem(AJUSTES_KEY, JSON.stringify(a));
  } catch {}
};
