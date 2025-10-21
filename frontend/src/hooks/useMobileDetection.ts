import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

/**
 * Custom hook to reliably detect mobile devices regardless of orientation
 * Uses a combination of platform detection, user agent, and touch capabilities
 */
export const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(true); // Default to mobile for safety

  useEffect(() => {
    const checkMobile = () => {
      // Check if we're on a native platform (iOS/Android app)
      if (Capacitor.isNativePlatform()) {
        // Native platforms are always mobile
        return true;
      }

      // For web platforms, use multiple indicators for mobile detection
      const userAgent = navigator.userAgent.toLowerCase();
      const screenWidth = window.innerWidth;

      // Check user agent for mobile indicators
      const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

      // Check for touch capabilities (most mobile devices have touch)
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // If user agent indicates mobile, always treat as mobile regardless of width
      let isMobileDevice = isMobileUserAgent;

      if (!isMobileUserAgent && hasTouch) {
        isMobileDevice = true;
      }

      // For devices that pass mobile checks, still consider orientation impact
      if (isMobileDevice) {
        // Even on horizontal orientation, mobile devices should use mobile UI
        // But we can be more lenient with width if it's clearly a mobile device
        const isVeryWide = screenWidth > 1200; // Likely tablet in landscape
        if (!isVeryWide) {
          return true;
        }
      }

      // Fallback to width check for unknown devices
      return screenWidth < 768;
    };

    // Initial check
    setIsMobile(checkMobile());

    // Listen for window resize/orientation change events
    const handleResize = () => {
      const newMobileState = checkMobile();
      setIsMobile(newMobileState);
      console.log(`Mobile detection: ${newMobileState ? 'mobile' : 'desktop'} (width: ${window.innerWidth}px, height: ${window.innerHeight}px)`);
    };

    // Listen for both resize and orientationchange events
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return isMobile;
};