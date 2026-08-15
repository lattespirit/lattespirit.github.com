import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  pluginReact.configs.flat.recommended,
  {
    // react-three/fiber uses lowercase Three.js props (position, geometry, ...)
    // that the generic JSX rule doesn't recognize.
    files: ["src/components/Car.js"],
    rules: { "react/no-unknown-property": "off" },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/prop-types": "off",
    },
  },
]);
