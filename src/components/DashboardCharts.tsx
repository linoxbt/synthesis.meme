"use client";

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

const weekData = [
  { day: 'Mon', vibe: 62 },
  { day: 'Tue', vibe: 71 },
  { day: 'Wed', vibe: 58 },
  { day: 'Thu', vibe: 80 },
  { day: 'Fri', vibe: 75 },
  { day: 'Sat', vibe: 91 },
  { day: 'Sun', vibe: 88 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-surface-elevated)',
        border: '1px solid var(--border-color)',
        borderRadius: 8, padding: '8px 12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        fontSize: 12,
      }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>{label}</div>
        <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 14 }}>
          {payload[0].value}° Vibe
        </div>
      </div>
    );
  }
  return null;
};

export function VibeAreaChart() {
  return (
    <div style={{ width: '100%', height: 220 }}>
      <ResponsiveContainer>
        <AreaChart data={weekData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="vibeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#4DA2FF" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#4DA2FF" stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
          <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-accent)', strokeWidth: 1 }} />
          <Area
            type="monotone" dataKey="vibe"
            stroke="#4DA2FF" strokeWidth={2}
            fill="url(#vibeGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#4DA2FF', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
