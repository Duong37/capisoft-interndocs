import React from 'react';
import {
  Box,
  HStack,
  Text,
  VStack,
  Spinner,
  IconButton,
  Badge,
  Button,
} from '@chakra-ui/react';
import Card from '../dashboard-components/card.jsx';

const TodoItems = ({
  todoItems,
  loading,
  onSelectItem,
  selectedItem,
  error,
  onEditItem
}) => {

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} bg="red.50" borderRadius="md">
        <Text color="red.600">Error loading todo items: {error.message}</Text>
      </Box>
    );
  }

  return (
    <>
      <Text
        fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
        fontWeight={500}
        fontStyle="normal"
        fontSize="18px"
        lineHeight="160%"
        letterSpacing="0"
        color="gray.700"
        mb={4}
      >
        Todo Items ({todoItems?.length || 0})
      </Text>
      <VStack align="stretch">
        {todoItems?.length > 0 ? (
          todoItems.map((item, i) => (
            <HStack
              key={item.id}
              justify="space-between"
              py={1.5}
              pb={i === todoItems.length - 1 ? 0 : 1.5}
              cursor="pointer"
              _hover={{ bg: "gray.50" }}
              borderRadius="md"
              onClick={() => onSelectItem(item)}
              bg={selectedItem?.id === item.id ? "gray.50" : "transparent"}
              px={2}
            >
              <Box flex="1" onClick={(e) => e.stopPropagation()}>
                <Text fontWeight="medium" fontSize="12px" color="gray.800">
                  {item.title}
                </Text>
                <Text
                  fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                  fontWeight={400}
                  fontStyle="medium"
                  fontSize="11px"
                  lineHeight="160%"
                  letterSpacing="0"
                  color="gray.500"
                >
                  {/* {item.assignee ? `${item.assignee.first_name} ${item.assignee.last_name}` : 'Unassigned'} */}
                </Text>
              </Box>
              <HStack spacing={2} align="center">
                <Text
                  fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                  fontWeight={500}
                  fontStyle="medium"
                  fontSize="12px"
                  lineHeight="160%"
                  letterSpacing="0"
                  textAlign="right"
                  color="gray.500"
                >
                  {item.last_modified}
                </Text>
                <IconButton
                  size="xs"
                  variant="ghost"
                  colorScheme="blue"
                  aria-label="Edit item"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditItem(item.id);
                  }}
                />
              </HStack>
            </HStack>
          ))
        ) : (
          <Box p={4} bg="gray.50" borderRadius="md" w="full">
            <Text color="gray.500" fontSize="sm" textAlign="center">
              No todo items found
            </Text>
          </Box>
        )}

      {/* Selected Item Expanded View */}
      {selectedItem && (
        <Card mt={4} w="full" border="1px solid" borderColor="gray.200">
          <VStack spacing={4} align="stretch">
            {/* Header */}
            <HStack justify="space-between" align="start">
              <VStack align="start" spacing={1} flex="1">
                <Text fontSize="lg" fontWeight="semibold" color="gray.900">
                  {selectedItem.title}
                </Text>
                <HStack spacing={2}>
                  <Badge
                    fontSize="xs"
                  >
                    {selectedItem.status}
                  </Badge>
                  {selectedItem.assignee && (
                    <Badge colorScheme="purple" fontSize="xs">
                      {selectedItem.assignee}
                    </Badge>
                  )}
                </HStack>
              </VStack>
              <IconButton
                size="sm"
                variant="ghost"
                aria-label="Close expanded view"
                onClick={() => onSelectItem(null)}
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
              onClick={() => onEditItem(selectedItem.id)}
              alignSelf="flex-start"
            >
              Edit Item
            </Button>
          </VStack>
        </Card>
      )}
      </VStack>
    </>
  );
};

export default TodoItems;