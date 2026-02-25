"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"

export function ModalAddEntries({ isOpen, onClose }) {
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
          <DialogTitle className="text-xl font-bold">Add Anime Entry</DialogTitle>
        </DialogHeader>     
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel className="italic">Entry Name</FieldLabel>
            <Input {...register("name")} placeholder="Enter an entry name" />
          </Field>
          <Field>
            <FieldLabel className="italic"># of Episode</FieldLabel>
            <Input {...register("episode")} placeholder="Enter number of episodes" />
          </Field>
          <Field>
            <FieldLabel className="italic">Type</FieldLabel>
            <Input {...register("type")} placeholder="Enter type (e.g. TV, OVA, Movie)" />
          </Field>
          <div className="flex justify-center">
            <Button type="submit" variant="secondary" size="lg">Add</Button>
          </div>        
        </form>
      </DialogContent>
    </Dialog>
  );
}