import { SegmentedControl } from "@mantine/core";

import type { Size } from "@/shared/api";

export interface PizzaSizeControlProps {
  value: Size;
  sizes: Size[];
  onChange: (value: Size) => void;
}

export const PizzaSizeControl = ({ value, sizes, onChange }: PizzaSizeControlProps) => {
  return (
    <SegmentedControl
      value={value}
      onChange={onChange}
      data={sizes}
      fullWidth
      withItemsBorders={false}
      radius="xl"
    />
  );
};
