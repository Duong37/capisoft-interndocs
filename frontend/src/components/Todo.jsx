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
import { useTodoListsQuery, useTodoItemsQuery, useTodoListQuery, useUpdateTodoListMutation, useUpdateTodoItemMutation } from '../hooks/useTodoQueries';
import { useUsersQuery } from '../hooks/useAuthQuery';
import PageHeader from './PageHeader.jsx';
import Card from './dashboard-components/card.jsx';
import TodoLists from './todo-components/TodoLists.jsx';
import TodoItems from './todo-components/TodoItems.jsx';
import TodoListModal from './todo-components/TodoListModal.jsx';
import TodoItemModal from './todo-components/TodoItemModal.jsx';

const Todo = () => {
  // State for selected list
  const [selectedList, setSelectedList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // State for editing list
  const [editingList, setEditingList] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editListForm, setEditListForm] = useState({ items: [] });
  const [editItemForm, setEditItemForm] = useState({ title: '', description: '' });

  // Modals
  const editListModal = useDisclosure();
  const editItemModal = useDisclosure();

  // Fetch only current user's todo lists (based on authentication)
  const { data: todoLists, isLoading, error } = useTodoListsQuery();
  const { data: users } = useUsersQuery();
  // Fetch all todo items (independent of selected list)
  const { data: todoItems, isLoading: itemsLoading } = useTodoItemsQuery({});

  // Fetch individual list details for editing
  const { data: listDetails } = useTodoListQuery(editingList);

  // Update mutation
  const updateListMutation = useUpdateTodoListMutation();
  const updateItemMutation = useUpdateTodoItemMutation();

  // Update form when listDetails is loaded
  React.useEffect(() => {
    if (listDetails) {
      setEditListForm({
        items: listDetails.items || []
      });
    }
  }, [listDetails]);

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

  console.log('Todo lists data:', todoLists);
  console.log('Number of todo lists:', todoLists?.length || 0);
  console.log('Selected list:', selectedList);
  console.log('Todo items for selected list:', todoItems);
  console.log('Query params being sent:', selectedList ? { todolist: selectedList.id } : {});

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

      {/* Three Column Layout: Todo Lists (2 cols) + Todo Items (1 col) */}
      {!isLoading && !error && (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(12, 1fr)' }} gap={{ base: 4, md: 6 }}>
          {/* Todo Lists Columns */}
          <GridItem colSpan={{ base: 12, md: 8 }}>
            <Card>
              <TodoLists
                todoLists={todoLists}
                selectedList={selectedList}
                onListSelect={setSelectedList}
                loading={isLoading}
                error={error}
              />
            </Card>
          </GridItem>

          {/* Todo Items Column */}
          <GridItem colSpan={{ base: 12, md: 4 }}>
            <Card>
              <TodoItems
                todoItems={todoItems}
                loading={itemsLoading}
                error={null}
                selectedItem={selectedItem}
                onSelectItem={setSelectedItem}
              />
            </Card>
          </GridItem>
        </Grid>
      )}

      {/* Edit List Modal */}
      <TodoListModal
        isOpen={editListModal.open}
        onClose={editListModal.onClose}
        editForm={editListForm}
        setEditForm={setEditListForm}
        onUpdate={handleUpdateList}
        isLoading={updateListMutation.isPending}
        isValid={editListForm.items && editListForm.items.length > 0}
      />

      {/* Edit Item Modal */}
      <TodoItemModal
        isOpen={editItemModal.open}
        onClose={editItemModal.onClose}
        editForm={editItemForm}
        setEditForm={setEditItemForm}
        onUpdate={handleUpdateItem} // TODO: Implement item update logic
        isLoading={false}
        isValid={editItemForm.title && editItemForm.title.trim().length > 0}
        isEditing={!!editingItem}
      />
    </Box>
  );
};

export default Todo;