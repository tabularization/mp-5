import getCollection, { url_collection } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Redirect({ params }: { params: { alias: string } }) {
  const { alias } = await params;
  const collection = await getCollection(url_collection);
  const result = await collection.findOne({ alias });

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p>Short URL not found.</p>
      </div>
    );
  } 

  redirect(result.url)
}
