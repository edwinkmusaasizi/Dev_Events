'use server';

import Booking from '@/database/booking.model';
import connectDB from "@/lib/mongodb";
import { revalidateTag } from 'next/cache';

export const createBooking = async ({ eventId, slug, email }: { eventId: string; slug: string; email: string; }) => {
    try {
        await connectDB();

        await Booking.create({ eventId, email });

        // Invalidate specific event cache to update registration/booking indicators
        revalidateTag(`event-${slug}`);

        return { success: true };
    } catch (error) {
        console.error(`Database booking failed for event ${slug}:`, error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Booking failed' 
        };
    }
}
