import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import slugify from "slugify";
import { showToast } from "@/helpers/showToast";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const EditCategory = () => {
  const [categoryData, setCategoryData] = useState(null);
  const { category_id } = useParams();

  useEffect(() => {
    const token = Cookies.get("token");
    fetch(`${import.meta.env.VITE_BACKEND_URL}/category/show/${category_id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`, // Example usage (if your backend expects it)
      },
    })
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) => setCategoryData(data.category || null))
      .catch(console.error);
  }, []);

  //  console.log(categoryData);

  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long."),
    slug: z.string().min(3, "Slug must be at least 3 characters long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const categoryName = form.watch("name");
  useEffect(() => {
    if (categoryName) {
      const slug = slugify(categoryName, { lower: true });
      form.setValue("slug", slug);
    }
  }, [categoryName, form]);

  useEffect(() => {
    if (categoryData) {
      form.setValue("name", categoryData.name);
      form.setValue("slug", categoryData.slug);
    }
  }, [categoryData, form]);

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/category/update/${category_id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      Cookies.get("token");
      if (!response.ok) {
        return showToast("error", data.message);
      }

      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div>
      <Card className="pt-5 max-w-screen-md mx-auto">
        <div className="flex justify-center mb-6">
          <h2 className="text-3xl font-circular-web font-semibold text-primary">
            Edit category
          </h2>
        </div>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Update & Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCategory;
