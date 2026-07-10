import { Title } from "@mantine/core";
import { getRouteApi } from "@tanstack/react-router";

export const OrderPage = () => {
  const searchParams = getRouteApi("/order").useSearch();
  const step = searchParams.step ?? "personal";

  return <Title>Current step: {step}</Title>;
};
