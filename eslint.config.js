import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: { react: reactPlugin },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // keep the existing no-unused-vars rule but allow PascalCase/constants to be ignored
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      // mark variables used in JSX (including lowercase namespace usage like <motion.div />) as used
      "react/jsx-uses-vars": "error",
    },
  },
]);
