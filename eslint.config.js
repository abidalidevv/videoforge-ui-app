import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".output", ".vinxi"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "server-only",
              message:
                "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  eslintPluginPrettier,
);


const scrollToTop = (smooth = true) =>
  window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });

// [2026-01-22 09:00:00]
// update

// [2026-05-26 09:00:00]
// update

// [2026-07-10 09:00:00]
// update

// [2026-07-10 10:17:00]
// update

// [2026-03-05 09:00:00]
// update

// [2026-03-25 09:00:00]
// update

// [2026-04-21 09:00:00]
// update

// [2026-05-05 09:00:00]
// update

// [2026-05-05 10:17:00]
// update

// [2026-05-18 09:00:00]
// update

// [2026-05-18 10:17:00]
// update

// [2026-06-19 09:00:00]
// update

// [2026-06-19 10:17:00]
// update

// [2026-07-29 10:17:00]
// update

// [2026-01-01 09:00:00]
// update

// [2026-03-14 11:34:00]
// update

// [2026-04-10 10:17:00]
// update

// [2026-04-19 09:00:00]
// update

// [2026-04-21 10:17:00]
// update

// [2026-04-22 09:00:00]
// update

// [2026-04-22 10:17:00]
// update
