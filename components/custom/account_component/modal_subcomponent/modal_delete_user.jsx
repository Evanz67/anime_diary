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

export function ModalDeleteUser() {
  const { register, handleSubmit, reset } = useForm();
  const { user, deleteAccount } = useAuth();
  const { closeModal, modalState } = useModal();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await deleteAccount(data.password);
      alert('Account deleted successfully!');
    } catch (error) {
      alert('Error deleting account: ' + error.message);
    } finally {
      setLoading(false);
      reset();
      closeModal();
      closeModal(); // I put an extra one here so it closes the profile modal as well
    }
  };

  useEffect(() => {
    if (!modalState.includes('deleteUser')) {
      reset();
    }
  }, [modalState]);

  return (
    <Dialog open={modalState.includes('deleteUser')} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-xl lg:max-w-2xl ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Are you sure you want to delete your account?
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel className="italic">Password</FieldLabel>
            <Input
              {...register('password')}
              placeholder="Enter your password to confirm deletion"
              type="password"
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
              {loading ? <div>Deleting...</div> : <div>Delete Account</div>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
