'use client';

import { useMemo, useState } from 'react';
import { Button } from './ui';
import { Gem } from '@/lib/types';
import { proState, saveGemOffline } from '@/lib/storage';

export function ProGate({ gem, children }: { gem: Gem; children: React.ReactNode }) {
  const [isPro, setIsPro] = useState(() => proState.get());
  const blocked = useMemo(() => gem.accessLevel === 'pro' && !isPro, [gem.accessLevel, isPro]);

  if (!blocked) return <>{children}</>;

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 text-center shadow-soft">
      <h2 className="text-xl font-semibold text-pine">Pro preview only</h2>
      <p className="mt-3 text-sm">
        Unlock premium gems, offline map packs (coming soon), and GPX export support in future updates.
      </p>
      <Button className="mt-4" onClick={() => { proState.set(true); setIsPro(true); }}>
        Enable Pro (demo)
      </Button>
    </div>
  );
}

export function SaveOfflineButton({ gem }: { gem: Gem }) {
  const [saved, setSaved] = useState(false);

  return (
    <Button
      className="bg-moss"
      onClick={async () => {
        await saveGemOffline(gem);
        setSaved(true);
      }}
    >
      {saved ? 'Saved offline' : 'Save for offline'}
    </Button>
  );
}
