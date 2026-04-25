'use client';

import { AnimeListTable } from '@/components/custom/anime_list_component/anime_list_table';
import { AnimeListSorting } from '@/components/custom/anime_list_sorting';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/custom/anime_list_component/anime_list_modal/modal';
import { useModal } from '@/context/modal_provider';
import { useData } from '@/context/data_provider';
import { useState } from 'react';

export default function AnimeList() {
  const { passData, deleteSeriesState } = useData();
  const [globalFilter, setGlobalFilter] = useState('');
  const { openModal } = useModal();
  const [table, setTable] = useState(null);
  const [sorting, setSorting] = useState([]);

  return (
    <div className="container mx-auto flex-1 p-4">
      <div className="flex justify-between mb-4">
        <div className="flex gap-6">
          <h1 className="text-2xl font-bold mt-1">Anime List</h1>
          <Input
            placeholder={`Search ${'anime series'}...`}
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-120 h-10 rounded-full"
          />
          {table && <AnimeListSorting table={table} sorting={sorting} />}
        </div>
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
      <AnimeListTable
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        sorting={sorting}
        setSorting={setSorting}
        setTable={setTable}
      />
      <Modal />
    </div>
  );
}
