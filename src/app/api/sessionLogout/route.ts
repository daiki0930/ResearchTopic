import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    try {
        const response = NextResponse.json({ message: 'ログアウト成功' });
        response.cookies.set('gpt-login-session', '', {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 0
        });
        return response;
    } catch (error) {
        console.error('ログアウトエラー', error);
        return NextResponse.json({ error: 'ログアウト失敗' }, { status: 500 });
    }
}