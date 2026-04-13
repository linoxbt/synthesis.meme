"use client";

import { useState } from 'react';
import { Wand2, Sparkles, ArrowRight, RotateCcw, Download, Rocket, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface BrandResult {
  name: string;
  ticker: string;
  description: string;
  launchStrategy: string;
  imageUrl: string;
}

const EXAMPLE_IDEAS = [
  'A sentient quantum cat that predicts BNB price movements',
  'AI-powered dog coin that donates to animal shelters',
  'A DeSci token funding meme research labs',
  'Political satire coin that burns tokens when politicians lie',
];

export default function Studio() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BrandResult | null>(null);
  const [error, setError] = useState('');

  const generate = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/generate-brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });
      if (!res.ok) throw new Error('Generation failed');
      setResult(await res.json());
    } catch (e) {
      setError('Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setResult(null); setIdea(''); setError(''); };

  return (
    <div style={{ maxWidth: 1000 }}>
      {/* Header */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <h1 className="page-title">MemeForge Studio</h1>
          <span className="badge badge-blue">GPT-4o</span>
        </div>
        <p className="page-subtitle">Describe any concept — AI generates a complete, launch-ready token brand in seconds.</p>
      </div>

      {/* Input phase */}
      {!result && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
          <div className="glass-card no-hover" style={{ padding: 28 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>What's your vision?</div>
            <textarea
              className="input-base"
              rows={5}
              value={idea}
              onChange={e => setIdea(e.target.value)}
              placeholder="e.g., A cyberpunk cat that predicts BNB chain futures using quantum AI..."
              style={{ fontSize: 15, marginBottom: 20 }}
              onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) generate(); }}
            />
            {error && <div style={{ fontSize: 13, color: '#F85149', marginBottom: 12 }}>{error}</div>}
            <button
              className="btn btn-primary"
              style={{ width: '100%', padding: '13px 0', fontSize: 14 }}
              onClick={generate}
              disabled={loading || !idea.trim()}
            >
              {loading ? (
                <><div className="spinner" /> Forging Universe...</>
              ) : (
                <><Wand2 size={16} /> Forge Token Brand</>
              )}
            </button>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
              ⌘ + Enter to generate
            </div>
          </div>

          {/* Examples */}
          <div className="glass-card no-hover" style={{ padding: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
              Try an example
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {EXAMPLE_IDEAS.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setIdea(ex)}
                  style={{
                    textAlign: 'left', padding: '10px 14px', borderRadius: 8,
                    background: 'var(--bg-inset)', border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.5,
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Result phase */}
      {result && !loading && (
        <div className="animate-fade-up">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle size={16} style={{ color: '#23C55E' }} />
              <span style={{ fontWeight: 600, color: '#23C55E' }}>Brand Generated Successfully</span>
            </div>
            <button className="btn btn-ghost" onClick={reset} style={{ gap: 6 }}>
              <RotateCcw size={14} /> New Idea
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
            {/* Logo panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="glass-card no-hover" style={{ padding: 20 }}>
                <div style={{ aspectRatio: '1/1', borderRadius: 12, overflow: 'hidden', marginBottom: 16, position: 'relative', background: 'var(--bg-inset)' }}>
                  <Image src={result.imageUrl} alt={result.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>AI-Generated Logo</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Synthesized via Pollinations.ai image pipeline.
                </div>
              </div>

              <button className="btn btn-secondary" style={{ width: '100%', gap: 8 }}>
                <Download size={14} /> Download Assets
              </button>
              <button className="btn btn-primary" style={{ width: '100%', gap: 8, padding: '12px 0' }}>
                <Rocket size={14} /> Deploy to Four.meme
              </button>
            </div>

            {/* Info panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="glass-card no-hover" style={{ padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: 6 }}>Token Identity</div>
                    <h2 style={{ fontSize: 32, fontWeight: 900 }}>{result.name}</h2>
                  </div>
                  <div style={{ padding: '8px 16px', background: 'var(--accent-dim)', color: 'var(--accent)', fontFamily: 'monospace', fontWeight: 800, fontSize: 20, borderRadius: 8, border: '1px solid var(--border-accent)' }}>
                    {result.ticker}
                  </div>
                </div>
                <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>
                  {result.description}
                </p>
                <div style={{ padding: 20, background: 'var(--bg-inset)', borderRadius: 10, border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <Sparkles size={15} style={{ color: 'var(--accent)' }} />
                    <span style={{ fontWeight: 700, fontSize: 13 }}>AI Launch Strategy</span>
                  </div>
                  <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{result.launchStrategy}</p>
                </div>
              </div>

              {/* Build pipeline */}
              <div className="glass-card no-hover" style={{ padding: 24 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Universe Extension Pipeline</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { label: 'Brand Identity Matrix', done: true  },
                    { label: 'Twitter Agent Initialization', done: false, action: 'Execute' },
                    { label: 'Smart Contract Simulation',    done: false, action: 'Simulate' },
                    { label: 'Community Airdrop Config',     done: false, action: 'Configure' },
                  ].map(({ label, done, action }) => (
                    <div key={label} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 14px', borderRadius: 8, background: 'var(--bg-inset)',
                      opacity: done ? 1 : 0.7,
                    }}>
                      <CheckCircle size={15} style={{ color: done ? '#23C55E' : 'var(--text-muted)', flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{label}</span>
                      {done
                        ? <span className="badge badge-green">Done</span>
                        : <button className="btn btn-ghost" style={{ fontSize: 12, padding: '4px 10px' }}>{action} <ArrowRight size={12} /></button>
                      }
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
