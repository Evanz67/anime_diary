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
import { useState } from "react"
import { addSeries } from "@/backend/firestore_database"
import { useAuth } from "@/backend/auth_provider"

export function ModalAddAnime({ isOpen, onClose, handleNewSeries }) {
  const { register, handleSubmit, reset } = useForm()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    if (user) {
      try {
        setLoading(true)
        const seriesId = await addSeries(user, data)
        handleNewSeries({id: seriesId, entries: 0, ...data})
      } catch (error) {
        alert("Error adding series: " + error.message)
      } finally {
        setLoading(false)
        reset()
        onClose()
      }  
    } else {
      alert("Please login to add a series.")
    }   
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl lg:max-w-2xl ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Anime Series</DialogTitle>
        </DialogHeader>     
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <Input {...register("name")} placeholder="Enter anime series name" required />
          </Field>
          <div className="flex justify-center">
            <Button type="submit" variant="secondary" size="lg" disabled={loading}>
              {loading ? (
                <div>
                  Adding series...
                </div>
              ): (
                <div>
                  Add
                </div>
              )}
            </Button>
          </div>        
        </form>
      </DialogContent>
    </Dialog>
  );
}
  
