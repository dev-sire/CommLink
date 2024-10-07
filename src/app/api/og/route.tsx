import { ImageResponse } from "next/og";
import { NextRequest } from 'next/server'
import { Template } from "./template";

export const runtime = 'edge'// Image generation

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams
    const name: string = params.get("invite") || "Random User";
    return new ImageResponse((<Template title={name} />),
        {
            width: 1200,
            height: 630,
            headers: {
                'Cache-Control': 'public, max-age=3600, immutable',
            },
        },
    )
}