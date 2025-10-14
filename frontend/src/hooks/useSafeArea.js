import { useEffect } from 'react';
import { SafeArea } from 'capacitor-plugin-safe-area';

export const useSafeArea = () => {
  useEffect(() => {
    const setupSafeArea = async () => {
      try {
        // Get initial safe area insets
        const safeAreaData = await SafeArea.getSafeAreaInsets();
        const { insets } = safeAreaData;

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
        document.documentElement.style.setProperty(
          '--status-bar-height',
          `${statusBarHeight}px`,
        );

        // Listen for safe area changes (device rotation, etc.)
        await SafeArea.addListener('safeAreaChanged', async data => {
          const { insets } = data;
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
      } catch (error) {
        console.log('SafeArea plugin not available, falling back to web behavior');
      }
    };

    setupSafeArea();

    // Cleanup listener on unmount
    return () => {
      SafeArea.removeAllListeners();
    };
  }, []);
};