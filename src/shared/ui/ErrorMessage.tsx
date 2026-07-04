import { Text, type TextProps } from "@mantine/core";

import { ApiError } from "../api";

export interface ErrorMessageProps extends TextProps {
  error?: Error;
}

export const ErrorMessage = ({ error, ...props }: ErrorMessageProps) => (
  <Text {...props}>
    {error && error instanceof ApiError ? `Ошибка: ${error.reason}` : "Упс... Что-то пошло не так"}
  </Text>
);
