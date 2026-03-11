"use client"

import { useState } from "react";
import { AnimeListTable } from "@/components/custom/anime_list_component/anime_list_table";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/custom/anime_list_component/anime_list_modal/modal";
import { set } from "react-hook-form";

export default function AnimeList() {

  

  const [isModalEntriesOpen, setIsModalEntriesOpen] = useState(false)
  const [isModalAddAnimeOpen, setIsModalAddAnimeOpen] = useState(false)
  const [isModalAddEntriesOpen, setIsModalAddEntriesOpen] = useState(false)
  const [animeName, setAnimeName] = useState("")
  const [seriesId, setSeriesId] = useState("")
  const [newSeries, setNewSeries] = useState({})
  const [newEntry, setNewEntry] = useState({})
  const [seriesRef, setSeriesRef] = useState({})
  
  const handleModalEntries = (row) => {
    setAnimeName(row.name)
    setSeriesId(row.id)
    setIsModalEntriesOpen(true)
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

  const handleNewSeries = (seriesName) => {
    setNewSeries(seriesName)
  }

  const handleNewEntry = (entryName, seriesRef) => {
    setNewEntry(entryName)
    setSeriesRef(seriesRef)
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
          >
            Add Series
          </Button>
          <Button 
          variant="secondary"
          size="lg"    
          >
            Edit Series
          </Button>
        </div>    
      </div>  
      <AnimeListTable 
        handleModalEntries={handleModalEntries}
        newSeries={newSeries}
        seriesRef={seriesRef}
      />
      <Modal 
        isModalEntriesOpen={isModalEntriesOpen}
        handleCloseModalEntries={handleCloseModalEntries}
        isModalAddAnimeOpen={isModalAddAnimeOpen}
        handleCloseModalAddAnime={handleCloseModalAddAnime}
        isModalAddEntriesOpen={isModalAddEntriesOpen}
        handleCloseModalAddEntries={handleCloseModalAddEntries}
        handleOpenModalAddEntries={handleModalAddEntries}
        animeName={animeName} 
        seriesId={seriesId}
        handleNewSeries={handleNewSeries}  
        handleNewEntry={handleNewEntry}
        newEntry={newEntry}    
      />
    </div>
  );
}