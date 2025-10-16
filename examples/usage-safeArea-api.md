API
- getSafeAreaInsets()
- getStatusBarHeight()
- setImmersiveNavigationBar()
- addListener('safeAreaChanged', ...)
- removeAllListeners()
Interfaces
- getSafeAreaInsets()
- getSafeAreaInsets() => Promise<SafeAreaInsets>
Get mobile SafeArea info

Returns: Promise<SafeAreaInsets>

- getStatusBarHeight()
- getStatusBarHeight() => Promise<StatusBarInfo>
Get mobile statusbar height

Returns: Promise<StatusBarInfo>

- setImmersiveNavigationBar()
- setImmersiveNavigationBar() => Promise<void>
Set navigation bar immersive on Android , not implemented on IOS

- addListener('safeAreaChanged', ...)
- addListener(event: 'safeAreaChanged', listenerFunc: (data: SafeAreaInsets) => void) => Promise<PluginListenerHandle>
Event listener when safe-area changed

Returns: Promise<PluginListenerHandle>

- removeAllListeners()
- removeAllListeners() => Promise<void>
Remove all native listeners for this plugin