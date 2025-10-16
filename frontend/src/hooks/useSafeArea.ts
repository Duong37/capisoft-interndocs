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
          console.log('Running on web platform - SafeArea not needed for browsers');
          // No safe area handling needed for web browsers
          // CSS will use 0px defaults from calc() functions
        }
      } catch (error) {
        console.error('SafeArea plugin error:', error);
        console.log('SafeArea plugin not available - using CSS defaults');
        // CSS will use 0px defaults from calc() functions
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