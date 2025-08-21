const { createClient } = require("@supabase/supabase-js");
const Redis = require("redis");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
const redisClient = Redis.createClient({ url: process.env.REDIS_URL });

redisClient.on("error", (err) => console.error("Redis error:", err));
redisClient.connect();

module.exports = { supabase, redisClient };
