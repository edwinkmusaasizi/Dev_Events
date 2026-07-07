import EventCard from "@/components/EventCard";
import Search from "@/components/Search";
import Filter from "@/components/Filter";
import {IEvent} from "@/database";
import { getAllEvents, getAllTags } from "@/lib/actions/event.actions";
import { Suspense } from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const Page = async (props: { searchParams: SearchParams }) => {
    const searchParams = await props.searchParams;
    const query = searchParams?.query as string || '';
    const tag = searchParams?.tag as string || 'All';

    const events = await getAllEvents(query, tag);
    const tags = await getAllTags();

    return (
        <section>
            <h1 className="text-center">The Hub for Every Dev <br /> Event You Can&apos;t Miss</h1>
            <p className="text-center mt-5 text-light-100 text-lg">Hackathons, Meetups, and Conferences, All in One Place</p>

            <Suspense fallback={<div className="h-14 w-full max-w-2xl mx-auto bg-dark-100/50 animate-pulse rounded-full mt-10" />}>
                <Search />
            </Suspense>
            <Suspense fallback={<div className="h-10 w-48 mx-auto bg-dark-100/50 animate-pulse rounded-full mt-8" />}>
                <Filter tags={tags} />
            </Suspense>

            <div id="events" className="mt-24 space-y-7 scroll-mt-24">
                <div className="flex justify-between items-end border-b border-border-dark pb-4">
                    <h3>{query || tag !== 'All' ? 'Search Results' : 'Upcoming Events'}</h3>
                    {events.length > 0 && (
                        <p className="text-light-200 text-sm font-martian-mono">{events.length} {events.length === 1 ? 'event' : 'events'} found</p>
                    )}
                </div>

                {events.length > 0 ? (
                    <ul className="events">
                        {events.map((event: IEvent) => (
                            <li key={event.title} className="list-none">
                                <EventCard {...event} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-dark-100/20 border border-border-dark border-dashed rounded-xl">
                        <p className="text-light-100 text-xl font-semibold">No events found</p>
                        <p className="text-light-200 mt-2">Try adjusting your search or filters to find what you&apos;re looking for.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Page;
