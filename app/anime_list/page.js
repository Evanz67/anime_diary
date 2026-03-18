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
import { useAuth } from '@/backend/auth_provider';

export default function AnimeList() {
  const [isModalEntriesOpen, setIsModalEntriesOpen] = useState(false);
  const [isModalAddAnimeOpen, setIsModalAddAnimeOpen] = useState(false);
  const [isModalAddEntriesOpen, setIsModalAddEntriesOpen] = useState(false);
  const [isModalUpdateAnimeOpen, setIsModalUpdateAnimeOpen] = useState(false);
  const [isModalUpdateEntriesOpen, setIsModalUpdateEntriesOpen] =
    useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [animeName, setAnimeName] = useState('');
  const [confirmationName, setconfirmationName] = useState('');
  const [confirmationLoading, setConfirmationLoading] = useState(false);
  const [seriesId, setSeriesId] = useState('');
  const [entryId, setEntryId] = useState('');
  const [deletedSeriesId, setDeletedSeriesId] = useState('');
  const [deletedEntriesId, setDeletedEntriesId] = useState('');
  const [newSeries, setNewSeries] = useState({});
  const [newEntry, setNewEntry] = useState({});
  const [seriesRef, setSeriesRef] = useState({});
  const [seriesUpdate, setSeriesUpdate] = useState({});
  const [entryUpdate, setEntryUpdate] = useState({});
  const [deleteSeriesState, setDeleteSeriesState] = useState(false);
  const [deleteEntriesState, setDeleteEntriesState] = useState(false);
  const { user } = useAuth();

  const handleModalEntries = (row) => {
    if (!deleteSeriesState) {
      setAnimeName(row.name);
      setSeriesId(row.id);
      setIsModalEntriesOpen(true);
    } else {
      setSeriesId(row.id);
      setconfirmationName(row.name);
      setConfirmationOpen(true);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };

  const handleCloseModalEntries = () => {
    setIsModalEntriesOpen(false);
  };

  const handleModalEntriesDetails = (row) => {
    if (!deleteEntriesState) {
      setEntryId(row.id);
      setIsModalUpdateEntriesOpen(true);
    } else {
      setEntryId(row.id);
      setconfirmationName(row.name);
      setConfirmationOpen(true);
    }
  };

  const handleCloseUpdateEntries = () => {
    setIsModalUpdateEntriesOpen(false);
  };

  const handleModalAddAnime = () => {
    setIsModalAddAnimeOpen(true);
  };

  const handleCloseModalAddAnime = () => {
    setIsModalAddAnimeOpen(false);
  };

  const handleModalAddEntries = () => {
    setIsModalAddEntriesOpen(true);
  };

  const handleCloseModalAddEntries = () => {
    setIsModalAddEntriesOpen(false);
  };

  const handleModalUpdateAnime = () => {
    setIsModalUpdateAnimeOpen(true);
  };

  const handleCloseModalUpdateAnime = () => {
    setIsModalUpdateAnimeOpen(false);
  };

  const handleNewSeries = (seriesName) => {
    setNewSeries(seriesName);
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
      setConfirmationOpen(false);
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
      setConfirmationOpen(false);
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
            onClick={handleModalAddAnime}
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
        newSeries={newSeries}
        deletedSeriesId={deletedSeriesId}
        seriesRef={seriesRef}
        seriesUpdate={seriesUpdate}
      />
      <Modal
        isModalEntriesOpen={isModalEntriesOpen}
        handleCloseModalEntries={handleCloseModalEntries}
        isModalAddAnimeOpen={isModalAddAnimeOpen}
        handleCloseModalAddAnime={handleCloseModalAddAnime}
        isModalAddEntriesOpen={isModalAddEntriesOpen}
        handleCloseModalAddEntries={handleCloseModalAddEntries}
        handleOpenModalAddEntries={handleModalAddEntries}
        isModalUpdateAnimeOpen={isModalUpdateAnimeOpen}
        handleModalUpdateAnime={handleModalUpdateAnime}
        handleCloseModalUpdateAnime={handleCloseModalUpdateAnime}
        isModalUpdateEntriesOpen={isModalUpdateEntriesOpen}
        handleModalEntriesDetails={handleModalEntriesDetails}
        handleCloseUpdateEntries={handleCloseUpdateEntries}
        confirmationOpen={confirmationOpen}
        handleCloseConfirmation={handleCloseConfirmation}
        confirmationLoading={confirmationLoading}
        handleConfirmDelete={handleConfirmDelete}
        animeName={animeName}
        confirmationName={confirmationName}
        seriesId={seriesId}
        entryId={entryId}
        handleNewSeries={handleNewSeries}
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
