import { useEffect, useCallback } from 'react';
import { DeviceShake } from 'capacitor-device-shake';

/**
 * Custom hook for shake detection using native iOS/Android implementation
 * onShake - Callback function to execute when shake is detected
 * enabled - Whether shake detection should be active
 */
export const useShakeDetection = (
  onShake: () => void,
  enabled: boolean = true
) => {
  // Memoize callback to prevent re-creating listeners on every render
  const handleShake = useCallback(() => {
    console.log('Shake detected!');
    onShake();
  }, [onShake]);

  useEffect(() => {
    // Disable shake detection when not enabled (e.g., user logged out)
    if (!enabled) {
      DeviceShake.stopListening();
      return;
    }

    // Enable native shake detection
    DeviceShake.enableListening();

    // Listen for shake events from plugin
    const listener = DeviceShake.addListener('shake', handleShake);

    // Cleanup: remove listener and stop native monitoring when unmounting
    return () => {
      listener.then((handle) => handle.remove());
      DeviceShake.stopListening();
    };
  }, [enabled, handleShake]);
};
