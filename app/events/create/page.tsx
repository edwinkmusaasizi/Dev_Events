'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const CreateEventPage = () => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [overview, setOverview] = useState('');
    const [venue, setVenue] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [mode, setMode] = useState<'online' | 'offline' | 'hybrid'>('offline');
    const [audience, setAudience] = useState('');
    const [organizer, setOrganizer] = useState('');

    // Dynamic Lists
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');

    const [agenda, setAgenda] = useState<string[]>([]);
    const [agendaInput, setAgendaInput] = useState('');

    // Image Upload
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    // UI state
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Add Tag handler
    const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
        if (e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') return;
        
        e.preventDefault();
        const trimmed = tagInput.trim().toLowerCase();
        if (trimmed && !tags.includes(trimmed)) {
            setTags([...tags, trimmed]);
            setTagInput('');
        }
    };

    // Remove Tag handler
    const handleRemoveTag = (indexToRemove: number) => {
        setTags(tags.filter((_, idx) => idx !== indexToRemove));
    };

    // Add Agenda handler
    const handleAddAgenda = (e: React.KeyboardEvent | React.MouseEvent) => {
        if (e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') return;
        
        e.preventDefault();
        const trimmed = agendaInput.trim();
        if (trimmed && !agenda.includes(trimmed)) {
            setAgenda([...agenda, trimmed]);
            setAgendaInput('');
        }
    };

    // Remove Agenda handler
    const handleRemoveAgenda = (indexToRemove: number) => {
        setAgenda(agenda.filter((_, idx) => idx !== indexToRemove));
    };

    // File selection handler
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Submit handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        // Basic Validation
        if (!title.trim()) return setErrorMsg('Title is required');
        if (!description.trim()) return setErrorMsg('Description is required');
        if (!overview.trim()) return setErrorMsg('Overview is required');
        if (!venue.trim()) return setErrorMsg('Venue is required');
        if (!location.trim()) return setErrorMsg('Location is required');
        if (!date) return setErrorMsg('Date is required');
        if (!time) return setErrorMsg('Time is required');
        if (!audience.trim()) return setErrorMsg('Audience is required');
        if (!organizer.trim()) return setErrorMsg('Organizer is required');
        if (tags.length === 0) return setErrorMsg('At least one tag is required');
        if (agenda.length === 0) return setErrorMsg('At least one agenda item is required');
        if (!imageFile) return setErrorMsg('Event cover image is required');

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', title.trim());
            formData.append('description', description.trim());
            formData.append('overview', overview.trim());
            formData.append('venue', venue.trim());
            formData.append('location', location.trim());
            formData.append('date', date);
            formData.append('time', time);
            formData.append('mode', mode);
            formData.append('audience', audience.trim());
            formData.append('organizer', organizer.trim());
            formData.append('tags', JSON.stringify(tags));
            formData.append('agenda', JSON.stringify(agenda));
            formData.append('image', imageFile);

            const response = await fetch('/api/events', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Event creation failed');
            }

            // Redirect to home page on success
            router.push('/');
            router.refresh();
        } catch (err) {
            console.error('Submit error:', err);
            setErrorMsg(err instanceof Error ? err.message : 'An error occurred during submission');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-4xl mx-auto w-full py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-schibsted-grotesk text-gradient">Create New Event</h1>
                <p className="text-light-200 mt-2">Publish a conference, meetup, or hackathon on the DevEvent platform</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-[#12121280]/50 backdrop-blur-xl border border-border-dark p-6 sm:p-10 rounded-xl card-shadow">
                {errorMsg && (
                    <div className="bg-red-950/40 border border-red-800 text-red-200 rounded-md p-4 text-sm font-medium">
                        {errorMsg}
                    </div>
                )}

                {/* Cover Image Upload Section */}
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-light-100">Event Cover Image</label>
                    <div 
                        onClick={() => fileInputRef.current?.click()} 
                        className={`h-[240px] sm:h-[300px] w-full rounded-lg border border-dashed flex-center flex-col gap-4 cursor-pointer overflow-hidden transition-all duration-300 ${
                            imagePreview ? 'border-primary/50' : 'border-border-dark bg-dark-100 hover:border-primary/30'
                        }`}
                    >
                        {imagePreview ? (
                            <div className="relative w-full h-full group">
                                <Image 
                                    src={imagePreview} 
                                    alt="Cover Preview" 
                                    fill 
                                    className="object-cover" 
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex-center">
                                    <p className="text-primary font-semibold">Change Image</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Image src="/icons/logo.png" alt="Upload" width={40} height={40} className="opacity-40 animate-pulse" />
                                <div className="text-center">
                                    <p className="font-semibold text-light-100 text-lg">Click to Upload Cover Image</p>
                                    <p className="text-xs text-light-200 mt-1">Supports JPEG, PNG, WEBP (Recommended aspect ratio 4:3)</p>
                                </div>
                            </>
                        )}
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        className="hidden" 
                    />
                </div>

                {/* Primary Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-sm font-medium text-light-100">Event Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Next.js Conf 2026"
                            className="bg-dark-100 border border-border-dark focus:border-primary/50 focus:outline-none rounded-md px-4 py-3 text-white placeholder-light-200/30 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="organizer" className="text-sm font-medium text-light-100">Organizer Name</label>
                        <input
                            type="text"
                            id="organizer"
                            value={organizer}
                            onChange={(e) => setOrganizer(e.target.value)}
                            placeholder="e.g. Vercel Inc."
                            className="bg-dark-100 border border-border-dark focus:border-primary/50 focus:outline-none rounded-md px-4 py-3 text-white placeholder-light-200/30 transition-colors"
                        />
                    </div>
                </div>

                {/* Event Timing & Access Mode */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="date" className="text-sm font-medium text-light-100">Event Date</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="bg-dark-100 border border-border-dark focus:border-primary/50 focus:outline-none rounded-md px-4 py-3 text-white transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="time" className="text-sm font-medium text-light-100">Start Time</label>
                        <input
                            type="text"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            placeholder="e.g. 09:00 AM"
                            className="bg-dark-100 border border-border-dark focus:border-primary/50 focus:outline-none rounded-md px-4 py-3 text-white placeholder-light-200/30 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="mode" className="text-sm font-medium text-light-100">Event Mode</label>
                        <select
                            id="mode"
                            value={mode}
                            onChange={(e) => setMode(e.target.value as 'online' | 'offline' | 'hybrid')}
                            className="bg-dark-100 border border-border-dark focus:border-primary/50 focus:outline-none rounded-md px-4 py-3 text-white transition-colors cursor-pointer"
                        >
                            <option value="offline">Offline (In-person)</option>
                            <option value="online">Online (Virtual)</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                    </div>
                </div>

                {/* Location & Venue */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="venue" className="text-sm font-medium text-light-100">Venue</label>
                        <input
                            type="text"
                            id="venue"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                            placeholder="e.g. Palace of Fine Arts Auditorium"
                            className="bg-dark-100 border border-border-dark focus:border-primary/50 focus:outline-none rounded-md px-4 py-3 text-white placeholder-light-200/30 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="location" className="text-sm font-medium text-light-100">Location (City, Country)</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. San Francisco, CA, USA"
                            className="bg-dark-100 border border-border-dark focus:border-primary/50 focus:outline-none rounded-md px-4 py-3 text-white placeholder-light-200/30 transition-colors"
                        />
                    </div>
                </div>

                {/* Audience & Overview */}
                <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="audience" className="text-sm font-medium text-light-100">Audience Profile</label>
                        <input
                            type="text"
                            id="audience"
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                            placeholder="e.g. Frontend Developers, React Developers, UI Specialists"
                            className="bg-dark-100 border border-border-dark focus:border-primary/50 focus:outline-none rounded-md px-4 py-3 text-white placeholder-light-200/30 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="overview" className="text-sm font-medium text-light-100">Short Overview (Max 500 characters)</label>
                        <textarea
                            id="overview"
                            rows={3}
                            maxLength={500}
                            value={overview}
                            onChange={(e) => setOverview(e.target.value)}
                            placeholder="Provide a concise hook summary..."
                            className="bg-dark-100 border border-border-dark focus:border-primary/50 focus:outline-none rounded-md px-4 py-3 text-white placeholder-light-200/30 transition-colors resize-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="text-sm font-medium text-light-100">Full Description</label>
                        <textarea
                            id="description"
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your event details, speakers, highlights..."
                            className="bg-dark-100 border border-border-dark focus:border-primary/50 focus:outline-none rounded-md px-4 py-3 text-white placeholder-light-200/30 transition-colors"
                        />
                    </div>
                </div>

                {/* Dynamic Tags Input */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="tags" className="text-sm font-semibold text-light-100">Tags / Categories</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            id="tags"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                            placeholder="Type a tag and press Enter"
                            className="flex-1 bg-dark-100 border border-border-dark focus:border-primary/50 focus:outline-none rounded-md px-4 py-3 text-white placeholder-light-200/30 transition-colors"
                        />
                        <button 
                            type="button" 
                            onClick={handleAddTag} 
                            className="px-6 py-3 bg-dark-200 border border-border-dark hover:border-primary/40 rounded-md font-medium text-light-100 transition-colors cursor-pointer"
                        >
                            Add
                        </button>
                    </div>
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {tags.map((tag, idx) => (
                                <div key={tag} className="bg-dark-100 border border-border-dark rounded-full px-4 py-1.5 text-xs text-light-100 flex items-center gap-2">
                                    <span>#{tag}</span>
                                    <button 
                                        type="button" 
                                        onClick={() => handleRemoveTag(idx)} 
                                        className="text-light-200 hover:text-red-400 font-bold ml-1 text-xs cursor-pointer focus:outline-none"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Dynamic Agenda Items */}
                <div className="flex flex-col gap-3">
                    <label htmlFor="agenda" className="text-sm font-semibold text-light-100">Schedule Agenda</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            id="agenda"
                            value={agendaInput}
                            onChange={(e) => setAgendaInput(e.target.value)}
                            onKeyDown={handleAddAgenda}
                            placeholder="e.g. 09:00 AM - Registration & Networking"
                            className="flex-1 bg-dark-100 border border-border-dark focus:border-primary/50 focus:outline-none rounded-md px-4 py-3 text-white placeholder-light-200/30 transition-colors"
                        />
                        <button 
                            type="button" 
                            onClick={handleAddAgenda} 
                            className="px-6 py-3 bg-dark-200 border border-border-dark hover:border-primary/40 rounded-md font-medium text-light-100 transition-colors cursor-pointer"
                        >
                            Add
                        </button>
                    </div>
                    {agenda.length > 0 && (
                        <ul className="flex flex-col gap-2 mt-2 bg-dark-100/40 border border-border-dark p-4 rounded-md list-none pl-0">
                            {agenda.map((item, idx) => (
                                <li key={idx} className="flex justify-between items-center gap-4 text-sm text-light-200 py-1.5 border-b border-border-dark/50 last:border-b-0">
                                    <span>{item}</span>
                                    <button 
                                        type="button" 
                                        onClick={() => handleRemoveAgenda(idx)} 
                                        className="text-light-200 hover:text-red-400 font-medium text-xs cursor-pointer focus:outline-none"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Submit Action */}
                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 text-center text-black font-bold rounded-md text-lg transition-colors focus:outline-none ${
                            loading 
                                ? 'bg-primary/55 cursor-not-allowed text-black/60' 
                                : 'bg-primary hover:bg-primary/90 cursor-pointer shadow-lg hover:shadow-primary/20'
                        }`}
                    >
                        {loading ? 'Uploading Cover Image & Creating Event...' : 'Publish Event'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default CreateEventPage;
