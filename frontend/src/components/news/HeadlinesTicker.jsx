import { RouteNewsDetails } from "@/helpers/RouteName";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const headlines = [
  { id: 1, title: "Breaking: Stock market hits record high", link: "/news/1" },
  { id: 2, title: "Sports: Local team wins championship", link: "/news/2" },
  {
    id: 3,
    title: "Tech: New AI tool revolutionizes industry",
    link: "/news/3",
  },
  {
    id: 4,
    title: "Weather: Heavy rain expected this weekend",
    link: "/news/4",
  },
];

const HeadlinesTicker = () => {
  const [newsData, setNewsData] = useState([]);
  const [showTicker, setShowTicker] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/news/get-all`)
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) => setNewsData(data.news || []))
      .catch((err) => console.error(err));
  }, []);

  // console.log(newsData);

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

  return (
    <div className="flex w-full bg-gray-100 border border-gray-300 overflow-hidden mt-24">
      {/* Fixed badge */}
      <div
        className="bg-red-600 text-white font-bold px-4 py-2 flex items-center"
        // style={{
        //   clipPath: "polygon(0 0, 100% 0, 70% 100%, 0% 100%)",
        // }}
      >
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
