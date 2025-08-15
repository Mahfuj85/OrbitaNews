import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from "/images/logo-black.png";
import {
  FaHome,
  FaComments,
  FaBlog,
  FaUser,
  FaDotCircle,
} from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import {
  RouteAdminNews,
  RouteAuthorNews,
  RouteCategoryDetails,
  RouteComments,
  RouteDashboardHome,
  RouteIndex,
  RouteNews,
  RouteUsers,
} from "@/helpers/RouteName";
import { useSelector } from "react-redux";
import { FaUserPen } from "react-icons/fa6";
import { TiNews } from "react-icons/ti";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/category/all`)
      .then((res) => res.json())
      .then((data) => setCategories(data.category || []))
      .catch(console.error);
  }, []);

  //  if (loading) return <Loading />;

  return (
    <Sidebar>
      <SidebarHeader className="bg-white">
        <Link to={RouteIndex}>
          <img src={logo} alt="Logo" width={120} />
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Link
                  to={RouteDashboardHome}
                  className="flex font-semibold items-center gap-2 text-base"
                >
                  <FaHome /> Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {user && user.isLoggedIn ? (
              <>
                {user.user.role === "admin" ? (
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Link
                        to={RouteAdminNews}
                        className="flex font-semibold items-center gap-2 text-base"
                      >
                        <TiNews /> News
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Link
                        to={RouteAuthorNews}
                        className="flex font-semibold items-center gap-2 text-base"
                      >
                        <FaUserPen />
                        News As Author
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Link
                      to={RouteComments}
                      className="flex font-semibold items-center gap-2 text-base"
                    >
                      <FaComments /> Comments
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            ) : (
              <></>
            )}
            {user && user.isLoggedIn && user.user.role === "admin" ? (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Link
                      to={RouteCategoryDetails}
                      className="flex font-semibold items-center gap-2 text-base"
                    >
                      <BiSolidCategoryAlt /> Categories
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Link
                      to={RouteUsers}
                      className="flex font-semibold items-center gap-2 text-base"
                    >
                      <FaUser /> Users
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            ) : (
              <></>
            )}
          </SidebarMenu>
        </SidebarGroup>
        {/* <SidebarGroup>
          <SidebarMenu>
            <SidebarGroupLabel className="text-base font-bold text-black">
              Categories
            </SidebarGroupLabel>
            <SidebarMenu>
              {categories &&
                categories.length > 0 &&
                categories.map((category) => (
                  <SidebarMenuItem key={category._id}>
                    <SidebarMenuButton>
                      <Link
                        // to={RouteBlogByCategory(category.slug)}
                        className="flex items-center gap-2 text-base"
                      >
                        <FaDotCircle className="text-xs" /> {category.name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarMenu>
        </SidebarGroup> */}
      </SidebarContent>
    </Sidebar>
  );
};

export default Dashboard;
