import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./openapi.schema.json",
  output: "src/shared/api/__generated__",
  plugins: [
    "@hey-api/typescript",
    "@hey-api/client-ky",
    "@tanstack/react-query",
    "zod",
    {
      name: "@hey-api/sdk",
      validator: true,
    },
  ],
});
