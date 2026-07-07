'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Trash2 } from 'lucide-react';

const DeleteEvent = ({ slug }: { slug: string }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        const confirmed = window.confirm(
            'Delete this event? This will also remove its bookings and image. This cannot be undone.'
        );
        if (!confirmed) return;

        setLoading(true);
        setError('');

        try {
            const res = await fetch(`/api/events/${slug}`, { method: 'DELETE' });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || 'Failed to delete event');
            }

            router.push('/');
            router.refresh();
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Something went wrong');
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-md border border-red-500/40 px-4 py-2 text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-60"
            >
                {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Trash2 className="h-4 w-4" />
                )}
                {loading ? 'Deleting…' : 'Delete Event'}
            </button>
            {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
    );
};

export default DeleteEvent;
