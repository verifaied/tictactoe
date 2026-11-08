/// <reference types="vitest/config" />
import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Node 25+ ships a built-in `localStorage` global. Without a
// --localstorage-file it is undefined, and it shadows the one jsdom
// provides, so every test that touches storage throws. Turn Node's off in
// the test workers. Node 20 has no such flag (and no such global), so it
// is only passed where Node knows it.
const testExecArgv = process.allowedNodeEnvironmentFlags.has(
  "--no-experimental-webstorage",
)
  ? ["--no-experimental-webstorage"]
  : [];

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    poolOptions: {
      forks: { execArgv: testExecArgv },
      threads: { execArgv: testExecArgv },
    },
    coverage: {
      // verifAIed ingests Istanbul's coverage-final.json with original .tsx paths.
      provider: "istanbul",
      reporter: ["text", "json"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/client/**",
        "src/test/**",
        "src/**/*.test.{ts,tsx}",
        "src/main.tsx",
        "src/vite-env.d.ts",
      ],
    },
  },
});
