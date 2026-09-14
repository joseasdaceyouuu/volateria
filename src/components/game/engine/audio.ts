/* VOLATERÍA — audio.ts (V70): la feria tejida a mano (WebAudio,
   cero assets). Extraída del motor; la partitura no cambió ni una
   nota. Lo nuevo de la auditoría:

   - COMPRESOR en el máster — con oleadas gruesas + fanfarria +
     risa del zorro solapados, el clímax ya no clipea.
   - VOLUMEN continuo (setVolumen 0..1) — el slider de la sala
     persiste su gusto; el mudo sigue siendo binario y cortés.
   - CAPA DE MANO CALIENTE (setRacha) — con ×3 entra un bajo que
     pulsa; con ×4 una charles de ruido. La feria se enciende
     contigo y se apaga cuando la racha muere.
   - GRILLOS DE NOCHE (setNoche) — la banda nocturna canta según
     envejece el atardecer (uRound de la casa).

   Reglas sagradas que NO cambian: nunca suena sin gesto del
   usuario y nunca lanza errores. Cada ladrillo es una nota con
   envolvente o una ráfaga de ruido con barrido de filtro. */

export class VolateriaAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private comp: DynamicsCompressorNode | null = null;
  private ruido: AudioBuffer | null = null;
  muted = false;
  volumen = 0.62;

  /* arma el contexto — SIEMPRE dentro de un gesto (COMENZAR/SND) */
  private arma(): boolean {
    if (this.ctx) return true;
    try {
      const w = window as unknown as {
        AudioContext?: typeof AudioContext;
        webkitAudioContext?: typeof AudioContext;
      };
      const AC = w.AudioContext ?? w.webkitAudioContext;
      if (!AC) return false;
      const ctx = new AC();
      const master = ctx.createGain();
      master.gain.value = this.gan();
      /* el compresor — cinturón de seguridad del clímax (V70) */
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -14;
      comp.knee.value = 24;
      comp.ratio.value = 5;
      comp.attack.value = 0.004;
      comp.release.value = 0.22;
      master.connect(comp);
      comp.connect(ctx.destination);
      const len = Math.floor(ctx.sampleRate * 0.5);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      this.ctx = ctx;
      this.master = master;
      this.comp = comp;
      this.ruido = buf;
      return true;
    } catch {
      this.ctx = null;
      return false;
    }
  }

  /* la ganancia del máster según mudo y volumen (V70) */
  private gan(): number {
    return this.muted ? 0 : Math.max(0, Math.min(1, this.volumen));
  }

  /* SND — toggle. Si enciende, arma dentro del gesto. */
  snd(): boolean {
    this.muted = !this.muted;
    if (!this.muted) this.arma();
    if (this.ctx && this.master) {
      try {
        this.master.gain.setTargetAtTime(
          this.gan(),
          this.ctx.currentTime,
          0.03,
        );
      } catch {}
    }
    return this.muted;
  }

  /* V70 — volumen continuo (0..1); la sala lo persiste */
  setVolumen(v: number) {
    this.volumen = Math.max(0, Math.min(1, v));
    if (!this.muted && this.ctx && this.master) {
      try {
        this.master.gain.setTargetAtTime(
          this.volumen,
          this.ctx.currentTime,
          0.05,
        );
      } catch {}
    }
  }
  get volumenActual(): number {
    return this.volumen;
  }

  suspend() {
    try {
      void this.ctx?.suspend();
    } catch {}
  }
  resume() {
    try {
      void this.ctx?.resume();
    } catch {}
  }
  /* V69: cierre limpio — el contexto muere con la sala, sin colgar
     hilos de audio huérfanos tras un desmontaje */
  cerrar() {
    try {
      void this.ctx?.close();
    } catch {}
    this.ctx = null;
    this.master = null;
    this.comp = null;
    this.ruido = null;
    this.bassOsc = null;
    this.bassGain = null;
    this.hatGain = null;
    this.cricketGain = null;
  }

  /* gesto — arma el contexto DENTRO del click del usuario (COMENZAR) */
  gesto() {
    this.arma();
    this.resume();
  }

  /* una nota con envolvente y filtro opcional — el ladrillo base */
  private nota(
    tipo: OscillatorType,
    f0: number,
    f1: number,
    dur: number,
    gan: number,
    t0 = 0,
    filtro?: { tipo: BiquadFilterType; freq: number },
  ) {
    if (!this.ctx || !this.master || this.muted) return;
    try {
      const ctx = this.ctx;
      const T = ctx.currentTime + t0;
      const o = ctx.createOscillator();
      o.type = tipo;
      o.frequency.setValueAtTime(Math.max(20, f0), T);
      if (f1 !== f0) {
        o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), T + dur);
      }
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, T);
      g.gain.exponentialRampToValueAtTime(Math.max(0.0002, gan), T + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, T + dur);
      o.connect(g);
      let tail: AudioNode = g;
      if (filtro) {
        const f = ctx.createBiquadFilter();
        f.type = filtro.tipo;
        f.frequency.value = filtro.freq;
        g.connect(f);
        tail = f;
      }
      tail.connect(this.master);
      o.start(T);
      o.stop(T + dur + 0.06);
    } catch {}
  }

  /* ráfaga de ruido con barrido — disparos, plumas, golpes */
  private rafaga(
    dur: number,
    gan: number,
    f0: number,
    f1: number,
    t0 = 0,
    tipo: BiquadFilterType = "bandpass",
  ) {
    if (!this.ctx || !this.master || !this.ruido || this.muted) return;
    try {
      const ctx = this.ctx;
      const T = ctx.currentTime + t0;
      const src = ctx.createBufferSource();
      src.buffer = this.ruido;
      src.loop = true;
      const f = ctx.createBiquadFilter();
      f.type = tipo;
      f.Q.value = 0.9;
      f.frequency.setValueAtTime(Math.max(40, f0), T);
      f.frequency.exponentialRampToValueAtTime(Math.max(40, f1), T + dur);
      const g = ctx.createGain();
      g.gain.setValueAtTime(gan, T);
      g.gain.exponentialRampToValueAtTime(0.0001, T + dur);
      src.connect(f);
      f.connect(g);
      g.connect(this.master);
      src.start(T);
      src.stop(T + dur + 0.06);
    } catch {}
  }

  /* ── la partitura de la feria ── */
  disparo() {
    this.rafaga(0.15, 0.5, 2100, 180);
    this.nota("sine", 150, 52, 0.12, 0.42);
  }
  clic() {
    this.nota("square", 1900, 1400, 0.03, 0.07);
  }
  recarga() {
    this.nota("square", 1650, 1650, 0.035, 0.08);
    this.nota("square", 1250, 1250, 0.035, 0.08, 0.12);
  }
  quack(suave = false) {
    const g = suave ? 0.05 : 0.13;
    this.nota("sawtooth", 255, 160, 0.09, g, 0, {
      tipo: "lowpass",
      freq: 1150,
    });
    this.nota("sawtooth", 225, 140, 0.08, g * 0.8, 0.1, {
      tipo: "lowpass",
      freq: 1050,
    });
  }
  silbido() {
    this.nota("sine", 1450, 290, 0.72, 0.1);
  }
  golpeTierra() {
    this.nota("sine", 95, 42, 0.14, 0.28);
    this.rafaga(0.05, 0.09, 520, 120, 0, "lowpass");
  }
  plumas() {
    this.rafaga(0.06, 0.08, 3400, 2100, 0, "highpass");
  }
  risa() {
    this.nota("square", 430, 375, 0.09, 0.08);
    this.nota("square", 340, 295, 0.09, 0.08, 0.15);
    this.nota("square", 262, 218, 0.13, 0.08, 0.3);
  }
  ronda() {
    [523, 659, 784, 1047].forEach((f, i) =>
      this.nota("triangle", f, f, 0.1, 0.11, i * 0.095),
    );
  }
  fin() {
    [330, 247, 185].forEach((f, i) =>
      this.nota("triangle", f, f * 0.96, 0.24, 0.11, i * 0.22),
    );
  }
  empieza() {
    this.nota("triangle", 392, 392, 0.08, 0.09);
    this.nota("triangle", 587, 587, 0.13, 0.09, 0.1);
  }
  /* ── V66: la voz nueva de la feria ── */
  tinc() {
    this.nota("square", 1720, 1500, 0.05, 0.09);
    this.nota("sine", 780, 620, 0.09, 0.12, 0.02);
  }
  madera() {
    this.rafaga(0.09, 0.22, 900, 160, 0, "lowpass");
    this.nota("triangle", 210, 120, 0.1, 0.2);
  }
  maderaS() {
    this.nota("triangle", 320, 260, 0.12, 0.05);
    this.nota("triangle", 260, 210, 0.1, 0.045, 0.12);
  }
  caw() {
    this.nota("sawtooth", 640, 300, 0.11, 0.12, 0, {
      tipo: "bandpass",
      freq: 1500,
    });
    this.nota("sawtooth", 560, 240, 0.13, 0.1, 0.13, {
      tipo: "bandpass",
      freq: 1300,
    });
  }
  pop() {
    this.rafaga(0.07, 0.3, 2600, 700);
    this.nota("sine", 520, 180, 0.09, 0.16);
  }
  poder() {
    [660, 880, 1320].forEach((f, i) =>
      this.nota("triangle", f, f, 0.09, 0.1, i * 0.07),
    );
  }
  whoosh() {
    this.rafaga(0.16, 0.1, 500, 2400, 0, "bandpass");
  }
  aviso() {
    this.nota("sine", 880, 980, 0.06, 0.035);
  }
  /* EL PATO REAL baja — rugido grave con doble sierra desafinada */
  jefe() {
    this.nota("sawtooth", 58, 40, 1.1, 0.22, 0, {
      tipo: "lowpass",
      freq: 320,
    });
    this.nota("sawtooth", 63, 44, 1.1, 0.18, 0.02, {
      tipo: "lowpass",
      freq: 300,
    });
    this.rafaga(0.9, 0.14, 90, 320, 0.05, "lowpass");
    this.nota("square", 220, 180, 0.14, 0.09, 0.55);
    this.nota("square", 220, 170, 0.2, 0.09, 0.75);
  }
  /* ¡LA CORONA CAE! — fanfarria de cinco pasos + acorde final */
  corona() {
    const seq = [392, 494, 587, 784, 988];
    seq.forEach((f, i) => this.nota("square", f, f, 0.12, 0.12, i * 0.09));
    this.nota("triangle", 523, 523, 0.5, 0.14, 0.5);
    this.nota("triangle", 659, 659, 0.5, 0.12, 0.5);
    this.nota("triangle", 784, 784, 0.55, 0.12, 0.5);
  }
  /* VOLADA PERFECTA — arpegio mayor limpio, premio del 8/8 */
  perfecta() {
    const seq = [523, 659, 784, 1047];
    seq.forEach((f, i) => this.nota("triangle", f, f, 0.1, 0.12, i * 0.07));
    this.nota("triangle", 1319, 1319, 0.3, 0.1, 0.3);
  }

  /* ── V70: LA CAPA DE MANO CALIENTE — bajo que pulsa con el ×3,
     charles con el ×4. Nodos persistentes creados perezosos; la
     envolvente manda y el silencio nunca clipea. ── */
  private bassOsc: OscillatorNode | null = null;
  private bassGain: GainNode | null = null;
  private hatGain: GainNode | null = null;

  setRacha(mult: number) {
    if (!this.ctx || !this.master) return;
    try {
      const ctx = this.ctx;
      const nivel = mult >= 4 ? 1 : mult >= 3 ? 0.55 : 0;
      if (nivel > 0 && !this.bassGain) {
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.value = 82.41; // E2 — el suelo de la feria
        const am = ctx.createGain();
        am.gain.value = 0.5;
        const lfo = ctx.createOscillator();
        lfo.type = "square";
        lfo.frequency.value = 2.2;
        const lfoG = ctx.createGain();
        lfoG.gain.value = 0.5;
        lfo.connect(lfoG);
        lfoG.connect(am.gain);
        const g = ctx.createGain();
        g.gain.value = 0;
        o.connect(am);
        am.connect(g);
        g.connect(this.master);
        o.start();
        lfo.start();
        this.bassOsc = o;
        this.bassGain = g;
        /* la charles del ×4 — ráfaga de ruido con compuerta rápida */
        if (this.ruido) {
          const src = ctx.createBufferSource();
          src.buffer = this.ruido;
          src.loop = true;
          const hp = ctx.createBiquadFilter();
          hp.type = "highpass";
          hp.frequency.value = 7400;
          const ham = ctx.createGain();
          ham.gain.value = 0.35;
          const hlfo = ctx.createOscillator();
          hlfo.type = "square";
          hlfo.frequency.value = 4.4;
          const hlfoG = ctx.createGain();
          hlfoG.gain.value = 0.35;
          hlfo.connect(hlfoG);
          hlfoG.connect(ham.gain);
          const hg = ctx.createGain();
          hg.gain.value = 0;
          src.connect(hp);
          hp.connect(ham);
          ham.connect(hg);
          hg.connect(this.master);
          src.start();
          hlfo.start();
          this.hatGain = hg;
        }
      }
      const T = ctx.currentTime;
      if (this.bassGain) {
        this.bassGain.gain.setTargetAtTime(nivel * 0.055, T, 0.4);
      }
      if (this.hatGain) {
        this.hatGain.gain.setTargetAtTime(mult >= 4 ? 0.016 : 0, T, 0.4);
      }
    } catch {}
  }

  /* ── V70: GRILLOS DE NOCHE — la banda nocturna según envejece el
     cielo. Ruido estrechísimo con compuerta lenta, muy al fondo. ── */
  private cricketGain: GainNode | null = null;

  setNoche(n: number) {
    if (!this.ctx || !this.master) return;
    try {
      const ctx = this.ctx;
      const noche = Math.max(0, Math.min(1, n));
      if (noche > 0 && !this.cricketGain && this.ruido) {
        const src = ctx.createBufferSource();
        src.buffer = this.ruido;
        src.loop = true;
        const bp = ctx.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.value = 4300;
        bp.Q.value = 14;
        const gate = ctx.createGain();
        gate.gain.value = 0.4;
        const glfo = ctx.createOscillator();
        glfo.type = "square";
        glfo.frequency.value = 3.1;
        const glfoG = ctx.createGain();
        glfoG.gain.value = 0.4;
        glfo.connect(glfoG);
        glfoG.connect(gate.gain);
        const g = ctx.createGain();
        g.gain.value = 0;
        src.connect(bp);
        bp.connect(gate);
        gate.connect(g);
        g.connect(this.master);
        src.start();
        glfo.start();
        this.cricketGain = g;
      }
      if (this.cricketGain) {
        this.cricketGain.gain.setTargetAtTime(
          noche * 0.03,
          ctx.currentTime,
          1.2,
        );
      }
    } catch {}
  }
}
