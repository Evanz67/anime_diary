'use client';

import { useState } from 'react';
import { AnimeListTable } from '@/components/custom/anime_list_component/anime_list_table';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/custom/anime_list_component/anime_list_modal/modal';
import {
  deleteSeries,
  deleteEntries,
  getEntries,
  getSeries,
} from '@/backend/firestore_database';
import { useAuth } from '@/context/auth_provider';
import { useModal } from '@/context/modal_provider';
import { useData } from '@/context/data_provider';

export default function AnimeList() {
  const [confirmationLoading, setConfirmationLoading] = useState(false);
  const [deletedEntriesId, setDeletedEntriesId] = useState('');
  const { user } = useAuth();
  const {
    passData,
    deleteSeriesState,
    deleteEntriesState,
    currentSeriesId,
    currentEntriesId,
  } = useData();
  const { openModal, closeModal } = useModal();

  const handleConfirmDelete = async () => {
    setConfirmationLoading(true);
    if (deleteSeriesState) {
      await deleteSeries(user, currentSeriesId);
      const seriesData = await getSeries(user);
      if (seriesData.length === 0) {
        passData({ action: 'deleteSeries' });
      }
      closeModal(); //close confirmation
    }
    if (deleteEntriesState) {
      await deleteEntries(user, currentSeriesId, currentEntriesId);
      const entriesData = await getEntries(user, currentSeriesId);
      if (entriesData.length === 0) {
        passData({ action: 'deleteEntries' });
      }
      closeModal(); //close confirmation
    }
    setConfirmationLoading(false);
  };

  return (
    <div className="container mx-auto flex-1 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Anime List</h1>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => openModal('addAnime')}
            disabled={deleteSeriesState}
          >
            Add Series
          </Button>
          {deleteSeriesState ? (
            <Button
              variant="destructive"
              size="lg"
              onClick={() => passData({ action: 'deleteSeries' })}
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="lg"
              onClick={() => passData({ action: 'deleteSeries' })}
            >
              Remove Series
            </Button>
          )}
        </div>
      </div>
      <AnimeListTable />
      <Modal
        confirmationLoading={confirmationLoading}
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}
