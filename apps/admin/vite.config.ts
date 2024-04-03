import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  cacheDir: "./.vite",
  resolve: {
    alias: {
      "@apis": resolve(__dirname, "src/apis"),
      "@assets": resolve(__dirname, "src/assets"),
      "@components": resolve(__dirname, "src/components"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@pages": resolve(__dirname, "src/pages"),
      "@styles": resolve(__dirname, "src/styles"),
      "@utils": resolve(__dirname, "src/utils"),
      "@themes": resolve(__dirname, "src/themes"),
      "@stores": resolve(__dirname, "src/stores"),
      "@constants": resolve(__dirname, "src/constants"),
      "@": resolve(__dirname, "src"),
    },
  },
});
