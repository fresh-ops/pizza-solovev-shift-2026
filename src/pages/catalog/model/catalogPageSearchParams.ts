import { z } from "zod";

import { zOrderedPizza } from "@/shared/api";

export const zCatalogPageSearchParams = zOrderedPizza.partial();

export type CatalogPageSearchParams = z.infer<typeof zCatalogPageSearchParams>;
