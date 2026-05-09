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
import { updateUser } from '@/backend/firestore_database';
import { useAuth } from '@/context/auth_provider';
import { useModal } from '@/context/modal_provider';

export function ModalChangeName({ setChangeName }) {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const { closeModal, modalState } = useModal();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateUser(user, data);
      setChangeName(data);
    } catch (error) {
      alert('Error updating user: ' + error.message);
    } finally {
      setLoading(false);
      reset();
      closeModal();
    }
  };

  useEffect(() => {
    if (!modalState.includes('changeName')) {
      reset();
    }
  }, [modalState]);

  return (
    <Dialog open={modalState.includes('changeName')} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-xl lg:max-w-2xl ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Change Name</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel className="italic">First Name</FieldLabel>
            <Input
              {...register('firstName')}
              placeholder="Enter first name"
              required
            />
          </Field>
          <Field>
            <FieldLabel className="italic">Last Name</FieldLabel>
            <Input
              {...register('lastName')}
              placeholder="Enter last name"
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
              {loading ? <div>Updating...</div> : <div>Update Name</div>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
