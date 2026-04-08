'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '@/context/auth_provider';
import { useModal } from '@/context/modal_provider';
import { useData, useDataKey } from '@/context/data_provider';
import { updateEntries } from '@/backend/firestore_database';
import { useState, useEffect } from 'react';

export function ModalUpdateEntries() {
  const { register, handleSubmit, reset, control } = useForm();
  const { user } = useAuth();
  const { closeModal, modalState } = useModal();
  const { currentSeriesId, currentEntriesId, passData } = useData();
  const { entriesKey } = useDataKey();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const entryDetails = {
      ...data,
      [entriesKey.totalEpisode]:
        data[entriesKey.totalEpisode] === ''
          ? 0
          : parseInt(data[entriesKey.totalEpisode]),
    };
    try {
      setLoading(true);
      await updateEntries(
        user,
        currentSeriesId,
        currentEntriesId,
        entryDetails,
        entriesKey
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
              {...register(entriesKey.entryName)}
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
              {...register(entriesKey.totalEpisode)}
              placeholder="Enter number of episodes"
            />
          </Field>
          <Field>
            <FieldLabel className="italic">Type</FieldLabel>
            <Controller
              name={entriesKey.type}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TV">TV</SelectItem>
                    <SelectItem value="OVA">OVA</SelectItem>
                    <SelectItem value="ONA">ONA</SelectItem>
                    <SelectItem value="Movie">Movie</SelectItem>
                  </SelectContent>
                </Select>
              )}
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
