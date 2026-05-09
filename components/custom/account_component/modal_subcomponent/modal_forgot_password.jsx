'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth_provider';
import { useModal } from '@/context/modal_provider';

export function ModalForgotPassword() {
  const { register, handleSubmit, reset } = useForm();
  const { resetPassword } = useAuth();
  const { closeModal, modalState } = useModal();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await resetPassword(data.email);
      alert('Password reset email sent. Please check your inbox.');
    } catch (error) {
      alert('Error resetting password: ' + error.message);
    } finally {
      setLoading(false);
      reset();
      closeModal();
    }
  };

  useEffect(() => {
    if (!modalState.includes('forgotPassword')) {
      reset();
    }
  }, [modalState]);

  return (
    <Dialog
      open={modalState.includes('forgotPassword')}
      onOpenChange={closeModal}
    >
      <DialogContent className="sm:max-w-xl lg:max-w-2xl ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Forgot Password
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <Input
              {...register('email')}
              placeholder="Enter your email"
              type="email"
              required
            />
          </Field>
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <div>Resetting password...</div>
              ) : (
                <div>Reset Password</div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
