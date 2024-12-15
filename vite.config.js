import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  server: {
    port: 3000,
    open: true,
    cors: "*",
    hmr: {
      port: 3000,
      overlay: true,
    },
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/js/components"),
      "@utils": resolve(__dirname, "./src/js/utils"),
      "@global": resolve(__dirname, "./src/js/global"),
      "@pages": resolve(__dirname, "./src/js/pages"),
    },
  },

  build: {
    // Generate sourcemaps for easier debugging
    sourcemap: process.env.NODE_ENV !== "production",

    // Minify the output
    minify: "true",

    // Configure Rollup
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
      },
      output: {
        // Generate a single file for Webflow
        entryFileNames: "index.js",

        // Use IIFE format for direct browser usage
        format: "iife",

        // Minimize the output
        compact: true,

        // Clean up the output
        sanitizeFileName: true,

        // Asset handling
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name][extname]`;
          }
          return `assets/[name][extname]`;
        },

        // Chunk handling
        chunkFileNames: "js/[name]-[hash].js",

        // Global variable name for IIFE
        name: "WebflowApp",

        // Ensure modules are bundled in correct order
        manualChunks: undefined,
      },
    },

    // Output directory (relative to root)
    outDir: "dist",

    // Clean the output directory before build
    emptyOutDir: true,

    // Customize the base public path
    base: "./",

    // Target modern browsers
    target: "es2015",

    // Bundle size warnings
    chunkSizeWarningLimit: 500,

    // CSS handling
    cssCodeSplit: false,

    // Asset handling
    assetsDir: "assets",

    // Write manifest file
    manifest: true,
  },

  // Optimize deps
  optimizeDeps: {
    include: [],
    exclude: [],
  },

  // CSS handling
  css: {
    devSourcemap: true,
    modules: {
      scopeBehavior: "local",
      localsConvention: "camelCase",
    },
  },

  // Enable JSON imports
  json: {
    stringify: true,
  },

  // Preview configuration
  preview: {
    port: 3000,
    open: true,
  },
});

// Vite Old Config
// import { defineConfig } from "vite";

// export default defineConfig({
//   root: "src",
//   server: {
//     cors: "*",
//     hmr: {},
//   },
//   build: {
//     minify: "true",
//     rollupOptions: {
//       output: {
//         // Generate a single file for Webflow
//         entryFileNames: "index.js",
//         format: "iife",
//         // Minimize the output
//         compact: true,
//       },
//     },
//     outDir: "dist",
//     emptyOutDir: true,
//   },
// });
