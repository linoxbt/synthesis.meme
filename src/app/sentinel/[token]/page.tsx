"use client";

import React, { use } from 'react';
import { ArrowLeft, ShieldAlert, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const tokenDetails: Record<string, { name: string; riskLevel: string; riskColor: string; liq: string; score: number; checks: { label: string; status: 'pass' | 'warn' | 'fail'; detail: string }[] }> = {
  quant:  { name: 'QUANT/BNB',   riskLevel: 'Low',    riskColor: '#23C55E', liq: '$45.2k',  score: 15, checks: [
    { label: 'LP Lock', status: 'pass', detail: '95% locked for 12 months' },
    { label: 'Contract Ownership', status: 'pass', detail: 'Ownership renounced' },
    { label: 'Minting Functions', status: 'pass', detail: 'No minting capability' },
    { label: 'Dev Wallet', status: 'warn', detail: 'Dev holds 12% of supply' },
    { label: 'Honeypot Bytecode', status: 'pass', detail: 'No match in blacklist DB' },
  ]},
  dogex:  { name: 'DOGEX/BNB',   riskLevel: 'Medium', riskColor: '#D2991A', liq: '$102k',   score: 54, checks: [
    { label: 'LP Lock', status: 'warn', detail: 'Only 60% locked — partial risk' },
    { label: 'Contract Ownership', status: 'pass', detail: 'Renounced' },
    { label: 'Minting Functions', status: 'warn', detail: 'Hidden mint in _transfer modifier' },
    { label: 'Dev Wallet', status: 'pass', detail: 'Dev holds ~4%' },
    { label: 'Honeypot Bytecode', status: 'fail', detail: 'Partial match detected' },
  ]},
  pump:   { name: 'PUMP/BNB',    riskLevel: 'High',   riskColor: '#F85149', liq: '$1.4k',   score: 91, checks: [
    { label: 'LP Lock', status: 'fail', detail: 'No LP lock found' },
    { label: 'Contract Ownership', status: 'fail', detail: 'Owner NOT renounced' },
    { label: 'Minting Functions', status: 'fail', detail: 'Unlimited minting enabled' },
    { label: 'Dev Wallet', status: 'fail', detail: 'Dev holds 88% of supply' },
    { label: 'Honeypot Bytecode', status: 'fail', detail: 'Strong match with Titanium exploit' },
  ]},
  agent:  { name: 'AGENT/BNB',   riskLevel: 'Low',    riskColor: '#23C55E', liq: '$550k',   score: 6, checks: [
    { label: 'LP Lock', status: 'pass', detail: '100% locked for 24 months' },
    { label: 'Contract Ownership', status: 'pass', detail: 'Renounced and audited' },
    { label: 'Minting Functions', status: 'pass', detail: 'None' },
    { label: 'Dev Wallet', status: 'pass', detail: 'Dev holds 2%' },
    { label: 'Honeypot Bytecode', status: 'pass', detail: 'Clean — no matches' },
  ]},
  pepe:   { name: 'PEPE0.2/BNB', riskLevel: 'High',   riskColor: '#F85149', liq: '$5.1k',   score: 88, checks: [
    { label: 'LP Lock', status: 'fail', detail: 'LP removable by owner' },
    { label: 'Contract Ownership', status: 'fail', detail: 'Owner active and suspicious' },
    { label: 'Minting Functions', status: 'fail', detail: 'Hidden in proxy contract' },
    { label: 'Dev Wallet', status: 'warn', detail: 'Dev holds 32%' },
    { label: 'Honeypot Bytecode', status: 'fail', detail: 'Confirmed clone of known rug' },
  ]},
};

const icons = {
  pass: <CheckCircle size={15} style={{ color: '#23C55E' }} />,
  warn: <AlertTriangle size={15} style={{ color: '#D2991A' }} />,
  fail: <XCircle size={15} style={{ color: '#F85149' }} />,
};

export default function TokenDetail({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const detail = tokenDetails[token] ?? {
    name: `${token.toUpperCase()}/BNB`,
    riskLevel: 'Unknown', riskColor: 'var(--text-muted)',
    liq: 'N/A', score: 50,
    checks: [],
  };

  const scoreColor = detail.score < 30 ? '#23C55E' : detail.score < 65 ? '#D2991A' : '#F85149';

  return (
    <div style={{ maxWidth: 800 }}>
      <Link href="/sentinel" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24, fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
        <ArrowLeft size={14} /> Sentinel Radar
      </Link>

      {/* Hero */}
      <div className="glass-card no-hover" style={{ padding: 28, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>
              Token Security Report
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 900, fontFamily: 'monospace', letterSpacing: '-0.02em' }}>{detail.name}</h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className={`badge ${detail.riskLevel === 'Low' ? 'badge-green' : detail.riskLevel === 'Medium' ? 'badge-yellow' : 'badge-red'}`} style={{ fontSize: 12, padding: '4px 12px', marginBottom: 8, display: 'block' }}>
              {detail.riskLevel} Risk
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <div style={{ padding: '14px 16px', background: 'var(--bg-inset)', borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Danger Score</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: scoreColor }}>{detail.score}/100</div>
          </div>
          <div style={{ padding: '14px 16px', background: 'var(--bg-inset)', borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Liquidity</div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>{detail.liq}</div>
          </div>
          <div style={{ padding: '14px 16px', background: 'var(--bg-inset)', borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Sentinel Verdict</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: detail.riskColor }}>
              {detail.riskLevel === 'Low' ? '✓ Safe to trade' : detail.riskLevel === 'Medium' ? '⚠ Trade cautiously' : '✗ Avoid — High risk'}
            </div>
          </div>
        </div>

        {/* Score bar */}
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
            <span>Risk Level</span>
            <span>{detail.score}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${detail.score}%`, background: scoreColor }} />
          </div>
        </div>
      </div>

      {/* Security checks */}
      <div className="glass-card no-hover" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShieldAlert size={15} style={{ color: 'var(--accent)' }} />
          <span style={{ fontWeight: 700, fontSize: 14 }}>Security Audit Checks</span>
        </div>
        {detail.checks.length > 0 ? detail.checks.map(({ label, status, detail: d }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: '1px solid var(--border-color)' }}>
            {icons[status]}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{d}</div>
            </div>
            <span className={`badge ${status === 'pass' ? 'badge-green' : status === 'warn' ? 'badge-yellow' : 'badge-red'}`}>
              {status.toUpperCase()}
            </span>
          </div>
        )) : (
          <div style={{ padding: 24, color: 'var(--text-muted)', textAlign: 'center', fontSize: 14 }}>No audit data available for this token.</div>
        )}
      </div>
    </div>
  );
}
