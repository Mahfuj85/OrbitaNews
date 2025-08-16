import React, { useState } from "react";
import { FaComments } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { showToast } from "@/helpers/showToast";
import { Textarea } from "./ui/textarea";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RouteSignIn } from "@/helpers/RouteName";
import CommentList from "./CommentList";
import Cookies from "js-cookie";

const Comment = ({ props }) => {
  const [newComment, setNewComment] = useState();
  const user = useSelector((state) => state.user);

  const formSchema = z.object({
    comment: z.string().min(3, "Comment must be at least 3 characters long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values) {
    try {
      const newValues = {
        ...values,
        newsId: props.newsId,
        user: user.user._id,
      };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/comments/add`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newValues),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      Cookies.get("token");
      setNewComment(data.comment);
      form.reset();
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div>
      <h4 className="flex items-center gap-2 text-2xl font-bold">
        <FaComments className="text-primary" />
        <span>Comments</span>
      </h4>

      {user && user.isLoggedIn ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your comment ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      ) : (
        <>
          <Link
            to={RouteSignIn}
            className="mt-2 underline hover:text-secondary
          "
          >
            Sign in to comment
          </Link>
        </>
      )}

      <div className="mt-5 pt-5 border-t">
        <CommentList props={{ newsId: props.newsId, newComment }} />
      </div>
    </div>
  );
};

export default Comment;
