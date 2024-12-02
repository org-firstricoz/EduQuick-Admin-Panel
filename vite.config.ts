import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Router
      "@router": path.resolve("./src/Router/Router"),

      // Dashboard
      "@dashboard": path.resolve("./src/Pages/Dashboard"),

      // Not Found
      "@notfound": path.resolve("./src/Pages/Not Found/NotFound"),

      // Leaderboard
      "@leaderboard": path.resolve("./src/Pages/Leaderboard"),

      // Login
      "@login": path.resolve("./src/Pages/Login"),

      // Settings
      "@settings": path.resolve("./src/Pages/Settings"),

      //
      "@creators": path.resolve("./src/Pages/Creators"),

      //
      "@products": path.resolve("./src/Pages/Products"),

      //
      "@verify": path.resolve("./src/Pages/Verify"),

      //
      "@messages": path.resolve("./src/Pages/Messages"),

      //
      "@updateCourse": path.resolve("./src/Pages/updateCourse"),
    },
  },
});
