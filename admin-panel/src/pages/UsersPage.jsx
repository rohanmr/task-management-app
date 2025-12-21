import { getAllTasks } from "@/api/taskAPI";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PencilIcon, Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
// import { EditModel } from "@/components/edit-task-model";
import { DeleteModel } from "@/components/delete-model";

const ITEMS_PER_PAGE = 6;

const UserPage = () => {
  const [loading, setLoaing] = useState(false);
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalData = userList.length;
  const totalPages = Math.ceil(totalData / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = userList.slice(startIndex, endIndex);

  const fetchTasks = async () => {
    setLoaing(true);
    try {
      const res = await getAllTasks();
      setUserList(res.data.tasks);
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
          <CardTitle>All User List</CardTitle>
          <CardDescription>Users in the TMS</CardDescription>
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
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Assign Task</TableHead>
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
                    <TableCell> {toLocalISODate(item.startDate)}</TableCell>
                    <TableCell>{toLocalISODate(item.endDate)}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className={"cursor-pointer"}
                        variant="outline"
                      >
                        Assign
                      </Button>
                    </TableCell>
                    <TableCell className={"space-x-2 flex"}>
                      <PencilIcon />
                      {/* <EditModel
                        title="Edit Task"
                        description="Make changes in your task here."
                        icon={<PencilIcon />}
                        taskId={item.id}
                      /> */}
                      <DeleteModel
                        title="Delete Task"
                        description="Do you want to delete your task"
                        icon={<Trash2 />}
                        taskId={item.id}
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

export default UserPage;
