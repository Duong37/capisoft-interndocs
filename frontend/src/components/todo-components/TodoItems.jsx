import React, { Fragment, useState, useEffect } from 'react';
import {
  Box,
  HStack,
  Text,
  VStack,
  Spinner,
  Button,
} from '@chakra-ui/react';
import Card from '../dashboard-components/card.jsx';
import { useCreateTodoItemMutation, useDeleteTodoItemMutation, useUpdateTodoItemMutation } from '../../hooks/useTodoQueries';
import { useUsersQuery } from '../../hooks/useAuthQuery';
import TodoItemAdd from './TodoItemAdd.jsx';
import TodoItemView from './TodoItemView.jsx';
import TodoItemEdit from './TodoItemEdit.jsx';

const TodoItems = ({
  todoItems, // Selected list items
  loading,
  error,
  selectedListId // To know which list we're adding to or removing from
}) => {

  const { data: users } = useUsersQuery();

  // Item states
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Item CRUD Mutations
  const createItemMutation = useCreateTodoItemMutation();
  const deleteItemMutation = useDeleteTodoItemMutation();
  const updateItemMutation = useUpdateTodoItemMutation();

  // Item CRUD Handlers
  const handleAddItem = () => {
    if (!selectedListId) {
      console.error('No list selected');
      return;
    }
    setIsAddingItem(true);
  };

  const handleDeleteItem = async (itemId) => {
    const item = todoItems.find(item => item.id === itemId);
    const confirmMessage = `Are you sure you want to delete item "${item?.title || 'this item'}"? This cannot be undone.`;

    if (window.confirm(confirmMessage)) {
      await deleteItemMutation.mutateAsync(itemId);
    }
  };

  const handleCancelAdd = () => {
    setIsAddingItem(false);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  // Handle update item with proper error handling
  const handleUpdateItem = async (updateData) => {

   await updateItemMutation.mutateAsync(updateData);
    
  };

  // Update selected item when todoItems changes (for UI refresh after updates)
  useEffect(() => {
    if (selectedItem && todoItems) {
      const updatedItem = todoItems.find(item => item.id === selectedItem.id);
      if (updatedItem) {
        // Compare key fields to see if item actually changed
        const hasChanged =
          updatedItem.title !== selectedItem.title ||
          updatedItem.description !== selectedItem.description ||
          updatedItem.status !== selectedItem.status ||
          updatedItem.assignee !== selectedItem.assignee ||
          updatedItem.last_modified !== selectedItem.last_modified;

        if (hasChanged) {
          // Update the selected item with the latest data
          setSelectedItem(updatedItem);
        }
      }
    }
  }, [todoItems, selectedItem]);

  // Reset selected item when selectedListId changes (e.g., when switching lists)
  useEffect(() => {
    setSelectedItem(null);
  }, [selectedListId]);
  
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
      <VStack align="stretch" mb={4}>
        <HStack justify="space-between" align="center">
            <Text
            fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
            fontWeight={500}
            fontStyle="normal"
            fontSize="18px"
            lineHeight="160%"
            letterSpacing="0"
            color="gray.700"
            >
            Todo Items ({todoItems?.length || 0})
            </Text>
            {!isAddingItem ? (
            <Button 
              size="sm" 
              borderRadius="10px" 
              py="6px" 
              px="12px" 
              onClick={handleAddItem}
            >
              Add Item
            </Button>
            ) : null}
        </HStack>

        {/* Form for adding a new todo item */}
        {isAddingItem && (
          <TodoItemAdd
            selectedListId={selectedListId}
            users={users}
            onCreateItem={createItemMutation.mutateAsync}
            onCancel={handleCancelAdd}
            isLoading={createItemMutation.isLoading}
          />
        )}
      </VStack>
      
      {/* List of todo items */}
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
                onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                bg={selectedItem?.id === item.id ? "gray.50" : "transparent"}
                px={2}
              >
                <Box flex="1">
                  <Text fontWeight="medium" fontSize="12px" color="gray.800">
                    {item.title}
                  </Text>
                </Box>
              </HStack>

              {/* Selected Item Edit or Expanded View - Inline */}
              {selectedItem?.id === item.id && (
                <Card w="full" border="1px solid" borderColor="gray.200" mb={2}>
                  {editingItem === selectedItem.id ? (
                    // Edit Form
                    <TodoItemEdit
                      selectedItem={selectedItem}
                      users={users}
                      onUpdate={handleUpdateItem}
                      onCancel={handleCancelEdit}
                      onDelete={() => handleDeleteItem(selectedItem?.id)}
                    />
                  ) : (
                    // Expanded View Mode
                    <TodoItemView
                      selectedItem={selectedItem}
                      onEdit={setEditingItem}
                      onDelete={handleDeleteItem}
                      users={users}
                    />
                  )}
                </Card>
              )}
            </Fragment>
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