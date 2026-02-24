import gemsData from '@/data/gems.json';
import { Gem, GemFilters } from './types';

const gems = gemsData as Gem[];

export function getAllGems(): Gem[] {
  return gems;
}

export function getGemBySlug(slug: string): Gem | undefined {
  return gems.find((gem) => gem.slug === slug);
}

export function filterGems(filters: GemFilters): Gem[] {
  const query = filters.query?.trim().toLowerCase();

  return gems.filter((gem) => {
    const queryMatch =
      !query ||
      [gem.name, gem.region, gem.area, ...gem.tags].join(' ').toLowerCase().includes(query);

    const categoryMatch = !filters.categories?.length || filters.categories.includes(gem.category);
    const regionMatch = !filters.regions?.length || filters.regions.includes(gem.region);
    const difficultyMatch = !filters.difficulties?.length || filters.difficulties.includes(gem.difficulty);

    return queryMatch && categoryMatch && regionMatch && difficultyMatch;
  });
}
