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
import { getSeries, animeListLiveUpdate } from '@/backend/firestore_database';
import { useAuth } from '@/context/auth_provider';
import { useModal } from '@/context/modal_provider';
import { useData, useDataKey } from '@/context/data_provider';

export function AnimeListTable() {
  const { user } = useAuth();
  const { passData, deleteSeriesState } = useData();
  const { seriesColumn } = useDataKey();
  const { openModal } = useModal();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

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
    passData({
      action: 'currentSeries',
      currentSeriesId: row.id,
      selectedAnimeName: row.animeName,
    });
    if (deleteSeriesState) {
      openModal('delete');
    } else {
      openModal('entries');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getSeries(user);
      setSeries(data);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const unsubscribe = animeListLiveUpdate(user, setSeries);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

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
              {seriesColumn.map((column) => (
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
                {seriesColumn.map((column) => (
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
