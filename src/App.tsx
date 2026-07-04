import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { CatalogPage } from "@/pages/catalog";
import { queryClient } from "@/shared/api";

const App = () => (
  <MantineProvider defaultColorScheme="auto">
    <ColorSchemeScript defaultColorScheme="auto" />
    <QueryClientProvider client={queryClient}>
      <CatalogPage />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </MantineProvider>
);

export default App;
