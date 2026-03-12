"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

export function ConfirmationPopup({ isOpen, onClose, name, confirmDelete, loading }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl lg:max-w-2xl ">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">Confirm Delete</DialogTitle>
        </DialogHeader>     
        <div className="text-center">
          Are you sure you want to delete "<span className="italic underline">{name}</span>" and all of its entries?
        </div>
        {!loading ? (
          <div className="flex justify-center gap-4 mt-4">
            <Button 
              variant="secondary"
              size="lg"
              onClick={onClose}
            >
              No
            </Button>
            <Button 
              variant="destructive"
              size="lg"
              onClick={confirmDelete}
            >
              Yes
            </Button>
        </div>
        ) : (
          <div className="flex justify-center gap-4 mt-4">
            <p>Deleting...</p>
        </div>
        )}
        
      </DialogContent>
     </Dialog>
  );
}
