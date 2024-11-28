import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig({
    server: {
        open: true,
        port: 3000,
    },
    plugins: [glsl()]
});
