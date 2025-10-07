import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Heading,
  Grid,
  GridItem,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import { useTodoListsQuery, useUpdateTodoListMutation, useUpdateTodoItemMutation, useAssignedItemsQuery } from '../hooks/useTodoQueries';
import { useUsersQuery } from '../hooks/useAuthQuery';
import PageHeader from './PageHeader.jsx';
import Card from './dashboard-components/card.jsx';
import TodoLists from './todo-components/TodoLists.jsx';
import TodoListModal from './todo-components/TodoListModal.jsx';
import TodoItemModal from './todo-components/TodoItemModal.jsx';
import TodoItemsAssignedToMe from './todo-components/TodoItemsAssignedToMe.jsx';

const Todo = () => {
  const [selectedItemAssignedToMe, setSelectedItemAssignedToMe] = useState(null);

  // State for editing list
  const [editingList, setEditingList] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editListForm, setEditListForm] = useState({ items: [] });
  const [editItemForm, setEditItemForm] = useState({ title: '', description: '' });

  // Modals
  const editListModal = useDisclosure();
  const editItemModal = useDisclosure();

  // Fetch current user's todo lists
  const { data: todoLists, isLoading, error } = useTodoListsQuery();

  // Fetch all users
  const { data: users } = useUsersQuery();

  // Fetch all todo items assigned to me
  const { data: todoItemsAssignedToMe, isLoading: itemsAssignedToMeLoading } = useAssignedItemsQuery();

  // Update mutation
  const updateListMutation = useUpdateTodoListMutation();
  const updateItemMutation = useUpdateTodoItemMutation();


  // Edit handlers
  const handleEditList = (listId) => {
    setEditingList(listId);
    editListModal.onOpen();
  };

  const handleUpdateList = async () => {
    if (!editingList) return;

    try {
      await updateListMutation.mutateAsync({
        id: editingList,
        data: editListForm
      });
      editListModal.onClose();
      setEditingList(null);
      setEditListForm({ items: [] });
    } catch (error) {
      console.error('Failed to update list:', error);
    }
  };

  const handleEditItem = (itemId) => {
    setEditingItem(itemId);
    editItemModal.onOpen();
  };

  const handleUpdateItem = async () => {
    if (!editingItem) return;

    try {
      await updateItemMutation.mutateAsync({
        id: editingItem,
        data: editItemForm
      });
      editItemModal.onClose();
      setEditingItem(null);
      setEditItemForm({ title: '', description: '' });
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };


  return (
    <Box>
      <PageHeader title="Todo Lists" />

      {/* Loading state */}
      {isLoading && (
        <Box display="flex" justifyContent="center" py={8}>
          <Spinner size="xl" />
        </Box>
      )}

      {/* Error state */}
      {error && (
        <Box p={4} bg="red.50" borderRadius="md" mb={6}>
          <Text color="red.600">Error loading todo lists: {error.message}</Text>
        </Box>
      )}

      {/* Two Column Layout: Todo Lists (with expanded items) + Assigned Items */}
      {!isLoading && !error && (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(12, 1fr)' }} gap={{ base: 4, md: 6 }}>
          {/* Todo Lists with expandable items */}
          <GridItem colSpan={{ base: 12, md: 8 }}>
            <Card>
              <TodoLists
                todoLists={todoLists}
                loading={isLoading}
                error={error}
                onEditList={handleEditList}
                onEditItem={handleEditItem}
              />
            </Card>
          </GridItem>

          {/* Todo Items assigned to me Column */}
          <GridItem colSpan={{ base: 12, md: 4 }}>
            <Card>
              <TodoItemsAssignedToMe
                todoItems={todoItemsAssignedToMe}
                loading={itemsAssignedToMeLoading}
                error={null}
                selectedItem={selectedItemAssignedToMe}
                onSelectItem={setSelectedItemAssignedToMe}
                // onEditItem={handleEditItem}
              />
            </Card>
          </GridItem>
        </Grid>
      )}

      {/* Edit List Modal */}
      <TodoListModal
        isOpen={editListModal.isOpen}
        onClose={editListModal.onClose}
        editForm={editListForm}
        setEditForm={setEditListForm}
        onUpdate={handleUpdateList}
        isLoading={updateListMutation.isPending}
        isValid={editListForm.items && editListForm.items.length > 0}
      />

      {/* Edit Item Modal */}
      <TodoItemModal
        isOpen={editItemModal.isOpen}
        onClose={editItemModal.onClose}
        editForm={editItemForm}
        setEditForm={setEditItemForm}
        onUpdate={handleUpdateItem}
        isLoading={updateItemMutation.isPending}
        isValid={editItemForm.title && editItemForm.title.trim().length > 0}
        isEditing={!!editingItem}
        users={users}
      />

          </Box>
  );
};

export default Todo;