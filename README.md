## Hono, Cloudflare D1 (SQLite), Drizzle ORM

This is a simple example of using Hono, SQLite, and Drizzle ORM to create a simple API.

### Commands

npx wrangler d1 execute [DATABASE] --remote --file=./src/db/migrations/0000_solid_violations.sql
To execute on your local development database, remove the --remote flag from your wrangler command

### Endpoints

- `GET /posts` - Get all posts

### Database

The database is a D1 database with a few tables.
