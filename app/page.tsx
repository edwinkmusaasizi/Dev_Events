import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {IEvent} from "@/database";
import {events as mockEvents, EventItem} from "@/lib/constants";
import {cacheLife} from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const Page = async () => {
    'use cache';
    cacheLife('hours')
    
    let events: (IEvent | EventItem)[] = [];
    try {
        const response = await fetch(`${BASE_URL}/api/events`);
        if (response.ok) {
            const data = await response.json();
            events = data.events || [];
        }
    } catch (error) {
        console.warn("Failed to fetch events from API, falling back to mock events:", error);
    }

    if (!events || events.length === 0) {
        events = mockEvents;
    }

    return (
        <section>
            <h1 className="text-center">The Hub for Every Dev <br /> Event You Can&apos;t Miss</h1>
            <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>

            <ExploreBtn />

            <div id="events" className="mt-20 space-y-7">
                <h3>Featured Events</h3>

                <ul className="events">
                    {events && events.length > 0 && events.map((event: IEvent | EventItem) => (
                        <li key={event.title} className="list-none">
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Page;
