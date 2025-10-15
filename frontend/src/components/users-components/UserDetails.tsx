import React from 'react';
import {
  HStack,
  Text,
  VStack,
  Badge,
  Box,
  Button,
} from '@chakra-ui/react';

interface UserDetailsProps {
  selectedUser: any;
  onClose: () => void;
}

const UserDetails = ({
  selectedUser,
  onClose
}: UserDetailsProps) => {
  if (!selectedUser) return null;

  return (
    <VStack gap={4} align="stretch">
      {/* Header */}
      <HStack justify="space-between" align="start">
        <VStack align="start" gap={1} flex="1">
          <Text fontSize="lg" fontWeight="semibold" color="gray.900">
            {selectedUser.first_name} {selectedUser.last_name}
          </Text>
          <HStack gap={2}>
            <Badge
              colorScheme={
                selectedUser.user_type === 'ADMIN' ? 'purple' : 'blue'
              }
              fontSize="xs"
            >
              {selectedUser.user_type || 'USER'}
            </Badge>
          </HStack>
        </VStack>
        <Button
          size="sm"
          aria-label="Close expanded view"
          onClick={onClose}
        >
          Close
        </Button>
      </HStack>

      <Box borderBottomWidth="1px" borderColor="gray.200" />

      {/* Email */}
      <VStack gap={3} align="stretch">
        <HStack justify="space-between" align="stretch">
          <Text fontSize="sm" fontWeight="medium" color="gray.700">
            User Details
          </Text>
        </HStack>
        
        <HStack justify="space-between" align="stretch">
          <Text fontSize="sm" color="gray.500" lineHeight="1.5">Email:</Text>
          <Text fontSize="sm" color="gray.700" lineHeight="1.5">
            {selectedUser.email}
          </Text>
        </HStack>

        <HStack justify="space-between" align="stretch">
          <Text fontSize="sm" color="gray.500" lineHeight="1.5">Phone:</Text>
          <Text fontSize="sm" color="gray.700" lineHeight="1.5">
            {selectedUser.phone}
          </Text>
        </HStack>

        <HStack justify="space-between" align="stretch">
          <Text fontSize="sm" color="gray.500" lineHeight="1.5">Birthday:</Text>
          <Text fontSize="sm" color="gray.700" lineHeight="1.5">
            {new Date(selectedUser.birthday).toLocaleDateString()}
          </Text>
        </HStack>
      </VStack>

      {/* User Details Grid */}
      <VStack gap={3} align="stretch">
        <Text fontSize="sm" fontWeight="medium" color="gray.700">
          Account Details
        </Text>

        <HStack justify="space-between" fontSize="sm">
          <Text color="gray.500">User ID:</Text>
          <Text color="gray.700" fontFamily="mono" fontSize="xs">
            {selectedUser.id}
          </Text>
        </HStack>

        <HStack justify="space-between" fontSize="sm">
          <Text color="gray.500">Account Type:</Text>
          <Text color="gray.700">
            {selectedUser.user_type || 'USER'}
          </Text>
        </HStack>

        <HStack justify="space-between" fontSize="sm">
          <Text color="gray.500">Status:</Text>
          <Badge
            bg={selectedUser.is_active === true ? '#EBFDEF' : '#FFEFE7'}
            color={selectedUser.is_active === true ? '#42AA65' : '#FF9600'}
            fontSize="xs"
          >
            {selectedUser.is_active === true ? 'Active' : 'Inactive'}
          </Badge>
        </HStack>

        {selectedUser.created_at && (
          <HStack justify="space-between" fontSize="sm">
            <Text color="gray.500">Created At:</Text>
            <Text color="gray.700">
              {new Date(selectedUser.created_at).toLocaleDateString()} {new Date(selectedUser.created_at).toLocaleTimeString()}
            </Text>
          </HStack>
        )}

        {selectedUser.last_modified && (
          <HStack justify="space-between" fontSize="sm">
            <Text color="gray.500">Last Modified:</Text>
            <Text color="gray.700">
              {new Date(selectedUser.last_modified).toLocaleDateString()} {new Date(selectedUser.last_modified).toLocaleTimeString()}
            </Text>
          </HStack>
        )}
      </VStack>
    </VStack>
  );
};

export default UserDetails;