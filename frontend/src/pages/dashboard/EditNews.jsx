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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Dropzone from "react-dropzone";
import Editor from "@/components/Editor";
import { useNavigate, useParams } from "react-router-dom";
import { RouteNews } from "@/helpers/RouteName";
import { decode } from "entities";

const EditNews = () => {
  const [categories, setCategories] = useState([]);
  const [newsData, setNewsData] = useState(null);
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
  const { newsId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/category/all`)
      .then((res) => res.json())
      .then((data) => setCategories(data.category || []))
      .catch(console.error);
  }, []);

  //  console.log(categories);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/news/edit/${newsId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      // .then((data) => console.log(data.news))
      .then((data) => setNewsData(data.news || null))
      .catch(console.error);
  }, []);
  //  console.log(newsData);

  const formSchema = z.object({
    category: z.string().min(3, "Category must be at least 3 characters long."),
    title: z.string().min(3, "Title must be at least 3 characters long."),
    slug: z.string().min(3, "Slug must be at least 3 characters long."),
    newsContent: z
      .string()
      .min(3, "News content must be at least 3 characters long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      newsContent: "",
    },
  });

  useEffect(() => {
    if (newsData) {
      setFilePreview(newsData.featuredImage);
      form.setValue("category", newsData.category._id);
      form.setValue("title", newsData.title);
      form.setValue("slug", newsData.slug);
      form.setValue("newsContent", decode(newsData.newsContent));
    }
  }, [newsData, form]);

  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    //console.log(data);
    form.setValue("newsContent", data);
  };

  const newsTitle = form.watch("title");
  useEffect(() => {
    if (newsTitle) {
      const slug = slugify(newsTitle, { lower: true });
      form.setValue("slug", slug);
    }
  }, [newsTitle, form]);

  async function onSubmit(values) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(values));

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/news/update/${newsId}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      form.reset();
      setFilePreview();
      setFile();
      navigate(RouteNews);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  const handleFileSelection = (files) => {
    // console.log(files);
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setFilePreview(preview);
  };

  // if (blogLoading) return <Loading />;

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 overflow-x-hidden">
      <Card className="pt-5">
        <div className="flex justify-center mb-6">
          <h2 className="text-3xl font-circular-web font-semibold text-primary">
            Edit your news
          </h2>
        </div>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories &&
                              categories.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter blog title" {...field} />
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
              <div className="mb-3">
                <span>Featured Image</span>
                <Dropzone
                  onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="flex justify-center items-center w-36 h-28 border-2 border-dashed rounded mt-2 cursor-pointer">
                        <img src={filePreview} />
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
              <div className="mb-3 ">
                <FormField
                  control={form.control}
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>News Content</FormLabel>
                      <FormControl>
                        <Editor
                          initialData={field.value}
                          onChange={handleEditorData}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full mt-8">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditNews;
