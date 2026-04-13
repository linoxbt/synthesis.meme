import { Settings, Key, Zap, ShieldCheck, Info } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your API integrations, radar configuration, and platform preferences.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* API Integrations */}
        <div className="glass-card no-hover" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Key size={15} style={{ color: 'var(--accent)' }} />
            <span style={{ fontWeight: 700, fontSize: 14 }}>API Integrations</span>
          </div>
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* OpenAI */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>OpenAI API Key</div>
                <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <ShieldCheck size={10} /> Active
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="password"
                  defaultValue="sk-proj-h98PF0hABFs..."
                  disabled
                  className="input-base"
                  style={{ fontFamily: 'monospace', fontSize: 13 }}
                />
                <button className="btn btn-secondary" style={{ flexShrink: 0 }}>Update</button>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                Powers all GPT-4o brand generation in MemeForge Studio.
              </div>
            </div>

            {/* WalletConnect */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>WalletConnect Project ID</div>
              <input
                type="text"
                defaultValue="f0d6f8162be1beccf221b4e2f8bd7026"
                disabled
                className="input-base"
                style={{ fontFamily: 'monospace', fontSize: 13 }}
              />
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                Enables MetaMask, Trust Wallet, and mobile QR wallet connections.
              </div>
            </div>
          </div>
        </div>

        {/* Radar config */}
        <div className="glass-card no-hover" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Zap size={15} style={{ color: 'var(--accent)' }} />
            <span style={{ fontWeight: 700, fontSize: 14 }}>Sentinel Radar Config</span>
          </div>
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Deep Mempool Scanning', desc: 'Detect new tokens before liquidity is locked', on: true },
              { label: 'Auto-Flag Honeypots', desc: 'Use AI clustering to block suspected rug pulls automatically', on: true },
              { label: 'High-Risk Alerts', desc: 'Receive real-time notifications for critical danger scores', on: false },
              { label: 'LP Removal Monitoring', desc: 'Alert when liquidity providers remove funds', on: true },
            ].map(({ label, desc, on }) => (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 16px', background: 'var(--bg-inset)',
                borderRadius: 8, border: '1px solid var(--border-color)',
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{desc}</div>
                </div>
                <div style={{
                  width: 40, height: 22, borderRadius: 99,
                  background: on ? 'var(--accent)' : 'var(--border-color)',
                  position: 'relative', cursor: 'pointer', flexShrink: 0,
                  transition: 'background 0.2s',
                }}>
                  <div style={{
                    position: 'absolute', top: 3,
                    left: on ? 'calc(100% - 19px)' : 3,
                    width: 16, height: 16, borderRadius: '50%',
                    background: '#fff',
                    transition: 'left 0.2s',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="glass-card no-hover" style={{ padding: 18, display: 'flex', gap: 12, borderColor: 'rgba(77,162,255,0.3)' }}>
          <Info size={15} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Network</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Currently connected to <strong style={{ color: 'var(--text-primary)' }}>BNB Chain Mainnet</strong> (Chain ID: 56). 
              Switch to <strong>BSC Testnet</strong> for safe experimentation without real funds.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
