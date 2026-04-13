import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { idea } = await req.json();

    if (!idea) {
      return NextResponse.json({ error: 'Idea is required' }, { status: 400 });
    }

    const generatedResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are MemeForge. Create a JSON ONLY for a new meme token based on the user's idea. 
The JSON must specifically contain these keys: 
"name": (string, catchy token name),
"ticker": (string, 3-5 uppercase letters),
"description": (string, 2 sentences funny structured lore),
"launchStrategy": (string, brief 1 sentence highly effective marketing strategy).
Do not include any other text except the JSON.`
        },
        {
          role: "user",
          content: idea
        }
      ],
      temperature: 0.7,
    });

    const generated = JSON.parse(generatedResponse.choices[0].message.content || '{}');

    // Return the generated details + dynamic image URL
    return NextResponse.json({
      ...generated,
      imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent(`Logo for crypto token ${generated.name}, modern, dark, neon, high tech, highly detailed meme style`)}?width=400&height=400&nologo=true`
    });
  } catch (error) {
    console.error('Error generating brand:', error);
    return NextResponse.json({ error: 'Failed to generate brand using OpenAI' }, { status: 500 });
  }
}

