import React from 'react';
import {
  Box,
  HStack,
  Text,
  VStack,
  Spinner,
} from '@chakra-ui/react';

const TodoItems = ({
  todoItems,
  loading,
  onSelectItem,
  selectedItem,
  error
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
            >
              <Box>
                <Text fontWeight="medium" fontSize="12px" color="gray.800">
                  {item.title}
                </Text>
              </Box>
              <Text
                fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                fontWeight={500}
                fontStyle="medium"
                fontSize="14px"
                lineHeight="160%"
                letterSpacing="0"
                textAlign="right"
                borderRadius="md"
                color="gray.500"
              >
                Last modified: {new Date(item.last_modified).toLocaleDateString()}
              </Text>
            </HStack>
          ))
        ) : (
          <Box p={4} bg="gray.50" borderRadius="md" w="full">
            <Text color="gray.500" fontSize="sm" textAlign="center">
              No todo items found
            </Text>
          </Box>
        )}
      </VStack>
    </>
  );
};

export default TodoItems;