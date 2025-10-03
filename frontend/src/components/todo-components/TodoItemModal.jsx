import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Textarea,
  createListCollection,
  Select,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/modal';

const TodoItemModal = ({
  isOpen,
  onClose,
  editForm,
  setEditForm,
  onUpdate,
  isLoading,
  isValid,
  isEditing,
  users
}) => {
  const statusCollection = createListCollection({
    items: [
      { label: 'Pending', value: 'PENDING' },
      { label: 'In Progress', value: 'IN_PROGRESS' },
      { label: 'Done', value: 'DONE' },
    ],
  });

  const assigneeCollection = createListCollection({
    items: [
      { label: 'Unassigned', value: '' },
      ...(users?.map(user => ({
        label: `${user.first_name} ${user.last_name}`,
        value: user.id
      })) || [])
    ],
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay
        bg="blackAlpha.600"
        backdropFilter="blur(10px)"
      />
      <ModalContent
        bg="white"
        boxShadow="xl"
        borderRadius="xl"
        mx={{ base: 4, md: 0 }}
        my={{ base: 4, md: 0 }}
      >
        <ModalHeader
          fontSize="xl"
          fontWeight="semibold"
          borderBottomWidth="1px"
          borderColor="gray.200"
        >
          {isEditing ? 'Edit Todo Item' : 'Create Todo Item'}
        </ModalHeader>
        <ModalCloseButton top={3} right={3} />
        <ModalBody py={6}>
          <VStack spacing={5} align="stretch">
            <Box>
              <Text fontWeight="medium" mb={2}>Title</Text>
              <Input
                placeholder="Enter item title"
                value={editForm.title || ''}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                size="lg"
              />
            </Box>

            <Box>
              <Text fontWeight="medium" mb={2}>Description</Text>
              <Textarea
                placeholder="Enter item description (optional)"
                value={editForm.description || ''}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                size="lg"
                rows={3}
                resize="vertical"
              />
            </Box>
            <Box>
              <Text fontWeight="medium" mb={2}>Status</Text>
              <Select.Root
                collection={statusCollection}
                value={[editForm.status || 'PENDING']}
                onValueChange={(details) => setEditForm({ ...editForm, status: details.value[0] })}
                size="lg"
              >
                <Select.Trigger>
                  <Select.ValueText placeholder="Select status" />
                </Select.Trigger>
                <Select.Content>
                  {statusCollection.items.map((item) => (
                    <Select.Item item={item.value} key={item.value}>
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Box>

            {users && (
              <Box>
                <Text fontWeight="medium" mb={2}>Assignee</Text>
                <Select.Root
                  collection={assigneeCollection}
                  value={[editForm.assignee || '']}
                  onValueChange={(details) => setEditForm({ ...editForm, assignee: details.value[0] })}
                  size="lg"
                >
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select assignee" />
                  </Select.Trigger>
                  <Select.Content>
                    {assigneeCollection.items.map((item) => (
                      <Select.Item item={item.value} key={item.value}>
                        {item.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Box>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter
          borderTopWidth="1px"
          borderColor="gray.200"
          gap={3}
        >
          <Button
            variant="outline"
            onClick={onClose}
            size="lg"
          >
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={onUpdate}
            isLoading={isLoading}
            isDisabled={!isValid}
            size="lg"
          >
            {isEditing ? 'Update Item' : 'Create Item'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TodoItemModal;