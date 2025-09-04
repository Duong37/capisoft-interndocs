import React from 'react';
import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { users } from '../data/users';

const Users = () => {
  return (
    <Container maxW="full" px={0} py={6}>
      <HStack justify="space-between" mb="24px">
        <Heading
          fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
          fontWeight={600}
          fontStyle="normal"
          fontSize="32px"
          lineHeight="160%"
          letterSpacing="0"
        >
          Users
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
        User List
      </Text>

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
                <Box w="56px" h="56px" borderRadius="12px" bg="gray.200" />
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
  );
};

export default Users;
