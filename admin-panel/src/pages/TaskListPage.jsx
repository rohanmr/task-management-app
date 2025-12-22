import { assignTask, getAllTasks, updateTask } from "@/api/taskAPI";
import React, { useContext, useEffect, useState } from "react";
import { deleteTask } from "@/api/taskAPI";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Spinner } from "@/components/ui/spinner";
import { toast } from "react-toastify";

import { PencilIcon, Trash2, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { EditTaskModel } from "@/components/edit-task-model";
import { DeleteModel } from "@/components/delete-model";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/user-avatar";
import { userContext } from "@/context/userProvider";

const ITEMS_PER_PAGE = 8;

const TaskListPage = () => {
  const [loading, setLoaing] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { allUsers, fetchAllUsers } = useContext(userContext);

  const totalData = taskList.length;
  const totalPages = Math.ceil(totalData / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = taskList.slice(startIndex, endIndex);

  const fetchTasks = async () => {
    setLoaing(true);
    try {
      const res = await getAllTasks();
      setTaskList(res.data.tasks);
      setLoaing(false);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      setLoaing(false);
    }
  };

  const handelDeleteSuccess = (deletedId) => {
    return setTaskList((prv) => prv.filter((task) => task.id !== deletedId));
  };

  const handelUpdateSuccess = (updatedTask) => {
    return setTaskList((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const handleAssignUser = async (userId, taskId) => {
    const data = {
      taskId: taskId,
      userId: userId,
    };

    try {
      const res = await assignTask(data);

      if (res.data.success) {
        toast.success(res.data.msg);
      } else {
        toast.error(res.data.msg || "Failed to assign task");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const toLocalISODate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    const offset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - offset).toISOString().split("T")[0];
  };

  useEffect(() => {
    fetchTasks();
    fetchAllUsers();
  }, []);

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>All Task List</CardTitle>
          <CardDescription>Tasks Creatd by Admin</CardDescription>
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
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assign To</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>

                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {currentData.map((item, i) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium max-w-56 truncate">
                      <span title={item.title}>{item.title}</span>
                    </TableCell>
                    <TableCell className="max-w-60 truncate">
                      <span title={item.description}>{item.description}</span>
                    </TableCell>
                    <TableCell>
                      {item.status === "Pending" ? (
                        <Badge
                          variant="secondary"
                          className="bg-gray-500 text-white dark:bg-gray-300"
                        >
                          {item.status}
                        </Badge>
                      ) : item.status === "InProgress" ? (
                        <Badge
                          variant="secondary"
                          className="bg-yellow-500 text-white dark:bg-yellow-600"
                        >
                          {item.status}
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-green-500 text-white dark:bg-green-600"
                        >
                          {item.status}
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      {item.priority === "Low" ? (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-700"
                        >
                          {item.priority}
                        </Badge>
                      ) : item.priority === "Medium" ? (
                        <Badge
                          variant="secondary"
                          className="bg-yellow-100 text-yellow-700"
                        >
                          {item.priority}
                        </Badge>
                      ) : item.priority === "High" ? (
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-700"
                        >
                          {item.priority}
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-red-100 text-red-700"
                        >
                          {item.priority}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className={"cursor-pointer"}
                          >
                            Assign <EllipsisVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel
                            className={"font-medium text-center"}
                          >
                            Assign Task To User
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {allUsers.map((user) => (
                            <DropdownMenuItem
                              key={user.id}
                              onClick={() => handleAssignUser(user.id, item.id)}
                            >
                              <UserAvatar email={user.email} name={user.name} />
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell> {toLocalISODate(item.startDate)}</TableCell>
                    <TableCell>{toLocalISODate(item.endDate)}</TableCell>

                    <TableCell className={"space-x-2 flex"}>
                      <EditTaskModel
                        title="Edit Task"
                        icon={<PencilIcon />}
                        taskId={item.id}
                        existingTitle={item.title}
                        startDate={toLocalISODate(item.startDate)}
                        endDate={toLocalISODate(item.endDate)}
                        priority={item.priority}
                        status={item.status}
                        onSuccess={handelUpdateSuccess}
                      />
                      <DeleteModel
                        title="Delete Task"
                        description="Do you want to delete your task"
                        icon={<Trash2 />}
                        actionId={item.id}
                        onDelete={deleteTask}
                        onSuccess={handelDeleteSuccess}
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

export default TaskListPage;
