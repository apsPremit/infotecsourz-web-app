export const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEVELOPMENT_BASE_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;
