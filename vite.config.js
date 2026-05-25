import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "vendor-react";
          }
          if (id.includes("node_modules/@reduxjs") || id.includes("node_modules/react-redux")) {
            return "vendor-redux";
          }
          if (id.includes("node_modules/iconsax-react") || id.includes("node_modules/react-hot-toast")) {
            return "vendor-ui";
          }
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{js,jsx}"],
      exclude: ["src/main.jsx", "src/setupTests.js", "src/app/App.jsx", "src/app/providers.jsx", "src/app/ContactTopNav.jsx", "src/features/contacts/hooks/useContacts.js", "src/features/contacts/components/ContactToolbar.jsx"],
    },
  },
});
