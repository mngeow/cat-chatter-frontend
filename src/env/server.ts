import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverEnvs = createEnv({
    server: {
        DATABASE_URL: z.string(),
        AZURE_OPENAI_API_VERSION: z.string().default('2023-05-15'),
        AZURE_OPENAI_ENDPOINT: z.string(),
        AZURE_OPENAI_API_KEY: z.string(),
        AZURE_DEPLOYMENT_NAME: z.string()
    },
    experimental__runtimeEnv: process.env,
    emptyStringAsUndefined: true,
});

export type ServerEnvs = typeof serverEnvs;
