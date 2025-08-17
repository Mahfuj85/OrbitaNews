import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  RouteAbout,
  RouteAddCategory,
  RouteAddNews,
  RouteAdminNews,
  RouteAuthorNews,
  RouteCategoryDetails,
  RouteComments,
  RouteContact,
  RouteDashboard,
  RouteDashboardEditNews,
  RouteDashboardHome,
  RouteEditCategory,
  RouteIndex,
  RouteNews,
  RouteNewsByCategory,
  RouteNewsDetails,
  RouteProfile,
  RouteSearch,
  RouteSignIn,
  RouteSignUp,
  RouteUsers,
} from "./helpers/RouteName";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AuthRouteProtection from "./components/AuthRouteProtection";
import Profile from "./pages/Profile";
import AddNews from "./pages/news/AddNews";
import SingleNewsDetails from "./pages/news/SingleNewsDetails";
import NewsPage from "./pages/news/NewsPage";
import NewsByCategory from "./pages/news/NewsByCategory";
import SearchResult from "./pages/news/SearchResult";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "./Layout/DashboardLayout";
import Comments from "./pages/dashboard/Comments";
import AuthorNews from "./pages/dashboard/AuthorNews";
import EditNews from "./pages/dashboard/EditNews";
import CategoryDetails from "./pages/dashboard/CategoryDetails";
import EditCategory from "./pages/dashboard/EditCategory";
import AddCategory from "./pages/dashboard/AddCategory";
import Users from "./pages/dashboard/Users";
import AdminNews from "./pages/dashboard/AdminNews";
import DashboardHome from "./pages/dashboard/DashboardHome";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* DASHBOARD ROUTES */}
        <Route path={RouteDashboard} element={<DashboardLayout />}>
          <Route
            path={RouteDashboard}
            element={<Navigate to={RouteDashboardHome} replace />}
          />
          <Route path={RouteDashboardHome} element={<DashboardHome />} />
          <Route path={RouteComments} element={<Comments />} />
          <Route path={RouteAuthorNews} element={<AuthorNews />} />
          <Route path={RouteAdminNews} element={<AdminNews />} />
          <Route path={RouteDashboardEditNews()} element={<EditNews />} />
          <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
          <Route path={RouteEditCategory()} element={<EditCategory />} />
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path={RouteUsers} element={<Users />} />
          <Route path={RouteAddNews} element={<AddNews />} />
        </Route>

        {/* MAIN APP ROUTES */}
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* NEWS  */}
          <Route path={RouteNewsDetails()} element={<SingleNewsDetails />} />
          <Route path={RouteNews} element={<NewsPage />} />
          <Route path={RouteNewsByCategory()} element={<NewsByCategory />} />
          <Route path={RouteSearch()} element={<SearchResult />} />
          <Route path={RouteAbout} element={<AboutPage />} />
          <Route path={RouteContact} element={<ContactPage />} />

          {/* PROTECTED ROUTE FOR LOGGED IN USER */}
          <Route element={<AuthRouteProtection />}>
            <Route path={RouteProfile} element={<Profile />} />
            {/* <Route path={RouteAddNews} element={<AddNews />} /> */}
          </Route>
        </Route>

        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
