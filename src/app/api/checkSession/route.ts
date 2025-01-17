import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import { admin } from "@/app/Authentication/Login/firebaseAdmin/firebaseAdmin";

export async function GET(req: NextRequest) {
    const sessionCookie = req.cookies.get("gpt-login-session");
    // console.log('-----Cookie確認-----', sessionCookie);
    if(!sessionCookie) {
        return NextResponse.json({ authenticated: false });
    }
    // console.log('-----Cookie確認1-----', sessionCookie.name);

    try {
        const check = await admin.auth().verifySessionCookie(sessionCookie.value, true);
        // console.log('-----Cookie確認2-----',check);
        return NextResponse.json({ authenticated: true }, { status: 200 });
    } catch(error) {
        console.error("認証エラー:", error);
        return NextResponse.json(
            { message: "Internal Server Error"}, { status: 500});
    }
}