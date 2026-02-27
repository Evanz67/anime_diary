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
import { useAuth } from "@/backend/auth_provider"
import { useState } from "react"

export function Login({ isOpen, onClose }) {
  const { register, handleSubmit, reset } = useForm()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await login(data.email, data.password)
    } catch (error) {
      alert("Error logging in user: " + error.message)
    } finally {
      setLoading(false)
      reset()
      onClose()
    }   
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm lg:max-w-md ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Login</DialogTitle>
        </DialogHeader>     
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel className="italic">Email</FieldLabel>
            <Input {...register("email")} placeholder="Enter email address" required />
          </Field>
          <Field>
            <FieldLabel className="italic">Password</FieldLabel>
            <Input {...register("password")} placeholder="Enter password" type="password" required />
          </Field>
          <div className="flex justify-center">
            <Button type="submit" variant="secondary" size="lg" disabled={loading}>
              {loading ? (
                <div>
                  Logging in...
                </div>
              ): (
                <div>
                  Login
                </div>
              )}
            </Button>
          </div>        
        </form>
      </DialogContent>
    </Dialog>
  );
}