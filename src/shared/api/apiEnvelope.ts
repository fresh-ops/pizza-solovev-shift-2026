export interface ApiEnvelope {
  success: boolean;
  reason?: string;
}

export function isApiEnvelope(input: unknown): input is ApiEnvelope {
  return (
    typeof input === "object" &&
    input !== null &&
    "success" in input &&
    typeof input.success === "boolean"
  );
}
