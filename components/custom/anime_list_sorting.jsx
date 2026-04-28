import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useDataKey } from '@/context/data_provider';

export function AnimeListSorting({ table, sorting }) {
  const [sortDirection, setSortDirection] = useState('asc');
  const { seriesColumn } = useDataKey();

  const currentSort = sorting[0];
  const currentSortColumn = currentSort?.id || 'clear';

  const handleSortChange = (columnId) => {
    if (columnId === 'clear') {
      table.setSorting([]);
    } else {
      table.setSorting([{ id: columnId, desc: sortDirection === 'desc' }]);
    }
  };

  const toggleDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);

    if (sorting[0]) {
      table.setSorting([
        {
          id: sorting[0].id,
          desc: newDirection === 'desc',
        },
      ]);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={currentSortColumn} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="clear">Default</SelectItem>
          {seriesColumn.map((column) => (
            <SelectItem key={column.accessorKey} value={column.accessorKey}>
              {column.header}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {currentSortColumn !== 'clear' && (
        <Button
          variant="outline"
          size="sm"
          onClick={toggleDirection}
        >
          {sortDirection === 'asc' ? (
            <>
              <ArrowUp className="h-4 w-4 mr-1" />
              Ascending
            </>
          ) : (
            <>
              <ArrowDown className="h-4 w-4 mr-1" />
              Descending
            </>
          )}
        </Button>
      )}
    </div>
  );
}
