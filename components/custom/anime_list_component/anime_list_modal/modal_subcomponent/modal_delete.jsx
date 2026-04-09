'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  deleteSeries,
  deleteEntries,
  getEntries,
  getSeries,
} from '@/backend/firestore_database';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth_provider';
import { useData } from '@/context/data_provider';
import { useModal } from '@/context/modal_provider';

export function ModalDelete() {
  const {
    passData,
    selectedAnimeName,
    entryName,
    deleteSeriesState,
    deleteEntriesState,
    currentSeriesId,
    currentEntriesId,
  } = useData();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { closeModal, modalState } = useModal();

  const handleDelete = async () => {
    try {
      setLoading(true);
      if (deleteSeriesState) {
        await deleteSeries(user, currentSeriesId);
        const seriesData = await getSeries(user);
        if (seriesData.length === 0) {
          passData({ action: 'deleteSeries' });
        }
      }
      if (deleteEntriesState) {
        await deleteEntries(user, currentSeriesId, currentEntriesId);
        const entriesData = await getEntries(user, currentSeriesId);
        if (entriesData.length === 0) {
          passData({ action: 'deleteEntries' });
        }      
      }
    } catch (error) {
      console.error('Error deleting:', error);
    } finally {
      setLoading(false);
      closeModal();
    }

    
    
  };

  return (
    <Dialog open={modalState.includes('delete')} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-xl lg:max-w-2xl ">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">
            Confirm Delete
          </DialogTitle>
        </DialogHeader>
        <div className="text-center">
          Are you sure you want to delete "{}
          <span className="italic underline">
            {deleteEntriesState ? entryName : selectedAnimeName}
          </span>
          " {deleteEntriesState ? '?' : 'and all of its entries?'}
        </div>
        {!loading ? (
          <div className="flex justify-center gap-4 mt-4">
            <Button variant="secondary" size="lg" onClick={closeModal}>
              No
            </Button>
            <Button variant="destructive" size="lg" onClick={handleDelete}>
              Yes
            </Button>
          </div>
        ) : (
          <div className="flex justify-center gap-4 mt-4">
            <p>Deleting...</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
