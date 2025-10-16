import React, { useEffect, useState } from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import { SplashScreen } from '@capacitor/splash-screen';

const SplashScreenComponent = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hideSplashScreen = async () => {
      // Hide the native splash screen
      try {
        await SplashScreen.hide();
      } catch (error) {
        console.log('SplashScreen plugin not available');
      }

      // Hide our custom splash after a delay
      setTimeout(() => {
        setShowSplash(false);
      }, 1000);
    };

    // Start hiding the splash screen after a short delay
    const timer = setTimeout(hideSplashScreen, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!showSplash) {
    return null;
  }

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="#6F6CF3"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
    >
      <VStack spacing={6} alignItems="center">
        <Text
          fontFamily="Urbanist, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
          fontWeight={900}
          fontSize="48px"
          color="white"
          letterSpacing="2px"
        >
          TODO
        </Text>
        <Text
          fontFamily="Urbanist, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
          fontWeight={300}
          fontSize="18px"
          color="white"
          opacity={0.9}
        >
          Your Task Manager
        </Text>
      </VStack>
    </Box>
  );
};

export default SplashScreenComponent;