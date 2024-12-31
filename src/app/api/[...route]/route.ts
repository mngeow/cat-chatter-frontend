import { Hono, Context } from "hono";
import { handle } from 'hono/vercel';
import { app as chat_router } from "@/server/routes/chat";
import { openAPISpecs } from 'hono-openapi';
import { swaggerUI } from '@hono/swagger-ui'

const app = new Hono().basePath('/api')

app.route('/chat',chat_router)

app.get(
  '/openapi',
  openAPISpecs(app, {
    documentation: {
      info: { title: 'Hono API', version: '1.0.0', description: 'Greeting API' },
      servers: [{ url: 'http://localhost:3000', description: 'Local Server' }],
    },
  })
);

app.get('docs', swaggerUI({url: '/api/openapi'}));

export const POST = handle(app)
export const GET = handle(app)
export const PUT = handle(app)
export const DEL = handle(app)