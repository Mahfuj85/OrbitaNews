import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaComments } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import moment from "moment";
import Cookies from "js-cookie";
import Loading from "@/components/Loading";

const Comments = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [commentData, setCommentData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/comments/all-comments`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCommentData(data.comments || []))
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, [refreshData]);

  const handleDelete = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/comments/delete/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    if (response) {
      //setRefreshData(!refreshData);
      setRefreshData((prev) => !prev);
      showToast("success", "Data deleted");
    } else {
      showToast("error", "Data not deleted");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex items-center gap-2 text-2xl font-bold text-primary border-b pb-3 mb-8">
        <FaComments />
        <h4>Showing All Comments</h4>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>News</TableHead>
                <TableHead>Commented By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commentData && commentData.length > 0 ? (
                commentData.map((comment) => (
                  <TableRow key={comment._id}>
                    <TableCell>{comment?.newsId?.title}</TableCell>
                    <TableCell>{comment?.user?.name}</TableCell>
                    <TableCell>
                      {moment(comment?.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>{comment?.comment}</TableCell>
                    <TableCell className="flex justify-center items-center gap-3">
                      <Button
                        onClick={() => handleDelete(comment._id)}
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

export default Comments;
