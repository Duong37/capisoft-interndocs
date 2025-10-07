import React, { Fragment } from 'react';
import {
  Box,
  HStack,
  Text,
  VStack,
  Spinner,
  IconButton,
  Badge,
  Card,
  CardBody,
} from '@chakra-ui/react';
import CardComponent from '../dashboard-components/card.jsx';

const TodoItemsAssignedToMe = ({
  todoItems,
  loading,
  onSelectItem,
  selectedItem,
  error
}) => {
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
        <Text color="red.600">Error loading assigned items: {error.message}</Text>
      </Box>
    );
  }

  return (
    <>
      <Text
        fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
        fontWeight={500}
        fontStyle="normal"
        fontSize="18px"
        lineHeight="160%"
        letterSpacing="0"
        color="gray.700"
        mb={2}
      >
        Items Assigned to Me ({todoItems?.length || 0})
      </Text>
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
                <Box flex="1" onClick={(e) => e.stopPropagation()}>
                  <Text fontWeight="medium" fontSize="12px" color="gray.800">
                    {item.title}
                  </Text>
                  <Text
                    fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                    fontWeight={400}
                    fontStyle="medium"
                    fontSize="11px"
                    lineHeight="160%"
                    letterSpacing="0"
                    color="gray.500"
                  >
                    {item.assigner ? `Assigned by: ${item.assigner.first_name} ${item.assigner.last_name}` : 'Assigned'}
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
                </HStack>
              </HStack>

              {/* Selected Item Expanded View - Inline */}
              {selectedItem?.id === item.id && (
                <Card w="full" border="1px solid" borderColor="gray.200" mb={2}>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      {/* Header */}
                      <HStack justify="space-between" align="start">
                        <VStack align="start" spacing={1} flex="1">
                          <Text fontSize="lg" fontWeight="semibold" color="gray.900">
                            {selectedItem.title}
                          </Text>
                          <HStack spacing={2}>
                            <Badge
                              colorScheme={
                                selectedItem.status === 'DONE' ? 'green' :
                                selectedItem.status === 'IN_PROGRESS' ? 'blue' :
                                'yellow'
                              }
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
                        <Text fontSize="sm" fontWeight="medium" color="gray.700">
                          Details
                        </Text>

                        <HStack justify="space-between" fontSize="sm">
                          <Text color="gray.500">Assigned by:</Text>
                          <Text color="gray.700">
                            {selectedItem.assigner
                              ? `${selectedItem.assigner.first_name} ${selectedItem.assigner.last_name}`
                              : 'Unknown'
                            }
                          </Text>
                        </HStack>

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
                    </VStack>
                  </CardBody>
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
      </VStack>
    </>
  );
};

export default TodoItemsAssignedToMe;