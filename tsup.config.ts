import type { Options } from "tsup";

const config: Options = {
  entry: ["src/index.ts"],
  dts: true,
  sourcemap: true,
  clean: true,
  format: ["esm", "iife", "cjs"],
};

export default config;
