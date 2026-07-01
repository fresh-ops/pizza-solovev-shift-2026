import type { AfterResponseHook } from "ky";

import { isApiEnvelope } from "./apiEnvelope";

export class ApiError extends Error {
  public readonly reason: string;
  constructor(message: string, reason: string) {
    super(message);
    this.reason = reason;
    this.name = "ApiError";
  }
}

export const catchApiError: AfterResponseHook = async ({ response }) => {
  const data = await response
    .clone()
    .json()
    .catch(() => null);

  if (isApiEnvelope(data) && !data.success) {
    throw new ApiError(data.reason ?? "Uknown error", data.reason ?? "");
  }

  return response;
};
