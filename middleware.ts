import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

// Gate authenticated-only routes. `auth` populates req.auth from the session.
export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  
  if (!isAuthenticated) {
    const signInUrl = new URL('/api/auth/signin', nextUrl.origin);
    signInUrl.searchParams.set('callbackUrl', nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Admin route protection
  if (nextUrl.pathname.startsWith('/admin')) {
    // Determine admin based on a comma-separated list of emails in env var, 
    // or a hardcoded fallback for local development.
    const adminEmails = (process.env.ADMIN_EMAILS || 'admin@example.com').split(',');
    const userEmail = req.auth?.user?.email;

    if (!userEmail || !adminEmails.includes(userEmail)) {
      // Redirect unauthorized users to the home page (or an unauthorized page)
      return NextResponse.redirect(new URL('/', nextUrl.origin));
    }
  }
});

// Keep the matcher tight so PostHog /ingest/* rewrites and /api/auth/* are untouched.
export const config = {
  matcher: ['/events/create', '/admin/:path*'],
};
