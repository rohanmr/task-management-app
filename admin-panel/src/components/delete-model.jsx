import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

export function DeleteModel({
  title,
  description,
  actionId,
  icon,
  onDelete,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await onDelete(actionId);

      if (res?.data?.success) {
        toast.success(res.data.msg);
        onSuccess?.(actionId);
        setOpen(false);
      } else {
        toast.error(res?.data?.msg || "Delete failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="cursor-pointer hover:bg-red-700"
          variant="destructive"
        >
          {icon}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogDescription>{description}</DialogDescription>

        <DialogFooter>
          <Button
            className={"cursor-pointer"}
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            className="cursor-pointer hover:bg-red-700"
            disabled={loading}
            onClick={() => {
              handleDelete(actionId);
            }}
          >
            {loading ? (
              <>
                <Spinner className="size-4" />
                <span>Deleting...</span>
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
