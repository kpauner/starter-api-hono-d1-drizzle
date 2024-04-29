import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { posts } from './db/schema';

const app = new Hono<{ Bindings: Env }>();

app.use('*', prettyJSON());

app.get('/posts', async (c) => {
	const db = drizzle(c.env.DB);
	const result = await db.select().from(posts).all();
	return c.json(result);
});

app.get('/example', (c) => {
	return c.json({
		data: {
			id: 1,
			name: 'Hono Example',
			description: 'This is an example using prettyJSON middleware.',
		},
	});
});

export type Env = {
	DB: D1Database;
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
};

// export default {
// 	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
// 		return new Response('Hello World!');
// 	},
// };

export default app;
