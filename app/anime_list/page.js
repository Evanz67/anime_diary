"use client"

import { useState } from "react";
import { AnimeListTable } from "@/components/custom/anime_list_component/anime_list_table";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/custom/anime_list_component/anime_list_modal/modal";

export default function AnimeList() {

  const data = [
    { id: 1, anime: "Naruto", entries: Math.max(50,100)},
    { id: 2, anime: "One Piece", entries: 70 },
    { id: 3, anime: "Attack on Titan", entries: 30 },
    { id: 4, anime: "My Hero Academia", entries: 40 },
    { id: 5, anime: "Demon Slayer", entries: 25 },
    { id: 6, anime: "Fullmetal Alchemist", entries: 60 },
  ]

  const columns = [
    { key: "name", name: "Anime Series" },
    { key: "entries", name: "# of Entries" },
  ]

  const [isModalEntriesOpen, setIsModalEntriesOpen] = useState(false)
  const [isModalAddAnimeOpen, setIsModalAddAnimeOpen] = useState(false)
  const [isModalAddEntriesOpen, setIsModalAddEntriesOpen] = useState(false)
  const [animeName, setAnimeName] = useState("")
  const [newSeries, setNewSeries] = useState("")
  
  const handleModalEntries = (row) => {
    setAnimeName(row.name)
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
            Remove Series
          </Button>
        </div>    
      </div>  
      <AnimeListTable 
        columns={columns} 
        pageSize={5} 
        handleModalEntries={handleModalEntries}
        newSeries={newSeries}
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
        newSeries={handleNewSeries}      
      />
    </div>
  );
}