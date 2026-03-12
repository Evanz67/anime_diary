"use client"

import { useState } from "react";
import { AnimeListTable } from "@/components/custom/anime_list_component/anime_list_table";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/custom/anime_list_component/anime_list_modal/modal";
import { deleteSeries } from "@/backend/firestore_database";
import { useAuth } from "@/backend/auth_provider"
import { set } from "react-hook-form";

export default function AnimeList() {

  

  const [isModalEntriesOpen, setIsModalEntriesOpen] = useState(false)
  const [isModalAddAnimeOpen, setIsModalAddAnimeOpen] = useState(false)
  const [isModalAddEntriesOpen, setIsModalAddEntriesOpen] = useState(false)
  const [isModalUpdateAnimeOpen, setIsModalUpdateAnimeOpen] = useState(false)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [animeName, setAnimeName] = useState("")
  const [confirmationName, setconfirmationName] = useState("")
  const [confirmationLoading, setConfirmationLoading] = useState(false)
  const [seriesId, setSeriesId] = useState("")
  const [deletedSeriesId, setDeletedSeriesId] = useState("")
  const [newSeries, setNewSeries] = useState({})
  const [newEntry, setNewEntry] = useState({})
  const [seriesRef, setSeriesRef] = useState({})
  const [seriesUpdate, setSeriesUpdate] = useState({})
  const [deleteSeriesState, setDeleteSeriesState] = useState(false)
  const { user } = useAuth()
  
  const handleModalEntries = (row) => {
    if (!deleteSeriesState) {
      setAnimeName(row.name)
      setSeriesId(row.id)
      setIsModalEntriesOpen(true)
    } else {
      setSeriesId(row.id)
      setconfirmationName(row.name)
      setConfirmationOpen(true)
    }  
  }

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false)
  }

  const handleCloseModalEntries = () => {
    setIsModalEntriesOpen(false)
  }

  const handleModalAddAnime = () => {
    setIsModalAddAnimeOpen(true)
  }

  const handleCloseModalAddAnime = () => {
    setIsModalAddAnimeOpen(false)
  } 

  const handleModalAddEntries = () => {
    setIsModalAddEntriesOpen(true)
  }

  const handleCloseModalAddEntries = () => {
    setIsModalAddEntriesOpen(false)
  }

  const handleModalUpdateAnime = () => {
    setIsModalUpdateAnimeOpen(true)
  }

  const handleCloseModalUpdateAnime = () => {
    setIsModalUpdateAnimeOpen(false)
  } 

  const handleNewSeries = (seriesName) => {
    setNewSeries(seriesName)
  }

  const handleNewEntry = (entryName, seriesRef) => {
    setNewEntry(entryName)
    setSeriesRef(seriesRef)
  }

  const handleUpdateAnime = (seriesId, newAnimeName) => {
    setSeriesUpdate(
      {
        id: seriesId,
        name: newAnimeName
      }
    )
    setAnimeName(newAnimeName)
  }

  const handleDeleteSeries = () => {
    setDeleteSeriesState(true)
  }

  const handleCancelDeleteSeries = () => {
    setDeleteSeriesState(false)
  }

  const handleConfirmDeleteSeries = async () => {
    setConfirmationLoading(true)
    if (deleteSeriesState) {
      const deletedSeriesIdRef = await deleteSeries(user, seriesId)
      setDeletedSeriesId(deletedSeriesIdRef)
      setConfirmationOpen(false)
    }
    setConfirmationLoading(false)
  }

  return (
    <div className="container mx-auto flex-1 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Anime Finished</h1>
        <div className="flex gap-3">
          <Button 
          variant="secondary"
          size="lg"
          onClick={handleModalAddAnime}
          disabled={deleteSeriesState}
          >
            Add Series
          </Button>
          {deleteSeriesState ? (
            <Button 
            variant="destructive"
            size="lg"   
            onClick={handleCancelDeleteSeries} 
            >
              Cancel
            </Button>
          ) : (
            <Button 
            variant="secondary"
            size="lg"   
            onClick={handleDeleteSeries} 
            >
              Remove Series
            </Button>
          )}
        </div>    
      </div>  
      <AnimeListTable 
        handleModalEntries={handleModalEntries}
        newSeries={newSeries}
        deletedSeriesId={deletedSeriesId}
        seriesRef={seriesRef}
        seriesUpdate={seriesUpdate}
      />
      <Modal 
        isModalEntriesOpen={isModalEntriesOpen}
        handleCloseModalEntries={handleCloseModalEntries}
        isModalAddAnimeOpen={isModalAddAnimeOpen}
        handleCloseModalAddAnime={handleCloseModalAddAnime}
        isModalAddEntriesOpen={isModalAddEntriesOpen}
        handleCloseModalAddEntries={handleCloseModalAddEntries}
        handleOpenModalAddEntries={handleModalAddEntries}
        isModalUpdateAnimeOpen={isModalUpdateAnimeOpen}
        handleModalUpdateAnime={handleModalUpdateAnime}
        handleCloseModalUpdateAnime={handleCloseModalUpdateAnime}
        confirmationOpen={confirmationOpen}
        handleCloseConfirmation={handleCloseConfirmation}
        confirmationLoading={confirmationLoading}
        handleConfirmDeleteSeries={handleConfirmDeleteSeries}
        animeName={animeName} 
        confirmationName={confirmationName}
        seriesId={seriesId}
        handleNewSeries={handleNewSeries}  
        handleNewEntry={handleNewEntry}
        newEntry={newEntry}    
        handleUpdateAnime={handleUpdateAnime}
      />
    </div>
  );
}