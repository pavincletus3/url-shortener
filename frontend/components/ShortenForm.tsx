"use client";
import { useState } from "react";

export default function ShortenForm({ onShorten }: { onShorten: () => void }) {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/shorten", {
      // If deploying, use your deployed backend URL here
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl }),
    });
    const data = await res.json();
    if (data.shortUrl) {
      setShortUrl(data.shortUrl);
      setLongUrl("");
      onShorten();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="url"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
        placeholder="Enter a long URL"
      />
      <button type="submit">Shorten</button>
      {shortUrl && (
        <p>
          Short URL: <a href={shortUrl}>{shortUrl}</a>
        </p>
      )}
    </form>
  );
}
