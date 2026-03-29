// Telemetry disabled — no data sent to external services.
// Original: @vercel/otel sent traces to Vercel infrastructure.
// Removed for security: agent data must stay internal.

export const register = () => {
  // no-op
};
