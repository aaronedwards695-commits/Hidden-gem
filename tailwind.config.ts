import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        oat: '#f7f5f0',
        pine: '#1f3d33',
        moss: '#5f7a64',
        stone: '#59616a'
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,.06)'
      }
    }
  },
  plugins: []
};

export default config;
