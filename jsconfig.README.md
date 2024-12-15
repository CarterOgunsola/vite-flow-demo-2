# `jsconfig.json`

This file configures the JavaScript language features and module resolution settings for the project. It is especially useful for IDEs like VSCode to provide better tooling, such as intelligent autocomplete, import path aliasing, and module resolution.

## Purpose of `jsconfig.json`

The `jsconfig.json` file helps:

1. Enable modern JavaScript features (ES2020).
2. Simplify module imports with aliases.
3. Define the scope of the project for improved IDE performance.
4. Ensure compatibility with Node.js-style module resolution.

---

## Configuration Details

### 1. **`compilerOptions`**

Defines how the JavaScript language features are interpreted by the editor and the build system.

- **`moduleResolution: "node"`**

  - Enables Node.js-style module resolution, aligning with modern tools like Vite and Webpack.
  - Ensures modules can be imported from `node_modules` or local paths.

- **`target: "ES2020"`**

  - Specifies ECMAScript 2020 as the target version for the project.
  - Enables modern JavaScript features like optional chaining (`?.`), nullish coalescing (`??`), and dynamic imports.

- **`module: "ES2020"`**

  - Specifies ES modules as the format for imports and exports.

- **`baseUrl: "src"`**

  - Sets the base directory for resolving non-relative imports.
  - All paths are resolved relative to the `src` folder.

- **`paths`**
  - Defines path aliases for cleaner and more readable imports.
  - **`"@/*": ["*"]`** maps `@/` to the `src/` folder.
    - Example:
      ```javascript
      import utils from "@/js/utils";
      // Resolves to src/js/utils
      ```

### 2. **`include`**

Specifies which files to include in the project for language features and tooling.

- **`"src/**/\*"`\*\*
  - Includes all files within the `src` directory and its subdirectories.
  - Ensures focus on the core source files while ignoring unnecessary folders.

---

## Benefits for This Project

1. **Improved Module Resolution**:

   - The `node` module resolution aligns with your build system (Vite).
   - Import paths are resolved cleanly from the `src` folder.

2. **Cleaner Imports with Aliases**:

   - Avoids long, nested relative paths (`../../utils/index.js`).
   - Example refactor:

     ```javascript
     // Current:
     import { queryElement } from "../utils/index.js";

     // Using alias:
     import { queryElement } from "@/js/utils";
     ```

3. **Modern JavaScript Support**:

   - Enables use of ES2020 features, simplifying code syntax and functionality.
   - Example:
     ```javascript
     const user = data?.user ?? "Guest"; // Optional chaining and nullish coalescing
     ```

4. **Editor IntelliSense and Autocomplete**:
   - Helps IDEs like VSCode provide better code navigation, refactoring, and suggestions.
   - Makes the development experience smoother for a modular project like yours.

---

## Example Usage

### Before:

```javascript
import { fetchData } from "../../utils/api.js";
```

### After:

```javascript
import { fetchData } from "@/js/utils/api";
```

---

## How to Set Up in Your Project

1. Create the `jsconfig.json` file in the project root:

   ```json
   {
     "compilerOptions": {
       "moduleResolution": "node",
       "target": "ES2020",
       "module": "ES2020",
       "baseUrl": "src",
       "paths": {
         "@/*": ["*"]
       }
     },
     "include": ["src/**/*"]
   }
   ```

2. Refactor your imports to use the `@/` alias where appropriate.

3. Restart your editor (VSCode or others) to apply the changes.

---

## Notes

- This configuration works seamlessly with most modern JavaScript build tools, including Vite, Webpack, and Rollup.
- If your project evolves to use TypeScript, you can replace `jsconfig.json` with `tsconfig.json` using the same structure.

---
