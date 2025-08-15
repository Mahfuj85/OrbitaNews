import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
//import registerImage from "@/assets/images/RegisterImage.avif";
import { RouteIndex, RouteSignIn } from "@/helpers/RouteName";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "@/helpers/showToast";
import logo from "/images/logo-black.png";
import GoogleLogin from "@/components/ui/GoogleLogin";

const SignUp = () => {
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long."),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z
      .string()
      .refine(
        (data) => data.password === data.confirmPassword,
        "Password doesn't match!"
      ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      navigate(RouteSignIn);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[450px] p-5">
        <Link to={RouteIndex} className="flex justify-center items-center mb-6">
          <img src={logo} alt="Logo" width={120} />
        </Link>
        <h2 className="text-2xl font-bold text-center mb-6">
          Hey there! <span className="animate-waving-hand">👋🏾</span>
        </h2>
        <p className="text-center mb-6">Create your account here</p>

        <div>
          <GoogleLogin />
          <div className="border my-5 flex justify-center items-center">
            <span className="absolute bg-white text-sm">Or</span>
          </div>
        </div>

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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password again"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <div className="flex justify-center items-center gap-1 mt-2">
                <p>Already have an account?</p>
                <Link
                  to={RouteSignIn}
                  className="text-blue-500 font-semibold hover:underline"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>

    /* RIGHT SIDE 
      <div className="hidden md:block w-full bg-gray-800">
        <img
          src={registerImage}
          alt="Login to Account"
          className="h-full w-full object-cover"
        />
      </div> */
  );
};

export default SignUp;
