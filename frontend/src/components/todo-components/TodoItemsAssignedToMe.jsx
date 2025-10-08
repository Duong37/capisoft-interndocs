import React, { Fragment, useState } from 'react';
import {
  Box,
  HStack,
  Text,
  VStack,
  Spinner,
} from '@chakra-ui/react';
import Card from '../dashboard-components/card.jsx';
import TodoItemsAssignedToMeView from './TodoItemsAssignedToMeView.jsx';

const TodoItemsAssignedToMe = ({
  todoItems,
  loading,
  error
}) => {
  // Local state for selected assigned item
  const [selectedItem, setSelectedItem] = useState(null);

  // Handle item selection
  const handleSelectItem = (item) => {
    setSelectedItem(selectedItem?.id === item.id ? null : item);
  };

  // Handle closing the expanded view
  const handleCloseItem = () => {
    setSelectedItem(null);
  };
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
        <Text color="red.600">Error loading assigned items: {error.message}</Text>
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
        mb={2}
      >
        Items Assigned to Me ({todoItems?.length || 0})
      </Text>
      <Text
        fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
        fontWeight={400}
        fontSize="12px"
        lineHeight="160%"
        color="gray.500"
        mb={4}
      >
        Items that have been assigned to me, by me or other users.
      </Text>
      <VStack align="stretch">
        {todoItems?.length > 0 ? (
          todoItems.map((item) => (
            <Fragment key={item.id}>
              <HStack
                justify="space-between"
                py={1.5}
                cursor="pointer"
                _hover={{ bg: "gray.50" }}
                borderRadius="md"
                onClick={() => handleSelectItem(item)}
                bg={selectedItem?.id === item.id ? "gray.50" : "transparent"}
                px={2}
              >
                <Text fontWeight="medium" fontSize="12px" color="gray.800">
                  {item.title}
                </Text>
              </HStack>

              {/* Selected Item Expanded View - Inline */}
              {selectedItem?.id === item.id && (
                <Card w="full" border="1px solid" borderColor="gray.200" mb={2}>
                  <TodoItemsAssignedToMeView
                    selectedItem={selectedItem}
                    onClose={handleCloseItem}
                  />
                </Card>
              )}
            </Fragment>
          ))
        ) : (
          <Box p={4} bg="gray.50" borderRadius="md" w="full">
            <Text color="gray.500" fontSize="sm" textAlign="center">
              No assigned items found
            </Text>
          </Box>
        )}
      </VStack>
    </>
  );
};

export default TodoItemsAssignedToMe;