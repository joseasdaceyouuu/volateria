import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, {
  rules: {
    /* ── Correctividad (error: rompen algo real) ── */
    "@typescript-eslint/no-unused-vars": ["error", {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      caughtErrorsIgnorePattern: "^_",
    }],
    "prefer-const": "error",
    "no-empty": ["error", { allowEmptyCatch: true }],
    "no-redeclare": "error",
    "no-unreachable": "error",
    "no-useless-escape": "error",
    "no-fallthrough": "error",
    "no-case-declarations": "error",
    "no-mixed-spaces-and-tabs": "error",
    "no-irregular-whitespace": "error",
    "no-debugger": "error",
    "no-undef": "off", // TS ya lo cubre; con JS ambiguo genera falsos positivos

    /* ── Higiene (warn: señal sin bloquear el pipeline) ── */
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/purity": "warn",
    "no-console": "warn",
    "react/display-name": "warn",
    "@next/next/no-img-element": "warn",

    /* ── Estilo del proyecto (off: decisiones deliberadas) ── */
    "@typescript-eslint/prefer-as-const": "off",
    "@typescript-eslint/no-unused-disable-directive": "off",
    "react/no-unescaped-entities": "off", // el copy español usa comillas tipográficas
    "react/prop-types": "off", // TS valida props con tipos
    "react-compiler/react-compiler": "off", // patrones canvas/rAF deliberados
  },
}, {
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", "examples/**", "skills", "scripts/**", "download/**", ".screens/**", "mini-services/**"]
}];

export default eslintConfig;
