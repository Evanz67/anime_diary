"use client";

import { useState, useEffect, use } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react"
import { getSeries } from "@/backend/firestore_database";
import { useAuth } from "@/backend/auth_provider"

export function AnimeListTable({ columns, pageSize, handleModalEntries, newSeries }) {
  const { user } = useAuth()
  const [pagination, setPagination] = useState({
    pageIndex: 0, 
    pageSize: pageSize,
  })
  const [series, setSeries] = useState([])

  const totalPages = Math.ceil(series.length / pagination.pageSize)
  const startIndex = pagination.pageIndex * pagination.pageSize
  const endIndex = startIndex + pagination.pageSize
  const paginatedData = series.slice(startIndex, endIndex)

  const goToFirstPage = () => {
    setPagination(prev => ({ ...prev, pageIndex: 0 }))
  }
  const goToPrevPage = () => {
    setPagination(prev => ({ 
      ...prev, 
      pageIndex: Math.max(0, prev.pageIndex - 1) 
    }))
  }
  const goToNextPage = () => {
    setPagination(prev => ({ 
      ...prev, 
      pageIndex: Math.min(totalPages - 1, prev.pageIndex + 1) 
    }))
  }
  const goToLastPage = () => {
    setPagination(prev => ({ 
      ...prev, 
      pageIndex: totalPages - 1 
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSeries(user)
      setSeries(data)
    }

    fetchData()
  }, [user])

  useEffect(() => {
    setSeries(prev => [...prev, { name: newSeries }])
  }, [newSeries])

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
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow 
                  key={rowIndex}
                  onClick={() => handleModalEntries(row)}
                  className="cursor-pointer"
                >
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
            
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(endIndex, series.length)} of {series.length}
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