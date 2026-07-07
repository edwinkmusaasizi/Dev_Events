'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

const Search = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('query') || '');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            if (query) {
                params.set('query', query);
            } else {
                params.delete('query');
            }
            router.push(`/?${params.toString()}#events`, { scroll: false });
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, router, searchParams]);

    return (
        <div className="relative w-full max-w-2xl mx-auto mt-10">
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                <SearchIcon className="w-5 h-5 text-primary/50" />
            </div>
            <input
                type="text"
                placeholder="Search events by title..."
                className="w-full bg-dark-100/50 backdrop-blur-sm border border-border-dark focus:border-primary/50 focus:outline-none rounded-full py-5 pl-14 pr-6 text-white text-lg placeholder-light-200/30 transition-all card-shadow"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
};

export default Search;
