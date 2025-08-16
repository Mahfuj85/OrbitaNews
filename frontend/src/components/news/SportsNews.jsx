import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { decode } from "entities";
import moment from "moment";
import { RouteNewsDetails } from "@/helpers/RouteName";
import RelatedNews from "./RelatedNews";
import Loading from "../Loading";

const SportsNews = ({ category }) => {
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
      <div className="w-full ">
        {news.slice(0, 1).map((item) => (
          <div key={item._id} className="flex flex-wrap md:flex-nowrap gap-7">
            <div className="w-full lg:w-[50%]">
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
                  <div className="flex items-center gap-1 md:text-xs">
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
            <div className="w-full lg:w-[48%]">
              <div className="border rounded w-full p-5">
                <RelatedNews
                  props={{ category: category, currentNews: item }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportsNews;
