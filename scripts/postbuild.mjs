/* Copia post-build para output: standalone — `next start` no sirve los
   assets estáticos del bundle standalone; hay que llevarlos a mano
   (public/ es opcional: la feria viaja sin assets). */
import fs from "node:fs";

fs.cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
if (fs.existsSync("public")) {
  fs.cpSync("public", ".next/standalone/public", { recursive: true });
}
console.log("[postbuild] static/ copiado al standalone");

/* V83: el CACHE_NAME del service worker lleva la versión del
   paquete — shell nuevo, caché nueva, sin editarse a mano. El
   fuente del repo queda como plantilla (volateria-v1); solo el
   standalone viaja con su sello. */
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const swPath = ".next/standalone/public/sw.js";
if (fs.existsSync(swPath)) {
  const sw = fs.readFileSync(swPath, "utf8");
  const swNuevo = sw.replace(
    'CACHE_NAME = "volateria-v1"',
    `CACHE_NAME = "volateria-v${pkg.version}"`,
  );
  if (swNuevo !== sw) {
    fs.writeFileSync(swPath, swNuevo);
    console.log(`[postbuild] sw.js → caché volateria-v${pkg.version}`);
  } else {
    console.warn("[postbuild] sw.js sin el sello esperado — CACHE_NAME sin tocar");
  }
}
