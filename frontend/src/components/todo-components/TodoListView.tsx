import React from 'react';
import {
  VStack,
  HStack,
  Heading,
  Badge,
  Box,
  Button,
} from '@chakra-ui/react';
import { CardRoot, CardBody } from '@chakra-ui/react';
import TodoItems from './TodoItems';

interface TodoListViewProps {
  selectedList: any;
  todoLists: any[];
  selectedListItems: any[];
  itemsLoading: boolean;
  itemsError: any;
  onDeleteList: () => void;
}

const TodoListView = ({
  selectedList,
  todoLists,
  selectedListItems,
  itemsLoading,
  itemsError,
  onDeleteList
}: TodoListViewProps) => {
  // Handle delete button click
  const handleDelete = () => {
    onDeleteList();
  };

  return (
    <CardRoot w="full">
      <CardBody>
        <VStack gap={4} align="stretch">
          {/* Expanded List Header */}
          <HStack justify="space-between" align="start">
            <VStack align="start" gap={2} flex="1">
              <HStack justify="space-between" w="full">
                <Heading size="lg">
                  {`Todo List ${todoLists.findIndex(l => l.id === selectedList.id) + 1}`}
                </Heading>
                <Button
                  size="sm"
                  onClick={handleDelete}
                  borderRadius="10px"
                  py="6px"
                  px="12px"
                >
                  Delete List
                </Button>
              </HStack>
              <VStack gap={2} align="start">
                <Badge colorScheme="gray" fontSize="sm">
                  ID: {selectedList.id}
                </Badge>
                <Badge colorScheme="gray" fontSize="sm">
                  Created: {new Date(selectedList.created_at).toLocaleDateString()}
                </Badge>
                <Badge colorScheme="gray" fontSize="sm">
                  Modified: {new Date(selectedList.last_modified).toLocaleDateString()}
                </Badge>
              </VStack>
            </VStack>
          </HStack>

          <Box borderBottomWidth="1px" borderColor="gray.200" />

          {/* TodoItems Component inside expanded list */}
          <TodoItems
            todoItems={selectedListItems}
            loading={itemsLoading}
            error={itemsError}
            selectedListId={selectedList?.id}
          />
        </VStack>
      </CardBody>
    </CardRoot>
  );
};

export default TodoListView;