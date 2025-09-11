import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';
import searchNormalImage from '../images/search-normal.svg';
import adminLogoTopRight from '../images/Ellipse-816.svg';

// Card component to display product information
const ProductCard = ({ product }) => (
  <Box
    bg="white"
    borderRadius="24px"
    p="16px"
    w="full"
    h="386.5px"
    opacity={1}
    borderWidth="0"
    boxShadow="none"
  >
    <Box position="relative" borderRadius="lg" overflow="hidden" mb="12px">
      <Box w="full" h="243px" borderRadius="16px" overflow="hidden" bg="gray.100">
        <img
          src={require('../images/product.jpg')}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '16px',
            display: 'block'
          }}
        />
      </Box>
    </Box>
    <VStack align="start" spacing={0}>
      <Text fontSize="16px" fontWeight="medium" lineHeight="1.4">{product.name}</Text>
      <Text color="gray.500" fontSize="12px" lineHeight="1.6" mt="-2px">{product.url}</Text>
    </VStack>
    <HStack mt="16px" w="full" h="38px" align="end" justify="space-between">
      <Button
        w="107px"
        h="34px"
        borderRadius="10px"
        py="6px"
        px="12px"
        bg="#6F6CF3"
        color="white"
        _hover={{ bg: '#5c59e0' }}
      >
        View Details
      </Button>
      <Button
        w="72px"
        h="26px"
        borderRadius="8px"
        bg="#161819"
        color="white"
        _hover={{ bg: '#0f1011' }}
      >
        Source
      </Button>
    </HStack>
  </Box>
);

// Reviews component to display a list of users
const Reviews = () => {
  const { isAuthenticated } = useAuth();
  const [viewMode, setViewMode] = useState('grid');
  // If the user is not authenticated, do not render the component
  if (!isAuthenticated) return null;

  return (
    <Box>
      <Container maxW="full" py={{ base: 4, md: 6 }} px={0}>
      {/* Top bar: heading, search field, admin profile (mock) */}
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
          Reviews
        </Heading>
        {/* Desktop search + profile */}
        <HStack spacing={{ base: 4, md: 10 }} align="center" display={{ base: 'none', md: 'flex' }}>
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
            <Box w="40px" h="40px" borderRadius="full" bg="gray.300" overflow="hidden">
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

      {/* Mobile search + profile */}
      <VStack w="full" spacing={4} display={{ base: 'flex', md: 'none' }} mb={6}>
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
        <HStack spacing={3}>
          <Box w="48px" h="48px" borderRadius="full" bg="gray.300" overflow="hidden">
            <img src={adminLogoTopRight} alt="Admin Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          </Box>
          <VStack align="start" spacing="-2px">
            <Text fontWeight={500} fontSize="18px" lineHeight="100%">John Smith</Text>
            <Text color="gray.500" fontSize="14px" lineHeight="100%">Admin</Text>
          </VStack>
        </HStack>
      </VStack>
      <HStack w="full" justify="space-between" align="center" mb="24px">
        <Text
          color="black"
          fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
          fontWeight={500}
          fontStyle="normal"
          fontSize="18px"
          lineHeight="160%"
          letterSpacing="0"
        >
          Product List
        </Text>
        <HStack spacing={3}>
          <Button
            size="sm"
            height="36px"
            px="16px"
            bg={viewMode === 'grid' ? '#161819' : 'white'}
            color={viewMode === 'grid' ? 'white' : 'black'}
            borderRadius="12px"
            // boxShadow="sm"
            _hover={{ bg: viewMode === 'grid' ? '#161819' : 'white' }}
            onClick={() => setViewMode('grid')}
            aria-pressed={viewMode === 'grid'}
          >
            Grid View
          </Button>
          <Button
            size="sm"
            height="36px"
            px="16px"
            bg={viewMode === 'list' ? '#161819' : 'white'}
            color={viewMode === 'list' ? 'white' : 'black'}
            borderRadius="12px"
            // boxShadow="sm"
            _hover={{ bg: viewMode === 'list' ? '#161819' : 'white' }}
            onClick={() => setViewMode('list')}
            aria-pressed={viewMode === 'list'}
          >
            List View
          </Button>
        </HStack>
      </HStack>
      <Grid templateColumns={{ base: "1fr", sm: "repeat(auto-fit, minmax(275px, 1fr))" }} gap={{ base: 4, md: 6 }} justifyContent="start">
        {/* Map through the products and render a UserCard for each user */}
        {products.map((product) => (
          <GridItem key={product.id}>
            <ProductCard product={product} />
          </GridItem>
        ))}
      </Grid>
      </Container>
    </Box>
  );
};

export default Reviews;
