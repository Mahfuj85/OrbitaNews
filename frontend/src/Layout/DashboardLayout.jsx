import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/ui/sidebar";
import Dashboard from "@/pages/dashboard/Dashboard";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <SidebarTrigger className="md:hidden" />
        <Dashboard />
        <main className="flex-full">
          <div className="w-full min-h-[calc(100vh-40px)] pt-40 md:pt-28 pb-28 px-10">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
