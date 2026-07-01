import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { CatalogPage } from "@/pages/catalog";
import { queryClient } from "@/shared/api";

function App() {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <CatalogPage />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
