import { defineConfig } from "tsup";
import tsconfig from "./tsconfig.json";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  dts: true,
  outDir: "dist",
  format: ["esm", "cjs"],
  name: "tictactoe.js",
  sourcemap: false,
  clean: true,
  target: tsconfig.compilerOptions.target as "es2016",
  minify: true,
  shims: true,
  skipNodeModulesBundle: true,
}));
