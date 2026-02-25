"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"

export function SignUp({ isOpen, onClose }) {
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    alert(`User "${data.email}" signed up!`)
    reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm lg:max-w-md ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Sign Up</DialogTitle>
        </DialogHeader>     
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel className="italic">Email</FieldLabel>
            <Input {...register("email")} placeholder="Enter email address" />
          </Field>
          <Field>
            <FieldLabel className="italic">Password</FieldLabel>
            <Input {...register("password")} placeholder="Enter password" />
          </Field>
          <div className="flex justify-center">
            <Button type="submit" variant="secondary" size="lg">Register</Button>
          </div>        
        </form>
      </DialogContent>
    </Dialog>
  );
}