import { useState } from 'react';
import { ModalSignUp } from '@/components/custom/account_component/modal_subcomponent/modal_signup';
import { ModalLogin } from '@/components/custom/account_component/modal_subcomponent/modal_login';
import { ModalProfile } from '@/components/custom/account_component/modal_subcomponent/modal_profile';
import { ModalChangeName } from '@/components/custom/account_component/modal_subcomponent/modal_change_name';
import { ModalForgotPassword } from '@/components/custom/account_component/modal_subcomponent/modal_forgot_password';
import { ModalChangePassword } from '@/components/custom/account_component/modal_subcomponent/modal_change_password';
import { ModalDeleteUser } from './modal_subcomponent/modal_delete_user';

export function AccountModal() {
  const [changeName, setChangeName] = useState({});
  return (
    <div>
      <ModalSignUp />
      <ModalLogin />
      <ModalProfile changeName={changeName} />
      <ModalChangeName setChangeName={setChangeName} />
      <ModalForgotPassword />
      <ModalChangePassword />
      <ModalDeleteUser />
    </div>
  );
}
