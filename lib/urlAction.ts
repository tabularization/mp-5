"use server";
import getCollection, { url_collection } from "@/lib/db";

type CreateResult = { shortUrl: string } | { error: string };

export async function createShortUrl({ alias, url }: { alias: string; url: string }): Promise<CreateResult> {
  try {
    new URL(url);
  } catch {
    return { error: "Invalid URL." };
  }

  try {
    await fetch(url, { method: "HEAD" });
  } catch {
    return { error: "Domain error." };
  }

  const collection = await getCollection(url_collection);
  const existing_url = await collection.findOne({ alias });

  if (existing_url) {
    return { error: "Alias already exists." };
  }

  await collection.insertOne({ alias, url });
  return { shortUrl: `${process.env.NEXT_PUBLIC_URL}/${alias}` };
}
