import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ImUsers } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { showToast } from "@/helpers/showToast";
import moment from "moment";
import userIcon from "/images/avatar.png";
import Cookies from "js-cookie";
import Loading from "@/components/Loading";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/users/all-users`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data?.users || []))
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  //  console.log(userData);

  const handleDelete = async (id) => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/delete-user/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.ok) {
        setUserData((prevUsers) => prevUsers.filter((user) => user._id !== id));
        showToast("success", "Data deleted");
      } else {
        showToast("error", "Data not deleted");
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Something went wrong");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex items-center gap-2 text-2xl font-bold text-primary border-b pb-3 mb-8">
        <ImUsers />
        <h4>Showing All Users</h4>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Registered At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData && userData.length > 0 ? (
                userData.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user?.role}</TableCell>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>
                      <img
                        src={user?.avatar || userIcon}
                        alt="user image"
                        className="w-12 h-12 rounded-full"
                      />
                    </TableCell>
                    <TableCell>
                      {moment(user?.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>{user?.user}</TableCell>
                    <TableCell className="flex justify-center items-center gap-3">
                      <Button
                        onClick={() => handleDelete(user._id)}
                        variant="outline"
                        className="hover:bg-red-500 hover:text-white"
                      >
                        <RiDeleteBin6Line />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="5">Data not found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
