import { ActionIcon, Group, Image, Paper, Title } from "@mantine/core";
import { BasketIcon } from "@phosphor-icons/react";
import { useFavicon } from "@siberiacancode/reactuse";
import { useNavigate } from "@tanstack/react-router";

export const Header = () => {
  const favicon = useFavicon();
  const navigate = useNavigate();
  return (
    <Paper radius="xl" shadow="md" style={{ position: "sticky", top: 0, zIndex: 100 }}>
      <Group px="md" py="sm" align="center" justify="space-between">
        <Group onClick={() => navigate({ to: "/" })} gap="0">
          <Image w="auto" h="1.5rem" src={favicon.href} style={{ verticalAlign: "baseline" }} />
          <Title order={1} size="h3">
            pizza
          </Title>
        </Group>
        <Group>
          <ActionIcon
            onClick={() => navigate({ to: "/cart" })}
            radius="lg"
            size="lg"
            variant="light"
            color="gray"
          >
            <BasketIcon />
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  );
};
