'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/auth_provider';
import { useState } from 'react';
import { addUser } from '@/backend/firestore_database';
import { useModal } from '@/context/modal_provider';

export function SignUp() {
  const { register, handleSubmit, reset, watch } = useForm();
  const { signUp } = useAuth();
  const { closeModal, modalState } = useModal();
  const [loading, setLoading] = useState(false);

  const password = watch('password');
  const isPasswordValid = password?.length >= 6;

  const onSubmit = async (data) => {
    if (!isPasswordValid) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    try {
      setLoading(true);
      const userInfo = await signUp(data.email, data.password);
      const user = userInfo.user;
      await addUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        uid: user.uid,
      });
      alert(`User "${data.email}" signed up successfully!`);
    } catch (error) {
      alert('Error signing up user: ' + error.message);
    } finally {
      setLoading(false);
      reset();
      closeModal();
    }
  };

  return (
    <Dialog open={modalState.includes('signup')} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-sm lg:max-w-md ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Sign Up
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel className="italic">First Name</FieldLabel>
            <Input
              {...register('firstName')}
              placeholder="Enter first name"
              required
            />
          </Field>
          <Field>
            <FieldLabel className="italic">Last Name</FieldLabel>
            <Input
              {...register('lastName')}
              placeholder="Enter last name"
              required
            />
          </Field>
          <Field>
            <FieldLabel className="italic">Email</FieldLabel>
            <Input
              {...register('email')}
              placeholder="Enter email address"
              type="email"
              required
            />
          </Field>
          <Field>
            <FieldLabel className="italic">Password</FieldLabel>
            <Input
              {...register('password')}
              placeholder="Enter password"
              type="password"
              required
            />
          </Field>
          {password && (isPasswordValid ? 
            null : (
              <p className="text-red-500 text-sm">
                Password must be at least 6 characters long.
              </p>
            ))}
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={loading}
            >
              {loading ? <div>Signing Up...</div> : <div>Sign Up</div>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
