import React from 'react';
import {
  HStack,
  Text,
  VStack,
  Button,
  Badge,
  Box
} from '@chakra-ui/react';

const TodoItemView = ({
  selectedItem,
  onEdit,
  onDelete
}) => {
  // Handle edit button click
  const handleEdit = () => {
    onEdit(selectedItem.id);
  };

  // Handle delete button click
  const handleDelete = () => {
    onDelete(selectedItem.id);
  };
  
  return (
    <VStack spacing={4} align="stretch">
      {/* Header */}
      <HStack justify="space-between" align="start">
        <VStack align="start" spacing={1} flex="1">
          <HStack justify="space-between" align="start" w="full">
            <Text fontSize="lg" fontWeight="semibold" color="gray.900">
              {selectedItem.title}
            </Text>
            <Button
              size="xs"
              colorScheme="red"
              onClick={handleDelete}
            >
              Delete Item
            </Button>
          </HStack>
          <HStack spacing={2}>
            <Badge fontSize="xs">
              Status: {selectedItem.status}
            </Badge>
            <Badge fontSize="xs">
              Assigned to: {selectedItem.assignee}
            </Badge>
          </HStack>
        </VStack>
      </HStack>

      <Box borderBottomWidth="1px" borderColor="gray.200" />

      {/* Description */}
      {selectedItem.description && (
        <Box>
          <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
            Description:
          </Text>
          <Text fontSize="sm" color="gray.600" lineHeight="1.5">
            {selectedItem.description}
          </Text>
        </Box>
      )}

      {/* Details Grid */}
      <VStack spacing={3} align="stretch">
        <HStack justify="space-between" fontSize="sm">
          <Text color="gray.500">Created:</Text>
          <Text color="gray.700">
            {selectedItem.created_at}
          </Text>
        </HStack>

        {selectedItem.last_modified !== selectedItem.created_at && (
          <HStack justify="space-between" fontSize="sm">
            <Text color="gray.500">Modified:</Text>
            <Text color="gray.700">
              {selectedItem.last_modified}
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

      {/* Action Button */}
      <Button
        size="sm"
        colorScheme="blue"
        onClick={handleEdit}
        alignSelf="flex-start"
      >
        Edit Item
      </Button>
    </VStack>
  );
};

export default TodoItemView;