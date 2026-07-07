import { Container, Stack } from "@mantine/core";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { ErrorMessage } from "@/shared/ui";
import { Header } from "@/widgets/header";

const RootLayout = () => (
  <>
    <Container my="lg">
      <Stack gap="lg">
        <Header />
        <Outlet />
      </Stack>
    </Container>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({
  component: RootLayout,
  errorComponent: ErrorMessage,
});
