import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type DeleteWarningModalProps = {
  onClose: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
};

export default function DeleteWarningModal({
  onClose,
  onConfirm,
  isLoading = false,
}: DeleteWarningModalProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="pt-6 max-w-sm">
        <div className="space-y-4">
          <Label className="text-lg font-semibold ">
            Are you sure you want to delete this sector?
          </Label>
          <p className="text-sm text-black">
            Deleting this sector will unlink it from all associated data. This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
