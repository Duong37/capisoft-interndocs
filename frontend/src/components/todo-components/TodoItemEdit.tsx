import React, { useState, useEffect } from 'react';
import {
  Box,
  HStack,
  Text,
  VStack,
  Button,
  Input,
  Textarea,
} from '@chakra-ui/react';

interface TodoItemEditProps {
  selectedItem: any;
  users: any[] | undefined;
  onUpdate: (payload: { id: string; data: any }) => Promise<void>;
  onCancel: () => void;
  onDelete: (id: string) => Promise<void>;
}

const TodoItemEdit = ({
  selectedItem,
  users,
  onUpdate,
  onCancel,
  onDelete
}: TodoItemEditProps) => {
  // Initialize form state based on selected item
  const [editForm, setEditForm] = useState({
    title: selectedItem?.title || '',
    description: selectedItem?.description || '',
    status: selectedItem?.status || 'PENDING',
    assignee: selectedItem?.assignee || ''
  });

  // Update form when selected item changes
  useEffect(() => {
    if (selectedItem) {
      setEditForm({
        title: selectedItem.title,
        description: selectedItem.description || '',
        status: selectedItem.status,
        assignee: selectedItem.assignee || ''
      });
    }
  }, [selectedItem]);

  // Local loading state when submitting the form
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async () => {
    if (!editForm.title.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Call the update mutation and wait for completion
      await onUpdate({
        id: selectedItem.id,
        data: editForm
      });

      // Collapse the form by calling onCancel
      onCancel();
    } catch (error: any) {
      console.error('Failed to update item:', error);
      // Don't collapse on error, let user try again
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form cancellation
  const handleCancel = () => {
    setEditForm({
      title: selectedItem?.title || '',
      description: selectedItem?.description || '',
      status: selectedItem?.status || 'PENDING',
      assignee: selectedItem?.assignee || ''
    });
    onCancel();
  };

  const isValid = editForm.title && editForm.title.trim().length > 0;
  return (
    <VStack gap={4} align="stretch">
      {/* Edit Header */}
      <HStack justify="space-between" align="start">
        <Text fontSize="lg" fontWeight="semibold" color="gray.900">
          Edit Item
        </Text>
        <Button
          size="sm"
          borderRadius="10px"
          py="6px"
          px="12px"
          onClick={() => onDelete(selectedItem.id)}
        >
          Delete Item
        </Button>
      </HStack>

      <Box borderBottomWidth="1px" borderColor="gray.200" />

      {/* Edit Form Fields */}
      <VStack align="stretch">
        <Text fontWeight="medium" mb={2}>Title</Text>
        <Input
          placeholder="Title"
          value={editForm.title}
          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
        />

        <Text fontWeight="medium" mb={2}>Description</Text>
        <Textarea
          placeholder="Description"
          value={editForm.description}
          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
        />

        <Text fontWeight="medium" mb={2}>Status</Text>
        <select
          value={editForm.status}
          onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
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
          value={editForm.assignee}
          onChange={(e) => setEditForm({ ...editForm, assignee: e.target.value })}
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

        <HStack gap={2}>
          <Button
            size="sm"
            borderRadius="10px"
            py="6px"
            px="12px"
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={!isValid || isSubmitting}
          >
            Update Item
          </Button>
          <Button
            size="sm"
            borderRadius="10px"
            py="6px"
            px="12px"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default TodoItemEdit;