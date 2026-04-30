import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/linuxmaster-question-bank/",
  plugins: [react()],
});
