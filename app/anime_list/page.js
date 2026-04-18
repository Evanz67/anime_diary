'use client';

import { AnimeListTable } from '@/components/custom/anime_list_component/anime_list_table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/custom/anime_list_component/anime_list_modal/modal';
import { useModal } from '@/context/modal_provider';
import { useData } from '@/context/data_provider';
import { useState, useEffect } from 'react';

export default function AnimeList() {
  const { passData, deleteSeriesState } = useData();
  const [globalFilter, setGlobalFilter] = useState('');
  const { openModal } = useModal();

  return (
    <div className="container mx-auto flex-1 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Anime List</h1>
        {/* Search Bar */}
        <div className="flex items-center ml-20">
          <Input
            placeholder={`Search ${'anime series'}...`}
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-120 h-10"
          />
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
      />
      <Modal />
    </div>
  );
}
