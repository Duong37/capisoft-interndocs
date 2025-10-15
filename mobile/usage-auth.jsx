import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

const applyActionCode = async () => {
  await FirebaseAuthentication.applyActionCode({ oobCode: '1234' });
};

const createUserWithEmailAndPassword = async () => {
  const result = await FirebaseAuthentication.createUserWithEmailAndPassword({
    email: 'mail@exmaple.com',
    password: '1234',
  });
  return result.user;
};

const confirmPasswordReset = async () => {
  await FirebaseAuthentication.confirmPasswordReset({
    oobCode: '1234',
    newPassword: '4321',
  });
};

const deleteUser = async () => {
  await FirebaseAuthentication.deleteUser();
};

const fetchSignInMethodsForEmail = async () => {
  const result = await FirebaseAuthentication.fetchSignInMethodsForEmail({
    email: 'mail@example.tld',
  });
  return result.signInMethods;
};

const getCurrentUser = async () => {
  const result = await FirebaseAuthentication.getCurrentUser();
  return result.user;
};

const getPendingAuthResult = async () => {
  const result = await FirebaseAuthentication.getPendingAuthResult();
  return result.user;
};

const getIdToken = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return;
  }
  const result = await FirebaseAuthentication.getIdToken();
  return result.token;
};

const getPendingAuthResult = async () => {
  const result = await FirebaseAuthentication.getPendingAuthResult();
  return result.user;
};

const sendEmailVerification = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return;
  }
  await FirebaseAuthentication.sendEmailVerification();
};

const sendPasswordResetEmail = async () => {
  await FirebaseAuthentication.sendPasswordResetEmail({
    email: 'mail@example.com',
  });
};

const sendSignInLinkToEmail = async () => {
  const email = 'mail@example.com';
  await FirebaseAuthentication.sendSignInLinkToEmail({
    email,
    actionCodeSettings: {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'https://www.example.com/finishSignUp?cartId=1234',
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios',
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12',
      },
      dynamicLinkDomain: 'example.page.link',
    },
  });
  // The link was successfully sent. Inform the user.
  // Save the email locally so you don't need to ask the user for it again
  // if they open the link on the same device.
  window.localStorage.setItem('emailForSignIn', email);
};

const setLanguageCode = async () => {
  await FirebaseAuthentication.setLanguageCode({ languageCode: 'en-US' });
};

const signInAnonymously = async () => {
  const result = await FirebaseAuthentication.signInAnonymously();
  return result.user;
};

const signInWithApple = async () => {
  const result = await FirebaseAuthentication.signInWithApple();
  return result.user;
};

const signInWithCustomToken = async () => {
  const result = await FirebaseAuthentication.signInWithCustomToken({
    token: '1234',
  });
  return result.user;
};

const signInWithEmailAndPassword = async () => {
  const result = await FirebaseAuthentication.signInWithEmailAndPassword({
    email: 'mail@example.com',
    password: '1234',
  });
  return result.user;
};

const signInWithEmailLink = async () => {
  // Get the email if available. This should be available if the user completes
  // the flow on the same device where they started it.
  const emailLink = window.location.href;
  // Confirm the link is a sign-in with email link.
  const { isSignInWithEmailLink } =
    await FirebaseAuthentication.isSignInWithEmailLink({
      emailLink,
    });
  if (!isSignInWithEmailLink) {
    return;
  }
  let email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again.
    email = window.prompt('Please provide your email for confirmation.');
  }
  // The client SDK will parse the code from the link for you.
  const result = await FirebaseAuthentication.signInWithEmailLink({
    email,
    emailLink,
  });
  // Clear email from storage.
  window.localStorage.removeItem('emailForSignIn');
  return result.user;
};

const signInWithFacebook = async () => {
  const result = await FirebaseAuthentication.signInWithFacebook();
  return result.user;
};

const signInWithGameCenter = async () => {
  const result = await FirebaseAuthentication.signInWithGameCenter();
  return result.user;
};

const signInWithGithub = async () => {
  const result = await FirebaseAuthentication.signInWithGithub();
  return result.user;
};

const signInWithGoogle = async () => {
  const result = await FirebaseAuthentication.signInWithGoogle();
  return result.user;
};

const signInWithMicrosoft = async () => {
  const result = await FirebaseAuthentication.signInWithMicrosoft();
  return result.user;
};

const signInWithOpenIdConnect = async () => {
  const result = await FirebaseAuthentication.signInWithOpenIdConnect({
    providerId: 'oidc.example.com',
  });
  return result.user;
};

const signInWithPlayGames = async () => {
  const result = await FirebaseAuthentication.signInWithPlayGames();
  return result.user;
};

const signInWithPhoneNumber = async () => {
  return new Promise(async resolve => {
    // Attach `phoneCodeSent` listener to be notified as soon as the SMS is sent
    await FirebaseAuthentication.addListener('phoneCodeSent', async event => {
      // Ask the user for the SMS code
      const verificationCode = window.prompt(
        'Please enter the verification code that was sent to your mobile device.',
      );
      // Confirm the verification code
      const result = await FirebaseAuthentication.confirmVerificationCode({
        verificationId: event.verificationId,
        verificationCode,
      });
      resolve(result.user);
    });
    // Attach `phoneVerificationCompleted` listener to be notified if phone verification could be finished automatically
    await FirebaseAuthentication.addListener(
      'phoneVerificationCompleted',
      async event => {
        resolve(event.result.user);
      },
    );
    // Start sign in with phone number and send the SMS
    await FirebaseAuthentication.signInWithPhoneNumber({
      phoneNumber: '123456789',
    });
  });
};

const signInWithTwitter = async () => {
  const result = await FirebaseAuthentication.signInWithTwitter();
  return result.user;
};

const signInWithYahoo = async () => {
  const result = await FirebaseAuthentication.signInWithYahoo();
  return result.user;
};

const signOut = async () => {
  await FirebaseAuthentication.signOut();
};

const updateEmail = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return;
  }
  await FirebaseAuthentication.updateEmail({
    newEmail: 'new.mail@example.com',
  });
};

const updatePassword = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return;
  }
  await FirebaseAuthentication.updatePassword({
    newPassword: '4321',
  });
};

const useAppLanguage = async () => {
  await FirebaseAuthentication.useAppLanguage();
};

const useEmulator = async () => {
  await FirebaseAuthentication.useEmulator({
    host: '10.0.2.2',
    port: 9099,
  });
};

const verifyBeforeUpdateEmail = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return;
  }
  await FirebaseAuthentication.verifyBeforeUpdateEmail({
    newEmail: 'new.mail@example.com',
    actionCodeSettings: {
      url: 'https://www.example.com/cart?email=user@example.com&cartId=123',
      iOS: {
        bundleId: 'com.example.ios'
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
      },
      handleCodeInApp: true
    }
  });
};