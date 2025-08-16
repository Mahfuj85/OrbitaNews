import React, { useEffect, useState } from "react";
import logo from "/images/logo-white.png";
import { Link } from "react-router-dom";
import {
  RouteIndex,
  RouteNewsByCategory,
  RouteNewsDetails,
} from "@/helpers/RouteName";
import moment from "moment";
import Loading from "./Loading";

const Footer = () => {
  const [newsData, setNewsData] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/news/get-all`)
      .then((res) => res.json())
      .then((data) => setNewsData(data.news || []))
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  //  console.log(newsData);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/news/latest`)
      .then((res) => res.json())
      .then((data) => setLatestNews(data.news || []))
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  //  console.log(latestNews);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/category/all`)
      .then((res) => res.json())
      .then((data) => setCategories(data.category || []))
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  // console.log(categories);

  if (isLoading) return <Loading />;

  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      {/* Top Footer */}
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 py-12">
        {/* Section 1 - Logo & Description */}
        <div>
          <div>
            <Link to={RouteIndex}>
              <img src={logo} alt="Logo" className="w-32 h-20" />
            </Link>
          </div>
          <p className="mt-4 text-sm leading-6">
            Stay updated with the latest news from around the globe — breaking
            stories, in-depth analysis, exclusive reports, expert opinions, and
            real-time coverage at your fingertips, so you never miss what’s
            happening around the world.
          </p>
        </div>

        {/* Section 2 - Gallery */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Gallery</h3>
          <div className="grid grid-cols-3 gap-2">
            {newsData.slice(0, 9).map((news) => (
              <Link
                to={RouteNewsDetails(
                  news.category.name.toLowerCase(),
                  news.slug
                )}
              >
                <img
                  key={news._id}
                  src={news.featuredImage}
                  alt="Gallery"
                  className="w-full h-20 object-cover rounded"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Section 3 - Categories */}
        <div className="">
          <h3 className="text-lg font-semibold mb-4 text-white">Categories</h3>
          <ul className="space-y-2">
            {categories?.map((cat) => (
              <li key={cat._id} className="flex justify-between">
                <Link
                  to={RouteNewsByCategory(cat.slug)}
                  className="hover:text-blue-500"
                >
                  {cat.name}
                </Link>
                {/* <span>({cat.count})</span> */}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4 - Latest News */}
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-red-500 w-1 h-6 -mt-[5px]"></span>
            <h3 className="text-lg font-bold mb-1 capitalize text-white">
              Also Read
            </h3>
          </div>
          <div>
            {latestNews.slice(0, 4).map((news) => (
              <Link
                key={news._id}
                to={RouteNewsDetails(
                  news.category.name.toLowerCase(),
                  news.slug
                )}
              >
                <div className="border-2 border-slate-200 px-2 rounded-sm py-1 flex items-center justify-between gap-1 mb-5 hover:scale-[102%] duration-200">
                  <div className="">
                    <h4 className="line-clamp-1 text-sm font-semibold">
                      {news.title}
                    </h4>
                    <div className="flex text-xs items-center gap-1">
                      <p>{moment(news.createdAt).format("LL")}</p>
                      <span>/</span>
                      <span>By {news.author.name}</span>
                    </div>
                  </div>

                  <img
                    src={news.featuredImage}
                    alt="Blog image"
                    className="w-[100px] h-[70px] object-cover rounded-md"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} OrbitaNews. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
