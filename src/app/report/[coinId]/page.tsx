"use client";

import React, { use } from 'react';
import { ArrowLeft, BarChart2, Brain, TrendingUp, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { VibeAreaChart } from '../../../components/DashboardCharts';

export default function CoinVibeDetail({ params }: { params: Promise<{ coinId: string }> }) {
  const { coinId } = use(params);
  const displayName = coinId.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div style={{ maxWidth: 900 }}>
      <Link href="/report" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
        <ArrowLeft size={14} /> Back to Vibe Report
      </Link>

      {/* Hero */}
      <div className="glass-card no-hover" style={{ padding: 28, marginBottom: 20, borderLeft: '3px solid var(--accent)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: 6 }}>
              Deep Vibe Analysis
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800 }}>{displayName}</h1>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="badge badge-green">Bullish</span>
            <button className="btn btn-primary">Monitor Asset</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 24 }}>
          {[
            { label: 'Vibe Score', value: '84/100', color: 'var(--accent)' },
            { label: 'Confidence', value: '91%', color: '#23C55E' },
            { label: 'Mempool Heat', value: 'Critical', color: '#F85149' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ padding: '14px 16px', background: 'var(--bg-inset)', borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Chart */}
        <div className="glass-card no-hover" style={{ padding: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <TrendingUp size={15} style={{ color: 'var(--accent)' }} /> Vibe Momentum (7d)
          </div>
          <VibeAreaChart />
        </div>

        {/* AI Analysis */}
        <div className="glass-card no-hover" style={{ padding: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Brain size={15} style={{ color: 'var(--accent)' }} /> AI Sentiment Read
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
            On-chain validation for <strong style={{ color: 'var(--text-primary)' }}>{displayName}</strong> indicates high retail 
            inflow matching institutional distribution signatures. Vibe scores maintain a sharp upward trajectory 
            over the last 12 hours with elevated social velocity.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'LP Lock Verified', pass: true  },
              { label: 'Contract Audited',  pass: true  },
              { label: 'Dev Wallet: 12%',   pass: false },
              { label: 'Honeypot Bytecode', pass: true  },
            ].map(({ label, pass }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg-inset)', borderRadius: 6 }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: pass ? '#23C55E' : '#F85149' }}>
                  {pass ? '✓ PASS' : '⚠ WARN'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
