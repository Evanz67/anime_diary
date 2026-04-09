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
import { useModal } from '@/context/modal_provider';
import { useData, useDataKey } from '@/context/data_provider';
import { useState, useEffect } from 'react';
import { updateSeries } from '@/backend/firestore_database';
import { useAuth } from '@/context/auth_provider';

export function ModalUpdateAnime() {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const { passData, currentSeriesId } = useData();
  const { seriesKey } = useDataKey();
  const { closeModal, modalState } = useModal();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateSeries(user, currentSeriesId, data.animeName);
      passData({
        action: 'currentSeries',
        currentSeriesId: currentSeriesId,
        selectedAnimeName: data.animeName,
      });
    } catch (error) {
      alert('Error updating series: ' + error.message);
    } finally {
      setLoading(false);
      reset();
      closeModal();
    }
  };

  useEffect(() => {
    if (!modalState.includes('updateAnime')) {
      reset();
    }
  }, [modalState]);

  return (
    <Dialog open={modalState.includes('updateAnime')} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-xl lg:max-w-2xl ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Change Anime Series Name
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <Input
              {...register(seriesKey.animeName)}
              placeholder="Enter a new anime series name"
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
              {loading ? <div>Updating series name...</div> : <div>Submit</div>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
