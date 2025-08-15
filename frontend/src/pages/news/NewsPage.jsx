import { RouteNewsDetails } from "@/helpers/RouteName";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/news/get-all`)
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) => setNewsData(data.news || []))
      .catch((err) => console.error(err));
  }, []);

  //console.log(newsData);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <span className="bg-red-500 w-1 h-7 -mt-[5px]"></span>
        <h3 className="text-2xl font-bold mb-1 capitalize text-black">
          All News
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {newsData && newsData.length > 0 ? (
          newsData.map((news) => {
            return (
              <Link
                key={news._id}
                to={RouteNewsDetails(
                  news.category.name.toLowerCase(),
                  news.slug
                )}
              >
                <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl bg-white">
                  <div className="relative">
                    <img
                      src={news.featuredImage}
                      alt={news.title}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
                      {news.category.name}
                    </span>
                  </div>
                  <div className="px-4 py-3">
                    <h3 className="font-bold text-lg mb-1 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      By {news.author.name}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div>No Related News </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
