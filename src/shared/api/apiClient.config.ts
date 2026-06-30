import { client } from "./__generated__/client.gen";

client.setConfig({
  baseUrl: import.meta.env.VITE_API_URL,
});

export { client as apiClient };
