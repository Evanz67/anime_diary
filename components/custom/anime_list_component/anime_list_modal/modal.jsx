import { ModalEntries } from "@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_entries"
import { ModalAddAnime } from "@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_add_anime"
import { ModalAddEntries } from "@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_add_entries"

export function Modal({ 
    isModalEntriesOpen, 
    handleCloseModalEntries, 
    isModalAddAnimeOpen, 
    handleCloseModalAddAnime,
    isModalAddEntriesOpen,
    handleCloseModalAddEntries, 
    handleOpenModalAddEntries,
    animeName,
    seriesId,
    handleNewSeries,
    handleNewEntry,
    newEntry
  }) 
{
  return (
    <div>
      <ModalEntries
        isOpen={isModalEntriesOpen}
        onClose={handleCloseModalEntries}
        handleOpenModalAddEntries={handleOpenModalAddEntries}
        animeName={animeName}
        seriesId={seriesId}
        newEntry={newEntry}
      >
      </ModalEntries>
      <ModalAddAnime
        isOpen={isModalAddAnimeOpen}
        onClose={handleCloseModalAddAnime}
        handleNewSeries={handleNewSeries}
      />
      <ModalAddEntries 
        isOpen={isModalAddEntriesOpen}
        onClose={handleCloseModalAddEntries}
        seriesId={seriesId}
        handleNewEntry={handleNewEntry}
      />
    </div>
  );
}