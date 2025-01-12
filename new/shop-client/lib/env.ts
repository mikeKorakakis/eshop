import z from 'zod';

const envVariables = z.object({
  SITE_NAME: z.string(),
  NEXT_PUBLIC_DOMAIN: z.string(),
  NEXT_PUBLIC_API_URL: z.string(),
  NEXT_PUBLIC_FRONTEND_URL: z.string(),
});

export const ENV_VARIABLES_SCHEMA = envVariables;