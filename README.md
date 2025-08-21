# URL Shortener
A scalable URL shortener with analytics built with Node.js, Supabase, and Redis.

## Setup
1. Install Node.js, Docker, Redis.
2. Set up Supabase and add `.env` with SUPABASE_URL, SUPABASE_KEY, REDIS_URL.
3. Run `npm install` and `node src/index.js`.

## Endpoints
- POST /shorten: Create short URL.
- GET /:shortCode: Redirect to long URL.
- GET /analytics/:shortCode: Get click count.