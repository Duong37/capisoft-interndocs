import React from 'react';
import {
  VStack,
  HStack,
  Text,
  Heading,
  Grid,
  GridItem,
  CardRoot,
  CardBody,
  Badge,
  Box,
} from '@chakra-ui/react';

const TodoLists = ({
  todoLists,
  selectedList,
  onListSelect,
  loading,
  error
}) => {
  if (loading) {
    return (
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} w="full">
        {[...Array(6)].map((_, i) => (
          <GridItem key={i}>
            <CardRoot w="full">
              <CardBody>
                <VStack spacing={3}>
                  <Box h="20px" bg="gray.200" borderRadius="4px" />
                  <Box h="14px" bg="gray.100" borderRadius="2px" w="60%" />
                </VStack>
              </CardBody>
            </CardRoot>
          </GridItem>
        ))}
      </Grid>
    );
  }

  if (error) {
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
        </VStack>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md" mb={2}>Todo Lists ({todoLists.length})</Heading>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} w="full">
        {todoLists.map((list) => (
          <GridItem key={list.id}>
            <CardRoot
              w="full"
              border={selectedList?.id === list.id ? "2px solid" : "1px solid"}
              borderColor={selectedList?.id === list.id ? "blue.500" : "gray.200"}
              _hover={{ shadow: "md", transform: "translateY(-2px)" }}
              cursor="pointer"
              onClick={() => onListSelect(list)}
              transition="all 0.2s ease"
            >
              <CardBody>
                <VStack align="start" spacing={3}>
                  <Heading size="sm" noOfLines={1} fontWeight="600">
                    {list.title || `Todo List ${todoLists.findIndex(l => l.id === list.id) + 1}`}
                  </Heading>
                  <Text noOfLines={2} color="gray.600" fontSize="sm" flex="1">
                    {list.description || 'No description'}
                  </Text>
                  <HStack justify="space-between" w="full" pt={2}>
                    <Badge colorScheme="blue" fontSize="xs">
                      {list.items?.length || 0} items
                    </Badge>
                    <Text fontSize="xs" color="gray.500">
                      {new Date(list.created_at).toLocaleDateString()}
                    </Text>
                  </HStack>
                </VStack>
              </CardBody>
            </CardRoot>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export default TodoLists;