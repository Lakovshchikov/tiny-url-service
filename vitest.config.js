import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "#services": path.resolve(__dirname, "src/services/index.ts"),
      "#services/": path.resolve(__dirname, "src/services/"),
      "#utils": path.resolve(__dirname, "src/utils/index.ts"),
      "#utils/": path.resolve(__dirname, "src/utils/"),
      "#lib": path.resolve(__dirname, "src/lib/index.ts"),
      "#lib/": path.resolve(__dirname, "src/lib/"),
      "#models": path.resolve(__dirname, "src/models/index.ts"),
      "#models/": path.resolve(__dirname, "src/models/"),
      "#controllers": path.resolve(__dirname, "src/controllers/index.ts"),
      "#controllers/": path.resolve(__dirname, "src/controllers/"),
      "#middlewares": path.resolve(__dirname, "src/middlewares/index.ts"),
      "#middlewares/": path.resolve(__dirname, "src/middlewares/"),
      "#routes": path.resolve(__dirname, "src/routes/index.ts"),
      "#routes/": path.resolve(__dirname, "src/routes/"),
      "#repositories": path.resolve(__dirname, "src/repositories/index.ts"),
      "#repositories/": path.resolve(__dirname, "src/repositories/"),
    },
  },
});
