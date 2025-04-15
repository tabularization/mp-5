"use server"
import getCollection, { url_collection } from "@/lib/db";

export async function createShortUrl({ alias, url }: { alias: string; url: string }) {
    try {
        new URL(url);
    } catch { 
        throw new Error("Invalid URL.")
    }

    const collection = await getCollection(url_collection);
    const existing_url = await collection.findOne({alias})

    if (existing_url) {
        throw new Error("Alias already exists.")
    }

    await collection.insertOne({alias, url});
    return `${process.env.NEXT_PUBLIC_URL}/${alias}`;
}
