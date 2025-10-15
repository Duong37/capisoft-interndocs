## Installation
- npm install @capacitor-firebase/authentication firebase
- npx cap sync
Add Firebase to your project if you haven't already (Android / iOS / Web).

On iOS, verify that this function is included in your app's AppDelegate.swift:

func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
  return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
}
Attention: If you use this plugin on iOS in combination with @capacitor-firebase/messaging, then add the following to your app's AppDelegate.swift:

+ import FirebaseAuth

func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
+    if Auth.auth().canHandle(url) {
+      return true
+    }
    return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
}

## Examples
- In capacitor.config.json:

{
  "plugins": {
    "FirebaseAuthentication": {
      "authDomain": undefined,
      "skipNativeAuth": false,
      "providers": ["apple.com", "facebook.com"]
    }
  }
}

- In capacitor.config.ts:

/// <reference types="@capacitor-firebase/authentication" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    FirebaseAuthentication: {
      authDomain: undefined,
      skipNativeAuth: false,
      providers: ["apple.com", "facebook.com"],
    },
  },
};

export default config;