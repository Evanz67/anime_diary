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
        entryUpdate={entryUpdate}
        deletedEntriesId={deletedEntriesId}
      ></ModalEntries>

      <ModalAddAnime
        isOpen={modalState.includes('addAnime')}
        onClose={closeModal}
      />

      <ModalAddEntries
        isOpen={modalState.includes('addEntries')}
        onClose={closeModal}
        seriesId={seriesId}
      />

      <ModalUpdateAnime
        isOpen={modalState.includes('updateAnime')}
        onClose={closeModal}
        seriesId={seriesId}
        handleUpdateAnime={handleUpdateAnime}
      />

      <ModalUpdateEntries
        isOpen={modalState.includes('updateEntries')}
        onClose={closeModal}
        seriesId={seriesId}
        entryId={entryId}
        handleUpdateEntry={handleUpdateEntry}
      />

      <ConfirmationPopup
        isOpen={modalState.includes('confirmation')}
        onClose={closeModal}
        name={confirmationName}
        confirmDelete={handleConfirmDelete}
        loading={confirmationLoading}
        deleteEntriesState={deleteEntriesState}
      />
    </div>
  );
}
