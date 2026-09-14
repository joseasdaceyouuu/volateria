/* VOLATERÍA — cielo.ts (V70): el atardecer GL, extraído del motor.
   Shaders GLSL ES 3.00 (WebGL2, como la casa) + la fábrica que
   compila y localiza uniformes. El contexto GL puede morir
   (webglcontextlost) y RESUCITAR (webglcontextrestored): cada
   resurrección llama armaCielo de nuevo — es pura y sin estado. */

export const QUAD_VERT = `#version 300 es
precision highp float;
out vec2 vUv;
void main(){
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

/* EL CIELO DE FERIA — atardecer que envejece a noche con las rondas.
   uRound 0 = ronda 1 (brasa) → 1 = la noche de los veteranos. */
export const SKY_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform float uTime;
uniform vec2 uRes;
uniform float uRound;   // 0 atardecer → 1 noche
uniform float uFlash;   // fogonazo del disparo
uniform float uLow;     // 1 = aparato justo (menos capas)

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { v += a * noise(p); p *= 2.13; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = vUv;           // 0 = horizonte · 1 = cenit
  float t = uTime;

  /* base: tinta arriba, brasa baja — la noche se lo come */
  vec3 cenit = mix(vec3(0.040, 0.034, 0.030), vec3(0.014, 0.013, 0.022), uRound);
  vec3 base  = mix(vec3(0.105, 0.066, 0.044), vec3(0.048, 0.032, 0.036), uRound);
  vec3 col = mix(base, cenit, smoothstep(0.08, 0.88, uv.y));

  /* banda de resplandor cobre en el horizonte */
  float banda = exp(-abs(uv.y - 0.235) * 7.5);
  col += vec3(0.52, 0.27, 0.11) * banda * (0.52 - 0.36 * uRound);

  /* el sol se hunde — disco suave + halo ancho */
  vec2 sun = vec2(0.50, 0.225 + uRound * 0.09);
  float ds = length((uv - sun) * vec2(uRes.x / max(1.0, uRes.y), 1.0));
  float sol = smoothstep(0.048, 0.026, ds) * 0.85 + exp(-ds * 9.5) * 0.40;
  col += vec3(0.96, 0.60, 0.28) * sol * (1.0 - 0.78 * uRound);

  /* estrellas — despiertan con la noche */
  if (uv.y > 0.40 && uLow < 0.5) {
    vec2 g = floor(uv * uRes / 3.0);
    float h = hash(g);
    if (h > 0.9962) {
      float tw = 0.5 + 0.5 * sin(t * (1.2 + h * 5.0) + h * 47.0);
      col += vec3(0.92, 0.89, 0.80) * tw
           * smoothstep(0.40, 0.72, uv.y) * (0.26 + 0.74 * uRound);
    }
  }

  /* nubes — dos capas de fbm que derivan con el viento */
  float velo = smoothstep(0.04, 0.5, uv.y);
  float c1 = fbm(uv * vec2(2.7, 5.4) + vec2(t * 0.011, 0.0));
  float m1 = smoothstep(0.52, 0.80, c1) * velo;
  col = mix(col, vec3(0.30, 0.19, 0.12) * (1.0 - 0.42 * uRound), m1 * 0.50);
  if (uLow < 0.5) {
    float c2 = fbm(uv * vec2(1.6, 3.3) + vec2(t * 0.006, 0.0) + 7.3);
    float m2 = smoothstep(0.58, 0.84, c2) * velo;
    col = mix(col, vec3(0.185, 0.120, 0.085) * (1.0 - 0.38 * uRound), m2 * 0.42);
  }

  /* crestas de silueta — dos montañas de perfil */
  float lejos = 0.185 + sin(uv.x * 4.1 + 1.3) * 0.021 + sin(uv.x * 9.7 + 0.4) * 0.010;
  float cerca = 0.145 + sin(uv.x * 6.3 + 4.2) * 0.016 + sin(uv.x * 13.1 + 2.1) * 0.008;
  if (uv.y < cerca)      col = vec3(0.028, 0.022, 0.018) * (1.0 - 0.30 * uRound);
  else if (uv.y < lejos) col = vec3(0.050, 0.038, 0.029) * (1.0 - 0.30 * uRound);

  /* el fogonazo — la feria respira con cada disparo */
  col += vec3(1.0, 0.80, 0.55) * uFlash * 0.17;

  outColor = vec4(col, 1.0);
}`;

export type CieloUniformes = Record<string, WebGLUniformLocation | null>;

/* compila el programa del cielo; null si el aparato no puede */
export function armaCielo(
  gl: WebGL2RenderingContext,
): { prog: WebGLProgram; u: CieloUniformes } | null {
  const mkShader = (type: number, src: string) => {
    const sh = gl.createShader(type) as WebGLShader;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(sh) ?? "shader");
    }
    return sh;
  };
  try {
    const prog = gl.createProgram() as WebGLProgram;
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, QUAD_VERT));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, SKY_FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error("link cielo");
    }
    gl.useProgram(prog);
    const u: CieloUniformes = {
      time: gl.getUniformLocation(prog, "uTime"),
      res: gl.getUniformLocation(prog, "uRes"),
      round: gl.getUniformLocation(prog, "uRound"),
      flash: gl.getUniformLocation(prog, "uFlash"),
      low: gl.getUniformLocation(prog, "uLow"),
    };
    return { prog, u };
  } catch {
    return null;
  }
}
