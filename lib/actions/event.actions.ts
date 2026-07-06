'use server';

import Event from '@/database/event.model';
import connectDB from "@/lib/mongodb";
import { events as mockEvents } from "@/lib/constants";

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB();
        const event = await Event.findOne({ slug });
        if (!event) {
            const mockEvent = mockEvents.find(e => e.slug === slug);
            if (!mockEvent) return [];
            const similar = mockEvents.filter(e => e.slug !== slug && e.tags.some(t => mockEvent.tags.includes(t)));
            return similar;
        }

        const similar = await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean();
        return JSON.parse(JSON.stringify(similar));
    } catch {
        const mockEvent = mockEvents.find(e => e.slug === slug);
        if (!mockEvent) return [];
        const similar = mockEvents.filter(e => e.slug !== slug && e.tags.some(t => mockEvent.tags.includes(t)));
        return similar;
    }
}

export const getAllEvents = async () => {
    try {
        await connectDB();
        const events = await Event.find().sort({ createdAt: -1 }).lean();
        if (events.length > 0) {
            return JSON.parse(JSON.stringify(events));
        }
        return mockEvents;
    } catch (error) {
        console.warn('Database connection failed. Falling back to static mockEvents.', error instanceof Error ? error.message : error);
        return mockEvents;
    }
}

export const getEventBySlug = async (slug: string) => {
    try {
        await connectDB();
        const event = await Event.findOne({ slug }).lean();
        if (!event) {
            return mockEvents.find(e => e.slug === slug) || null;
        }
        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        console.warn(`Database connection failed for slug '${slug}'. Falling back to static mockEvents.`, error instanceof Error ? error.message : error);
        return mockEvents.find(e => e.slug === slug) || null;
    }
}
