import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

// Gate authenticated-only routes. `auth` populates req.auth from the session.
export default auth((req) => {
  if (!req.auth) {
    const signInUrl = new URL('/api/auth/signin', req.nextUrl.origin);
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }
});

// Keep the matcher tight so PostHog /ingest/* rewrites and /api/auth/* are untouched.
export const config = {
  matcher: ['/events/create'],
};
