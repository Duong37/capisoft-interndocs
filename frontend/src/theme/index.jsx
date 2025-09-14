import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';

// Chakra v3 system config
const appConfig = defineConfig({
  globalCss: {
    body: {
      bg: 'gray.50',
      color: 'fg',
    },
  },
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#e9f3ff' },
          100: { value: '#c8e0ff' },
          200: { value: '#a6ccff' },
          300: { value: '#85b8ff' },
          400: { value: '#63a4ff' },
          500: { value: '#4a8af0' },
          600: { value: '#3a6cc0' },
          700: { value: '#2a4f90' },
          800: { value: '#1a3160' },
          900: { value: '#0a1330' },
        },
      },
      fonts: {
        heading: { value: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' },
        body: { value: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' },
      },
    },
  },
});

const system = createSystem(defaultConfig, appConfig);

export default system;
