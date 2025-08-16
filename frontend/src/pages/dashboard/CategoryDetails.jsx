import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
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
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { showToast } from "@/helpers/showToast";
import { TbCategory } from "react-icons/tb";
import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteName";
import Cookies from "js-cookie";
import Loading from "@/components/Loading";

const CategoryDetails = () => {
  const [categories, setCategories] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/category/all`)
      .then((res) => res.json())
      .then((data) => setCategories(data?.category || []))
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  //  console.log(categories);

  const handleDelete = (id) => {
    const response = fetch(
      `${import.meta.env.VITE_BACKEND_URL}/category/delete/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Data deleted");
    } else {
      showToast("error", "Data not deleted");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex items-center gap-2 text-2xl font-bold text-primary border-b pb-3 mb-8">
        <TbCategory />
        <h4>Showing All Categories</h4>
      </div>
      <Card>
        <CardHeader>
          <div>
            <Button>
              <Link to={RouteAddCategory}>Add Category</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="flex justify-center items-center gap-3">
                      <Button
                        variant="outline"
                        className="hover:bg-primary hover:text-white"
                        asChild
                      >
                        <Link to={RouteEditCategory(category._id)}>
                          <FaEdit />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => handleDelete(category._id)}
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
                  <TableCell colSpan="3">Data not found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryDetails;
