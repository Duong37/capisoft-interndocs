import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const useHaptics = () => {
  const hapticsImpactLight = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      // Haptics not available (web fallback)
      console.log('Haptics not available');
    }
  };

  const hapticsImpactMedium = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (error) {
      console.log('Haptics not available');
    }
  };

  const hapticsImpactHeavy = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (error) {
      console.log('Haptics not available');
    }
  };

  const hapticsVibrate = async () => {
    try {
      await Haptics.vibrate();
    } catch (error) {
      console.log('Haptics not available');
    }
  };

  return {
    hapticsImpactLight,
    hapticsImpactMedium,
    hapticsImpactHeavy,
    hapticsVibrate
  };
};