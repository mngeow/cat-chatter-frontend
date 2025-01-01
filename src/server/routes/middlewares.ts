import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'

export const JSONErrorFmt = createMiddleware(async (c, next) => {
    await next();
    if (c.error) {
        const errorResp = c.error instanceof HTTPException 
            ? {
                statusCode: c.error.status,
                errorMessage: c.error.message,
                errorCode: c.error.cause
            }
            : {
                statusCode: 500,
                errorMessage: 'Internal Server Error',
                errorCode: 'InternalServerError'
            };

        c.res = new Response(JSON.stringify(errorResp), {
            status: errorResp.statusCode,
            headers: new Headers({
                'Content-Type': 'application/json',
                ...Object.fromEntries(c.res.headers)
            })
        });
    }
})