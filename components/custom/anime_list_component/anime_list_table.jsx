'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { getSeries } from '@/backend/firestore_database';
import { useAuth } from '@/context/auth_provider';
import { useModal } from '@/context/modal_provider';
import { useData } from '@/context/data_provider';

export function AnimeListTable({
  handleModalEntries,
  deletedSeriesId,
  seriesRef,
  seriesUpdate,
  deleteSeriesState,
}) {
  const columns = [
    { key: 'name', name: 'Anime Series' },
    { key: 'entries', name: '# of Entries' },
  ];
  const { user } = useAuth();
  const { data, seriesId } = useData();
  const { openModal } = useModal();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initializedState, setInitializedState] = useState(false);

  const totalPages = Math.ceil(series.length / pagination.pageSize);
  const startIndex = pagination.pageIndex * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const paginatedData = series.slice(startIndex, endIndex);

  const goToFirstPage = () => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };
  const goToPrevPage = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: Math.max(0, prev.pageIndex - 1),
    }));
  };
  const goToNextPage = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: Math.min(totalPages - 1, prev.pageIndex + 1),
    }));
  };
  const goToLastPage = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: totalPages - 1,
    }));
  };

  const handleEntry = (row) => {
    if (!deleteSeriesState) {
      openModal('entries');
    }
    handleModalEntries(row);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getSeries(user);
      setSeries(data);
      setInitializedState(true);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (initializedState) {
      setLoading(true);
      setSeries((prev) => [
        ...prev,
        { id: seriesId, entries: data.entries, name: data.newSeries },
      ]);
      setLoading(false);
    }
  }, [seriesId]);

  useEffect(() => {
    const updateAnimeSeries = () => {
      setLoading(true);
      if (series.some((series) => series.id === seriesUpdate.id)) {
        const seriesData = series.find(
          (series) => series.id === seriesUpdate.id
        );
        const newSeriesData = { ...seriesData, name: seriesUpdate.name };
        const updatedSeries = series.filter(
          (series) => series.id !== seriesUpdate.id
        );
        setSeries([...updatedSeries, newSeriesData]);
      }
      setLoading(false);
    };

    updateAnimeSeries();
  }, [seriesUpdate]);

  useEffect(() => {
    const updateEntryCount = () => {
      setLoading(true);
      if (series.some((series) => series.id === seriesRef.id)) {
        const seriesData = series.find((series) => series.id === seriesRef.id);
        const newSeriesData = { ...seriesData, entries: seriesRef.entries };
        const updatedSeries = series.filter(
          (series) => series.id !== seriesRef.id
        );
        setSeries([...updatedSeries, newSeriesData]);
      }
      setLoading(false);
    };

    updateEntryCount();
  }, [seriesRef]);

  useEffect(() => {
    const deleteSeries = () => {
      setLoading(true);
      if (series.some((series) => series.id === deletedSeriesId)) {
        const updatedSeries = series.filter(
          (series) => series.id !== deletedSeriesId
        );
        setSeries(updatedSeries);
      }
      setLoading(false);
    };

    deleteSeries();
  }, [deletedSeriesId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-lg italic text-muted-foreground">Loading...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              {columns.map((column) => (
                <TableHead key={column.key}>{column.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => handleEntry(row)}
                className="cursor-pointer"
              >
                {columns.map((column) => (
                  <TableCell key={column.key}>{row[column.key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(endIndex, series.length)} of{' '}
          {series.length}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToFirstPage}
            disabled={pagination.pageIndex === 0}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevPage}
            disabled={pagination.pageIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {pagination.pageIndex + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextPage}
            disabled={pagination.pageIndex === totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToLastPage}
            disabled={pagination.pageIndex === totalPages - 1}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
