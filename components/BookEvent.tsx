'use client';

import {useState} from "react";
import {createBooking} from "@/lib/actions/booking.actions";
import posthog from "posthog-js";
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const BookEvent = ({ eventId, slug }: { eventId: string, slug: string;}) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        
        setLoading(true);
        setError('');

        try {
            const result = await createBooking({ eventId, slug, email });

            if(result.success) {
                setSubmitted(true);
                posthog.capture('event_booked', { eventId, slug, email })
            } else {
                setError(result.error || 'Booking failed. Please try again.');
                posthog.captureException('Booking creation failed')
            }
        } catch (err) {
            setError('An unexpected error occurred.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div id="book-event" className="w-full">
            {submitted ? (
                <div className="flex flex-col items-center gap-3 py-6 bg-primary/10 border border-primary/20 rounded-lg animate-in fade-in zoom-in duration-300">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                    <div className="text-center px-4">
                        <p className="text-primary font-bold text-lg">Spot Reserved!</p>
                        <p className="text-light-200 text-sm mt-1">We&apos;ve sent a confirmation to your email.</p>
                    </div>
                </div>
            ): (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-light-100">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            placeholder="you@example.com"
                            className="bg-dark-200 border border-border-dark focus:border-primary/50 focus:outline-none rounded-md px-4 py-3 text-white placeholder-light-200/30 transition-colors"
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 p-3 rounded-md">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full py-3.5 flex items-center justify-center gap-2 font-bold rounded-md transition-all ${
                            loading 
                                ? 'bg-primary/50 cursor-not-allowed' 
                                : 'bg-primary hover:bg-primary/90 text-black shadow-lg hover:shadow-primary/20'
                        }`}
                    >
                        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                        {loading ? 'Processing...' : 'Reserve My Spot'}
                    </button>
                    
                    <p className="text-[10px] text-center text-light-200 opacity-50 uppercase tracking-widest">
                        Limited spots available
                    </p>
                </form>
            )}
        </div>
    )
}
export default BookEvent
