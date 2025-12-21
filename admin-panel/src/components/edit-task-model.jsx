import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";

import { FieldGroup } from "@/components/ui/field";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import { useForm } from "react-hook-form";
import { updateTask } from "@/api/taskAPI";
import { Spinner } from "@/components/ui/spinner";

export function EditTaskModel({
  title,
  startDate,
  endDate,
  existingTitle,
  taskId,
  priority,
  status,
  icon,
  onSuccess,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: status,
      priority: priority,
      startDate: startDate,
      endDate: endDate,
    },
  });
  const statusOption = ["Pending", "InProgress", "Completed"];
  const priorityOprion = ["Low", "Medium", "High", "Critical"];

  const handelUpdateTaskForm = async (data) => {
    setLoading(true);

    try {
      const res = await updateTask(taskId, data);

      if (res.data.success) {
        toast.success(res.data.msg);
        onSuccess?.({
          id: taskId,
          ...data,
        });
        setOpen(false);
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reset({
      status,
      priority,
      startDate,
      endDate,
    });
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="cursor-pointer" variant="outline">
          {icon}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit(handelUpdateTaskForm)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="font-medium text-base py-3">
              Title - {existingTitle}
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4">
            <div className="grid grid-cols-2 gap-5">
              <SelectInput
                control={control}
                label="Status"
                name="status"
                options={statusOption}
              />
              <SelectInput
                control={control}
                label="Priority"
                name="priority"
                options={priorityOprion}
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <TextInput
                name="startDate"
                label="Start Date"
                placeholder="dd/mm/yyyy"
                control={control}
              />
              <TextInput
                name="endDate"
                label="End Date"
                placeholder="dd/mm/yyyy"
                control={control}
              />
            </div>
          </FieldGroup>

          <DialogFooter className={"pt-6"}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" className="cursor-pointer">
              {loading ? (
                <>
                  <Spinner className="size-4" />
                  <span>Saving...</span>
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
