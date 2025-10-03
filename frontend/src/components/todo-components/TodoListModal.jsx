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
          Edit Todo List
        </ModalHeader>
        <ModalCloseButton top={3} right={3} />
        <ModalBody py={6}>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontWeight="medium" mb={2}>Items</Text>
              <Input
                placeholder="Items (comma-separated)"
                value={editForm.items?.join(', ') || ''}
                onChange={(e) => setEditForm({
                  ...editForm,
                  items: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                })}
                size="lg"
              />
              <Text fontSize="sm" color="gray.500" mt={2}>
                Enter items separated by commas (e.g., "Item 1, Item 2, Item 3")
              </Text>
            </Box>
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
            Update List
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TodoListModal;