import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { FilePlusCorner, Trash2 } from 'lucide-react';

export function ModalEntries({ isOpen, onClose, animeName, children }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl lg:max-w-6xl overflow-hidden">     
        <DialogHeader>
          <DialogTitle className="text-xl italic">{animeName}</DialogTitle>
          <DialogDescription>28 Entries</DialogDescription>
        </DialogHeader>
        <div className="flex gap-3">
          <Button 
            variant="secondary"
            size="lg"
          >
            <FilePlusCorner className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-1 max-h-[60vh] min-h-[30vh] overflow-x-auto">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}