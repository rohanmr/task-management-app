import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Controller, useForm } from "react-hook-form";

import { useState } from "react";
import { toast } from "react-toastify";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import { createTask } from "@/api/taskAPI";

const CreateTaskPage = () => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
      startDate: "",
      endDate: "",
    },
  });
  const statusOption = ["Pending", "InProgress", "Completed"];
  const priorityOprion = ["Low", "Medium", "High", "Critical"];

  const handelCreateTaskForm = async (data) => {
    setLoading(true);

    try {
      const res = await createTask(data);

      if (res.data.success) {
        toast.success(res.data.msg);
        reset();
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <Card className="w-2xl overflow-hidden p-0">
          <CardContent className=" grid p-0 md:grid-cols-1">
            <form
              className="p-6 md:p-8"
              onSubmit={handleSubmit(handelCreateTaskForm)}
            >
              <FieldGroup className={"gap-5"}>
                <div className="flex flex-col items-start  text-center">
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <Spinner className="size-6" />
                      <h1 className="text-2xl font-bold">Creating Task...</h1>
                    </div>
                  ) : (
                    <h1 className="text-2xl font-bold">
                      Create your Project Task
                    </h1>
                  )}

                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your task detail below to create your task
                  </p>
                </div>
                <TextInput
                  name="title"
                  label="Title"
                  placeholder="Enter task title"
                  control={control}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                      <Textarea
                        {...field}
                        id={field.name}
                        placeholder="Enter task description"
                        className="resize-none"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <div className="grid grid-cols-2 gap-5">
                  <SelectInput
                    control={control}
                    label="Status"
                    name="status"
                    placeholder="Select Status"
                    options={statusOption}
                  />
                  <SelectInput
                    control={control}
                    label="Priority"
                    name="priority"
                    placeholder="Select Priority"
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

                <Button
                  className="cursor-pointer"
                  disabled={loading}
                  type="submit"
                >
                  Create Task
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CreateTaskPage;
