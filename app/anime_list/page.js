"use client"

import { AnimeListTable } from "@/components/custom/anime_list_table"

export default function AnimeList() {

  const data = [
    { id: 1, anime: "Naruto", entries: 50 },
    { id: 2, anime: "One Piece", entries: 70 },
    { id: 3, anime: "Attack on Titan", entries: 30 },
    { id: 4, anime: "My Hero Academia", entries: 40 },
    { id: 5, anime: "Demon Slayer", entries: 25 },
  ]

  const columns = [
    { key: "anime", name: "Anime Series" },
    { key: "entries", name: "# of Entries" },
  ]

  return (
    <div className="container mx-auto flex-1 p-4">
      <h1 className="text-2xl font-bold mb-6">Anime Finished</h1>
        <AnimeListTable 
          columns={columns} 
          data={data} 
          pageSize={5} 
        />
    </div>
  );
}