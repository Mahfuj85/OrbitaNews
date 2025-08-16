import { RouteNewsDetails } from "@/helpers/RouteName";
import { decode } from "entities";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading";

const HealthNews = ({ category }) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/news/get-news-category/${category}`
    )
      .then((res) => res.json())
      .then((data) => setNews(data.news || []))
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [category]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="bg-red-500 w-1 h-7 -mt-[5px]"></span>
        <h3 className="text-2xl font-bold mb-1 capitalize text-black">
          {category} News
        </h3>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-7">
        {news.slice(0, 2).map((item) => (
          <div
            key={item._id}
            className="w-full lg:w-[68%] flex sm:flex-col bg-white shadow-md hover:shadow-xl"
          >
            <Link
              to={RouteNewsDetails(item.category.slug, item.slug)}
              className="flex flex-col space-y-3 bg-white shadow-md hover:shadow-xl"
            >
              <div className="w-full">
                <img
                  src={item.featuredImage}
                  alt={item.title}
                  className="rounded"
                />
              </div>
              <div className="flex flex-col px-8 py-4 space-y-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <div className="flex items-center gap-1 text-sm lg:text-xs xl:text-sm">
                  <p>{moment(news.createdAt).format("LL")}</p>
                  <span>/</span>
                  <span>By {item.author.name}</span>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: decode(item.newsContent) || "",
                  }}
                  className="text-sm line-clamp-3"
                ></div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthNews;
