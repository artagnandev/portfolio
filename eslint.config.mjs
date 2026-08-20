import next from "eslint-config-next";
import tseslint from "typescript-eslint";

// eslint-config-next 16 já exporta flat config nativo — sem FlatCompat.
const config = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  ...next,
  {
    // O plugin precisa ser declarado no mesmo objeto de config que usa suas regras.
    files: ["**/*.ts", "**/*.tsx"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
];

export default config;
