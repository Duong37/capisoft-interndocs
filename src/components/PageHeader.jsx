import React from 'react';
import { Box, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react';
import searchNormalImage from '../images/search-normal.svg';
import adminLogoTopRight from '../images/Ellipse-816.svg';

const PageHeader = ({ title }) => {
  return (
    <>
      {/* Desktop and Mobile Header */}
      <HStack w="full" mb={{ base: 6, md: 12 }} align="center" justify={{ base: 'center', md: 'space-between' }}>
        <Heading
          fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
          fontWeight={600}
          fontStyle="normal"
          fontSize={{ base: "24px", md: "32px" }}
          lineHeight="160%"
          letterSpacing="0"
          textAlign={{ base: "center", md: "left" }}
        >
          {title}
        </Heading>
        {/* Desktop search + profile */}
        <HStack spacing={{ base: 4, md: 10 }} align="center" display={{ base: "none", md: "flex" }}>
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
          <HStack spacing={3} ml="40px">
            <Box w="48px" h="48px" borderRadius="full" bg="gray.300" overflow="hidden">
              <img
                src={adminLogoTopRight}
                alt="Admin Logo"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            </Box>
            <VStack spacing="0px" align="start">
              <Text fontWeight={600} lineHeight="1">John Smith</Text>
              <Text color="gray.500" fontSize="sm" lineHeight="1">Admin</Text>
            </VStack>
          </HStack>
        </HStack>
      </HStack>

      {/* Mobile admin profile - positioned in top right */}
      <Box position="fixed" top={4} right={4} zIndex={15} display={{ base: "block", md: "none" }}>
        <HStack spacing={3}>
          <Box w="48px" h="48px" borderRadius="full" bg="gray.300" overflow="hidden">
            <img
              src={adminLogoTopRight}
              alt="Admin Logo"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          </Box>
          <VStack spacing="0px" align="start">
            <Text fontWeight={600} lineHeight="1">John Smith</Text>
            <Text color="gray.500" fontSize="sm" lineHeight="1">Admin</Text>
          </VStack>
        </HStack>
      </Box>

      {/* Mobile search */}
      <VStack w="full" spacing={4} display={{ base: "flex", md: "none" }} mb={6}>
        <Box position="relative" width="100%" maxW="400px" height="50px" borderRadius="8px" opacity={1}>
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
    </>
  );
};

export default PageHeader;