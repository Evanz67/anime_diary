import { ModalEntries } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_entries';
import { ModalAddAnime } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_add_anime';
import { ModalAddEntries } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_add_entries';
import { ModalUpdateEntries } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_update_entries';
import { ModalUpdateAnime } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_update_anime';
import { ModalDelete } from '@/components/custom/anime_list_component/anime_list_modal/modal_subcomponent/modal_delete';
import { SignUp } from '@/components/custom/authentication/signup';
import { Login } from '@/components/custom/authentication/login';

export function Modal() {

  return (
    <div>
      <ModalEntries />
      <ModalAddAnime />
      <ModalAddEntries />
      <ModalUpdateAnime />
      <ModalUpdateEntries />
      <ModalDelete />
      <SignUp />
      <Login />
    </div>
  );
}
