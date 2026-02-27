"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"

export function ModalAddAnime({ isOpen, onClose }) {
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    alert(`Anime "${data.name}" added!`)
    reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl lg:max-w-2xl ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Anime Series</DialogTitle>
        </DialogHeader>     
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <Input {...register("name")} placeholder="Enter anime series name" />
          </Field>
          <div className="flex justify-center">
            <Button type="submit" variant="secondary" size="lg">Add</Button>
          </div>        
        </form>
      </DialogContent>
    </Dialog>
  );
}
  
