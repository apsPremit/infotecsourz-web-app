const mode = process.env.NODE_ENV;
const config = {
  api_base_url:
    mode === 'development'
      ? process.env.NEXT_PUBLIC_DEVELOPMENT_BASE_URL
      : process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL,
  access_token_secret: process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET,
  next_auth_secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET,
  tutorial_link: process.env.TUTORIAL_LINK,
  paypal_client_id:
    mode === 'development'
      ? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_DEVELOPMENT
      : process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  tax_rate: parseFloat(process.env.NEXT_PUBLIC_TAX_RATE),
};
export default config;
