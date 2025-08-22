"use client";
import { useEffect, useState } from "react";
// At the top of your file, define:
interface ShortUrl {
  short_code: string;
  long_url: string;
  clicks: number;
}

export default function UrlList({ refresh }: { refresh: number }) {
  const [urls, setUrls] = useState<ShortUrl[]>([]);

  const fetchUrls = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/urls`);
    const data = await res.json();
    setUrls(data);
  };

  useEffect(() => {
    fetchUrls();
  }, [refresh]);

  return (
    <ul>
      {urls.map((url) => (
        <li key={url.short_code}>
          <b>Short:</b> <a href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url.short_code}`}>{url.short_code}</a>
          {" | "}
          <b>Long:</b> {url.long_url}
          {" | "}
          <b>Clicks:</b> {url.clicks}
        </li>
      ))}
    </ul>
  );
}