/* LAB FX — caja de herramientas visual compartida (V52 "LA SALA VIVA").
   El salto de calidad no está en más lógica: está en LUZ y PROFUNDIDAD.
   - glowSprite: sprites radiales pre-renderizados con caché — el glow
     carísimo de shadowBlur se convierte en drawImage barato. Un sprite
     por familia de color, pintado en modo aditivo ('lighter'): las
     partículas SUMAN luz en vez de taparla. Eso es lo que hace que un
     canvas 2D se sienta cinematográfico.
   - Dust: polvo cósmico con parallax al puntero + deriva lenta —
     la sala deja de ser un plano y gana capas.
   - Seismo: sismógrafo de energía para el HUD vivo — el instrumento
     muestra su propio pulso en tiempo real (buffer circular, costo O(n)).
   - drawReticle: retícula instrumental compartida — anillo de ticks
     rotatorio + cruz; variantes fantasma (dashed) y estirada. */

const cache = new Map<string, HTMLCanvasElement>();

/* sprite radial de glow — `rgb` SIN "rgba()", solo "r,g,b" */
export function glowSprite(rgb: string, hot = false): HTMLCanvasElement {
  const key = `${rgb}|${hot ? 1 : 0}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const S = 64;
  const c = document.createElement("canvas");
  c.width = S;
  c.height = S;
  const g = c.getContext("2d");
  if (g) {
    const grad = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    if (hot) {
      grad.addColorStop(0, "rgba(255,250,238,0.95)");
      grad.addColorStop(0.3, `rgba(${rgb},0.5)`);
      grad.addColorStop(1, `rgba(${rgb},0)`);
    } else {
      grad.addColorStop(0, `rgba(${rgb},0.8)`);
      grad.addColorStop(0.42, `rgba(${rgb},0.25)`);
      grad.addColorStop(1, `rgba(${rgb},0)`);
    }
    g.fillStyle = grad;
    g.fillRect(0, 0, S, S);
  }
  cache.set(key, c);
  return c;
}

/* pintar un sprite centrado en (x,y) con radio r — en modo 'lighter' */
export function drawGlow(
  ctx: CanvasRenderingContext2D,
  spr: HTMLCanvasElement,
  x: number,
  y: number,
  r: number,
) {
  ctx.drawImage(spr, x - r, y - r, r * 2, r * 2);
}

/* ── polvo cósmico con parallax ─────────────────────────────── */

export type Mote = { x: number; y: number; z: number; r: number; tw: number };

export function makeDust(W: number, H: number, n: number): Mote[] {
  return Array.from({ length: n }, () => {
    const z = 0.22 + Math.random() * 0.78;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      z,
      r: z > 0.85 ? 1.7 : z > 0.55 ? 1.2 : 0.9,
      tw: Math.random(),
    };
  });
}

/* ox/oy = desplazamiento de parallax (p.ej. (px-W/2)*0.02); t en ms.
   Deriva vertical lenta + titileo — la sala respira incluso quieta. */
export function drawDust(
  ctx: CanvasRenderingContext2D,
  dust: Mote[],
  W: number,
  H: number,
  ox: number,
  oy: number,
  t: number,
) {
  for (const m of dust) {
    const x = (((m.x + ox * m.z + Math.sin(t * 0.00021 + m.tw * 6.28) * 7) % W) + W) % W;
    const y = (((m.y + oy * m.z + t * 0.0065 * m.z) % H) + H) % H;
    const a = (0.035 + 0.085 * m.z) * (0.55 + 0.45 * Math.sin(t * 0.0011 + m.tw * 6.28));
    ctx.fillStyle = `rgba(237,232,223,${a.toFixed(3)})`;
    ctx.fillRect(x, y, m.r, m.r);
  }
}

/* ── sismógrafo de energía (HUD vivo) ──────────────────────── */

export class Seismo {
  buf: Float32Array;
  head = 0;
  constructor(n = 96) {
    this.buf = new Float32Array(n);
  }
  push(v: number) {
    this.buf[this.head] = v < 0 ? 0 : v > 1 ? 1 : v;
    this.head = (this.head + 1) % this.buf.length;
  }
  draw(ctx: CanvasRenderingContext2D, color = "rgba(201,160,107,0.85)") {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    const n = this.buf.length;
    for (let i = 0; i < n; i++) {
      const v = this.buf[(this.head + i) % n];
      const x = (i / (n - 1)) * w;
      const y = h - 2.5 - v * (h - 6);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.strokeStyle = "rgba(237,232,223,0.13)";
    ctx.beginPath();
    ctx.moveTo(0, h - 1.5);
    ctx.lineTo(w, h - 1.5);
    ctx.stroke();
  }
}

/* ── retícula instrumental ──────────────────────────────────── */

export function drawReticle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  ang: number,
  o: {
    r?: number;
    color?: string;
    ghost?: boolean;
    stretch?: number; // radianes: orienta la cruz (p.ej. hacia la velocidad)
    ticks?: boolean;
  } = {},
) {
  const r = o.r ?? 14;
  ctx.save();
  ctx.strokeStyle = o.color ?? "rgba(201,160,107,0.8)";
  ctx.lineWidth = 1;
  ctx.translate(x, y);
  if (o.stretch) ctx.rotate(o.stretch);
  if (o.ghost) {
    /* el fantasma: círculo punteado, sin cruz */
    ctx.setLineDash([3, 5]);
    ctx.beginPath();
    ctx.arc(0, 0, r - 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  } else {
    ctx.beginPath();
    ctx.moveTo(-r - 7, 0);
    ctx.lineTo(-r * 0.45, 0);
    ctx.moveTo(r * 0.45, 0);
    ctx.lineTo(r + 7, 0);
    ctx.moveTo(0, -r - 7);
    ctx.lineTo(0, -r * 0.45);
    ctx.moveTo(0, r * 0.45);
    ctx.lineTo(0, r + 7);
    ctx.stroke();
    if (o.ticks !== false) {
      ctx.save();
      ctx.rotate(ang);
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.arc(0, 0, r, -0.24, 0.24);
        ctx.stroke();
      }
      ctx.restore();
    }
  }
  ctx.restore();
}
