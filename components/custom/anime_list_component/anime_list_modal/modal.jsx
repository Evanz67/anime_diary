import { ModalEntries } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_entries';
import { ModalAddAnime } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_add_anime';
import { ModalAddEntries } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_add_entries';
import { ModalUpdateEntries } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_update_entries';
import { ModalUpdateAnime } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_update_anime';
import { ConfirmationPopup } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/confirmation_popup';
import { useModal } from '@/context/modal_provider';

export function Modal({
  confirmationLoading,
  handleConfirmDelete,
}) {
  const { closeModal, modalState } = useModal();

  return (
    <div>
      <ModalEntries
        isOpen={modalState.includes('entries')}
        onClose={closeModal}
      ></ModalEntries>

      <ModalAddAnime
        isOpen={modalState.includes('addAnime')}
        onClose={closeModal}
      />

      <ModalAddEntries
        isOpen={modalState.includes('addEntries')}
        onClose={closeModal}
      />

      <ModalUpdateAnime
        isOpen={modalState.includes('updateAnime')}
        onClose={closeModal}
      />

      <ModalUpdateEntries
        isOpen={modalState.includes('updateEntries')}
        onClose={closeModal}
      />

      <ConfirmationPopup
        isOpen={modalState.includes('confirmation')}
        onClose={closeModal}
        confirmDelete={handleConfirmDelete}
        loading={confirmationLoading}
      />
    </div>
  );
}
