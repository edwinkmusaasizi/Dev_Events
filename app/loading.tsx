import React from 'react';

const Loading = () => {
    return (
        <section className="animate-pulse">
            {/* Title Skeleton */}
            <div className="h-16 w-3/4 mx-auto bg-dark-100 rounded-lg mb-4"></div>
            <div className="h-6 w-1/2 mx-auto bg-dark-100 rounded-lg mb-10"></div>

            {/* Search Skeleton */}
            <div className="h-14 w-full max-w-2xl mx-auto bg-dark-100 rounded-full mb-8"></div>

            {/* Filter Skeleton */}
            <div className="flex justify-center gap-3 mb-20">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-10 w-24 bg-dark-100 rounded-full"></div>
                ))}
            </div>

            {/* Events Grid Skeleton */}
            <div className="space-y-7">
                <div className="h-8 w-48 bg-dark-100 rounded-lg mb-6"></div>
                <div className="grid md:grid-cols-3 gap-10 sm:grid-cols-2 grid-cols-1">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex flex-col gap-3">
                            <div className="h-[300px] w-full bg-dark-100 rounded-lg"></div>
                            <div className="h-4 w-1/3 bg-dark-100 rounded"></div>
                            <div className="h-6 w-3/4 bg-dark-100 rounded"></div>
                            <div className="flex gap-4">
                                <div className="h-4 w-20 bg-dark-100 rounded"></div>
                                <div className="h-4 w-20 bg-dark-100 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Loading;
