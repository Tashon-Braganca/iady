import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const unlocked = request.cookies.get('unlocked');
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedRoutes = ['/path', '/gallery', '/videos', '/letters', '/final', '/level'];
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtected && !unlocked) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If already unlocked and trying to access login page, redirect to path
  if (pathname === '/' && unlocked) {
    return NextResponse.redirect(new URL('/path', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
