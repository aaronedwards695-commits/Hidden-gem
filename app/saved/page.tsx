'use client';

import { useEffect, useState } from 'react';
import { Gem } from '@/lib/types';
import { getSavedGemById, getSavedGemIds } from '@/lib/storage';
import { GemCard } from '@/components/ui';

export default function SavedPage() {
  const [gems, setGems] = useState<Gem[]>([]);

  useEffect(() => {
    (async () => {
      const ids = await getSavedGemIds();
      const items = await Promise.all(ids.map((id) => getSavedGemById(id)));
      setGems(items.filter(Boolean) as Gem[]);
    })();
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-semibold text-pine">Saved for offline</h1>
      {gems.length === 0 ? (
        <p className="text-sm text-black/60">No gems saved yet.</p>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gems.map((gem) => (
            <GemCard
              key={gem.id}
              href={`/gem/${gem.slug}`}
              title={gem.name}
              summary={gem.summary}
              category={gem.category}
              meta={`${gem.region} · ${gem.area}`}
              gated={gem.accessLevel === 'pro'}
            />
          ))}
        </section>
      )}
    </main>
  );
}
