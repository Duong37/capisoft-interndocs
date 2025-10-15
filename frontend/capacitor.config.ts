import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.interndocs.app',
  appName: 'InternDocs',
  webDir: 'build',
  plugins: {
    SafeArea: {
      enabled: true
    }
  }
};

export default config;
