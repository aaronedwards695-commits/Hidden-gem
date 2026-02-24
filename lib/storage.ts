'use client';

import { get, set } from 'idb-keyval';
import { Gem } from './types';

const PRO_KEY = 'trailvault-pro-enabled';
const SAVED_IDS_KEY = 'trailvault-saved-ids';

export const proState = {
  get: () => (typeof window !== 'undefined' ? localStorage.getItem(PRO_KEY) === 'true' : false),
  set: (value: boolean) => {
    localStorage.setItem(PRO_KEY, String(value));
    window.dispatchEvent(new Event('trailvault-pro-change'));
  }
};

export async function saveGemOffline(gem: Gem) {
  const current = ((await get(SAVED_IDS_KEY)) as string[] | undefined) ?? [];
  const next = Array.from(new Set([...current, gem.id]));
  await set(SAVED_IDS_KEY, next);
  await set(`gem:${gem.id}`, gem);
}

export async function removeGemOffline(id: string) {
  const current = ((await get(SAVED_IDS_KEY)) as string[] | undefined) ?? [];
  await set(
    SAVED_IDS_KEY,
    current.filter((item) => item !== id)
  );
}

export async function getSavedGemIds() {
  return (((await get(SAVED_IDS_KEY)) as string[] | undefined) ?? []);
}

export async function getSavedGemById(id: string) {
  return ((await get(`gem:${id}`)) as Gem | undefined) ?? undefined;
}
