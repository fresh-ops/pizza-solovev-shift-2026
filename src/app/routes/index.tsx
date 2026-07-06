import { createFileRoute } from "@tanstack/react-router";

import { CatalogPage } from "@/pages/catalog";

export const Route = createFileRoute("/")({
  component: CatalogPage,
});
