import dynamic from 'next/dynamic';
import { getAllGems } from '@/lib/data';

const GemsMap = dynamic(() => import('@/components/gems-map'), { ssr: false });

export default function MapPage() {
  const gems = getAllGems();

  return (
    <main className="relative">
      <GemsMap gems={gems} />
    </main>
  );
}
