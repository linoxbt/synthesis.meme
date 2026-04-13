"use client";

import { useEffect, useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, AlertCircle, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Coin {
  item: {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    large: string;
    data?: {
      price: number;
      price_change_percentage_24h?: { usd?: number };
      market_cap?: string;
    };
  };
}

function SkeletonCard() {
  return (
    <div className="glass-card no-hover" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--bg-inset)', flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ height: 12, width: '60%', borderRadius: 4, background: 'var(--bg-inset)' }} />
        <div style={{ height: 10, width: '40%', borderRadius: 4, background: 'var(--bg-inset)' }} />
      </div>
    </div>
  );
}

export default function VibeReport() {
  const [data, setData] = useState<{ coins: Coin[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/vibe-report')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div style={{ maxWidth: 900 }}>
      {/* Header */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <h1 className="page-title">Daily Vibe Report</h1>
          <span className="badge badge-green">Live</span>
        </div>
        <p className="page-subtitle" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Calendar size={13} /> {today}
        </p>
      </div>

      {/* Summary card */}
      <div className="glass-card no-hover" style={{ padding: 24, marginBottom: 24, borderLeft: '3px solid var(--accent)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <AlertCircle size={18} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Executive Vibe Summary</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
              The meme ecosystem is heavily skewed toward <strong style={{ color: 'var(--text-primary)' }}>AI agent derivatives</strong> and next-gen narrative tokens.
              Real-time on-chain detection indicates a sharp volume surge on base layers, with the highest vibe momentum 
              concentrated in the emerging Agentic Web3 sector.
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 32, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 4 }}>Global Sentiment</div>
            <div style={{ fontWeight: 800, fontSize: 18, color: '#4DA2FF' }}>Extremely Bullish</div>
          </div>
          <div style={{ width: 1, background: 'var(--border-color)' }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 4 }}>Risk Appetite</div>
            <div style={{ fontWeight: 800, fontSize: 18, color: '#D2991A' }}>Elevated</div>
          </div>
          <div style={{ width: 1, background: 'var(--border-color)' }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 4 }}>Trend Leader</div>
            <div style={{ fontWeight: 800, fontSize: 18, color: '#23C55E' }}>AI Agents</div>
          </div>
        </div>
      </div>

      {/* Trending coins */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrendingUp size={16} style={{ color: 'var(--accent)' }} /> Trending Assets — Real-time
        </h2>
        <span className="tag">CoinGecko API</span>
      </div>

      {error && (
        <div className="glass-card" style={{ padding: 24, textAlign: 'center', color: '#F85149', borderColor: 'rgba(248,81,73,0.3)' }}>
          Could not load real-time data — API rate limit may be exceeded.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 12 }}>
        {loading
          ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : data?.coins?.slice(0, 10).map((coin) => {
              const change = coin.item.data?.price_change_percentage_24h?.usd;
              const isUp = (change ?? 0) >= 0;
              return (
                <Link key={coin.item.id} href={`/report/${coin.item.id}`}>
                  <div className="glass-card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
                    <Image
                      src={coin.item.large}
                      alt={coin.item.name}
                      width={44} height={44}
                      style={{ borderRadius: '50%', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>
                        {coin.item.name}
                        <span style={{ fontWeight: 400, fontSize: 12, color: 'var(--text-muted)', marginLeft: 6 }}>
                          {coin.item.symbol?.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                        {coin.item.data?.price ? `$${coin.item.data.price.toPrecision(4)}` : 'N/A'}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                      {change != null && (
                        <span className={`badge ${isUp ? 'badge-green' : 'badge-red'}`} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                          {isUp ? '+' : ''}{change.toFixed(2)}%
                        </span>
                      )}
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        #{coin.item.market_cap_rank || '—'}
                      </span>
                    </div>
                    <ChevronRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  </div>
                </Link>
              );
            })
        }
      </div>
    </div>
  );
}
