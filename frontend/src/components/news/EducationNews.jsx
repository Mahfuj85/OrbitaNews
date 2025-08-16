import { RouteNewsDetails } from "@/helpers/RouteName";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading";

const EducationNews = ({ category }) => {
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
    <div className="w-full">
      <div className="flex items-center gap-2">
        <span className="bg-red-500 w-1 h-7 -mt-[5px]"></span>
        <h3 className="text-2xl font-bold mb-1 capitalize text-black">
          {category} News
        </h3>
      </div>
      <div className="w-full">
        {news.slice(0, 2).map((item) => (
          <div key={item._id}>
            <Link to={RouteNewsDetails(item.category.slug, item.slug)}>
              <div className="inline-block w-full relative text-white">
                <img
                  src={item.featuredImage}
                  alt={item.title}
                  className="w-full h-full object-cover brightness-50"
                />
                <div className="absolute top-36 lg:top-24 inset-0 flex flex-col justify-center px-1 md:px-2">
                  <span className="inline-block self-start px-2 mb-2 text-sm md:text-sm font-semibold uppercase bg-red-500">
                    {item.category.name}
                  </span>
                  <h2 className="text-base md:text-2xl lg:text-sm font-bold mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
                    {item.title}
                  </h2>
                  <p className="text-md md:text-sm">By {item.author.name}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationNews;
