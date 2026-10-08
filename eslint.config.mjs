import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import playwright from "eslint-plugin-playwright";
import tseslint from "typescript-eslint";

export default defineConfig(
    {
        ignores: [
            "node_modules/**",
            "allure-results/**",
            "allure-report/**",
            "playwright-report/**",
            "test-results/**",
        ],
    },
    {
        files: ["**/*.ts"],
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
    },
    {
        files: ["testAssets/tests/**/*.ts"],
        plugins: { playwright },
        rules: {
            "playwright/no-focused-test": "error",
        },
    },
);