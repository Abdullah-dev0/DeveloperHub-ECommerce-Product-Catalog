import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3001", // URL of your backend server
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""), // Optionally remove /api prefix
			},
		},
	},
	build: {
		outDir: "build",
	},
	plugins: [react()],
});
