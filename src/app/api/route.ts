import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { interests, interests1, interests2, interests3, interests4 } = body;
        const userMessage = interests === '理科'
        ? `小学生向けの${ interests }の自由研究テーマを提案してください。回答は「テーマ」と「研究内容」を教えてください。「研究内容」はその実験の内容を120文字で簡単にしてください。次の三つをヒントに。面白かった実験: ${interests1}。使用可能な材料: ${interests2}。期間: ${interests4}。`
        : `小学生向けの${ interests }の自由研究テーマを提案してください。回答は「テーマ」と「研究内容」を教えてください。「研究内容」はその実験の説明を120文字で簡単にしてください。次の三つをヒントに。気になること: ${interests3}。 期間: ${interests4}。`

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            // model: 'gpt-4o',
            max_tokens: 200,
            temperature: 0.5,
            messages: [
                { role: "system", content: "You are an assistant who helps elementary school students create independent research themes. Please respond in Japanese."},
                { role: 'user', content: userMessage }
            ]
        });

        const messageContent = completion && completion?.choices && Array.isArray(completion.choices) && completion.choices.length > 0 && completion.choices[0].message && completion.choices[0].message.content !== null

        if (!messageContent) {
            console.error('応答処理のエラーです。レスポンスの内容が不正です。');
            return NextResponse.json({ error: 'response error.' }, { status: 500 });
        }

        let Theme;
        let Content;

        // Responseデータがあり、中身があることを確認した上で、ThemeとContentに該当データを割り当てる。
        if (completion && completion?.choices && Array.isArray(completion.choices) && completion.choices.length > 0 && completion.choices[0].message && completion.choices[0].message.content !== null) {
            const responseText = completion.choices[0].message.content.trim();
            Theme = responseText.split('\n')[0];
            Content = responseText.split('\n')[1];
        }
        return NextResponse.json({ theme: Theme, content: Content });
    } catch (error) {
        console.error('APIのエラーです。', error)
        return NextResponse.json({ error: 'API error.' }, { status: 500 });
    }
}