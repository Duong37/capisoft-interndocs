import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';

// Card component to display product information
const ProductCard = ({ product }) => (
  <Box
    bg="white"
    borderRadius="24px"
    p="24px"
    w="full"
    h="386.5px"
    opacity={1}
    borderWidth="0"
    boxShadow="none"
  >
    <Box position="relative" borderRadius="lg" overflow="hidden" mb="12px">
      <Box w="full" h="229px" borderRadius="16px" overflow="hidden" bg="gray.100">
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
    <VStack align="start" spacing={1}>
      <Text fontWeight="medium">{product.name}</Text>
      <Text color="gray.500" fontSize="sm">{product.url}</Text>
    </VStack>
    <HStack mt="16px" w="full" h="34px" align="center" justify="space-between">
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
  // If the user is not authenticated, do not render the component
  if (!isAuthenticated) return null;

  return (
    <Container maxW="full" py={6} px={0}>
      <HStack justify="space-between" mb="24px">
        <Heading
          fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
          fontWeight={600}
          fontStyle="normal"
          fontSize="32px"
          lineHeight="160%"
          letterSpacing="0"
        >
          Reviews
        </Heading>
      </HStack>
      <Text
        mb="24px"
        color="gray.600"
        fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
        fontWeight={500}
        fontStyle="normal"
        fontSize="18px"
        lineHeight="160%"
        letterSpacing="0"
      >
        Product List
      </Text>
      <Grid templateColumns="repeat(auto-fit, minmax(275px, 1fr))" gap="24px" justifyContent="start">
        {/* Map through the products and render a UserCard for each user */}
        {products.map((product) => (
          <GridItem key={product.id}>
            <ProductCard product={product} />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

export default Reviews;
