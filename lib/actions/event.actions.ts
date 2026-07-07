'use server';

import Event from '@/database/event.model';
import connectDB from "@/lib/mongodb";
import { cacheTag } from 'next/cache';

export const getSimilarEventsBySlug = async (slug: string) => {
    'use cache'
    cacheTag(`similar-events-${slug}`)
    try {
        await connectDB();
        const event = await Event.findOne({ slug });
        if (!event) return [];

        const similar = await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean();
        return JSON.parse(JSON.stringify(similar));
    } catch (error) {
        console.error(`Failed to fetch similar events for slug '${slug}':`, error);
        return [];
    }
}

export const getAllEvents = async (query?: string, tag?: string) => {
    'use cache'
    cacheTag('events-list')
    try {
        await connectDB();

        const filter: any = {};
        if (query) {
            filter.title = { $regex: query, $options: 'i' };
        }
        if (tag && tag !== 'All') {
            filter.tags = { $in: [tag.toLowerCase()] };
        }

        const events = await Event.find(filter).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        console.error('Database connection failed while fetching all events:', error);
        return [];
    }
}

export const getAllTags = async () => {
    'use cache'
    cacheTag('tags-list')
    try {
        await connectDB();
        const tags = await Event.distinct('tags');
        return tags;
    } catch (error) {
        console.error('Failed to fetch tags:', error);
        return [];
    }
}

export const getEventBySlug = async (slug: string) => {
    'use cache'
    cacheTag(`event-${slug}`)
    try {
        await connectDB();
        const event = await Event.findOne({ slug }).lean();
        return event ? JSON.parse(JSON.stringify(event)) : null;
    } catch (error) {
        console.error(`Database connection failed for slug '${slug}':`, error);
        return null;
    }
}
