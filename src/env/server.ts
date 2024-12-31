import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverEnvs = createEnv({
    server: {
        DATABASE_URL: z.string(),
    },
    experimental__runtimeEnv: process.env,
    emptyStringAsUndefined: true,
});

export type ServerEnvs = typeof serverEnvs;
