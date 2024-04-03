import { defineConfig } from "tsup";
import tsconfig from "./tsconfig.json";

export default defineConfig((options) => {
  return {
    entry: ["src/index.ts"],
    dts: true,
    outDir: "dist",
    format: ["esm", "cjs", "iife"],
    name: "tictactoe.js",
    sourcemap: false,
    clean: true,
    target: "es5",
    minify: "terser",
    shims: true,
    skipNodeModulesBundle: true,
    cjsInterop: false,
    platform: "neutral",
    treeshake: true,
    tsconfig: "./tsconfig.json",
  };
});
