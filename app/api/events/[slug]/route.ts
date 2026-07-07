import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { revalidateTag, revalidatePath } from 'next/cache';

import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';
import Booking from '@/database/booking.model';
import { auth } from '@/auth';

// Define route params type for type safety
type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Derive a Cloudinary public_id from a stored secure_url as a fallback for
 * events created before we persisted `imagePublicId`.
 * e.g. https://res.cloudinary.com/<cloud>/image/upload/v123/DevEvent/abc.png -> DevEvent/abc
 */
function parsePublicIdFromUrl(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
  return match ? match[1] : null;
}

/**
 * GET /api/events/[slug]
 * Fetches a single events by its slug
 */
export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Connect to database
    await connectDB();

    // Await and extract slug from params
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { message: 'Invalid or missing slug parameter' },
        { status: 400 }
      );
    }

    // Sanitize slug (remove any potential malicious input)
    const sanitizedSlug = slug.trim().toLowerCase();

    // Query events by slug
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    // Handle events not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug '${sanitizedSlug}' not found` },
        { status: 404 }
      );
    }

    // Return successful response with events data
    return NextResponse.json(
      { message: 'Event fetched successfully', event },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching events by slug:', error);
    }

    // Handle specific error types
    if (error instanceof Error) {
      // Handle database connection errors
      if (error.message.includes('MONGODB_URI')) {
        return NextResponse.json(
          { message: 'Database configuration error' },
          { status: 500 }
        );
      }

      // Return generic error with error message
      return NextResponse.json(
        { message: 'Failed to fetch events', error: error.message },
        { status: 500 }
      );
    }

    // Handle unknown errors
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/events/[slug]
 * Deletes an event owned by the authenticated user, cascading to its bookings
 * and Cloudinary image.
 */
export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Require authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { slug } = await params;
    const sanitizedSlug = slug?.trim().toLowerCase();
    if (!sanitizedSlug) {
      return NextResponse.json(
        { message: 'Invalid or missing slug parameter' },
        { status: 400 }
      );
    }

    const event = await Event.findOne({ slug: sanitizedSlug });
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug '${sanitizedSlug}' not found` },
        { status: 404 }
      );
    }

    // Authorization: only the creator may delete
    if (event.creatorId !== session.user.id) {
      return NextResponse.json(
        { message: 'You are not allowed to delete this event' },
        { status: 403 }
      );
    }

    // Cascade delete bookings for this event
    await Booking.deleteMany({ eventId: event._id });

    // Best-effort remove the Cloudinary image; don't block deletion on failure
    const publicId = event.imagePublicId ?? parsePublicIdFromUrl(event.image);
    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudErr) {
        console.error('Cloudinary image deletion failed:', cloudErr);
      }
    }

    await Event.deleteOne({ _id: event._id });

    // Invalidate caches so the removal is reflected immediately
    revalidateTag('events-list');
    revalidateTag('tags-list');
    revalidateTag(`event-${sanitizedSlug}`);
    revalidateTag(`similar-events-${sanitizedSlug}`);
    revalidatePath('/');

    return NextResponse.json(
      { message: 'Event deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Event deletion failed:', error);
    return NextResponse.json(
      {
        message: 'Failed to delete event',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
