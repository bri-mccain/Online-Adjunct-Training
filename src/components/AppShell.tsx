import { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function AppShell({ title, subtitle, children }: Props) {
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#111827', minHeight: '100vh', background: '#f3f4f6' }}>
      <header style={{ background: '#111827', color: '#fff', padding: '1rem 1.25rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.25rem' }}>{title}</h1>
        {subtitle ? <p style={{ margin: '0.35rem 0 0', opacity: 0.9 }}>{subtitle}</p> : null}
      </header>
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '1rem' }}>{children}</main>
    </div>
  );
}
