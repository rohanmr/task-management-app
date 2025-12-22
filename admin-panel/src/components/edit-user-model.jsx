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

import { useForm } from "react-hook-form";

import { Spinner } from "@/components/ui/spinner";
import { updateUser } from "@/api/userApi";

export function EditUserModel({
  title,
  name,
  email,
  address,
  contactNumber,
  userId,
  discription,
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
      name: name,
      email: email,
      contactNumber: contactNumber,
      address: address,
    },
  });

  const handelUpdateUserForm = async (data) => {
    setLoading(true);

    try {
      const res = await updateUser(userId, data);

      if (res.data.success) {
        toast.success(res.data.msg);
        onSuccess?.({
          id: userId,
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
    reset();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="cursor-pointer" variant="outline">
          {icon}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit(handelUpdateUserForm)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="font-medium text-base py-3">
              {discription}
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4">
            <TextInput
              name="name"
              label="Name"
              placeholder="Enter your name"
              control={control}
            />
            <TextInput
              name="email"
              label="Email"
              placeholder="Enter Your email"
              control={control}
            />
            <TextInput
              name="contactNumber"
              label="Contact Number"
              placeholder="Enter your number"
              control={control}
            />
            <TextInput
              name="address"
              label="Address"
              placeholder="Enter your Address"
              control={control}
            />
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
