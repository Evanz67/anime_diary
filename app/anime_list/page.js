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

export default function AnimeList() {
  const [animeName, setAnimeName] = useState('');
  const [confirmationName, setconfirmationName] = useState('');
  const [confirmationLoading, setConfirmationLoading] = useState(false);
  const [seriesId, setSeriesId] = useState('');
  const [entryId, setEntryId] = useState('');
  const [deletedSeriesId, setDeletedSeriesId] = useState('');
  const [deletedEntriesId, setDeletedEntriesId] = useState('');
  const [newEntry, setNewEntry] = useState({});
  const [seriesRef, setSeriesRef] = useState({});
  const [seriesUpdate, setSeriesUpdate] = useState({});
  const [entryUpdate, setEntryUpdate] = useState({});
  const [deleteSeriesState, setDeleteSeriesState] = useState(false);
  const [deleteEntriesState, setDeleteEntriesState] = useState(false);
  const { user } = useAuth();
  const { openModal, closeModal } = useModal();

  const handleModalEntries = (row) => {
    if (!deleteSeriesState) {
      setAnimeName(row.name);
      setSeriesId(row.id);
    } else {
      setSeriesId(row.id);
      setconfirmationName(row.name);
      openModal('confirmation');
    }
  };

  const handleModalEntriesDetails = (row) => {
    if (!deleteEntriesState) {
      setEntryId(row.id);
    } else {
      setEntryId(row.id);
      setconfirmationName(row.name);
      openModal('confirmation');
    }
  };

  const handleNewEntry = (entryName, seriesRef) => {
    setNewEntry(entryName);
    setSeriesRef(seriesRef);
  };

  const handleUpdateAnime = (seriesId, newAnimeName) => {
    setSeriesUpdate({
      id: seriesId,
      name: newAnimeName,
    });
    setAnimeName(newAnimeName);
  };

  const handleUpdateEntry = (entryId, newEntryData) => {
    setEntryUpdate({
      id: entryId,
      ...newEntryData,
    });
  };

  const handleDeleteSeries = () => {
    setDeleteSeriesState(true);
  };

  const handleCancelDeleteSeries = () => {
    setDeleteSeriesState(false);
  };

  const handleDeleteEntries = () => {
    setDeleteEntriesState(true);
  };

  const handleCancelDeleteEntries = () => {
    setDeleteEntriesState(false);
  };

  const handleConfirmDelete = async () => {
    setConfirmationLoading(true);
    if (deleteSeriesState) {
      const deletedSeriesIdRef = await deleteSeries(user, seriesId);
      const seriesData = await getSeries(user);
      setDeletedSeriesId(deletedSeriesIdRef);
      if (seriesData.length === 0) {
        setDeleteSeriesState(false);
      }
      closeModal(); //close confirmation
    }
    if (deleteEntriesState) {
      const deletedEntriesRef = await deleteEntries(user, seriesId, entryId);
      const entriesData = await getEntries(user, seriesId);
      setDeletedEntriesId(deletedEntriesRef[0]);
      setSeriesRef((prev) => ({
        ...prev,
        id: deletedEntriesRef[1],
        entries: deletedEntriesRef[2],
      }));
      if (entriesData.length === 0) {
        setDeleteEntriesState(false);
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
              onClick={handleCancelDeleteSeries}
            >
              Cancel
            </Button>
          ) : (
            <Button variant="secondary" size="lg" onClick={handleDeleteSeries}>
              Remove Series
            </Button>
          )}
        </div>
      </div>
      <AnimeListTable
        handleModalEntries={handleModalEntries}
        deletedSeriesId={deletedSeriesId}
        seriesRef={seriesRef}
        seriesUpdate={seriesUpdate}
        deleteSeriesState={deleteSeriesState}
      />
      <Modal
        handleModalEntriesDetails={handleModalEntriesDetails}
        confirmationLoading={confirmationLoading}
        handleConfirmDelete={handleConfirmDelete}
        animeName={animeName}
        confirmationName={confirmationName}
        seriesId={seriesId}
        entryId={entryId}
        handleNewEntry={handleNewEntry}
        newEntry={newEntry}
        handleUpdateAnime={handleUpdateAnime}
        handleUpdateEntry={handleUpdateEntry}
        entryUpdate={entryUpdate}
        handleDeleteEntries={handleDeleteEntries}
        handleCancelDeleteEntries={handleCancelDeleteEntries}
        deleteEntriesState={deleteEntriesState}
        deletedEntriesId={deletedEntriesId}
      />
    </div>
  );
}
