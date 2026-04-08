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
import { addSeries } from '@/backend/firestore_database';
import { useAuth } from '@/context/auth_provider';
import { useModal } from '@/context/modal_provider';

export function ModalAddAnime() {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const { closeModal, modalState } = useModal();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (user) {
      try {
        setLoading(true);
        await addSeries(user, data);
      } catch (error) {
        alert('Error adding series: ' + error.message);
      } finally {
        setLoading(false);
        reset();
        closeModal();
      }
    } else {
      alert('Please login to add a series.');
    }
  };

  useEffect(() => {
    if (!modalState.includes('addAnime')) {
      reset();
    }
  }, [modalState]);

  return (
    <Dialog open={modalState.includes('addAnime')} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-xl lg:max-w-2xl ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add Anime Series
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <Input
              {...register('animeName')}
              placeholder="Enter anime series name"
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
              {loading ? <div>Adding series...</div> : <div>Add</div>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
