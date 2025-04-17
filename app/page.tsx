"use client";
import { useState } from "react";
import { createShortUrl } from "@/lib/urlAction";

export default function Home() {
  const [alias, setAlias] = useState("");
  const [url, setUrl] = useState("");
  const [furl, setFurl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFurl("");
    try {
      const res = await createShortUrl({ alias, url });
      setFurl(res);
      setError("");
    } catch (error: unknown) {
      console.log(error)
      if (error instanceof Error) {
        if (error.message == "Invalid URL.") {
          setError("Please enter a valid URL.");
        } else if (error.message == "Domain error.") {
          setError("This domain doesn't have a server.");
        } else {
          setError("Alias already exists.")
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="relative font-mono flex flex-col justify-center items-center h-screen overflow-hidden text-lg">
      <div className="absolute inset-0 bg-[url('/bg1.png')] bg-cover z-[-1] animate-zoom blur-[2px]"></div>
      <div className="w-[40%] h-[60vh] bg-gray-900/10 rounded-[24px] drop-shadow-black drop-shadow-sm shadow-lg border border-gray-600/20 flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-2">
          <h1 className="uppercase font-sans text-2xl tracking-[2px] mb-2">CS391 URL Shortener</h1>
          <p className="font-bold font-mono text-shadow">Enter an URL:</p>
          <input
            id="urlInput"
            type="text"
            value={url}
            placeholder="https://www.google.com/"
            onChange={(e) => setUrl(e.target.value)}
            required
            className="outline-none text-sm bg-gray-700/20 rounded-[8px] py-1"
          />
          <p className="font-bold font-mono">Enter an alias:</p>
          <input
            id="aliasInput"
            type="text"
            value={alias}
            placeholder="e.g., Google."
            onChange={(e) => setAlias(e.target.value)}
            required
            className="outline-none text-sm bg-gray-700/20 rounded-[8px] pr-25 py-1"
          />
          <button type="submit" className="bg-gray-500/10 rounded-[5px] border border-white/10 mt-2">
            Shorten URL
          </button>
        </form>
        <div className="h-20 text-sm translate-y-5">
          {error ? (
            <p className="text-red-500 h-6 text-sm">{error}</p>
          ) : (
            furl && (
              <>
                <p className="text-green-500">Your shortened URL:</p>
                <a href={furl} target="_blank" rel="noreferrer" className="text-sm underline">
                  {furl}
                </a>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
