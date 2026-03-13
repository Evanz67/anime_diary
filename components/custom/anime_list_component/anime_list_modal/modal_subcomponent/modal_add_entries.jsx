"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useAuth } from "@/backend/auth_provider";
import { addEntry } from "@/backend/firestore_database";
import { useState, useEffect } from "react";

export function ModalAddEntries({ isOpen, onClose, seriesId, handleNewEntry }) {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (
      data.type !== "TV" &&
      data.type !== "OVA" &&
      data.type !== "ONA" &&
      data.type !== "Movie" &&
      data.type !== ""
    ) {
      alert("Please enter a valid type (TV, OVA, ONA, or Movie).");
      return;
    }
    const newData = { ...data, episode: parseInt(data.episode) };
    try {
      setLoading(true);
      const entryRef = await addEntry(user, seriesId, newData);
      handleNewEntry({ id: entryRef[0], ...newData }, entryRef[1]);
    } catch (error) {
      alert("Error adding entry: " + error.message);
    } finally {
      setLoading(false);
      reset();
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen === false) {
      reset();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl lg:max-w-2xl ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add Anime Entry
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel className="italic">Entry Name</FieldLabel>
            <Input
              {...register("name")}
              placeholder="Enter an entry name"
              required
            />
          </Field>
          <Field>
            <FieldLabel className="italic"># of Episode</FieldLabel>
            <Input
              type="number"
              step="1"
              min="1"
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              {...register("episode")}
              placeholder="Enter number of episodes"
              required
            />
          </Field>
          <Field>
            <FieldLabel className="italic">Type</FieldLabel>
            <Input
              {...register("type")}
              placeholder="Enter type (e.g. TV, OVA, ONA, Movie)"
              required
            />
          </Field>
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={loading}
            >
              {loading ? <div>Adding entry...</div> : <div>Add</div>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
