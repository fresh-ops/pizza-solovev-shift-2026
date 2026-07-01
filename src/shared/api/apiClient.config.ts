import { client } from "./__generated__/client.gen";
import { catchApiError } from "./apiError.ts";

client.setConfig({
  baseUrl: import.meta.env.VITE_API_URL,
  kyOptions: {
    hooks: {
      afterResponse: [catchApiError],
    },
  },
});

export { client as apiClient };
