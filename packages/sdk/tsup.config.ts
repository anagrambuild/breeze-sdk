import { defineConfig } from "tsup";

export default defineConfig({
  name : "sdk-breeeze",
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  //splitting: false,
  clean: true,
  //shims: false,
  //outDir: "dist",
  minify: true,
  external: ["react", "react-dom"],
  //target: "esnext",
});
