"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function Modal({ isOpen, onClose, animeName, children }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl lg:max-w-6xl overflow-hidden">     
        <DialogHeader>
          <DialogTitle className="text-xl italic">{animeName}</DialogTitle>
          <DialogDescription>28 Entries</DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] min-h-[30vh] overflow-x-auto">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}