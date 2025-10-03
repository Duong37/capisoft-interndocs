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
  isEditing
}) => {
  const statusCollection = createListCollection({
    items: [
      { label: 'Pending', value: 'PENDING' },
      { label: 'In Progress', value: 'IN_PROGRESS' },
      { label: 'Done', value: 'DONE' },
    ],
  });
  const assigneeCollection = createListCollection

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent maxW="600px" mx={4}>
        <ModalHeader>{isEditing ? 'Edit Todo Item' : 'Create Todo Item'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Input
              placeholder="Item title"
              value={editForm.title || ''}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            />
            <Textarea
              placeholder="Item description (optional)"
              value={editForm.description || ''}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              rows={3}
            />
            <Select.Root
              collection={statusCollection}
              value={[editForm.status || 'PENDING']}
              onValueChange={(details) => setEditForm({ ...editForm, status: details.value[0] })}
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
            <Text>Assignee</Text>
            <Select.Root
              collection={assigneeCollection}
              value={[editForm.assignee || '']}
              onValueChange={(details) => setEditForm({ ...editForm, assignee: details.value[0] })}
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
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={onUpdate}
            isLoading={isLoading}
            isDisabled={!isValid}
            ml={3}
          >
            {isEditing ? 'Update Item' : 'Create Item'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TodoItemModal;