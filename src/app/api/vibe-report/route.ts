import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/search/trending', {
        headers: {
            'Accept': 'application/json',
        },
        next: { revalidate: 60 * 15 } // cache for 15 minutes
    });

    if (!res.ok) {
        throw new Error('Failed to fetch from CoinGecko');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching trending vibes:', error);
    return NextResponse.json({ error: 'Failed to generate vibe report' }, { status: 500 });
  }
}
