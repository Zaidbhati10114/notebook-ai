import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImagePrompt, generateImage } from "@/lib/openai";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";

export const runtime = 'edge'


export async function POST(req: Request) {
    const { userId } = auth();
    if (!userId) {
        return new NextResponse('unauthorized', { status: 401 })
    }
    const body = await req.json();
    const { name } = body;
    const image_description = await generateImagePrompt(name)

    if (!image_description) {
        return new NextResponse('Failed to gen image', { status: 500 })
    }

    const image_url = await generateImage(image_description)

    if (!image_url) {
        return new NextResponse('Failed to gen image url', { status: 500 })
    }

    // insert note to db

    const note_ids = await db.insert($notes).values({ name, userId, imageUrl: image_url })
        .returning({ insertedId: $notes.id });

    return NextResponse.json({
        note_id: note_ids[0].insertedId
    })
}