import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import moment from "moment";
import { useSelector } from "react-redux";
import { TiNews } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { RouteAddNews, RouteDashboardEditNews } from "@/helpers/RouteName";
import Cookies from "js-cookie";
import Loading from "@/components/Loading";

const AuthorNews = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newsData, setNewsData] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const authorId = user?.user?._id;
  //  console.log(authorId);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/news/author/${authorId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setNewsData(data?.news || []))
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, [refreshData]);

  // console.log(newsData);

  const handleDelete = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/news/delete/${id}`,
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
        <TiNews />
        <h4>Showing All News</h4>
      </div>
      <Card>
        <CardHeader>
          <div>
            <Button>
              <Link to={RouteAddNews}>Create News</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsData && newsData.length > 0 ? (
                newsData.map((news) => (
                  <TableRow key={news._id}>
                    <TableCell>{news?.title}</TableCell>
                    <TableCell>
                      <img
                        src={news?.featuredImage}
                        alt=""
                        className="size-12 rounded-full"
                      />
                    </TableCell>
                    <TableCell>
                      {moment(news?.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell className="flex justify-center items-center gap-3">
                      <Button
                        onClick={() => handleDelete(news._id)}
                        variant="outline"
                        className="hover:bg-red-500 hover:text-white"
                      >
                        <RiDeleteBin6Line />
                      </Button>
                      <Button
                        onClick={() =>
                          navigate(RouteDashboardEditNews(news._id))
                        }
                        variant="outline"
                        className="hover:bg-blue-500 hover:text-white"
                      >
                        <CiEdit />
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

export default AuthorNews;
