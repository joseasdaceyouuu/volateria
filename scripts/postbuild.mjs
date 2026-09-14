/* Copia post-build para output: standalone — `next start` no sirve los
   assets estáticos del bundle standalone; hay que llevarlos a mano
   (public/ es opcional: la feria viaja sin assets). */
import fs from "node:fs";

fs.cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
if (fs.existsSync("public")) {
  fs.cpSync("public", ".next/standalone/public", { recursive: true });
}
console.log("[postbuild] static/ copiado al standalone");
