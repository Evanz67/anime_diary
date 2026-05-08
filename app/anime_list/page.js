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
  const [sorting, setSorting] = useState([{ id: 'created', desc: false }]);

  return (
    <div className="container mx-auto flex-1 p-4">
      <div className="flex flex-col mb-4 gap-4 xl:flex-row xl:justify-between">
        <div className="flex flex-col items-center gap-4 xl:flex-row xl:gap-6">
          <h1 className="text-xl font-bold text-center xl:mt-1">Anime List</h1>
          {/* Search Bar */}
          <Input
            placeholder={`Search ${'anime series'}...`}
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="rounded-full h-10 md:w-120"
          />
          {/* Sorting Dropdown */}
          <div>
            {table && <AnimeListSorting table={table} sorting={sorting} />}
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <Button
            variant="secondary"
            className="px-4 py-2 2xl:px-7 2xl:py-5"
            onClick={() => openModal('addAnime')}
            disabled={deleteSeriesState}
          >
            Add Series
          </Button>
          {deleteSeriesState ? (
            <Button
              variant="destructive"
              className="px-4 py-2 2xl:px-7 2xl:py-5"
              onClick={() => passData({ action: 'deleteSeries' })}
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="px-4 py-2 2xl:px-7 2xl:py-5"
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
