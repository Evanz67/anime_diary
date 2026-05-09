'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getUser } from '@/backend/firestore_database';
import { useModal } from '@/context/modal_provider';
import { useAuth } from '@/context/auth_provider';

export function ModalProfile({ changeName }) {
  const [name, setName] = useState('');
  const { closeModal, modalState, openModal } = useModal();
  const { user, resendVerificationEmail, isEmailVerified } = useAuth();

  const handleResendVerificationEmail = () => {
    resendVerificationEmail();
    alert('Verification email resent! Please check your inbox and spam folder.');
  };

  // Fetch user data on component mount to set the initial name
  useEffect(() => {
    if (user) {
      getUser(user.uid).then((userData) => {
        if (userData) {
          setName(userData.firstName + ' ' + userData.lastName);
        }
      });
    }
  }, [user]);

  // Update name when changeName prop changes
  useEffect(() => {
    if (changeName) {
      setName(changeName.firstName + ' ' + changeName.lastName);
    }
  }, [changeName]);

  return (
    <Dialog open={modalState.includes('profile')} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-sm lg:max-w-md ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Profile
          </DialogTitle>
        </DialogHeader>
        <h1 className="text-center text-lg">{name}</h1>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => openModal('changeName')}
        >
          Change Name
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => openModal('changePassword')}
        >
          Change Password
        </Button>
        {!isEmailVerified && (
          <Button
            variant="secondary"
            size="lg"
            onClick={() => handleResendVerificationEmail()}
          >
            Resend Verification Email
          </Button>
        )}
        <Button
          variant="destructive"
          size="lg"
          onClick={() => openModal('deleteUser')}
        >
          Delete Account
        </Button>
      </DialogContent>
    </Dialog>
  );
}
