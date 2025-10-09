import React, { useCallback, useRef, useMemo } from 'react';
import {
  Box,
  Text,
  Grid,
  GridItem,
  HStack,
  Container
} from '@chakra-ui/react';
import { useTodoListsInfiniteQuery, useAssignedItemsInfiniteQuery } from '../hooks/useTodoQueries';
import PageHeader from './PageHeader.jsx';
import Card from './dashboard-components/card.jsx';
import TodoLists from './todo-components/TodoLists.jsx';
import TodoItemsAssignedToMe from './todo-components/TodoItemsAssignedToMe.jsx';

const Todo = () => {
  // Intersection observer refs
  const todoListsObserver = useRef();
  const assignedItemsObserver = useRef();

  // Fetch current user's todo lists with infinite scrolling
  const {
    data: todoListsData,
    error: todoListsError,
    fetchNextPage: fetchNextTodoListsPage,
    hasNextPage: hasNextTodoListsPage,
    isFetching: isFetchingTodoLists,
    isLoading: isLoadingTodoLists
  } = useTodoListsInfiniteQuery();

  // Fetch all todo items assigned to me with infinite scrolling
  const {
    data: assignedItemsData,
    error: assignedItemsError,
    fetchNextPage: fetchNextAssignedItemsPage,
    hasNextPage: hasNextAssignedItemsPage,
    isFetching: isFetchingAssignedItems,
    isLoading: isLoadingAssignedItems
  } = useAssignedItemsInfiniteQuery();

  // Flatten infinite query data
  const todoLists = useMemo(() => {
    if (!todoListsData?.pages) return [];

    // Extract results from paginated response
    const allLists = [];
    todoListsData.pages.forEach(page => {
      allLists.push(...page.results);
    });
    return allLists;
  }, [todoListsData]);

  const todoItemsAssignedToMe = useMemo(() => {
    if (!assignedItemsData?.pages) return [];

    // Extract results from paginated response
    const allItems = [];
    assignedItemsData.pages.forEach(page => {
      allItems.push(...page.results);
    });
    return allItems;
  }, [assignedItemsData]);

  // Intersection observer callbacks
  const lastTodoListRef = useCallback(
    (node) => {
      if (isLoadingTodoLists) return;
      if (todoListsObserver.current) todoListsObserver.current.disconnect();
      todoListsObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextTodoListsPage && !isFetchingTodoLists) {
          fetchNextTodoListsPage();
        }
      });
      if (node) todoListsObserver.current.observe(node);
    },
    [fetchNextTodoListsPage, hasNextTodoListsPage, isFetchingTodoLists, isLoadingTodoLists]
  );

  const lastAssignedItemRef = useCallback(
    (node) => {
      if (isLoadingAssignedItems) return;
      if (assignedItemsObserver.current) assignedItemsObserver.current.disconnect();
      assignedItemsObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextAssignedItemsPage && !isFetchingAssignedItems) {
          fetchNextAssignedItemsPage();
        }
      });
      if (node) assignedItemsObserver.current.observe(node);
    },
    [fetchNextAssignedItemsPage, hasNextAssignedItemsPage, isFetchingAssignedItems, isLoadingAssignedItems]
  );


  return (
    <Box>
      <Container maxW="full" py={{ base: 4, md: 6 }} px={0}>
        <PageHeader title="Todo Application" />

      <HStack w="full" justify="space-between" align="center" mb="24px">
        <Text
          color="black"
          fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
          fontWeight={500}
          fontStyle="normal"
          fontSize="18px"
          lineHeight="160%"
          letterSpacing="0"
          pt="4px"
          pb="4px"
        >
          Todo Lists and Items
        </Text>
      </HStack>

      {/* Error state */}
      {(todoListsError || assignedItemsError) && (
        <Box p={4} bg="red.50" borderRadius="md" mb={6}>
          <Text color="red.600">
            Error loading data: {todoListsError?.message || assignedItemsError?.message}
          </Text>
        </Box>
      )}

      {/* Two Column Layout: Todo Lists (with expanded items) + Assigned Items */}
      {!todoListsError && !assignedItemsError && (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(12, 1fr)' }} gap={{ base: 4, md: 6 }}>
          {/* Todo Lists with expandable items */}
          <GridItem colSpan={{ base: 12, md: 8 }}>
            <Card>
              <TodoLists
                todoLists={todoLists}
                loading={isLoadingTodoLists}
                error={todoListsError}
                lastItemRef={lastTodoListRef}
                hasNextPage={hasNextTodoListsPage}
                isFetching={isFetchingTodoLists}
              />
            </Card>
          </GridItem>

          {/* Todo Items assigned to me Column */}
          <GridItem colSpan={{ base: 12, md: 4 }}>
            <Card>
              <TodoItemsAssignedToMe
                todoItems={todoItemsAssignedToMe}
                loading={isLoadingAssignedItems}
                error={assignedItemsError}
                lastItemRef={lastAssignedItemRef}
                hasNextPage={hasNextAssignedItemsPage}
                isFetching={isFetchingAssignedItems}
              />
            </Card>
          </GridItem>
        </Grid>
      )}
      </Container>
    </Box>
  );
};

export default Todo;