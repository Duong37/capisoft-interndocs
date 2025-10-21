import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { SafeArea } from 'capacitor-plugin-safe-area';

export const useSafeArea = () => {
  useEffect(() => {
    const applyInsets = async () => {
      try {
        const safeAreaData = await SafeArea.getSafeAreaInsets();
        const { insets } = safeAreaData;
        console.log('APPLYING SAFE AREA INSETS:', JSON.stringify(insets));

        // Apply insets as CSS variables
        for (const [key, value] of Object.entries(insets)) {
          document.documentElement.style.setProperty(
            `--safe-area-inset-${key}`,
            `${value}px`,
          );
        }

        // Get status bar height
        const statusBarData = await SafeArea.getStatusBarHeight();
        const { statusBarHeight } = statusBarData;
        console.log('Status bar height:', statusBarHeight);
        document.documentElement.style.setProperty(
          '--status-bar-height',
          `${statusBarHeight}px`,
        );
      } catch (error) {
        console.error('Error applying insets:', error);
      }
    };

    const setupSafeArea = async () => {
      try {
        // Check if we're on a native platform
        if (Capacitor.isNativePlatform()) {
          console.log('Running on native platform, setting up SafeArea plugin');

          // Apply initial safe area insets
          await applyInsets();

          // Listen for safe area changes (device rotation, etc.)
          await SafeArea.addListener('safeAreaChanged', async () => {
            console.log('SAFE AREA CHANGE EVENT FIRED');
            await applyInsets();
          });

          // WORKAROUND: Also listen to window resize for rotation detection
          // This helps when safeAreaChanged doesn't fire on Android
          window.addEventListener('resize', async () => {
            console.log('WINDOW RESIZE - Re-checking safe area');
            // Small delay to let the system update insets
            setTimeout(async () => {
              await applyInsets();
            }, 100);
          });
        } else {
          console.log('Running on web platform - SafeArea not needed for browsers');
        }
      } catch (error) {
        console.error('SafeArea plugin error:', error);
        console.log('SafeArea plugin not available - using CSS defaults');
      }
    };

    setupSafeArea();

    // Cleanup listeners on unmount
    return () => {
      if (Capacitor.isNativePlatform()) {
        SafeArea.removeAllListeners();
        window.removeEventListener('resize', applyInsets);
      }
    };
  }, []);
};
