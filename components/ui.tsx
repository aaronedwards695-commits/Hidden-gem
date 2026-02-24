'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-pine">{title}</h2>
      {children}
    </section>
  );
}

export function Badge({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'pro' }) {
  return (
    <span
      className={clsx(
        'rounded-full px-3 py-1 text-xs font-medium',
        tone === 'pro' ? 'bg-pine text-white' : 'bg-white text-stone border border-black/10'
      )}
    >
      {children}
    </span>
  );
}

export function Button({ children, className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        'rounded-xl bg-pine px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Toggle({ enabled, onToggle, label }: { enabled: boolean; onToggle: () => void; label: string }) {
  return (
    <button onClick={onToggle} className="flex items-center gap-2 text-sm" type="button">
      <span
        className={clsx(
          'relative h-6 w-11 rounded-full transition',
          enabled ? 'bg-pine' : 'bg-black/20'
        )}
      >
        <span
          className={clsx(
            'absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition',
            enabled && 'translate-x-5'
          )}
        />
      </span>
      {label}
    </button>
  );
}

export function GemCard({
  href,
  title,
  summary,
  meta,
  gated,
  category
}: {
  href: string;
  title: string;
  summary: string;
  meta: string;
  category: string;
  gated?: boolean;
}) {
  return (
    <Link href={href} className="block rounded-2xl border border-black/10 bg-white p-4 shadow-soft transition hover:-translate-y-1">
      <div className="mb-2 flex flex-wrap gap-2">
        <Badge>{category}</Badge>
        {gated && <Badge tone="pro">Pro</Badge>}
      </div>
      <h3 className="text-lg font-semibold text-pine">{title}</h3>
      <p className="mt-2 text-sm">{summary}</p>
      <p className="mt-3 text-xs uppercase tracking-wide text-black/40">{meta}</p>
    </Link>
  );
}

export function BottomSheet({ open, children }: { open: boolean; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 rounded-t-3xl border border-black/10 bg-white p-4 shadow-soft">
      {children}
    </div>
  );
}
