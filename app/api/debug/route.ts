import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    hasApiEndpoint: !!process.env.NEXT_PUBLIC_API_ENDPOINT,
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || "NOT_SET",
    hasImagekitKeys: {
      publicKey: !!process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      privateKey: !!process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: !!process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    },
  });
}
