import React, { useState } from 'react';
import {
  HStack,
  Text,
  VStack,
  Button,
  Input,
  Textarea,
} from '@chakra-ui/react';

const TodoItemAdd = ({
  selectedListId,
  users,
  onCreateItem,
  onCancel,
  isLoading
}) => {
  // Initialize form state
  const [newItemForm, setNewItemForm] = useState({
    title: '',
    description: '',
    status: 'PENDING',
    assignee: ''
  });

  // Local loading state when submitting the form
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async () => {
    if (!newItemForm.title.trim() || !selectedListId || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Call the create mutation and wait for completion
      await onCreateItem({
        itemData: {
          title: newItemForm.title.trim(),
          description: newItemForm.description,
          status: newItemForm.status,
          assignee: newItemForm.assignee
        },
        todolistId: selectedListId
      });

      // Reset form after successful submission
      setNewItemForm({ title: '', description: '', status: 'PENDING', assignee: '' });

      // Collapse the form by calling onCancel
      onCancel();
    } catch (error) {
      console.error('Failed to create item:', error);
      // Don't collapse on error, let user try again
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form cancellation
  const handleCancel = () => {
    setNewItemForm({ title: '', description: '', status: 'PENDING', assignee: '' });
    onCancel();
  };

  const isValid = newItemForm.title && newItemForm.title.trim().length > 0;
  return (
    <VStack align="stretch">
      <Text fontWeight="medium" mb={2}>Title</Text>
      <Input
        placeholder="Title"
        value={newItemForm.title}
        onChange={(e) => setNewItemForm({ ...newItemForm, title: e.target.value })}
      />

      <Text fontWeight="medium" mb={2}>Description</Text>
      <Textarea
        placeholder="Description"
        value={newItemForm.description}
        onChange={(e) => setNewItemForm({ ...newItemForm, description: e.target.value })}
      />

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

      <Text fontWeight="medium" mb={2}>Assignee</Text>
      <select
        value={newItemForm.assignee}
        onChange={(e) => setNewItemForm({ ...newItemForm, assignee: e.target.value })}
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '6px',
          border: '1px solid #e2e8f0',
          fontSize: '14px'
        }}
      >
        <option value="">Select assignee</option>
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.first_name} {user.last_name}
          </option>
        ))}
      </select>

      <HStack spacing={2}>
        <Button
          size="sm"
          colorScheme="blue"
          onClick={handleSubmit}
          isLoading={isLoading || isSubmitting}
          isDisabled={!isValid || isLoading || isSubmitting}
        >
          Create Item
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCancel}
          isDisabled={isLoading || isSubmitting}
        >
          Cancel
        </Button>
      </HStack>
    </VStack>
  );
};

export default TodoItemAdd;