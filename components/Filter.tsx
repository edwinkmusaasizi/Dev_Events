'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
    tags: string[];
}

const Filter = ({ tags }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentTag = searchParams.get('tag') || 'All';

    const handleTagClick = (tag: string) => {
        const params = new URLSearchParams(searchParams);
        if (tag === 'All') {
            params.delete('tag');
        } else {
            params.set('tag', tag);
        }
        router.push(`/?${params.toString()}#events`, { scroll: false });
    };

    const allTags = ['All', ...tags];

    return (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8 max-w-3xl mx-auto">
            {allTags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                        currentTag === tag
                            ? 'bg-primary text-black shadow-lg shadow-primary/20 scale-105'
                            : 'bg-dark-100/50 backdrop-blur-sm border border-border-dark text-light-200 hover:border-primary/40 hover:text-white'
                    }`}
                >
                    {tag === 'All' ? tag : `#${tag.toLowerCase()}`}
                </button>
            ))}
        </div>
    );
};

export default Filter;
