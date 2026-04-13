import Link from 'next/link';
import { VibeAreaChart } from '../components/DashboardCharts';
import { Activity, Zap, ShieldAlert, Cpu, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';

const narratives = [
  { rank: '01', name: 'AI Agents',    score: 98, delta: '+14', trend: 'up',   mempool: 'Critical' },
  { rank: '02', name: 'PolitiFi',     score: 85, delta: '+6',  trend: 'up',   mempool: 'High'     },
  { rank: '03', name: 'DeSci Memes',  score: 72, delta: '+3',  trend: 'up',   mempool: 'Medium'   },
  { rank: '04', name: 'Cat Coins',    score: 61, delta: '-8',  trend: 'down', mempool: 'Low'      },
  { rank: '05', name: 'Food Tokens',  score: 38, delta: '-11', trend: 'down', mempool: 'Low'      },
];

const stats = [
  { label: 'Global Vibe Score', value: '84.2°', delta: '+12.4%', up: true,  icon: Activity, color: '#4DA2FF' },
  { label: 'New Launches (24h)', value: '1,204', delta: '+342',   up: true,  icon: Zap,      color: '#23C55E' },
  { label: 'Flagged by Sentinel', value: '42',    delta: '-3',     up: false, icon: ShieldAlert, color: '#F85149' },
  { label: 'AI Forges Active',   value: '89',    delta: '+17',    up: true,  icon: Cpu,      color: '#D2991A' },
];

export default function Dashboard() {
  return (
    <div>
      {/* Page header */}
      <div className="page-header">
        <h1 className="page-title">Ecosystem Overview</h1>
        <p className="page-subtitle">Real-time intelligence and meme narrative analysis across BNB Chain.</p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {stats.map(({ label, value, delta, up, icon: Icon, color }) => (
          <div key={label} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span className="stat-label">{label}</span>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={15} style={{ color }} />
              </div>
            </div>
            <div className="stat-value">{value}</div>
            <div className={up ? 'stat-delta-up' : 'stat-delta-down'} style={{ marginTop: 4 }}>
              {up ? '↑' : '↓'} {delta} vs last week
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>

        {/* Chart card */}
        <div className="glass-card no-hover" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Meme Vibe Momentum</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Weekly composite score (0–100)</div>
            </div>
            <Link href="/report" className="btn btn-ghost" style={{ fontSize: 12 }}>
              Full Report <ArrowRight size={13} />
            </Link>
          </div>
          <VibeAreaChart />
        </div>

        {/* Narratives card */}
        <div className="glass-card no-hover" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Top Narratives</div>
            <Link href="/report" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>See all →</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {narratives.map((n) => (
              <Link key={n.rank} href={`/report/${n.name.toLowerCase().replace(/\s+/g,'-')}`}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 8px', borderRadius: 8, cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-inset)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'monospace', width: 20 }}>{n.rank}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{n.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Mempool: {n.mempool}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--accent)' }}>{n.score}</div>
                    <div style={{ fontSize: 11, color: n.trend === 'up' ? '#23C55E' : '#F85149', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
                      {n.trend === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                      {n.delta}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/studio" className="btn btn-primary" style={{ width: '100%', marginTop: 16 }}>
            <Zap size={14} /> Launch Trend Token
          </Link>
        </div>
      </div>
    </div>
  );
}
