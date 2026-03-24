import { ModalEntries } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_entries';
import { ModalAddAnime } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_add_anime';
import { ModalAddEntries } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_add_entries';
import { ModalUpdateEntries } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_update_entries';
import { ModalUpdateAnime } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_update_anime';
import { ConfirmationPopup } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/confirmation_popup';
import { useModal } from '@/context/modal_provider';

export function Modal({
  handleModalEntriesDetails,
  confirmationLoading,
  handleConfirmDelete,
  confirmationName,
  seriesId,
  entryId,
  handleNewEntry,
  newEntry,
  handleUpdateAnime,
  handleUpdateEntry,
  entryUpdate,
  handleDeleteEntries,
  handleCancelDeleteEntries,
  deleteEntriesState,
  deletedEntriesId,
}) {
  const { closeModal, modalState } = useModal();

  return (
    <div>
      <ModalEntries
        isOpen={modalState.includes('entries')}
        onClose={closeModal}
        handleModalEntriesDetails={handleModalEntriesDetails}
        handleDeleteEntries={handleDeleteEntries}
        handleCancelDeleteEntries={handleCancelDeleteEntries}
        deleteEntriesState={deleteEntriesState}
        seriesId={seriesId}
        newEntry={newEntry}
        entryUpdate={entryUpdate}
        deletedEntriesId={deletedEntriesId}
      ></ModalEntries>
      
      {modalState.includes('addAnime') && (
        <ModalAddAnime isOpen={true} onClose={closeModal} />
      )}
      {modalState.includes('addEntries') && (
        <ModalAddEntries
          isOpen={true}
          onClose={closeModal}
          seriesId={seriesId}
          handleNewEntry={handleNewEntry}
        />
      )}
      {modalState.includes('updateAnime') && (
        <ModalUpdateAnime
          isOpen={true}
          onClose={closeModal}
          seriesId={seriesId}
          handleUpdateAnime={handleUpdateAnime}
        />
      )}
      {modalState.includes('updateEntries') && (
        <ModalUpdateEntries
          isOpen={true}
          onClose={closeModal}
          seriesId={seriesId}
          entryId={entryId}
          handleUpdateEntry={handleUpdateEntry}
        />
      )}
      {modalState.includes('confirmation') && (
        <ConfirmationPopup
          isOpen={true}
          onClose={closeModal}
          name={confirmationName}
          confirmDelete={handleConfirmDelete}
          loading={confirmationLoading}
          deleteEntriesState={deleteEntriesState}
        />
      )}
    </div>
  );
}
