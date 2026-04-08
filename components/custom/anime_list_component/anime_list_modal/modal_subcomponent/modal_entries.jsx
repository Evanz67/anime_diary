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
import { getEntries, entriesLiveUpdate } from '@/backend/firestore_database';
import { useAuth } from '@/context/auth_provider';
import { useData, useDataKey } from '@/context/data_provider';
import { useModal } from '@/context/modal_provider';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { FilePlusCorner, Trash2, TextCursorInput } from 'lucide-react';

export function ModalEntries() {
  
  const { user } = useAuth();
  const { passData, currentSeriesId, selectedAnimeName, deleteEntriesState } =
    useData();
  const { openModal, closeModal, modalState } = useModal();
  const { entriesColumn } = useDataKey();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleEntryDetails = (row) => {
    passData({
      action: 'currentEntries',
      currentEntriesId: row.id,
      entryName: row.entryName,
    });
    if (deleteEntriesState) {
      openModal('delete');
    } else {
      openModal('updateEntries');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!currentSeriesId) {
        return;
      }
      setLoading(true);
      const data = await getEntries(user, currentSeriesId);
      setEntries(data);
      setLoading(false);
    };
    if (modalState.includes('entries')) {
      fetchData();
    }
  }, [user, currentSeriesId, modalState]);

  useEffect(() => {
    const cleanUp = () => {
      setEntries([]);
      if (deleteEntriesState) {
        passData({ action: 'deleteEntries' });
      }
    };
    if (!modalState.includes('entries')) {
      cleanUp();
    }
  }, [modalState]);

  useEffect(() => {
    if (!currentSeriesId) {
      return;
    }
    const unsubscribe = entriesLiveUpdate(user, currentSeriesId, setEntries);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, currentSeriesId]);

  return (
    <Dialog open={modalState.includes('entries')} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-2xl lg:max-w-6xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl italic">
            <span className="mr-2">{selectedAnimeName}</span>
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
            onClick={() => passData({ action: 'deleteEntries' })}
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
                    {entriesColumn.map((column) => (
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
                      {entriesColumn.map((column) => (
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
