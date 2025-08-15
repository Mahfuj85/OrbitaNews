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
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
//import loginImage from "@/assets/images/loginImage.avif";
import { RouteIndex, RouteSignUp } from "@/helpers/RouteName";
import { Link, useNavigate } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import GoogleLogin from "@/components/ui/GoogleLogin";
import logo from "/images/logo-black.png";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, "Password field is required."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch(`${getEnv("VITE_BACKEND_URL")}/auth/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispatch(setUser(data.user));
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div className="flex">
      {/* LEFT SIDE  */}
      <div className="flex justify-center items-center h-screen w-screen">
        <Card className="w-[450px] p-5">
          <Link
            to={RouteIndex}
            className="flex justify-center items-center mb-6"
          >
            <img src={logo} alt="Logo" width={120} />
          </Link>
          <h2 className="text-2xl font-bold text-center mb-6">
            Hey there! <span className="animate-waving-hand">👋🏾</span>
          </h2>
          <p className="text-center mb-6">
            Enter your email and password to Login
          </p>

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
              <div className="mt-5">
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
                <div className="flex justify-center items-center gap-1 mt-2">
                  <p>Don't have an account?</p>
                  <Link
                    to={RouteSignUp}
                    className="text-blue-500 font-semibold hover:underline"
                  >
                    Create One
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </Card>
      </div>

      {/* RIGHT SIDE  */}
      {/* <div className="hidden md:block w-full bg-gray-800">
        <img
          src={loginImage}
          alt="Login to Account"
          className="h-full w-full object-cover"
        />
      </div> */}
    </div>
  );
};

export default SignIn;
