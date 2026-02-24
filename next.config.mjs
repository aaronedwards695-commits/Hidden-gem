import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/tile\.openstreetmap\.org\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'osm-tiles',
        expiration: {
          maxEntries: 256,
          maxAgeSeconds: 60 * 60 * 24 * 14
        }
      }
    },
    {
      urlPattern: /\/data\/gems\.json$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'dataset-cache'
      }
    }
  ]
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  }
};

export default withPWA(nextConfig);
