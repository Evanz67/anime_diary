import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function ModalAddAnime({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl lg:max-w-2xl overflow-hidden">     
        
      </DialogContent>
    </Dialog>
  );
}
  
