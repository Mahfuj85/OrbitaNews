import React, { useState } from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import HeadlinesTicker from "@/components/news/HeadlinesTicker";

const Layout = () => {
  return (
    <div>
      <Topbar />
      <Navbar />
      <HeadlinesTicker />
      <main className="w-full">
        <div className="w-full h-full pt-40 md:pt-28 pb-28 px-10">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
