import React, { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Text,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { users } from '../data/users';
import searchNormalImage from '../images/search-normal.svg';
import adminLogoTopRight from '../images/Ellipse-816.svg';

const Users = () => {
  const [viewMode, setViewMode] = useState('grid');
  return (
    <Box minH="100vh" bg="gray.100">
      <Container maxW="full" px={0} py={{ base: 4, md: 6 }}>
      {/* Top bar: heading, search field, admin profile (mock) */}
      <HStack w="full" mb="48px" align="center" justify="space-between">
        <Heading
          fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
          fontWeight={600}
          fontStyle="normal"
          fontSize={{ base: "24px", md: "32px" }}
          lineHeight="160%"
          letterSpacing="0"
          textAlign={{ base: "center", md: "left" }}
        >
          Users
        </Heading>
        <HStack spacing="40px" align="center" display={{ base: "none", md: "flex" }}>
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
              // _focus={{ boxShadow: 'sm'}}
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
          User List
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

      <VStack spacing={0} align="stretch">
        {users.map((u, idx) => (
          <Box
            key={u.id}
            h="100px"
            bg="white"
            borderRadius="16px"
            px="16px"
            display="flex"
            alignItems="center"
            mb={idx !== users.length - 1 ? '24px' : 0}
          >
            <HStack w="full" justify="space-between" align="center">
              <HStack spacing="16px" align="center" flex="1">
                <Box w="56px" h="56px" borderRadius="12px" bg="gray.200" overflow="hidden" display="flex" alignItems="center" justifyContent="center">
                  <img
                    src={require('../images/cat.png')}
                    alt="User avatar"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      display: 'block'
                    }}
                  />
                </Box>
                <Stack spacing={0}>
                  <Text fontWeight="semibold">{u.name}</Text>
                  <Text fontSize="sm" color="gray.500">{u.email}</Text>
                </Stack>
                <Badge ml="24px" colorPalette={u.status === 'Online' ? 'green' : 'orange'}>
                  {u.status === 'Online' ? 'Online' : 'Offline'}
                </Badge>
              </HStack>
              <HStack spacing="16px" align="center">
                <Button h="54px" w="101px" px="12px" borderRadius="8px" bg="#161819" color="white" _hover={{ bg: '#0f1011' }}>
                  Source
                </Button>
                <Button h="54px" w="160px" px="12px" borderRadius="8px" bg="#6F6CF3" color="white" _hover={{ bg: '#5c59e0' }}>
                  View Details
                </Button>
              </HStack>
            </HStack>
          </Box>
        ))}
      </VStack>
      </Container>
    </Box>
  );
};

export default Users;
