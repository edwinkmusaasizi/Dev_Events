'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

const AuthButtons = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <li aria-hidden className="opacity-60">…</li>;
    }

    if (session?.user) {
        return (
            <li className="flex items-center gap-3">
                <span className="text-sm">{session.user.name ?? session.user.email}</span>
                <button type="button" onClick={() => signOut({ callbackUrl: '/' })}>
                    Sign out
                </button>
            </li>
        );
    }

    return (
        <li>
            <button type="button" onClick={() => signIn('google')}>
                Login
            </button>
        </li>
    );
};

export default AuthButtons;
