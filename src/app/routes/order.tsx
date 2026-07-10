import { createFileRoute, redirect } from "@tanstack/react-router";

import { OrderPage, zOrderPageSearchParams } from "@/pages/order";

export const Route = createFileRoute("/order")({
  component: OrderPage,
  validateSearch: zOrderPageSearchParams,
  onError: () => {
    throw redirect({
      to: "/cart",
    });
  },
  beforeLoad: ({ search }) => {
    if (!search.step) {
      throw redirect({
        to: "/order",
        search: {
          step: "personal",
        },
      });
    }
  },
});
