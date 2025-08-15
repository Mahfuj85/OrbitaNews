import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TiNews } from "react-icons/ti";
import { BiSolidCategory } from "react-icons/bi";
import { FaUsers, FaComments } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userData, setUserData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [totalLike, setTotalLike] = useState(0);
  const [likesData, setLikesData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all data
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/news/get-all`)
      .then((res) => res.json())
      .then((data) => setNewsData(data.news || []))
      .catch(console.error);
  }, [refreshData]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/category/all`)
      .then((res) => res.json())
      .then((data) => setCategories(data.category || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/users/all-users`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUserData(data.users || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/comments/all-comments`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCommentData(data.comments || []))
      .catch(console.error);
  }, [refreshData]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/news-likes/all-like`)
      .then((res) => res.json())
      .then((data) => {
        setTotalLike(data.totalLikes || 0);
        setLikesData(data.likes || []); // Assuming backend returns all likes with date
      })
      .catch(console.error);
  }, [refreshData]);

  // Prepare chart data
  const pieData = [
    { name: "News", value: newsData.length },
    { name: "Categories", value: categories.length },
    { name: "Users", value: userData.length },
    { name: "Comments", value: commentData.length },
    { name: "Likes", value: totalLike },
  ];

  const COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#845EC2"];

  // Group comments & likes by date (for current month)
  const getCommentsLikesByDate = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const grouped = {};

    commentData.forEach((comment) => {
      const date = new Date(comment.createdAt);
      if (date.getMonth() === currentMonth) {
        const key = date.getDate();
        if (!grouped[key]) grouped[key] = { date: key, comments: 0, likes: 0 };
        grouped[key].comments += 1;
      }
    });

    likesData.forEach((like) => {
      const date = new Date(like.createdAt);
      if (date.getMonth() === currentMonth) {
        const key = date.getDate();
        if (!grouped[key]) grouped[key] = { date: key, comments: 0, likes: 0 };
        grouped[key].likes += 1;
      }
    });

    return Object.values(grouped).sort((a, b) => a.date - b.date);
  };

  const commentsLikesChartData = getCommentsLikesByDate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-3">
              <TiNews /> Total News
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-lg font-bold text-gray-400">Loading...</p>
            ) : (
              <p className="text-2xl font-bold text-center">
                {newsData.length}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-3">
              <BiSolidCategory /> Total Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-center">
              {categories.length}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-3">
              <FaUsers /> Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-center">{userData.length}</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-3">
              <FaComments /> Total Comments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-center">
              {commentData.length}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-3">
              <AiFillLike /> Total Likes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-center">{totalLike}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <Card className="p-4">
          <CardTitle className="mb-4">Data Distribution</CardTitle>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Line Chart */}
        <Card className="p-4">
          <CardTitle className="mb-4">Total Counts Over Entities</CardTitle>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pieData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4D96FF"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Comments & Likes Bar Chart */}
        <Card className="p-4">
          <CardTitle className="mb-4">
            Comments & Likes by Date (This Month)
          </CardTitle>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={commentsLikesChartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="comments" fill="#FF6B6B" name="Comments" />
              <Bar dataKey="likes" fill="#4D96FF" name="Likes" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
