import { NextRequest, NextResponse } from "next/server";
import { admin } from "./Authentication/Login/firebaseAdmin/firebaseAdmin";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    res.headers.set('Cache-Control', 'no-store, max-age-0');


    const sessionCookie = req.cookies.get('gpt-login-session');
    console.log('------セッションのAPI------', sessionCookie);

    if (!sessionCookie) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (sessionCookie && typeof sessionCookie === 'string') {
        try {
            await admin.auth().verifySessionCookie(sessionCookie, true);
    
            return res;
        } catch (error) {
            console.error('セッションエラー', error);
            return NextResponse.redirect(new URL('/', req.url));
        }
    }
    return NextResponse.redirect(new URL('/', req.url));
}