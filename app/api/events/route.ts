import {NextRequest, NextResponse} from "next/server";
import { v2 as cloudinary } from 'cloudinary';

import connectDB from "@/lib/mongodb";
import Event from '@/database/event.model';
import { revalidateTag, revalidatePath } from 'next/cache';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
    try {
        // Require an authenticated user before allowing event creation
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const formData = await req.formData();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let event: any;

        try {
            event = Object.fromEntries(formData.entries());
        } catch {
            return NextResponse.json({ message: 'Invalid form data format'}, { status: 400 })
        }

        const file = formData.get('image') as File;

        if(!file) return NextResponse.json({ message: 'Image file is required'}, { status: 400 })

        const tags = JSON.parse(formData.get('tags') as string);
        const agenda = JSON.parse(formData.get('agenda') as string);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'DevEvent' }, (error, results) => {
                if(error) return reject(error);

                resolve(results);
            }).end(buffer);
        });
        const { secure_url: imageUrl, public_id: imagePublicId } =
            uploadResult as { secure_url: string; public_id: string };

        event.image = imageUrl;

        const createdEvent = await Event.create({
            ...event,
            imagePublicId,
            creatorId: session.user.id, // set server-side; never trust the request body
            tags: tags,
            agenda: agenda,
        });

        // Invalidate cached lists to reflect the new event immediately
        revalidateTag('events-list');
        revalidatePath('/');

        return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });
    } catch (e) {
        console.error('Event creation process failed:', e);
        return NextResponse.json({ 
            message: 'Event Creation Failed', 
            error: e instanceof Error ? e.message : 'Unknown error occurred'
        }, { status: 500 })
    }
}

export async function GET() {
    try {
        await connectDB();

        const events = await Event.find().sort({ createdAt: -1 });

        return NextResponse.json({ message: 'Events fetched successfully', events }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: 'Event fetching failed', error: e }, { status: 500 });
    }
}
