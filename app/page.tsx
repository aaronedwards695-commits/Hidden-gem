'use client';

import { useMemo, useState } from 'react';
import { ProToggle } from '@/components/pro-toggle';
import { GemCard } from '@/components/ui';
import { filterGems, getAllGems } from '@/lib/data';
import { Category, Difficulty, Gem } from '@/lib/types';

const categories: Category[] = ['wild_swim', 'waterfall', 'wild_camp', 'viewpoint', 'gorge'];
const regions: Gem['region'][] = ['England', 'Wales', 'Scotland', 'Northern Ireland'];
const difficulties: Difficulty[] = ['easy', 'moderate', 'hard'];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState<Category[]>([]);
  const [activeRegions, setActiveRegions] = useState<Gem['region'][]>([]);
  const [activeDifficulties, setActiveDifficulties] = useState<Difficulty[]>([]);

  const filtered = useMemo(
    () =>
      filterGems({
        query,
        categories: activeCategories,
        regions: activeRegions,
        difficulties: activeDifficulties
      }),
    [query, activeCategories, activeRegions, activeDifficulties]
  );

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <section className="space-y-4 rounded-3xl bg-gradient-to-br from-pine to-moss p-8 text-white">
        <p className="text-sm uppercase tracking-[0.2em] text-white/70">Discover hidden UK adventures</p>
        <h1 className="max-w-xl text-4xl font-semibold">Find waterfalls, wild swims, gorges and viewpoints worth the hike.</h1>
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, region, tags"
            className="w-full max-w-md rounded-xl border border-white/30 bg-white/10 px-4 py-2 placeholder:text-white/70"
          />
          <ProToggle />
        </div>
      </section>

      <section className="space-y-4">
        <FilterRow title="Category" values={categories} active={activeCategories} setActive={setActiveCategories} />
        <FilterRow title="Region" values={regions} active={activeRegions} setActive={setActiveRegions} />
        <FilterRow title="Difficulty" values={difficulties} active={activeDifficulties} setActive={setActiveDifficulties} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((gem) => (
          <GemCard
            key={gem.id}
            href={`/gem/${gem.slug}`}
            title={gem.name}
            category={gem.category}
            summary={gem.summary}
            meta={`${gem.region} · ${gem.area} · ${gem.difficulty}`}
            gated={gem.accessLevel === 'pro'}
          />
        ))}
      </section>
    </main>
  );
}

function FilterRow<T extends string>({
  title,
  values,
  active,
  setActive
}: {
  title: string;
  values: T[];
  active: T[];
  setActive: (value: T[]) => void;
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-pine">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => {
          const on = active.includes(value);
          return (
            <button
              key={value}
              onClick={() => setActive(on ? active.filter((x) => x !== value) : [...active, value])}
              className={`rounded-full border px-3 py-1 text-sm ${on ? 'border-pine bg-pine text-white' : 'border-black/10 bg-white'}`}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}
