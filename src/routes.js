const express = require("express");
const { supabase, redisClient } = require("./db");
const { generateShortCode } = require("./utils");

const router = express.Router();


// Get all URLs with analytics
router.get("/urls", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("urls")
      .select("short_code, long_url, clicks")
      .order("id", { ascending: false }); // newest first
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Shorten URL
router.post("/shorten", async (req, res) => {
  try {
    const { longUrl } = req.body;
    const shortCode = generateShortCode(longUrl);
    const { data, error } = await supabase
      .from("urls")
      .insert([{ short_code: shortCode, long_url: longUrl }])
      .select();
    if (error) {
      if (error.code === "23505")
        return res.status(400).json({ error: "Short code already exists" });
      throw error;
    }
    res.json({ shortUrl: `http://localhost:${process.env.PORT}/${shortCode}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Redirect
router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    // Check Redis cache
    let longUrl = await redisClient.get(`url:${shortCode}`);
    if (!longUrl) {
      const { data, error } = await supabase
        .from("urls")
        .select("long_url")
        .eq("short_code", shortCode)
        .single();
      if (error || !data)
        return res.status(404).json({ error: "URL not found" });
      longUrl = data.long_url;
      await redisClient.set(`url:${shortCode}`, longUrl, { EX: 3600 }); // Cache for 1 hour
    }
    // Increment clicks async via RPC (non-blocking and atomic)
    const incrementResult = await supabase.rpc("increment_clicks", {
      short_code_param: shortCode,
    });
    if (incrementResult.error)
      console.error("Increment error:", incrementResult.error);
    res.redirect(302, longUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Analytics
router.get("/analytics/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const { data, error } = await supabase
      .from("urls")
      .select("clicks")
      .eq("short_code", shortCode)
      .single();
    if (error || !data) return res.status(404).json({ error: "URL not found" });
    res.json({ shortCode, clicks: data.clicks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
