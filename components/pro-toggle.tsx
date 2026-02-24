'use client';

import { useEffect, useState } from 'react';
import { Toggle } from './ui';
import { proState } from '@/lib/storage';

export function ProToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(proState.get());
    sync();
    window.addEventListener('trailvault-pro-change', sync);
    return () => window.removeEventListener('trailvault-pro-change', sync);
  }, []);

  return <Toggle enabled={enabled} onToggle={() => proState.set(!enabled)} label="Enable Pro (demo)" />;
}
