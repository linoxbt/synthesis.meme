"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 34, height: 34 }} />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="btn btn-ghost"
      style={{ width: 34, height: 34, padding: 0, borderRadius: 8 }}
      title="Toggle theme"
    >
      {resolvedTheme === "dark"
        ? <Sun size={16} style={{ color: 'var(--text-secondary)' }} />
        : <Moon size={16} style={{ color: 'var(--text-secondary)' }} />
      }
    </button>
  );
}
