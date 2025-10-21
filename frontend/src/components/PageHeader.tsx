import React from 'react';
import { Box, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { useSafeArea } from '../hooks/useSafeArea';
import searchNormalImage from '../images/search-normal.svg';
import adminLogoTopRight from '../images/Ellipse-816.svg';
import { useMobileDetection } from '../hooks/useMobileDetection';

const PageHeader = ({ title }: { title: string }) => {
  // Ensure safe area values are set
  useSafeArea();

  const isMobile = useMobileDetection();

  return isMobile ? (
    // Mobile Header - Vertical Layout with VStack
    <VStack w="full" mb={6} gap={4} align="stretch">
      {/* Mobile admin profile - positioned in top right */}
      <Box position="fixed" top={`calc(16px + var(--safe-area-inset-top, 0px))`} right={`calc(16px + var(--safe-area-inset-right, 0px))`} zIndex={15}>
        <HStack gap={3}>
          <Box w="48px" h="48px" borderRadius="full" bg="gray.300" overflow="hidden">
            <img
              src={adminLogoTopRight}
              alt="Admin Logo"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          </Box>
          <VStack gap="0px" align="start">
            <Text fontWeight={600} lineHeight="1">John Smith</Text>
            <Text color="gray.500" fontSize="sm" lineHeight="1">Admin</Text>
          </VStack>
        </HStack>
      </Box>

      {/* Mobile Title */}
      <Heading
        fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
        fontWeight={600}
        fontStyle="normal"
        fontSize="24px"
        lineHeight="160%"
        letterSpacing="0"
        textAlign="center"
      >
        {title}
      </Heading>

      {/* Mobile search */}
      <Box position="relative" width="100%" maxW="400px" height="50px" borderRadius="8px" opacity={1} mx="auto">
        <Input
          placeholder="  Search"
          fontSize="16px"
          bg="white"
          borderRadius="8px"
          borderWidth="0"
          pr="44px"
          h="50px"
          w="100%"
        />
        <Box position="absolute" right="14px" top="50%" transform="translateY(-50%)" pointerEvents="none" color="gray.400">
          <img src={searchNormalImage} alt="Search" style={{ width: 18, height: 18, display: 'inline-block' }} />
        </Box>
      </Box>
    </VStack>
  ) : (
    // Desktop Header
    <HStack w="full" mb={12} align="center" justify="space-between">
      <Heading
        fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
        fontWeight={600}
        fontStyle="normal"
        fontSize="32px"
        lineHeight="160%"
        letterSpacing="0"
        textAlign="left"
      >
        {title}
      </Heading>
      {/* Desktop search + profile */}
      <HStack gap={10} align="center">
        <Box
          position="relative"
          width="491px"
          height="50px"
          borderRadius="8px"
          opacity={1}
          flex="none"
        >
          <Input
            placeholder="  Search"
            bg="white"
            borderRadius="8px"
            borderWidth="0"
            pr="44px"
            h="50px"
            width="491px"
            height="50px"
          />
          {/* right icon without InputRightElement to avoid v3 issues */}
          <Box
            position="absolute"
            right="14px"
            top="50%"
            transform="translateY(-50%)"
            pointerEvents="none"
            color="gray.400"
          >
            <img
              src={searchNormalImage}
              alt="Search"
              style={{ width: 18, height: 18, display: 'inline-block' }}
            />
          </Box>
        </Box>
        <HStack gap={3} ml="40px">
          <Box w="48px" h="48px" borderRadius="full" bg="gray.300" overflow="hidden">
            <img
              src={adminLogoTopRight}
              alt="Admin Logo"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          </Box>
          <VStack gap="0px" align="start">
            <Text fontWeight={600} lineHeight="1">John Smith</Text>
            <Text color="gray.500" fontSize="sm" lineHeight="1">Admin</Text>
          </VStack>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default PageHeader;