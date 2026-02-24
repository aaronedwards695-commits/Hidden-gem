'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export function GemRouteMap({
  parkingLat,
  parkingLng,
  spotLat,
  spotLng
}: {
  parkingLat: number;
  parkingLng: number;
  spotLat: number;
  spotLng: number;
}) {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!divRef.current) return;
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
      center: [spotLng, spotLat],
      zoom: 11
    });

    map.on('load', () => {
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [parkingLng, parkingLat],
              [spotLng, spotLat]
            ]
          },
          properties: {}
        }
      });
      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        paint: { 'line-color': '#1f3d33', 'line-width': 3 }
      });
      new maplibregl.Marker({ color: '#5f7a64' }).setLngLat([parkingLng, parkingLat]).addTo(map);
      new maplibregl.Marker({ color: '#1f3d33' }).setLngLat([spotLng, spotLat]).addTo(map);
      map.fitBounds(
        [
          [Math.min(parkingLng, spotLng), Math.min(parkingLat, spotLat)],
          [Math.max(parkingLng, spotLng), Math.max(parkingLat, spotLat)]
        ],
        { padding: 30 }
      );
    });

    return () => map.remove();
  }, [parkingLat, parkingLng, spotLat, spotLng]);

  return <div ref={divRef} className="h-72 w-full rounded-2xl" />;
}
