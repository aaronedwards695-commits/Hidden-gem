'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import maplibregl, { GeoJSONSource } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Gem } from '@/lib/types';
import { BottomSheet, Button } from './ui';
import Image from 'next/image';
import Link from 'next/link';

const categoryColors: Record<string, string> = {
  wild_swim: '#2f6f84',
  waterfall: '#4d9f70',
  wild_camp: '#907f5f',
  viewpoint: '#835a75',
  gorge: '#5f6bb2'
};

export default function GemsMap({ gems }: { gems: Gem[] }) {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<Gem | null>(null);
  const [enabledCategories, setEnabledCategories] = useState<string[]>(Object.keys(categoryColors));

  const geojson = useMemo(
    () => ({
      type: 'FeatureCollection' as const,
      features: gems
        .filter((gem) => enabledCategories.includes(gem.category))
        .map((gem) => ({
          type: 'Feature' as const,
          properties: { id: gem.id, category: gem.category },
          geometry: { type: 'Point' as const, coordinates: [gem.coords.spotLng, gem.coords.spotLat] }
        }))
    }),
    [enabledCategories, gems]
  );

  useEffect(() => {
    if (!divRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: divRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [{ id: 'osm', type: 'raster', source: 'osm' }]
      },
      center: [-3.5, 54.5],
      zoom: 4.8
    });

    map.on('load', () => {
      map.addSource('gems', {
        type: 'geojson',
        data: geojson,
        cluster: true,
        clusterRadius: 40
      });

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'gems',
        filter: ['has', 'point_count'],
        paint: { 'circle-color': '#1f3d33', 'circle-radius': 20 }
      });

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'gems',
        filter: ['has', 'point_count'],
        layout: { 'text-field': ['get', 'point_count_abbreviated'], 'text-size': 12 },
        paint: { 'text-color': '#fff' }
      });

      map.addLayer({
        id: 'unclustered',
        type: 'circle',
        source: 'gems',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': ['match', ['get', 'category'], ...Object.entries(categoryColors).flat(), '#333'],
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#fff'
        }
      });

      map.on('click', 'unclustered', (event) => {
        const id = event.features?.[0].properties?.id;
        const gem = gems.find((item) => item.id === id);
        if (gem) setSelected(gem);
      });
    });

    mapRef.current = map;
    return () => map.remove();
  }, [geojson, gems]);

  useEffect(() => {
    const source = mapRef.current?.getSource('gems') as GeoJSONSource | undefined;
    source?.setData(geojson);
  }, [geojson]);

  return (
    <>
      <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2 rounded-xl bg-white/90 p-2">
        {Object.keys(categoryColors).map((category) => {
          const active = enabledCategories.includes(category);
          return (
            <button
              key={category}
              className={`rounded-full px-3 py-1 text-xs ${active ? 'bg-pine text-white' : 'bg-black/10'}`}
              onClick={() =>
                setEnabledCategories((prev) =>
                  active ? prev.filter((item) => item !== category) : [...prev, category]
                )
              }
            >
              {category}
            </button>
          );
        })}
      </div>
      <div ref={divRef} className="h-[calc(100vh-62px)] w-full" />
      <BottomSheet open={Boolean(selected)}>
        {selected && (
          <div className="space-y-3">
            <div className="relative h-32 w-full overflow-hidden rounded-xl bg-black/5">
              <Image src={(selected.photos?.[0] ?? '/images/placeholder.svg')} alt={selected.name} fill className="object-cover" />
            </div>
            <h3 className="text-lg font-semibold text-pine">{selected.name}</h3>
            <p className="text-sm">{selected.summary}</p>
            <div className="flex gap-2">
              <Link href={`/gem/${selected.slug}`}>
                <Button>View details</Button>
              </Link>
              <Button className="bg-black/20 text-black" onClick={() => setSelected(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </BottomSheet>
    </>
  );
}
