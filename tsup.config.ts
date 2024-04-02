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
  target: "es5",
  minify: true,
  shims: true,
  skipNodeModulesBundle: true,
  // cjsInterop: true,
}));
