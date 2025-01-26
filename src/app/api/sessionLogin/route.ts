import { NextResponse } from "next/server";
import { admin } from "@/app/Authentication/Login/firebaseAdmin/firebaseAdmin";

export async function POST(req: Request) {
    try {
        const { idToken } = await req.json();
        
        await admin.auth().verifyIdToken(idToken);
        const expiresIn = 60 * 60 * 6 * 1000;
        const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
        
        const response = NextResponse.json({ message: 'ログイン成功' });
        response.cookies.set('gpt-login-session', sessionCookie, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: expiresIn
        });
        return response;
    } catch (error) {
        console.error('認証エラー:', error);
        return NextResponse.json({ error: '認証失敗' }, { status: 500 });
    }
}