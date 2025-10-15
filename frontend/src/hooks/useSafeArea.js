import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { SafeArea } from 'capacitor-plugin-safe-area';

export const useSafeArea = () => {
  useEffect(() => {
    const setupSafeArea = async () => {
      try {
        // Check if we're on a native platform
        if (Capacitor.isNativePlatform()) {
          console.log('Running on native platform, setting up SafeArea plugin');

          // Get initial safe area insets
          const safeAreaData = await SafeArea.getSafeAreaInsets();
          const { insets } = safeAreaData;
          console.log('SafeArea insets:', insets);

          // Apply insets as CSS variables
          for (const [key, value] of Object.entries(insets)) {
            document.documentElement.style.setProperty(
              `--safe-area-inset-${key}`,
              `${value}px`,
            );
          }

          // Get specific status bar height for more granular control
          const statusBarData = await SafeArea.getStatusBarHeight();
          const { statusBarHeight } = statusBarData;
          console.log('Status bar height:', statusBarHeight);
          document.documentElement.style.setProperty(
            '--status-bar-height',
            `${statusBarHeight}px`,
          );

          // Listen for safe area changes (device rotation, etc.)
          await SafeArea.addListener('safeAreaChanged', async data => {
            const { insets } = data;
            console.log('SafeArea changed:', insets);
            for (const [key, value] of Object.entries(insets)) {
              document.documentElement.style.setProperty(
                `--safe-area-inset-${key}`,
                `${value}px`,
              );
            }

            // Update status bar height on orientation change
            try {
              const statusBarData = await SafeArea.getStatusBarHeight();
              const { statusBarHeight } = statusBarData;
              document.documentElement.style.setProperty(
                '--status-bar-height',
                `${statusBarHeight}px`,
              );
            } catch (error) {
              console.log('Could not update status bar height');
            }
          });
        } else {
          console.log('Running on web platform, setting up CSS environment variable fallback');

          // For web browsers, set reasonable default values that simulate safe areas
          // This helps visualize the layout and provides consistent spacing
          document.documentElement.style.setProperty('--safe-area-inset-top', '24px');
          document.documentElement.style.setProperty('--safe-area-inset-bottom', '20px');
          document.documentElement.style.setProperty('--safe-area-inset-left', '0px');
          document.documentElement.style.setProperty('--safe-area-inset-right', '0px');
          document.documentElement.style.setProperty('--status-bar-height', '24px');

          // Check if CSS environment variables are supported (Safari, iOS Chrome)
          const envSupport = CSS.supports('padding-top', 'env(safe-area-inset-top)');
          if (envSupport) {
            console.log('CSS env() support detected for safe area');

            // Add meta tag for viewport if not present
            const viewport = document.querySelector('meta[name="viewport"]');
            if (!viewport) {
              const meta = document.createElement('meta');
              meta.name = 'viewport';
              meta.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
              document.head.appendChild(meta);
            } else if (!viewport.content.includes('viewport-fit=cover')) {
              viewport.content += ', viewport-fit=cover';
            }
          }

          // Add visual indicators for safe areas in development (optional)
          if (process.env.NODE_ENV === 'development') {
            console.log('Safe area values set for web preview');
            console.log('Top inset: 24px, Bottom inset: 20px');
          }
        }
      } catch (error) {
        console.error('SafeArea plugin error:', error);
        console.log('Falling back to default values');

        // Set fallback values for modern iOS devices with Dynamic Island
        document.documentElement.style.setProperty('--safe-area-inset-top', '59px'); // iOS with Dynamic Island
        document.documentElement.style.setProperty('--safe-area-inset-bottom', '34px'); // iOS default
        document.documentElement.style.setProperty('--safe-area-inset-left', '0px');
        document.documentElement.style.setProperty('--safe-area-inset-right', '0px');
        document.documentElement.style.setProperty('--status-bar-height', '59px');
        
        console.log('Applied fallback safe area values:', {
          top: '59px',
          bottom: '34px',
          left: '0px',
          right: '0px'
        });
      }
    };

    setupSafeArea();

    // Cleanup listener on unmount
    return () => {
      if (Capacitor.isNativePlatform()) {
        SafeArea.removeAllListeners();
      }
    };
  }, []);
};