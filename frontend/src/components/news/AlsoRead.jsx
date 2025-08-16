import { RouteNewsDetails } from "@/helpers/RouteName";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading";

const AlsoRead = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/news/latest`)
      .then((res) => res.json())
      .then((data) => setNews(data.news || []))
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  //  console.log(news);

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="bg-red-500 w-1 h-7 -mt-[5px]"></span>
        <h3 className="text-2xl font-bold mb-1 capitalize text-black">
          Also Read
        </h3>
      </div>
      <div>
        {news.map((news) => (
          <Link
            key={news._id}
            to={RouteNewsDetails(news.category.name.toLowerCase(), news.slug)}
          >
            <div className="border-2 border-slate-200 px-2 rounded-sm py-1 flex items-center justify-between gap-2 mb-5 hover:scale-[102%] duration-200">
              <div className="">
                <h4 className="line-clamp-2 text-lg font-semibold">
                  {news.title}
                </h4>
                <div className="flex items-center gap-1 text-sm lg:text-[9px] xl:text-sm">
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
  );
};

export default AlsoRead;
