import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-redux": ["@reduxjs/toolkit", "react-redux"],
          "vendor-ui": ["iconsax-react", "react-hot-toast"],
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
      exclude: ["src/main.jsx", "src/setupTests.js", "src/app/App.jsx", "src/app/providers.jsx", "src/app/ContactTopNav.jsx", "src/features/contacts/hooks/useContacts.js", "src/features/contacts/api/adapters/herokuAdapter.js", "src/features/contacts/components/ContactToolbar.jsx"],
    },
  },
});
