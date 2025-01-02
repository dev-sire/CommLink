import { ImageResponse } from "next/og";
import { NextRequest } from 'next/server';

//export const runtime = 'edge'// Image generation

export async function GET( request: NextRequest ) {

    const params = request.nextUrl.searchParams;
    const protocol  = request.nextUrl.protocol;
    const host  = request.nextUrl.host;

    const name: string = params.get("invite") || "Random User";
    const imageUrl = `${protocol}//${host}/logo.svg`;

    return new ImageResponse((
        <div tw="flex flex-col p-8 w-full h-full items-start bg-white">
            <div tw="flex items-center justify-center w-full flex-col">
                <img src={imageUrl} width={400} height={100} alt="logo" />
                <p tw="font-bold text-lg text-[#616061] text-center">Streamline your teamwork with CommLink. Enjoy seamless communication, task management, and document sharing, all in one centralized platform.</p>
            </div>
            <div tw="flex flex-col flex-1 -mt-24 justify-center items-center w-full">
                <div tw="flex text-[60px] font-bold text-[#074799]">Hey, {name}!</div>
                <div tw="flex text-xl text-[#616061] uppercase font-bold tracking-tight font-normal">
                    Ready to revolutionize your communication? Join CommLink today.
                </div>
            </div>
            <div tw="flex items-center w-full justify-between">
                <div tw="flex text-3xl text-slate-800 font-bold">Regards, Aman Shahid (Dev)</div>
                <div tw="flex items-center text-xl">
                    <div tw="flex ml-2 font-bold text-blue-500 text-2xl">gihub.com/dev-sire</div>
                </div>
            </div>
        </div>
    ),
        {
            width: 1200,
            height: 630,
            headers: {
                'Cache-Control': 'public, max-age=3600, immutable',
            },
        },
    )
}