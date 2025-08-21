const request = require("supertest");
const express = require("express");
const router = require("../src/routes");
const { supabase, redisClient } = require("../src/db");

const app = express();
app.use(express.json());
app.use("/", router);

beforeAll(async () => {
  // Connect Redis if not already
  // Clear DB for clean tests (optional: use a test DB in production)
  await supabase.from("urls").delete().neq("id", 0); // Deletes all rows
});

afterAll(async () => {
  await redisClient.quit();
});

describe("URL Shortener API", () => {
  let shortCode;

  test("POST /shorten - should create a short URL", async () => {
    const res = await request(app)
      .post("/shorten")
      .send({ longUrl: "https://example.com" })
      .expect(200);
    expect(res.body.shortUrl).toMatch(/http:\/\/localhost:3000\/\w+/);
    shortCode = res.body.shortUrl.split("/").pop(); // Extract shortCode
  });

  test("GET /:shortCode - should redirect to long URL", async () => {
    const res = await request(app).get(`/${shortCode}`).expect(301); // Redirect status
    expect(res.header.location).toBe("https://example.com");
  });

  test("GET /analytics/:shortCode - should return clicks (at least 1 from redirect)", async () => {
    const res = await request(app).get(`/analytics/${shortCode}`).expect(200);
    expect(res.body.clicks).toBeGreaterThanOrEqual(1);
  });

  test("POST /shorten - should error on invalid URL", async () => {
    await request(app)
      .post("/shorten")
      .send({ longUrl: "invalid" })
      .expect(500); // Or 400 if you update to handle gracefully
  });

  test("GET /invalid - should return 404", async () => {
    await request(app).get("/invalid").expect(404);
  });
});
