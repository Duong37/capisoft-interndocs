***Task: Adapt your React app to work with CapacitorJS***

- Integrate Capacitor into your React App and follow the installation guide to enable native functionality for iOS and Android
- **Run your app** on either Xcode (iOS) or Android Studio (Android) to test the native build.
- **Implement the Capacitor SafeArea Plugin** to ensure no content is hidden by native status or navigation bars.
    - Use the Capacitor SafeArea Plugin: https://www.npmjs.com/package/capacitor-plugin-safe-area
- **Use the Capacitor Haptics Plugin** to add haptic feedback on navigation button presses.
    - Use the Capacitor Haptics Plugin: https://capacitorjs.com/docs/v3/apis/haptics
- Add a splash screen of your choice to your app!

You may have noticed that your auth state does not carry on between sessions. Because local storage works differently on web and mobile, firebase authentication has its own Capacitor plugin to work on mobile apps as well.

***Task: Adapt your auth flow to work with CapacitorJS***

- Follow the installation guide here: https://www.npmjs.com/package/@capacitor-firebase/authentication.
- Add your google-services .json and .plist to your project using this installation guide: https://github.com/capawesome-team/capacitor-firebase/blob/main/docs/firebase-setup.md#ios
- Build and test out authentication in your mobile app!