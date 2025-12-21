import { getAllTasks } from "@/api/taskAPI";
import React, { useEffect, useState } from "react";
import { deleteTask } from "@/api/taskAPI";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";

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
import { EditModel } from "@/components/edit-model";
import { DeleteModel } from "@/components/delete-model";

const ITEMS_PER_PAGE = 6;

const TaskListPage = () => {
  const [loading, setLoaing] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const toLocalISODate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    const offset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - offset).toISOString().split("T")[0];
  };

  useEffect(() => {
    fetchTasks();
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
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.priority}</TableCell>
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
                          <DropdownMenuItem>
                            <Avatar className="cursor-pointer">
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                              <span className="truncate font-medium">
                                Rohan Maindarkar
                              </span>
                              <span className="text-muted-foreground truncate text-xs">
                                rohan@gmail.com
                              </span>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell> {toLocalISODate(item.startDate)}</TableCell>
                    <TableCell>{toLocalISODate(item.endDate)}</TableCell>

                    <TableCell className={"space-x-2 flex"}>
                      <EditModel
                        title="Edit Task"
                        description="Make changes in your task here."
                        icon={<PencilIcon />}
                        taskId={item.id}
                      />
                      <DeleteModel
                        title="Delete Task"
                        description="Do you want to delete your task"
                        icon={<Trash2 />}
                        taskId={item.id}
                        onDelete={deleteTask}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <div className="flex items-center justify-between px-2 py-3">
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
