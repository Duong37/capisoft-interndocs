import React, { Fragment, useState } from 'react';
import {
  Box,
  HStack,
  Text,
  VStack,
  Heading,
  Spinner
} from '@chakra-ui/react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Card from '../dashboard-components/card.jsx';
import TodoItemsAssignedToMeView from './TodoItemsAssignedToMeView.jsx';

const TodoItemsAssignedToMe = ({
  todoItems,
  loading,
  error,
  lastItemRef,
  hasNextPage,
  isFetching
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
      <>
        <Skeleton height={24} width={200} mb={2} />
        <Skeleton height={14} width="100%" mb={4} />
        <VStack align="stretch">
          {[...Array(2)].map((_, i) => (
            <Fragment key={i}>
              <Skeleton height={20} width="100%" />
            </Fragment>
          ))}
        </VStack>
      </>
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
      <Heading size="md" mb={2}>
        Todo Items Assigned to Me ({todoItems?.length || 0})
      </Heading>
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
          todoItems.map((item, index) => (
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
                ref={index === todoItems.length - 1 ? lastItemRef : undefined}
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
        {/* Loading indicator for infinite scroll */}
        {isFetching && hasNextPage && todoItems?.length > 0 && (
          <Box py={2} display="flex" justifyContent="center">
            <Spinner size="sm" />
          </Box>
        )}
      </VStack>
    </>
  );
};

export default TodoItemsAssignedToMe;