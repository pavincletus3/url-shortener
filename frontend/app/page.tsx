"use client";
import { useState } from "react";
import ShortenForm from "../components/ShortenForm";
import UrlList from "../components/UrlList";

export default function Home() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div>
      <h1>URL Shortener Dashboard</h1>
      <ShortenForm onShorten={() => setRefresh((prev) => prev + 1)} />
      <UrlList refresh={refresh} />
    </div>
  );
}
