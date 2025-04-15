import { MongoClient, Db, Collection } from "mongodb";

const mongo_uri = process.env.MONGO_URI as string;

if (!mongo_uri) {
  throw new Error("mongo_uri environment variable is undefined");
}

const db_name = "cs391-url-shortener";
export const url_collection = "urls";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> {
  if (!client) {
    client = new MongoClient(mongo_uri);
    await client.connect();
  }
  return client.db(db_name);
}

export default async function getCollection(collectionName: string): Promise<Collection> {
  if (!db) {
    db = await connect();
  }
  return db!.collection(collectionName);
}
