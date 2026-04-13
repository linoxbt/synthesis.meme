"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, BarChart2, Wand2, Package, Settings, Zap } from 'lucide-react';

const navItems = [
  { section: 'Overview', links: [
    { href: '/',         icon: Home,     label: 'Dashboard'     },
    { href: '/report',   icon: BarChart2, label: 'Vibe Report'  },
    { href: '/sentinel', icon: Compass,  label: 'Sentinel Radar'},
  ]},
  { section: 'Studio', links: [
    { href: '/studio',    icon: Wand2,   label: 'Forge Brand'   },
    { href: '/universes', icon: Package, label: 'My Universes'  },
  ]},
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Brand */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 10px 20px', borderBottom: '1px solid var(--border-color)', marginBottom: 8 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, #4DA2FF 0%, #1B6CCB 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Zap size={18} color="#fff" />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: '-0.02em', lineHeight: 1.2 }}>Synthesis</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>.meme</div>
        </div>
      </Link>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        {navItems.map(({ section, links }) => (
          <div key={section}>
            <div className="nav-section-label">{section}</div>
            {links.map(({ href, icon: Icon, label }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link key={href} href={href} className={`nav-item ${isActive ? 'active' : ''}`}>
                  <Icon size={16} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', marginBottom: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#23C55E' }} />
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>BNB Chain · Mainnet</span>
        </div>
        <Link href="/settings" className={`nav-item ${pathname === '/settings' ? 'active' : ''}`}>
          <Settings size={16} />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
