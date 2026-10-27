'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');
  useEffect(() => { setTheme(document.documentElement.dataset.theme || 'dark'); }, []);
  const next = theme === 'dark' ? 'light' : 'dark';
  const flip = () => {
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    setTheme(next);
  };
  return (
    <button className="theme" onClick={flip} aria-label={`Switch to ${next} theme`}>
      <span className="swatch" aria-hidden="true" />
      {next === 'light' ? 'Light' : 'Dark'}
    </button>
  );
}
