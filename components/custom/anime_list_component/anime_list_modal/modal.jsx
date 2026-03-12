import { ModalEntries } from "@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_entries"
import { ModalAddAnime } from "@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_add_anime"
import { ModalAddEntries } from "@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_add_entries"
import { ModalUpdateAnime } from "@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_update_anime"
import { ConfirmationPopup } from "@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/confirmation_popup"

export function Modal({ 
    isModalEntriesOpen, 
    handleCloseModalEntries, 
    isModalAddAnimeOpen, 
    handleCloseModalAddAnime,
    isModalAddEntriesOpen,
    handleCloseModalAddEntries, 
    handleOpenModalAddEntries,
    isModalUpdateAnimeOpen,
    handleModalUpdateAnime,
    handleCloseModalUpdateAnime,
    confirmationOpen,
    handleCloseConfirmation,
    confirmationLoading,
    handleConfirmDeleteSeries,
    animeName,
    confirmationName,
    seriesId,
    handleNewSeries,
    handleNewEntry,
    newEntry,
    handleUpdateAnime
  }) 
{
  return (
    <div>
      <ModalEntries
        isOpen={isModalEntriesOpen}
        onClose={handleCloseModalEntries}
        handleOpenModalAddEntries={handleOpenModalAddEntries}
        handleModalUpdateAnime={handleModalUpdateAnime}
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
      <ModalUpdateAnime
        isOpen={isModalUpdateAnimeOpen}
        onClose={handleCloseModalUpdateAnime}
        seriesId={seriesId}  
        handleUpdateAnime={handleUpdateAnime}
      />
      <ConfirmationPopup
        isOpen={confirmationOpen}
        onClose={handleCloseConfirmation}
        name={confirmationName}
        confirmDelete={handleConfirmDeleteSeries}
        loading={confirmationLoading}
      />
    </div>
  );
}