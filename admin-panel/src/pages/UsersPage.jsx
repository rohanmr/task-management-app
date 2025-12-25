import React, { useEffect, useState } from "react";
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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { DeleteModel } from "@/components/delete-model";
import { deleteUser, getAllUsers } from "@/api/userApi";
import { EditUserModel } from "@/components/edit-user-model";

const ITEMS_PER_PAGE = 8;

const UserPage = () => {
  const [loading, setLoaing] = useState(false);
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalData = userList.length;
  const totalPages = Math.ceil(totalData / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = userList.slice(startIndex, endIndex);

  const fetchUsers = async () => {
    setLoaing(true);
    try {
      const res = await getAllUsers();
      setUserList(res.data.users);
      setLoaing(false);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      setLoaing(false);
    }
  };

  const handelDeleteSuccess = (deletedId) => {
    return setUserList((prv) => prv.filter((user) => user.id !== deletedId));
  };

  const handelUpdateSuccess = (updatedUser) => {
    return setUserList((prev) =>
      prev.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
  };

  useEffect(() => {
    fetchUsers();
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Contact No</TableHead>
                  <TableHead>Address</TableHead>
                  {/* <TableHead>Task Status</TableHead> */}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {currentData.map((item, i) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium max-w-56 truncate">
                      <span
                        title={item.name}
                        className="flex items-center gap-2"
                      >
                        <User className="size-5" />
                        {item.name}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-60 truncate">
                      <span title={item.email}>{item.email}</span>
                    </TableCell>
                    <TableCell>{item.contactNumber || 123456789}</TableCell>
                    <TableCell
                      title={item.address}
                      className="max-w-60 truncate"
                    >
                      {item.address}
                    </TableCell>
                    {/* <TableCell>
                      <Button
                        size="sm"
                        className={"cursor-pointer"}
                        variant="outline"
                      >
                        Unassign
                      </Button>
                    </TableCell> */}
                    <TableCell className={"space-x-2 flex"}>
                      <EditUserModel
                        icon={<PencilIcon />}
                        discription="Make changes in your user here."
                        userId={item.id}
                        title="Edit User"
                        name={item.name}
                        email={item.email}
                        contactNumber={item.contactNumber}
                        address={item.address}
                        onSuccess={handelUpdateSuccess}
                      />
                      <DeleteModel
                        title="Delete Task"
                        description="Do you want to delete your user"
                        icon={<Trash2 />}
                        actionId={item.id}
                        onDelete={deleteUser}
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

export default UserPage;
