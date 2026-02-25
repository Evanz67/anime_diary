"use client"

import { AnimeListTable } from "@/components/custom/anime_list_table";
import { Button } from "@/components/ui/button";
import { FilePlusCorner } from "lucide-react";

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
    { key: "anime", name: "Anime Series" },
    { key: "entries", name: "# of Entries" },
  ]

  return (
    <div className="container mx-auto flex-1 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Anime Finished</h1>
        <div className="flex gap-3">
          <Button 
          variant="secondary"
          size="lg"
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
        data={data} 
        pageSize={5} 
      />
    </div>
  );
}