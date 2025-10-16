API
applyActionCode(...)
confirmPasswordReset(...)
confirmVerificationCode(...)
createUserWithEmailAndPassword(...)
deleteUser()
fetchSignInMethodsForEmail(...)
getCurrentUser()
getPendingAuthResult()
getIdToken(...)
getRedirectResult()
getTenantId()
isSignInWithEmailLink(...)
linkWithApple(...)
linkWithEmailAndPassword(...)
linkWithEmailLink(...)
linkWithFacebook(...)
linkWithGameCenter(...)
linkWithGithub(...)
linkWithGoogle(...)
linkWithMicrosoft(...)
linkWithOpenIdConnect(...)
linkWithPhoneNumber(...)
linkWithPlayGames(...)
linkWithTwitter(...)
linkWithYahoo(...)
reload()
revokeAccessToken(...)
sendEmailVerification(...)
sendPasswordResetEmail(...)
sendSignInLinkToEmail(...)
setLanguageCode(...)
setPersistence(...)
setTenantId(...)
signInAnonymously()
signInWithApple(...)
signInWithCustomToken(...)
signInWithEmailAndPassword(...)
signInWithEmailLink(...)
signInWithFacebook(...)
signInWithGameCenter(...)
signInWithGithub(...)
signInWithGoogle(...)
signInWithMicrosoft(...)
signInWithOpenIdConnect(...)
signInWithPhoneNumber(...)
signInWithPlayGames(...)
signInWithTwitter(...)
signInWithYahoo(...)
signOut()
unlink(...)
updateEmail(...)
updatePassword(...)
updateProfile(...)
useAppLanguage()
useEmulator(...)
verifyBeforeUpdateEmail(...)
checkAppTrackingTransparencyPermission()
requestAppTrackingTransparencyPermission()
addListener('authStateChange', ...)
addListener('idTokenChange', ...)
addListener('phoneVerificationCompleted', ...)
addListener('phoneVerificationFailed', ...)
addListener('phoneCodeSent', ...)
removeAllListeners()
Interfaces
Type Aliases
Enums
applyActionCode(...)
applyActionCode(options: ApplyActionCodeOptions) => Promise<void>
Applies a verification code sent to the user by email.

Param	Type
options	ApplyActionCodeOptions
Since: 0.2.2

confirmPasswordReset(...)
confirmPasswordReset(options: ConfirmPasswordResetOptions) => Promise<void>
Completes the password reset process.

Param	Type
options	ConfirmPasswordResetOptions
Since: 0.2.2

confirmVerificationCode(...)
confirmVerificationCode(options: ConfirmVerificationCodeOptions) => Promise<SignInResult>
Finishes the phone number verification process.

Param	Type
options	ConfirmVerificationCodeOptions
Returns: Promise<SignInResult>

Since: 5.0.0

createUserWithEmailAndPassword(...)
createUserWithEmailAndPassword(options: CreateUserWithEmailAndPasswordOptions) => Promise<SignInResult>
Creates a new user account with email and password. If the new account was created, the user is signed in automatically.

Param	Type
options	CreateUserWithEmailAndPasswordOptions
Returns: Promise<SignInResult>

Since: 0.2.2

deleteUser()
deleteUser() => Promise<void>
Deletes and signs out the user.

Since: 1.3.0

fetchSignInMethodsForEmail(...)
fetchSignInMethodsForEmail(options: FetchSignInMethodsForEmailOptions) => Promise<FetchSignInMethodsForEmailResult>
Fetches the sign-in methods for an email address.

Param	Type
options	FetchSignInMethodsForEmailOptions
Returns: Promise<FetchSignInMethodsForEmailResult>

Since: 6.0.0

getCurrentUser()
getCurrentUser() => Promise<GetCurrentUserResult>
Fetches the currently signed-in user.

Returns: Promise<GetCurrentUserResult>

Since: 0.1.0

getPendingAuthResult()
getPendingAuthResult() => Promise<SignInResult>
Returns the SignInResult if your app launched a web sign-in flow and the OS cleans up the app while in the background.

Only available for Android.

Returns: Promise<SignInResult>

Since: 6.0.0

getIdToken(...)
getIdToken(options?: GetIdTokenOptions | undefined) => Promise<GetIdTokenResult>
Fetches the Firebase Auth ID Token for the currently signed-in user.

Param	Type
options	GetIdTokenOptions
Returns: Promise<GetIdTokenResult>

Since: 0.1.0

getRedirectResult()
getRedirectResult() => Promise<SignInResult>
Returns the SignInResult from the redirect-based sign-in flow.

If sign-in was unsuccessful, fails with an error. If no redirect operation was called, returns a SignInResult with a null user.

Only available for Web.

Returns: Promise<SignInResult>

Since: 1.3.0

getTenantId()
getTenantId() => Promise<GetTenantIdResult>
Get the tenant id.

Returns: Promise<GetTenantIdResult>

Since: 1.1.0

isSignInWithEmailLink(...)
isSignInWithEmailLink(options: IsSignInWithEmailLinkOptions) => Promise<IsSignInWithEmailLinkResult>
Checks if an incoming link is a sign-in with email link suitable for signInWithEmailLink.

Param	Type
options	IsSignInWithEmailLinkOptions
Returns: Promise<IsSignInWithEmailLinkResult>

Since: 1.1.0

linkWithApple(...)
linkWithApple(options?: SignInWithOAuthOptions | undefined) => Promise<LinkResult>
Links the user account with Apple authentication provider.

The user must be logged in on the native layer. The skipNativeAuth configuration option has no effect here.

Param	Type
options	SignInWithOAuthOptions
Returns: Promise<SignInResult>

Since: 1.1.0

linkWithEmailAndPassword(...)
linkWithEmailAndPassword(options: LinkWithEmailAndPasswordOptions) => Promise<LinkResult>
Links the user account with Email authentication provider.

The user must be logged in on the native layer. The skipNativeAuth configuration option has no effect here.

Param	Type
options	LinkWithEmailAndPasswordOptions
Returns: Promise<SignInResult>

Since: 1.1.0

linkWithEmailLink(...)
linkWithEmailLink(options: LinkWithEmailLinkOptions) => Promise<LinkResult>
Links the user account with Email authentication provider.

The user must be logged in on the native layer. The skipNativeAuth configuration option has no effect here.

Param	Type
options	LinkWithEmailLinkOptions
Returns: Promise<SignInResult>

Since: 1.1.0

linkWithFacebook(...)
linkWithFacebook(options?: SignInWithOAuthOptions | undefined) => Promise<LinkResult>
Links the user account with Facebook authentication provider.

The user must be logged in on the native layer. The skipNativeAuth configuration option has no effect here.

Param	Type
options	SignInWithOAuthOptions
Returns: Promise<SignInResult>

Since: 1.1.0

linkWithGameCenter(...)
linkWithGameCenter(options?: SignInWithOAuthOptions | undefined) => Promise<LinkResult>
Links the user account with Game Center authentication provider.

The user must be logged in on the native layer. The skipNativeAuth configuration option has no effect here.

Only available for iOS.

Param	Type
options	SignInWithOAuthOptions
Returns: Promise<SignInResult>

Since: 1.3.0

linkWithGithub(...)
linkWithGithub(options?: SignInWithOAuthOptions | undefined) => Promise<LinkResult>
Links the user account with GitHub authentication provider.

The user must be logged in on the native layer. The skipNativeAuth configuration option has no effect here.

Param	Type
options	SignInWithOAuthOptions
Returns: Promise<SignInResult>

Since: 1.1.0

linkWithGoogle(...)
linkWithGoogle(options?: SignInWithOAuthOptions | undefined) => Promise<LinkResult>
Links the user account with Google authentication provider.

The user must be logged in on the native layer. The skipNativeAuth configuration option has no effect here.

Param	Type
options	SignInWithOAuthOptions
Returns: Promise<SignInResult>

Since: 1.1.0

linkWithMicrosoft(...)
linkWithMicrosoft(options?: SignInWithOAuthOptions | undefined) => Promise<LinkResult>
Links the user account with Microsoft authentication provider.

The user must be logged in on the native layer. The skipNativeAuth configuration option has no effect here.

Param	Type
options	SignInWithOAuthOptions
Returns: Promise<SignInResult>

Since: 1.1.0

linkWithOpenIdConnect(...)
linkWithOpenIdConnect(options: LinkWithOpenIdConnectOptions) => Promise<LinkResult>
Links the user account with an OpenID Connect provider.

Param	Type
options	SignInWithOpenIdConnectOptions
Returns: Promise<SignInResult>

Since: 6.1.0

linkWithPhoneNumber(...)
linkWithPhoneNumber(options: LinkWithPhoneNumberOptions) => Promise<void>
Links the user account with Phone Number authentication provider.

The user must be logged in on the native layer. The skipNativeAuth configuration option has no effect here.

Use the phoneVerificationCompleted listener to be notified when the verification is completed. Use the phoneVerificationFailed listener to be notified when the verification is failed. Use the phoneCodeSent listener to get the verification id.

Param	Type
options	SignInWithPhoneNumberOptions
Since: 1.1.0

linkWithPlayGames(...)
linkWithPlayGames(options?: SignInWithOAuthOptions | undefined) => Promise<LinkResult>
Links the user account with Play Games authentication provider.

The user must be logged in on the native layer. The skipNativeAuth configuration option has no effect here.

Only available for Android.

Param	Type
options	SignInWithOAuthOptions
Returns: Promise<SignInResult>

Since: 1.1.0

linkWithTwitter(...)
linkWithTwitter(options?: SignInWithOAuthOptions | undefined) => Promise<LinkResult>
Links the user account with Twitter authentication provider.

The user must be logged in on the native layer. The skipNativeAuth configuration option has no effect here.

Param	Type
options	SignInWithOAuthOptions
Returns: Promise<SignInResult>

Since: 1.1.0

linkWithYahoo(...)
linkWithYahoo(options?: SignInWithOAuthOptions | undefined) => Promise<LinkResult>
Links the user account with Yahoo authentication provider.

The user must be logged in on the native layer. The skipNativeAuth configuration option has no effect here.

Param	Type
options	SignInWithOAuthOptions
Returns: Promise<SignInResult>

Since: 1.1.0

reload()
reload() => Promise<void>
Reloads user account data, if signed in.

Since: 1.3.0

revokeAccessToken(...)
revokeAccessToken(options: RevokeAccessTokenOptions) => Promise<void>
Revokes the given access token. Currently only supports Apple OAuth access tokens.

Param	Type
options	RevokeAccessTokenOptions
Since: 6.1.0

sendEmailVerification(...)
sendEmailVerification(options?: SendEmailVerificationOptions | undefined) => Promise<void>
Sends a verification email to the currently signed in user.

Param	Type
options	SendEmailVerificationOptions
Since: 0.2.2

sendPasswordResetEmail(...)
sendPasswordResetEmail(options: SendPasswordResetEmailOptions) => Promise<void>
Sends a password reset email.

Param	Type
options	SendPasswordResetEmailOptions
Since: 0.2.2

sendSignInLinkToEmail(...)
sendSignInLinkToEmail(options: SendSignInLinkToEmailOptions) => Promise<void>
Sends a sign-in email link to the user with the specified email.

To complete sign in with the email link, call signInWithEmailLink with the email address and the email link supplied in the email sent to the user.

Param	Type
options	SendSignInLinkToEmailOptions
Since: 1.1.0

setLanguageCode(...)
setLanguageCode(options: SetLanguageCodeOptions) => Promise<void>
Sets the user-facing language code for auth operations.

Param	Type
options	SetLanguageCodeOptions
Since: 0.1.0

setPersistence(...)
setPersistence(options: SetPersistenceOptions) => Promise<void>
Sets the type of persistence for the currently saved auth session.

Only available for Web.

Param	Type
options	SetPersistenceOptions
Since: 5.2.0

setTenantId(...)
setTenantId(options: SetTenantIdOptions) => Promise<void>
Sets the tenant id.

Param	Type
options	SetTenantIdOptions
Since: 1.1.0

signInAnonymously()
signInAnonymously() => Promise<SignInResult>
Signs in as an anonymous user.

Returns: Promise<SignInResult>

Since: 1.1.0

signInWithApple(...)
signInWithApple(options?: SignInWithOAuthOptions | undefined) => Promise<SignInResult>
Starts the Apple sign-in flow.

Param	Type
options	SignInWithOAuthOptions
Returns: Promise<SignInResult>

Since: 0.1.0

signInWithCustomToken(...)
signInWithCustomToken(options: SignInWithCustomTokenOptions) => Promise<SignInResult>
Starts the Custom Token sign-in flow.

This method cannot be used in combination with skipNativeAuth on Android and iOS. In this case you have to use the signInWithCustomToken interface of the Firebase JS SDK directly.

Param	Type
options	SignInWithCustomTokenOptions
Returns: Promise<SignInResult>

Since: 0.1.0

signInWithEmailAndPassword(...)
signInWithEmailAndPassword(options: SignInWithEmailAndPasswordOptions) => Promise<SignInResult>
Starts the sign-in flow using an email and password.

Param	Type
options	SignInWithEmailAndPasswordOptions
Returns: Promise<SignInResult>

Since: 0.2.2

signInWithEmailLink(...)
signInWithEmailLink(options: SignInWithEmailLinkOptions) => Promise<SignInResult>
Signs in using an email and sign-in email link.

Param	Type
options	SignInWithEmailLinkOptions
Returns: Promise<SignInResult>

Since: 1.1.0

signInWithFacebook(...)
signInWithFacebook(options?: SignInWithFacebookOptions | undefined) => Promise<SignInResult>
Starts the Facebook sign-in flow.

Param	Type
options	SignInWithFacebookOptions
Returns: Promise<SignInResult>

Since: 0.1.0

signInWithGameCenter(...)
signInWithGameCenter(options?: SignInWithOAuthOptions | SignInOptions | undefined) => Promise<SignInResult>
Starts the Game Center sign-in flow.

Only available for iOS.

Param	Type
options	SignInWithOAuthOptions | SignInOptions
Returns: Promise<SignInResult>

Since: 1.3.0

signInWithGithub(...)
signInWithGithub(options?: SignInWithOAuthOptions | undefined) => Promise<SignInResult>
Starts the GitHub sign-in flow.

Param	Type
options	SignInWithOAuthOptions
Returns: Promise<SignInResult>

Since: 0.1.0

signInWithGoogle(...)
signInWithGoogle(options?: SignInWithGoogleOptions | undefined) => Promise<SignInResult>
Starts the Google sign-in flow.

Param	Type
options	SignInWithGoogleOptions
Returns: Promise<SignInResult>

Since: 0.1.0

signInWithMicrosoft(...)
signInWithMicrosoft(options?: SignInWithOAuthOptions | undefined) => Promise<SignInResult>
Starts the Microsoft sign-in flow.

Param	Type
options	SignInWithOAuthOptions
Returns: Promise<SignInResult>

Since: 0.1.0

signInWithOpenIdConnect(...)
signInWithOpenIdConnect(options: SignInWithOpenIdConnectOptions) => Promise<SignInResult>
Starts the OpenID Connect sign-in flow.

Param	Type
options	SignInWithOpenIdConnectOptions
Returns: Promise<SignInResult>

Since: 6.1.0

signInWithPhoneNumber(...)
signInWithPhoneNumber(options: SignInWithPhoneNumberOptions) => Promise<void>
Starts the sign-in flow using a phone number.

Use the phoneVerificationCompleted listener to be notified when the verification is completed. Use the phoneVerificationFailed listener to be notified when the verification is failed. Use the phoneCodeSent listener to get the verification id.

Only available for Android and iOS.

Param	Type
options	SignInWithPhoneNumberOptions
Since: 0.1.0

signInWithPlayGames(...)
signInWithPlayGames(options?: SignInWithOAuthOptions | undefined) => Promise<SignInResult>
Starts the Play Games sign-in flow.

Only available for Android.

Param	Type
options	SignInWithOAuthOptions
Returns: Promise<SignInResult>

Since: 0.1.0

signInWithTwitter(...)
signInWithTwitter(options?: SignInWithOAuthOptions | undefined) => Promise<SignInResult>
Starts the Twitter sign-in flow.

Param	Type
options	SignInWithOAuthOptions
Returns: Promise<SignInResult>

Since: 0.1.0

signInWithYahoo(...)
signInWithYahoo(options?: SignInWithOAuthOptions | undefined) => Promise<SignInResult>
Starts the Yahoo sign-in flow.

Param	Type
options	SignInWithOAuthOptions
Returns: Promise<SignInResult>

Since: 0.1.0

signOut()
signOut() => Promise<void>
Starts the sign-out flow.

Since: 0.1.0

unlink(...)
unlink(options: UnlinkOptions) => Promise<UnlinkResult>
Unlinks a provider from a user account.

Param	Type
options	UnlinkOptions
Returns: Promise<UnlinkResult>

Since: 1.1.0

updateEmail(...)
updateEmail(options: UpdateEmailOptions) => Promise<void>
Updates the email address of the currently signed in user.

Param	Type
options	UpdateEmailOptions
Since: 0.1.0

updatePassword(...)
updatePassword(options: UpdatePasswordOptions) => Promise<void>
Updates the password of the currently signed in user.

Param	Type
options	UpdatePasswordOptions
Since: 0.1.0

updateProfile(...)
updateProfile(options: UpdateProfileOptions) => Promise<void>
Updates a user's profile data.

Param	Type
options	UpdateProfileOptions
Since: 1.3.0

useAppLanguage()
useAppLanguage() => Promise<void>
Sets the user-facing language code to be the default app language.

Since: 0.1.0

useEmulator(...)
useEmulator(options: UseEmulatorOptions) => Promise<void>
Instrument your app to talk to the Authentication emulator.

Param	Type
options	UseEmulatorOptions
Since: 0.2.0

verifyBeforeUpdateEmail(...)
verifyBeforeUpdateEmail(options: VerifyBeforeUpdateEmailOptions) => Promise<void>
Verifies the new email address before updating the email address of the currently signed in user.

Param	Type
options	VerifyBeforeUpdateEmailOptions
Since: 6.3.0

checkAppTrackingTransparencyPermission()
checkAppTrackingTransparencyPermission() => Promise<CheckAppTrackingTransparencyPermissionResult>
Checks the current status of app tracking transparency.

Only available on iOS.

Returns: Promise<CheckAppTrackingTransparencyPermissionResult>

Since: 7.2.0

requestAppTrackingTransparencyPermission()
requestAppTrackingTransparencyPermission() => Promise<RequestAppTrackingTransparencyPermissionResult>
Opens the system dialog to authorize app tracking transparency.

Attention: The user may have disabled the tracking request in the device settings, see Apple's documentation.

Only available on iOS.

Returns: Promise<CheckAppTrackingTransparencyPermissionResult>

Since: 7.2.0

addListener('authStateChange', ...)
addListener(eventName: 'authStateChange', listenerFunc: AuthStateChangeListener) => Promise<PluginListenerHandle>
Listen for the user's sign-in state changes.

Attention: This listener is not triggered when the skipNativeAuth is used. Use the Firebase JavaScript SDK instead.

Param	Type
eventName	'authStateChange'
listenerFunc	AuthStateChangeListener
Returns: Promise<PluginListenerHandle>

Since: 0.1.0

addListener('idTokenChange', ...)
addListener(eventName: 'idTokenChange', listenerFunc: IdTokenChangeListener) => Promise<PluginListenerHandle>
Listen to ID token changes for the currently signed-in user.

Attention: This listener is not triggered when the skipNativeAuth is used. Use the Firebase JavaScript SDK instead.

Param	Type
eventName	'idTokenChange'
listenerFunc	IdTokenChangeListener
Returns: Promise<PluginListenerHandle>

Since: 6.3.0

addListener('phoneVerificationCompleted', ...)
addListener(eventName: 'phoneVerificationCompleted', listenerFunc: PhoneVerificationCompletedListener) => Promise<PluginListenerHandle>
Listen for a completed phone verification.

This listener only fires in two situations:

Instant verification: In some cases the phone number can be instantly verified without needing to send or enter a verification code.
Auto-retrieval: On some devices Google Play services can automatically detect the incoming verification SMS and perform verification without user action.
Only available for Android.

Param	Type
eventName	'phoneVerificationCompleted'
listenerFunc	PhoneVerificationCompletedListener
Returns: Promise<PluginListenerHandle>

Since: 1.3.0

addListener('phoneVerificationFailed', ...)
addListener(eventName: 'phoneVerificationFailed', listenerFunc: PhoneVerificationFailedListener) => Promise<PluginListenerHandle>
Listen for a failed phone verification.

Param	Type
eventName	'phoneVerificationFailed'
listenerFunc	PhoneVerificationFailedListener
Returns: Promise<PluginListenerHandle>

Since: 1.3.0

addListener('phoneCodeSent', ...)
addListener(eventName: 'phoneCodeSent', listenerFunc: PhoneCodeSentListener) => Promise<PluginListenerHandle>
Listen for a phone verification code.

Param	Type
eventName	'phoneCodeSent'
listenerFunc	PhoneCodeSentListener
Returns: Promise<PluginListenerHandle>

Since: 1.3.0

removeAllListeners()
removeAllListeners() => Promise<void>
Remove all listeners for this plugin.