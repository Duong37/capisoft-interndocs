import React from 'react';
import {
  HStack,
  Text,
  VStack,
  Badge,
  Box,
  IconButton,
} from '@chakra-ui/react';

const TodoItemsAssignedToMeView = ({
  selectedItem,
  onClose
}) => {
  return (
    <VStack spacing={4} align="stretch">
      {/* Header */}
      <HStack justify="space-between" align="start">
        <VStack align="start" spacing={1} flex="1">
          <Text fontSize="lg" fontWeight="semibold" color="gray.900">
            {selectedItem.title}
          </Text>
          <HStack spacing={2}>
            <Badge
              colorScheme={
                selectedItem.status === 'DONE' ? 'green' :
                selectedItem.status === 'IN_PROGRESS' ? 'blue' :
                'yellow'
              }
              fontSize="xs"
            >
              {selectedItem.status}
            </Badge>
          </HStack>
        </VStack>
        <IconButton
          size="sm"
          variant="ghost"
          aria-label="Close expanded view"
          onClick={onClose}
        />
      </HStack>

      <Box borderBottomWidth="1px" borderColor="gray.200" />

      {/* Description */}
      {selectedItem.description && (
        <Box>
          <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
            Description
          </Text>
          <Text fontSize="sm" color="gray.600" lineHeight="1.5">
            {selectedItem.description}
          </Text>
        </Box>
      )}

      {/* Details Grid */}
      <VStack spacing={3} align="stretch">
        <Text fontSize="sm" fontWeight="medium" color="gray.700">
          Details
        </Text>

        <HStack justify="space-between" fontSize="sm">
          <Text color="gray.500">Created:</Text>
          <Text color="gray.700">
            {new Date(selectedItem.created_at).toLocaleDateString()} {new Date(selectedItem.created_at).toLocaleTimeString()}
          </Text>
        </HStack>

        {selectedItem.last_modified !== selectedItem.created_at && (
          <HStack justify="space-between" fontSize="sm">
            <Text color="gray.500">Modified:</Text>
            <Text color="gray.700">
              {new Date(selectedItem.last_modified).toLocaleDateString()} {new Date(selectedItem.last_modified).toLocaleTimeString()}
            </Text>
          </HStack>
        )}

        <HStack justify="space-between" fontSize="sm">
          <Text color="gray.500">ID:</Text>
          <Text color="gray.700" fontFamily="mono" fontSize="xs">
            {selectedItem.id}
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default TodoItemsAssignedToMeView;