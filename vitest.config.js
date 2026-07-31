import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Dedicated Vitest config. The main vite.config.js also loads the Rolldown
// babel plugin (react-compiler), which is unnecessary and slower for tests.
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
    css: false,
    env: {
      VITE_EMAIL: "admin@admin.com",
      VITE_PASSWORD: "123456Ab@",
      VITE_SERVICIO: "https://api.example.com/tareas",
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/main.tsx",
        "src/**/*.d.ts",
        "src/interfaces/**",
        "src/test/**",
        "src/**/*.test.{ts,tsx}",
      ],
    },
  },
});
