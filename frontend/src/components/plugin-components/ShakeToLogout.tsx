import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogCloseTrigger,
} from '@chakra-ui/react';
import { useShakeDetection } from '../../hooks/useShakeDetection';
import { useAuth } from '../../context/AuthContext';

/**
 * ShakeToLogout component
 * Enables shake detection when user is authenticated and shows logout confirmation dialog
 */
export const ShakeToLogout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Handle shake detection - open confirmation dialog
  const handleShake = () => {
    if (isAuthenticated) {
      setIsDialogOpen(true);
    }
  };

  // Enable shake detection only when authenticated
  useShakeDetection(handleShake, isAuthenticated);

  // Handle logout confirmation
  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setIsDialogOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Handle dialog close
  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <DialogRoot open={isDialogOpen} onOpenChange={(e: any) => setIsDialogOpen(e.open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Shake Detected</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <p>Do you want to logout?</p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoggingOut}
          >
            Cancel
          </Button>
          <Button
            colorScheme="red"
            onClick={handleLogoutConfirm}
            loading={isLoggingOut}
            ml={3}
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
