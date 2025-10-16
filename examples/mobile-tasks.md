***Task 1: Adapt your React app to work with CapacitorJS***

- Integrate Capacitor into your React App and follow the installation guide to enable native functionality for iOS and Android
- **Run your app** on either Xcode (iOS) or Android Studio (Android) to test the native build.
- **Implement the Capacitor SafeArea Plugin** to ensure no content is hidden by native status or navigation bars.
    - Use the Capacitor SafeArea Plugin: https://www.npmjs.com/package/capacitor-plugin-safe-area
- **Use the Capacitor Haptics Plugin** to add haptic feedback on navigation button presses.
    - Use the Capacitor Haptics Plugin: https://capacitorjs.com/docs/v3/apis/haptics
- Add a splash screen of your choice to your app!

***Task 2: Adapt your auth flow to work with CapacitorJS***

- Follow the installation guide here: https://www.npmjs.com/package/@capacitor-firebase/authentication.
- Add your google-services .json and .plist to your project using this installation guide: https://github.com/capawesome-team/capacitor-firebase/blob/main/docs/firebase-setup.md#ios
- Build and test out authentication in your mobile app!

***Task 3: Create your own plugin for CapacitorJS***

- The plugin must detect shaking movements on both Android and iOS devices.
- When a shake is detected, trigger device vibration to provide feedback to the user.
- **Plugin Requirements & Methods:**
    - `enableListening()`:Starts listening for shaking movements.
    - `stopListening()`:Stops listening for shaking movements.
    - `addEventListener(eventName : "shake", func : () => void)`: Is fed a function that should be triggered every time the user shakes their device, provided listening is enabled.
    - `removeAllListeners()`: Clears all pre-existing listeners (you should do this inside a useEffect in which you also set up your listeners)

'''
    useEffect(() => {
  DeviceShake.addListener('shake', async () => {});

  return () => {
    DeviceShake.removeAllListeners(); // Clean up listeners
  };
}
'''

- The plugin should work seamlessly on both Android and iOS devices.
- **Authenticated Users:** Enable shake detection and display a logout prompt on shake.
- **Unauthenticated Users:** Shake detection should be disabled.
- Do not use already established Capacitor or Cordova Plugins for this task

- start with iOS