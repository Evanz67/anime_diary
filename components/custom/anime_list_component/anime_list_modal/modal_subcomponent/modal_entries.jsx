'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ModalCardEntries } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_card_entries';
import { getEntries } from '@/backend/firestore_database';
import { useAuth } from '@/context/auth_provider';
import { useData } from '@/context/data_provider';
import { useModal } from '@/context/modal_provider';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { FilePlusCorner, Trash2, TextCursorInput } from 'lucide-react';

export function ModalEntries({
  isOpen,
  onClose,
  handleModalEntriesDetails,
  handleDeleteEntries,
  handleCancelDeleteEntries,
  deleteEntriesState,
  entryUpdate,
  deletedEntriesId,
}) {
  const columns = [
    { key: 'entryName', name: 'Entry Name' },
    { key: 'totalEpisode', name: '# of Episode' },
    { key: 'type', name: 'Type' },
  ];
  const { user } = useAuth();
  const { getSeriesId, animeName, entryDetails } = useData();
  const { openModal } = useModal();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleEntryDetails = (row) => {
    if (!deleteEntriesState) {
      openModal('updateEntries');
    }
    handleModalEntriesDetails(row);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!getSeriesId) {
        return;
      }
      setLoading(true);
      const data = await getEntries(user, getSeriesId);
      setEntries(data);
      setLoading(false);
    };

    const cleanUp = () => {
      setEntries([]);
      handleCancelDeleteEntries();
    };

    fetchData();
    return cleanUp();
  }, [user, getSeriesId]);

  useEffect(() => {
    setLoading(true);
    setEntries((prev) => [...prev, entryDetails]);
    setLoading(false);
  }, [entryDetails]);

  useEffect(() => {
    const updateEntryData = () => {
      setLoading(true);
      if (entries.some((entry) => entry.id === entryUpdate.id)) {
        const entryData = entries.find((entry) => entry.id === entryUpdate.id);
        const newEntryData = { ...entryData, ...entryUpdate };
        const updatedEntries = entries.filter(
          (entry) => entry.id !== entryUpdate.id
        );
        setEntries([...updatedEntries, newEntryData]);
      }
      setLoading(false);
    };

    updateEntryData();
  }, [entryUpdate]);

  useEffect(() => {
    const deleteEntries = () => {
      setLoading(true);
      if (entries.some((entry) => entry.id === deletedEntriesId)) {
        const updatedEntries = entries.filter(
          (entry) => entry.id !== deletedEntriesId
        );
        setEntries(updatedEntries);
      }
      setLoading(false);
    };

    deleteEntries();
  }, [deletedEntriesId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl lg:max-w-6xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl italic">
            <span className="mr-2">{animeName}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openModal('updateAnime')}
            >
              <TextCursorInput />
            </Button>
          </DialogTitle>
          <DialogDescription>28 Entries</DialogDescription>
        </DialogHeader>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => openModal('addEntries')}
          >
            <FilePlusCorner className="h-4 w-4" />
          </Button>
          <Button
            variant={deleteEntriesState ? 'destructive' : 'secondary'}
            size="lg"
            onClick={
              deleteEntriesState
                ? handleCancelDeleteEntries
                : handleDeleteEntries
            }
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-1 max-h-[60vh] min-h-[30vh] overflow-x-auto">
          <ModalCardEntries>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <span className="text-lg italic text-muted-foreground">
                  Loading...
                </span>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="text-lg">
                    {columns.map((column) => (
                      <TableHead key={column.key} className="font-extrabold">
                        {column.name}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((row) => (
                    <TableRow
                      key={row.id}
                      onClick={() => handleEntryDetails(row)}
                      className="cursor-pointer"
                    >
                      {columns.map((column) => (
                        <TableCell key={column.key}>
                          {row[column.key]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </ModalCardEntries>
        </div>
      </DialogContent>
    </Dialog>
  );
}
