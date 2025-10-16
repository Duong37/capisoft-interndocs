import { useEffect, useCallback } from 'react';
import { DeviceShake } from 'capacitor-device-shake';

/**
 * Custom hook for shake detection
 * @param onShake - Callback function to execute when shake is detected
 * @param enabled - Whether shake detection should be active
 */

export const useShakeDetection = (
  onShake: () => void,
  enabled: boolean = true
) => {
  const handleShake = useCallback(() => {
    console.log('Shake detected!');
    onShake();
  }, [onShake]);

  useEffect(() => {
    if (!enabled) {
      // Stop listening if disabled
      DeviceShake.stopListening();
      return;
    }

    // Enable listening when component mounts or enabled becomes true
    DeviceShake.enableListening();

    // Add event listener for shake events
    const listener = DeviceShake.addListener('shake', handleShake);

    // Cleanup: remove listener and stop listening when component unmounts or disabled
    return () => {
      listener.then((handle) => handle.remove());
      DeviceShake.stopListening();
    };
  }, [enabled, handleShake]);
};
