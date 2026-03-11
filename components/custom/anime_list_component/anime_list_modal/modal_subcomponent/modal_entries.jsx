"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ModalCardEntries } from "@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_card_entries"
import { getEntries } from "@/backend/firestore_database";
import { useAuth } from "@/backend/auth_provider";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FilePlusCorner, Trash2 } from 'lucide-react';

export function ModalEntries({ isOpen, onClose, animeName, seriesId, handleOpenModalAddEntries, newEntry }) {
  const columns = [
    { key: "name", name: "Anime" },
    { key: "episode", name: "# of Episode" },
    { key: "type", name: "Type" },
  ]
  const { user } = useAuth() 
  const [entries, setEntries] = useState([])

  useEffect(() => {
      const fetchData = async () => {
        const data = await getEntries(user, seriesId)
        setEntries(data)
      }
      if (isOpen === true) {
        fetchData()
      }   
    }, [user, isOpen])
  
  useEffect(() => {
    setEntries(prev => [...prev, newEntry])
  }, [newEntry])

  useEffect(() => {
    if (isOpen === false) {
      setEntries([])
    } 
  }, [user, isOpen])
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl lg:max-w-6xl overflow-hidden">     
        <DialogHeader>
          <DialogTitle className="text-xl italic">{animeName}</DialogTitle>
          <DialogDescription>28 Entries</DialogDescription>
        </DialogHeader>
        <div className="flex gap-3">
          <Button 
            variant="secondary"
            size="lg"
            onClick={handleOpenModalAddEntries}
          >
            <FilePlusCorner className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-1 max-h-[60vh] min-h-[30vh] overflow-x-auto">
          <ModalCardEntries >     
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
                  <TableRow key={row.id}>
                    {columns.map((column) => (
                      <TableCell key={column.key}>
                        {row[column.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}                    
              </TableBody>
            </Table>
          </ModalCardEntries>
        </div>
      </DialogContent>
    </Dialog>
  );
}