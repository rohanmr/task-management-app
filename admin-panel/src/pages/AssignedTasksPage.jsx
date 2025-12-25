import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Trash2, User } from "lucide-react";
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

import { deleteAssignedTask, getAllAssignTask } from "@/api/taskAPI";

const ITEMS_PER_PAGE = 8;

const AssignedTasksPage = () => {
  const [loading, setLoading] = useState(false);
  const [userTaskList, setUserTaskList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalData = userTaskList.length;
  const totalPages = Math.ceil(totalData / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = userTaskList.slice(startIndex, endIndex);

  console.log(userTaskList);

  const fetchTasksOfUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllAssignTask();
      setUserTaskList(res.data.assignedTasks);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      setLoading(false);
    }
  };

  const handelDeleteSuccess = (deletedId) => {
    return setUserTaskList((prv) =>
      prv.filter((task) => task.id !== deletedId)
    );
  };

  useEffect(() => {
    fetchTasksOfUsers();
  }, []);

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>All Assigned Task List</CardTitle>
          <CardDescription>Users have assigned tasks</CardDescription>
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
                  <TableHead>User Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Task Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned By</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {currentData.map((item, i) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium max-w-56 truncate">
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
                    </TableCell>
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

                    <TableCell>{item.assignedBy.name}</TableCell>

                    <TableCell className={"flex justify-center"}>
                      <DeleteModel
                        title="Delete Task"
                        description="Do you want to delete your Assigned Task"
                        icon={<Trash2 />}
                        actionId={item.id}
                        onDelete={deleteAssignedTask}
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

export default AssignedTasksPage;
