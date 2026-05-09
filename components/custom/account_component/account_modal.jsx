import { useState } from 'react';
import { SignUp } from '@/components/custom/account_component/signup';
import { Login } from '@/components/custom/account_component/login';
import { Profile } from '@/components/custom/account_component/profile';
import { ModalChangeName } from '@/components/custom/account_component/modal_subcomponent/modal_change_name';
import { ModalForgotPassword } from '@/components/custom/account_component/modal_subcomponent/modal_forgot_password';
import { ModalChangePassword } from '@/components/custom/account_component/modal_subcomponent/modal_change_password';

export function AccountModal() {
  const [changeName, setChangeName] = useState({});
  return (
    <div>
      <SignUp />
      <Login />
      <Profile changeName={changeName} />
      <ModalChangeName setChangeName={setChangeName} />
      <ModalForgotPassword />
      <ModalChangePassword />
    </div>
  );
}
