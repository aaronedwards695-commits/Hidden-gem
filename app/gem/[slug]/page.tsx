import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getAllGems, getGemBySlug } from '@/lib/data';
import { Badge, Button, Section } from '@/components/ui';
import { ProGate, SaveOfflineButton } from '@/components/gem-actions';
import { GemRouteMap } from '@/components/gem-route-map';

export function generateStaticParams() {
  return getAllGems().map((gem) => ({ slug: gem.slug }));
}

export default function GemDetailPage({ params }: { params: { slug: string } }) {
  const gem = getGemBySlug(params.slug);
  if (!gem) return notFound();

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${gem.coords.spotLat},${gem.coords.spotLng}`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${gem.coords.spotLat},${gem.coords.spotLng}`;

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <header className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge>{gem.category}</Badge>
          <Badge>{gem.region}</Badge>
          {gem.accessLevel === 'pro' && <Badge tone="pro">Pro</Badge>}
        </div>
        <h1 className="text-3xl font-semibold text-pine">{gem.name}</h1>
        <p>{gem.summary}</p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {(gem.photos.length ? gem.photos : ['/images/placeholder.svg']).slice(0, 3).map((src, idx) => (
          <div key={`${src}-${idx}`} className="relative h-48 overflow-hidden rounded-2xl bg-black/5">
            <Image
              src={src}
              alt={`${gem.name} photo ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </section>

      <ProGate gem={gem}>
        <div className="grid gap-6 md:grid-cols-2">
          <Section title="What to expect"><p>{gem.whatToExpect}</p></Section>
          <Section title="Parking"><p>{gem.parking}</p></Section>
          <Section title="Safety"><ul className="list-inside list-disc">{gem.safety.map((item) => <li key={item}>{item}</li>)}</ul></Section>
          <Section title="Tips"><ul className="list-inside list-disc">{gem.tips.map((item) => <li key={item}>{item}</li>)}</ul></Section>
          <Section title="Costs"><p>{gem.costs}</p></Section>
          <Section title="Route pins">
            <GemRouteMap
              parkingLat={gem.coords.parkingLat}
              parkingLng={gem.coords.parkingLng}
              spotLat={gem.coords.spotLat}
              spotLng={gem.coords.spotLng}
            />
            <p className="text-sm text-black/60">Straight-line route shown in this MVP.</p>
          </Section>
          {gem.osGridRef && (
            <Section title="OS Grid reference"><p>{gem.osGridRef}</p></Section>
          )}
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          <a href={googleMapsUrl} target="_blank"><Button>Open in Google Maps</Button></a>
          <a href={appleMapsUrl} target="_blank"><Button className="bg-stone">Open in Apple Maps</Button></a>
          <SaveOfflineButton gem={gem} />
        </div>
      </ProGate>
    </main>
  );
}
