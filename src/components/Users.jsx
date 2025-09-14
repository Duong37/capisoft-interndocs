import React, { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Text,
  Stack,
  VStack,
} from '@chakra-ui/react';
import PageHeader from './PageHeader.jsx';
import { users } from '../data/users';
import userImage from '../images/cat.png'

const Users = () => {
  const [viewMode, setViewMode] = useState('grid');
  return (
    <Box>
      <Container maxW="full" px={0} py={{ base: 4, md: 6 }}>
        <PageHeader title="Users" />
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
            // Let the row grow on mobile so buttons can wrap below
            h={{ base: 'auto', md: '100px' }}
            bg="white"
            borderRadius="16px"
            px="16px"
            py="16px"
            overflow="hidden"
            display={{ base: 'block', md: 'flex' }}
            alignItems={{ base: 'stretch', md: 'center' }}
            mb={idx !== users.length - 1 ? '16px' : 0}
          >
            <Stack w="full" direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'stretch', md: 'center' }} spacing={{ base: 12, md: 0 }}>
              <HStack align="center" flex="1">
                <Box w="68px" h="68px" borderRadius="12px" bg="gray.200" overflow="hidden" display="flex" alignItems="center" justifyContent="center">
                  <img
                    src={userImage}
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
                <Stack ml="8px">
                  <Text fontWeight="semibold">{u.name}</Text>
                  <Text fontSize="sm" color="gray.500">{u.email}</Text>
                </Stack>
                <Badge
                  ml="24px"
                  fontSize="lg"
                  px="20px"
                  py="8px"
                  height="36px"
                  borderRadius="10px"
                  bg={u.status === 'Online' ? '#EBFDEF' : '#FFEFE7'}
                  color={u.status === 'Online' ? '#42AA65' : '#FF9600'}
                >
                  {u.status === 'Online' ? 'Online' : 'Offline'}
                </Badge>
              </HStack>
              {/* Buttons: stack below on mobile */}
              <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 3, md: 16 }} align={{ base: 'stretch', md: 'center' }} w={{ base: 'full', md: 'auto' }}>
                <Button h={{ base: '44px', md: '54px' }} w={{ base: 'full', md: '101px' }} px="12px" borderRadius="8px" bg="#161819" color="white" _hover={{ bg: '#0f1011' }}>
                  Source
                </Button>
                <Button h={{ base: '44px', md: '54px' }} w={{ base: 'full', md: '160px' }} px="12px" borderRadius="8px" bg="#6F6CF3" color="white" _hover={{ bg: '#5c59e0' }} ml={{ base: 0, md: '8px' }}>
                  View Details
                </Button>
              </Stack>
            </Stack>
          </Box>
        ))}
      </VStack>
      </Container>
    </Box>
  );
};

export default Users;
