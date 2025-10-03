import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Input,
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

const TodoListModal = ({
  isOpen,
  onClose,
  editForm,
  setEditForm,
  onUpdate,
  isLoading,
  isValid
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent maxW="600px" mx={4}>
        <ModalHeader>Edit Todo List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Input
              placeholder="Items (comma-separated)"
              value={editForm.items?.join(', ') || ''}
              onChange={(e) => setEditForm({
                ...editForm,
                items: e.target.value.split(',').map(item => item.trim()).filter(item => item)
              })}
            />
            <Text fontSize="sm" color="gray.500">
              Enter items separated by commas (e.g., "Item 1, Item 2, Item 3")
            </Text>
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
            Update List
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TodoListModal;