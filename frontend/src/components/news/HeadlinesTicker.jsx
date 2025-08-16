import { RouteNewsDetails } from "@/helpers/RouteName";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const HeadlinesTicker = () => {
  const [newsData, setNewsData] = useState([]);
  const [showTicker, setShowTicker] = useState(true);
  const navigate = useNavigate();
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowTicker(false);
      } else {
        setShowTicker(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showTicker) return null;

  if (isLoading) return <Loading />;

  return (
    <div className="flex w-full bg-gray-100 border border-gray-300 overflow-hidden mt-24">
      {/* Fixed badge */}
      <div className="bg-red-600 text-white font-bold px-4 py-2 flex items-center">
        Headlines
      </div>

      {/* Scrolling text */}
      <div className="flex-1 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {newsData.map((news) => (
            <span
              key={news._id}
              className="px-8 py-2 text-gray-800 hover:text-red-500 cursor-pointer transition-colors duration-300"
              onClick={() =>
                navigate(
                  RouteNewsDetails(news.category.name.toLowerCase(), news.slug)
                )
              }
            >
              {news.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeadlinesTicker;
