import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const useHaptics = () => {
  const hapticsImpactLight = async () => {
    console.log('Haptics: Light impact triggered');
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
      console.log('Haptics: Light impact successful');
    } catch (error: any) {
      // Haptics not available (web fallback)
      console.log('Haptics: Light impact failed -', error.message);
    }
  };

  const hapticsImpactMedium = async () => {
    console.log('Haptics: Medium impact triggered');
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
      console.log('Haptics: Medium impact successful');
    } catch (error: any) {
      console.log('Haptics: Medium impact failed -', error.message);
    }
  };

  const hapticsImpactHeavy = async () => {
    console.log('Haptics: Heavy impact triggered');
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
      console.log('Haptics: Heavy impact successful');
    } catch (error: any) {
      console.log('Haptics: Heavy impact failed -', error.message);
    }
  };

  const hapticsVibrate = async () => {
    console.log('Haptics: Vibration triggered');
    try {
      await Haptics.vibrate();
      console.log('Haptics: Vibration successful');
    } catch (error: any) {
      console.log('Haptics: Vibration failed -', error.message);
    }
  };

  return {
    hapticsImpactLight,
    hapticsImpactMedium,
    hapticsImpactHeavy,
    hapticsVibrate
  };
};