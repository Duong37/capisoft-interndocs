import React, { Fragment, useEffect} from 'react';
import {
  VStack,
  HStack,
  Text,
  Heading,
  CardRoot,
  CardBody,
  Badge,
  Box,
  Button
} from '@chakra-ui/react';
import { useState } from 'react';
import { useTodoItemsQuery, useDeleteTodoListMutation, useDeleteTodoItemMutation, useCreateTodoListMutation } from '../../hooks/useTodoQueries';
import TodoListView from './TodoListView.jsx';

const TodoLists = ({
  todoLists,
  loading,
  error
}) => {

  // Local state for selected list
  const [selectedList, setSelectedList] = useState(null);
  const [selectedListItems, setSelectedListItems] = useState(null);

  // Fetch todo items for the selected list
  const { data: currentListItems, isLoading: itemsLoading, error: itemsError } = useTodoItemsQuery(
    selectedList ? { todolist: selectedList.id } : {}
  );

  // Create list mutation
  const createListMutation = useCreateTodoListMutation();

  // Delete list mutation
  const deleteListMutation = useDeleteTodoListMutation();

  // Delete item mutation (needed for bulk deletion when deleting a list)
  const deleteItemMutation = useDeleteTodoItemMutation();

  const handleDeleteList = async () => {
    if (!selectedList) return;

    const itemCount = selectedListItems?.length || 0;
    
    const confirmMessage = `Are you sure you want to delete this list with ${itemCount} items? This cannot be undone.`;

    if (window.confirm(confirmMessage)) {
      try {
        // Delete all items in the list
        if (itemCount > 0) {
            for (const item of selectedListItems) {
              await deleteItemMutation.mutateAsync(item.id);
            }
          }

        // Delete the list
        await deleteListMutation.mutateAsync(selectedList.id);

        // If this list was selected, deselect it
        setSelectedList(null);

      } catch (error) {
        console.error('Failed to delete list:', error);
      }
    } else {
      console.log('User cancelled deletion');
    }
  };

  // Reset selectedListItems when selected list changes
  useEffect(() => {
    setSelectedListItems(null);
  }, [selectedList]);

  // Sync selectedListItems when currentListItems changes
  useEffect(() => {
    if (currentListItems) {
      setSelectedListItems(currentListItems);
    }
  }, [currentListItems]);

  if (loading) {
    return (
      <VStack spacing={4} w="full">
        {[...Array(6)].map((_, i) => (
          <CardRoot key={i} w="full">
            <CardBody>
              <VStack spacing={3}>
                <Box h="20px" bg="gray.200" borderRadius="4px" />
                <Box h="14px" bg="gray.100" borderRadius="2px" w="60%" />
              </VStack>
            </CardBody>
          </CardRoot>
        ))}
      </VStack>
    );
  }

  if (itemsError) {
    return (
      <Box p={4} bg="red.50" borderRadius="md" w="full">
        <Text color="red.600">Error loading todo lists: {error.message}</Text>
      </Box>
    );
  }

  if (!todoLists || todoLists.length === 0) {
    return (
      <Box p={8} bg="gray.50" borderRadius="md" w="full">
        <VStack spacing={4}>
          <Text fontSize="lg" color="gray.600" textAlign="center">
            No todo lists found
          </Text>
          <Text color="gray.500" textAlign="center">
            Create your first todo list to get started!
          </Text>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() => createListMutation.mutate({})}
          >
            Create List
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between" align="center" w="full">
      <Heading size="md" mb={2}>My Todo Lists ({todoLists.length})</Heading>
      <Button
        size="sm"
        colorScheme="blue"
        onClick={() => createListMutation.mutate({})}
      >
        Create List
      </Button>
      </HStack>

      <VStack spacing={4} w="full">
        {todoLists.map((list) => (
          <Fragment key={list.id}>
            <CardRoot
              w="full"
              border={selectedList?.id === list.id ? "2px solid" : "1px solid"}
              borderColor={selectedList?.id === list.id ? "blue.500" : "gray.200"}
              _hover={{ shadow: "md", transform: "translateY(-2px)" }}
              cursor="pointer"
              onClick={() => setSelectedList(selectedList?.id === list.id ? null : list)}
              transition="all 0.2s ease"
            >
            <CardBody>
              <VStack align="start" spacing={3}>
                <HStack justify="space-between" w="full">
                  <Heading size="sm" noOfLines={1} fontWeight="600">
                    {`Todo List ${todoLists.findIndex(l => l.id === list.id) + 1}`}
                  </Heading>
                </HStack>
                <HStack justify="space-between" w="full" pt={2}>
                  <HStack spacing={2}>
                    <Badge colorScheme="blue" fontSize="xs">
                      {list.items?.length || 0} items
                    </Badge>
                    <Text fontSize="xs" color="gray.500">
                      Created: {new Date(list.created_at).toLocaleDateString()}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </CardBody>
          </CardRoot>

          {/* Expanded List Details - Inline with selected list */}
          {selectedList?.id === list.id && (
            <TodoListView
              selectedList={selectedList}
              todoLists={todoLists}
              selectedListItems={selectedListItems}
              itemsLoading={itemsLoading}
              itemsError={itemsError}
              onDeleteList={handleDeleteList}
            />
          )}
          </Fragment>
        ))}
      </VStack>
    </VStack>
  );
};

export default TodoLists;