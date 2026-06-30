import { MantineProvider } from "@mantine/core";

import { CatalogPage } from "./pages/catalog";

function App() {
  return (
    <MantineProvider>
      <CatalogPage />
    </MantineProvider>
  );
}

export default App;
