import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PencilIcon, Trash2, User } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { DeleteModel } from "@/components/delete-model";

import { deleteAssignedTask, getTaskByUser } from "@/api/taskAPI";
import { userContext } from "@/context/userProvider";
import { StatusUpadteModel } from "@/components/status-update-model";

const ITEMS_PER_PAGE = 8;

const AssignedTasksToUserPage = () => {
  const [loading, setLoading] = useState(false);
  const [userTaskList, setUserTaskList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(userContext);
  const totalData = userTaskList.length;
  const totalPages = Math.ceil(totalData / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = userTaskList.slice(startIndex, endIndex);

  const fetchTasksOfUser = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const res = await getTaskByUser(user?.id);

      setUserTaskList(res.data.assignedTasks);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      setLoading(false);
    }
  };

  const handelUpdateSuccess = (updatedTask) => {
    return setUserTaskList((prev) =>
      prev.map((item) =>
        item.task.id === updatedTask.id
          ? {
              ...item,
              task: {
                ...item.task,
                ...updatedTask,
              },
            }
          : item
      )
    );
  };
  const toLocalISODate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    const offset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - offset).toISOString().split("T")[0];
  };

  useEffect(() => {
    fetchTasksOfUser();
  }, [user?.id]);

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>All Assigned Task List</CardTitle>
          <CardDescription>Your assigned Tasks</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 pb-0">
          {loading ? (
            <div className="flex justify-center items-center gap-5">
              {loading && <Spinner className="size-7" />}
            </div>
          ) : (
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  {/* <TableHead>User Name</TableHead>
                  <TableHead>Email</TableHead> */}
                  <TableHead>Task Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>

                  <TableHead>Assigned By</TableHead>
                  <TableHead className={"text-center"}>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {currentData.map((item, i) => (
                  <TableRow key={item.id}>
                    {/* <TableCell className="font-medium max-w-56 truncate">
                      <span
                        title={item.user.name}
                        className="flex items-center gap-2"
                      >
                        <User className="size-5" />
                        {item.user.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span title={item.user.email}>{item.user.email}</span>
                    </TableCell> */}
                    <TableCell className="max-w-60 truncate">
                      {item.task.title}
                    </TableCell>
                    <TableCell>
                      {item.task.status === "Pending" ? (
                        <Badge
                          variant="secondary"
                          className="bg-gray-500 text-white dark:bg-gray-300"
                        >
                          {item.task.status}
                        </Badge>
                      ) : item.task.status === "InProgress" ? (
                        <Badge
                          variant="secondary"
                          className="bg-yellow-500 text-white dark:bg-yellow-600"
                        >
                          {item.task.status}
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-green-500 text-white dark:bg-green-600"
                        >
                          {item.task.status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.task.priority === "Low" ? (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-700"
                        >
                          {item.task.priority}
                        </Badge>
                      ) : item.task.priority === "Medium" ? (
                        <Badge
                          variant="secondary"
                          className="bg-yellow-100 text-yellow-700"
                        >
                          {item.task.priority}
                        </Badge>
                      ) : item.task.priority === "High" ? (
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-700"
                        >
                          {item.task.priority}
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-red-100 text-red-700"
                        >
                          {item.task.priority}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{toLocalISODate(item.task.startDate)}</TableCell>
                    <TableCell>{toLocalISODate(item.task.endDate)}</TableCell>

                    <TableCell>{item.assignedBy.name}</TableCell>

                    <TableCell className={"flex justify-center"}>
                      {/* <Button
                        size="sm"
                        className="cursor-pointer"
                        variant="outline"
                      >
                        <PencilIcon />
                      </Button> */}
                      <StatusUpadteModel
                        status={item.task.status}
                        title="Update Task Status"
                        onSuccess={handelUpdateSuccess}
                        taskId={item.task.id}
                        existingTitle={item.task.title}
                        icon={<PencilIcon />}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <div className="flex items-center justify-between px-2 pt-1">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>

            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AssignedTasksToUserPage;
