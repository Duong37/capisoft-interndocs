import React, { Fragment, useState } from 'react';
import {
  Box,
  HStack,
  Text,
  VStack,
  Spinner,
  IconButton,
  Badge,
  Button,
  Input,
  Textarea,
} from '@chakra-ui/react';
import Card from '../dashboard-components/card.jsx';
import { useCreateTodoItemInListMutation } from '../../hooks/useTodoQueries';

const TodoItems = ({
  todoItems,
  loading,
  onSelectItem,
  selectedItem,
  error,
  onEditItem,
  selectedListId // New prop to know which list we're adding to
}) => {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemForm, setNewItemForm] = useState({ title: '', description: '' });

  // Use our custom mutation hook
  const createItemInListMutation = useCreateTodoItemInListMutation();

  // Handle adding a new item
  const handleAddItem = () => {
    if (!selectedListId) {
      console.error('No list selected');
      return;
    }
    setIsAddingItem(true);
    setNewItemForm({ title: '', description: '', status: 'PENDING' });
  };

  const handleCreateItem = async () => {
    if (!newItemForm.title.trim() || !selectedListId) {
      console.error('Invalid form data');
      return;
    }

    try {
      await createItemInListMutation.mutateAsync({
        itemData: {
          title: newItemForm.title.trim(),
          description: newItemForm.description,
          status: newItemForm.status
        },
        todolistId: selectedListId
      });

      // Reset form on success
      setIsAddingItem(false);
      setNewItemForm({ title: '', description: '', status: 'PENDING' });
    } catch (error) {
      console.error('Failed to create item:', error);
    }
  };

  const handleCancelAdd = () => {
    setIsAddingItem(false);
    setNewItemForm({ title: '', description: '', status: 'PENDING' });
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
        <Text color="red.600">Error loading todo items: {error.message}</Text>
      </Box>
    );
  }

  return (
    <>
      <HStack justify="space-between" align="center" mb={4}>
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
          <Button size="sm" colorScheme="blue" onClick={handleAddItem}>
            Add Item
          </Button>
        ) : null}
        {isAddingItem && (
          <VStack align="stretch">
            <Input placeholder="Title" value={newItemForm.title} onChange={(e) => setNewItemForm({ ...newItemForm, title: e.target.value })} />
            <Text fontWeight="medium" mb={2}>Status</Text>
            <select
              value={newItemForm.status}
              onChange={(e) => setNewItemForm({ ...newItemForm, status: e.target.value })}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontSize: '14px'
              }}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
            <Text fontWeight="medium" mb={2}>Description</Text>
            <Textarea placeholder="Description" value={newItemForm.description} onChange={(e) => setNewItemForm({ ...newItemForm, description: e.target.value })} />
            <HStack spacing={2}>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={handleCreateItem}
                isLoading={createItemInListMutation.isLoading}
                isDisabled={!newItemForm.title.trim() || createItemInListMutation.isLoading}
              >
                Create Item
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancelAdd}
                isDisabled={createItemInListMutation.isLoading}
              >
                Cancel
              </Button>
            </HStack>
          </VStack>
        )}
      </HStack>
      <Text
        fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
        fontWeight={400}
        fontSize="12px"
        lineHeight="160%"
        color="gray.500"
        mb={4}
      >
        Items that are in my todo lists.
      </Text>
      <VStack align="stretch">
        {todoItems?.length > 0 ? (
          todoItems.map((item, i) => (
            <Fragment key={item.id}>
              <HStack
                justify="space-between"
                py={1.5}
                pb={selectedItem?.id === item.id ? 2 : (i === todoItems.length - 1 ? 0 : 1.5)}
                cursor="pointer"
                _hover={{ bg: "gray.50" }}
                borderRadius="md"
                onClick={() => onSelectItem(item)}
                bg={selectedItem?.id === item.id ? "gray.50" : "transparent"}
                px={2}
              >
                <Box flex="1">
                  <Text fontWeight="medium" fontSize="12px" color="gray.800">
                    {item.title}
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

              {/* Selected Item Expanded View - Inline */}
              {selectedItem?.id === item.id && (
                <Card w="full" border="1px solid" borderColor="gray.200" mb={2}>
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