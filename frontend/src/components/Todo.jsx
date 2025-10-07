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
  Spinner,
} from '@chakra-ui/react';
import { useTodoListsQuery, useAssignedItemsQuery } from '../hooks/useTodoQueries';
import PageHeader from './PageHeader.jsx';
import Card from './dashboard-components/card.jsx';
import TodoLists from './todo-components/TodoLists.jsx';
import TodoItemsAssignedToMe from './todo-components/TodoItemsAssignedToMe.jsx';

const Todo = () => {
  const [selectedItemAssignedToMe, setSelectedItemAssignedToMe] = useState(null);

  // Fetch current user's todo lists
  const { data: todoLists, isLoading, error } = useTodoListsQuery();

  // Fetch all todo items assigned to me
  const { data: todoItemsAssignedToMe, isLoading: itemsAssignedToMeLoading } = useAssignedItemsQuery();


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
              />
            </Card>
          </GridItem>
        </Grid>
      )}
    </Box>
  );
};

export default Todo;