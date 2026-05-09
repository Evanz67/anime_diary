'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth_provider';
import { useModal } from '@/context/modal_provider';

export function ModalChangePassword() {
  const { register, handleSubmit, reset, watch } = useForm();
  const { changePassword } = useAuth();
  const { closeModal, modalState } = useModal();
  const [loading, setLoading] = useState(false);

  const oldPassword = watch('oldPassword');
  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  const isPasswordMatch = newPassword === confirmPassword;
  const isNewPasswordValid = newPassword?.length >= 6;
  const isNewPasswordDifferent = oldPassword !== newPassword;
  const areAllConditionsMet =
    isPasswordMatch &&
    isNewPasswordValid &&
    isNewPasswordDifferent;

  const onSubmit = async (data) => {
    if (!areAllConditionsMet) {
      if (!isNewPasswordDifferent) {
        alert('New password must be different from the old password.');
      }
      return;
    }
    try {
      setLoading(true);
      await changePassword(data.oldPassword, data.newPassword);
      alert('Password changed successfully.');
    } catch (error) {
      alert('Incorrect current password. Please try again.');
    } finally {
      setLoading(false);
      reset();
      closeModal();
    }
  };

  useEffect(() => {
    if (!modalState.includes('changePassword')) {
      reset();
    }
  }, [modalState]);

  return (
    <Dialog
      open={modalState.includes('changePassword')}
      onOpenChange={closeModal}
    >
      <DialogContent className="sm:max-w-xl lg:max-w-2xl ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Change Password
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel className="italic">Current Password</FieldLabel>
            <Input
              {...register('oldPassword')}
              placeholder="Enter your current password"
              type="password"
              required
            />
          </Field>
          <Field>
            <FieldLabel className="italic">New Password</FieldLabel>
            <Input
              {...register('newPassword')}
              placeholder="Enter your new password"
              type="password"
              required
            />
          </Field>
          <Field>
            <FieldLabel className="italic">Confirm New Password</FieldLabel>
            <Input
              {...register('confirmPassword')}
              placeholder="Confirm your new password"
              type="password"
              required
            />
          </Field>
          {newPassword && (
            isNewPasswordValid ? null : (
              <p className="text-red-500 text-sm">
                New password must be at least 6 characters long.
              </p>
            )
          )}
          {confirmPassword && newPassword && isNewPasswordValid && (
            isPasswordMatch ? null : (
              <p className="text-red-500 text-sm">Passwords do not match.</p>
            )
          )}
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <div>Changing password...</div>
              ) : (
                <div>Change Password</div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
