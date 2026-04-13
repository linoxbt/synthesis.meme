"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Activity, ChevronRight, ShieldAlert, Cpu, Clock } from 'lucide-react';

const tokensData = [
  { name: 'QUANT/BNB',   risk: 'Low',    liq: '$45.2k',  time: '12s ago', flag: 'low',  slug: 'quant'  },
  { name: 'DOGEX/BNB',   risk: 'Medium', liq: '$102k',   time: '44s ago', flag: 'med',  slug: 'dogex'  },
  { name: 'PUMP/BNB',    risk: 'High',   liq: '$1.4k',   time: '1m ago',  flag: 'high', slug: 'pump'   },
  { name: 'AGENT/BNB',   risk: 'Low',    liq: '$550k',   time: '3m ago',  flag: 'low',  slug: 'agent'  },
  { name: 'PEPE0.2/BNB', risk: 'High',   liq: '$5.1k',   time: '7m ago',  flag: 'high', slug: 'pepe'   },
  { name: 'NEXUS/BNB',   risk: 'Low',    liq: '$210k',   time: '11m ago', flag: 'low',  slug: 'nexus'  },
  { name: 'FOMO/BNB',    risk: 'Medium', liq: '$88k',    time: '14m ago', flag: 'med',  slug: 'fomo'   },
];

export default function SentinelRadar() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ maxWidth: 1100 }}>
      {/* Header */}
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <h1 className="page-title">Sentinel Radar</h1>
              <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#23C55E', animation: 'pulse-dot 2s ease infinite' }} />
                Live
              </span>
            </div>
            <p className="page-subtitle">Real-time mempool scanning &amp; AI risk classification on BNB Chain</p>
          </div>
          <div className="glass-panel" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <Activity size={14} style={{ color: 'var(--accent)' }} />
            <span style={{ fontWeight: 600, fontFamily: 'monospace' }}>1.2ms</span>
            <span style={{ color: 'var(--text-muted)' }}>latency</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>

        {/* Token table */}
        <div className="glass-card no-hover" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={14} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontWeight: 700, fontSize: 14 }}>Deep-Scan Stream</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)' }}>
              Updated {tick * 3}s ago
            </span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Token Pair</th>
                <th>Risk</th>
                <th>Liquidity</th>
                <th style={{ textAlign: 'right' }}>Detected</th>
                <th style={{ textAlign: 'right' }}></th>
              </tr>
            </thead>
            <tbody>
              {tokensData.map((row) => (
                <tr key={row.slug} onClick={() => window.location.href = `/sentinel/${row.slug}`}>
                  <td style={{ fontWeight: 700, fontFamily: 'monospace', color: 'var(--text-primary)' }}>{row.name}</td>
                  <td><span className={`badge badge-risk-${row.flag}`}>{row.risk}</span></td>
                  <td style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{row.liq}</td>
                  <td style={{ textAlign: 'right', color: 'var(--text-muted)', fontSize: 12 }}>{row.time}</td>
                  <td style={{ textAlign: 'right' }}>
                    <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Side panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* AI analysis */}
          <div className="glass-card no-hover" style={{ padding: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Cpu size={14} style={{ color: 'var(--accent)' }} /> AI Contract Analysis
            </div>
            <div style={{ background: 'var(--bg-inset)', borderRadius: 8, padding: 14, fontFamily: 'monospace', fontSize: 12, lineHeight: 1.8 }}>
              <div style={{ color: 'var(--accent)' }}>&gt; Target: <span style={{ color: 'var(--text-primary)' }}>QUANT/BNB</span></div>
              <div style={{ color: 'var(--text-muted)' }}>&gt; Scanning bytecode...</div>
              <div style={{ color: '#23C55E' }}>&gt; LP Lock: 95% ✓</div>
              <div style={{ color: '#23C55E' }}>&gt; Contract verified ✓</div>
              <div style={{ color: '#D2991A' }}>&gt; Dev wallet: 12% ⚠</div>
              <div style={{ color: '#23C55E' }}>&gt; No honeypot ✓</div>
            </div>
            <button className="btn btn-secondary" style={{ width: '100%', marginTop: 12, fontSize: 13 }}>
              Full On-chain Audit
            </button>
          </div>

          {/* Blacklist alert */}
          <div className="glass-card no-hover" style={{ padding: 20, borderColor: 'rgba(248,81,73,0.3)' }}>
            <div style={{ fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, color: '#F85149' }}>
              <ShieldAlert size={14} /> Auto-Blacklisted
            </div>
            <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
              Sentinel has blocked <strong style={{ color: 'var(--text-primary)' }}>42</strong> recent deployments matching known honeypot bytecode signatures.
            </p>
            {['0x098f...d3e2', '0x88ea...f011', '0xf4c1...aa3d'].map(addr => (
              <div key={addr} style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)', padding: '4px 0', borderBottom: '1px solid var(--border-color)' }}>{addr}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
