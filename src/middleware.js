import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export const middleware = async (request) => {
    // return NextResponse.redirect(new URL('/login', request.url))
    const { pathname } = request.nextUrl;

    try {
        let cookie = request.cookies.get('access-token')?.value;
        if (!cookie) {
            throw new Error('invalid key')
        }
        const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
        await jwtVerify(cookie, secret);
        return NextResponse.next();

    } catch (error) {
        return NextResponse.redirect(new URL(`/login?redirectUrl=${pathname}`, request.url))
    }


}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/dashboard/:path*',
}