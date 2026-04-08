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
import { useAuth } from '@/context/auth_provider';
import { useModal } from '@/context/modal_provider';
import { useData } from '@/context/data_provider';
import { updateEntries } from '@/backend/firestore_database';
import { useState, useEffect } from 'react';

export function ModalUpdateEntries() {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const { closeModal, modalState } = useModal();
  const { currentSeriesId, currentEntriesId, passData } = useData();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (
      data.type !== 'TV' &&
      data.type !== 'OVA' &&
      data.type !== 'ONA' &&
      data.type !== 'Movie' &&
      data.type !== ''
    ) {
      alert('Please enter a valid type (TV, OVA, ONA, or Movie).');
      return;
    }
    const entryDetails = {
      ...data,
      episode: data.episode === '' ? 0 : parseInt(data.episode),
    };
    try {
      setLoading(true);
      await updateEntries(
        user,
        currentSeriesId,
        currentEntriesId,
        entryDetails
      );
      passData({
        action: 'addEntries',
        ...entryDetails,
      });
    } catch (error) {
      alert('Error updating entry: ' + error.message);
    } finally {
      setLoading(false);
      reset();
      closeModal();
    }
  };

  useEffect(() => {
    if (!modalState.includes('updateEntries')) {
      reset();
    }
  }, [modalState]);

  return (
    <Dialog
      open={modalState.includes('updateEntries')}
      onOpenChange={closeModal}
    >
      <DialogContent className="sm:max-w-xl lg:max-w-2xl ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Edit Anime Entry
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel className="italic">Entry Name</FieldLabel>
            <Input
              {...register('entryName')}
              placeholder="Enter an entry name"
            />
          </Field>
          <Field>
            <FieldLabel className="italic"># of Episode</FieldLabel>
            <Input
              type="number"
              step="1"
              min="1"
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              {...register('totalEpisode')}
              placeholder="Enter number of episodes"
            />
          </Field>
          <Field>
            <FieldLabel className="italic">Type</FieldLabel>
            <Input
              {...register('type')}
              placeholder="Enter type (e.g. TV, OVA, ONA, Movie)"
            />
          </Field>
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={loading}
            >
              {loading ? <div>Updating entry...</div> : <div>Edit</div>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
