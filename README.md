# URL Shortener

A full-stack URL shortener application with a React-based frontend and a Node.js backend.

## Deployed URLs

- **Frontend:** [https://frontend-krn0.onrender.com](https://frontend-krn0.onrender.com)
- **Backend:** [https://backend-oxo4.onrender.com](https://backend-oxo4.onrender.com)

## Project Description

This is a simple yet powerful URL shortener service. It allows users to shorten long URLs into a more manageable and shareable format. The service also tracks the number of clicks for each shortened URL, providing basic analytics.

## Features

- **Shorten URLs:** Convert long URLs into short, unique codes.
- **URL Redirection:** Shortened URLs redirect to the original long URL.
- **Click Tracking:** Counts the number of times a shortened URL is visited.
- **List All URLs:** View a list of all shortened URLs with their click counts.
- **Dockerized:** The entire application is containerized for easy setup and deployment.

## Tech Stack

- **Frontend:**
  - React (Next.js)
  - TypeScript
  - Tailwind CSS
- **Backend:**
  - Node.js
  - Express.js
- **Database:**
  - Supabase (PostgreSQL)
  - Redis (for caching)

## Getting Started (Local Setup)

To run this project locally, you will need to have Docker and Docker Compose installed.

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd url-shortener
   ```

2. **Create a `.env` file** in the root directory and add the following environment variables:
   ```
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_KEY=<your-supabase-key>
   REDIS_URL=redis://redis:6379
   PORT=3000
   ```

3. **Run the application using Docker Compose:**
   ```bash
   docker-compose up --build
   ```

   This will start the frontend and backend services, along with a Redis container.

   - Frontend will be available at [http://localhost:3001](http://localhost:3001)
   - Backend will be available at [http://localhost:3000](http://localhost:3000)

## Environment Variables

- `SUPABASE_URL`: The URL of your Supabase project.
- `SUPABASE_KEY`: The publishable API key for your Supabase project.
- `REDIS_URL`: The connection URL for your Redis instance.
- `PORT`: The port for the backend server to run on.

## API Endpoints

- `GET /urls`: Get all shortened URLs with their analytics.
- `POST /shorten`: Shorten a new URL.
  - **Body:** `{ "longUrl": "<your-long-url>" }`
- `GET /:shortCode`: Redirect to the original long URL.
- `GET /analytics/:shortCode`: Get the click count for a specific shortened URL.

## Deployment

This project is configured for deployment on Render. The `render.yaml` file defines the services for the frontend, backend, and Redis.

To deploy this project on Render:

1. Fork this repository to your GitHub account.
2. Create a new "Blueprint" on Render and select your forked repository.
3. Render will automatically detect the `render.yaml` file and create the services.
4. You will need to add the `SUPABASE_URL` and `SUPABASE_KEY` environment variables to the backend service on Render.
