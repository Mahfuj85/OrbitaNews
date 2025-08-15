import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

const CategoryNews = ({ category }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/news/get-news-category/${category}`
    )
      .then((res) => res.json())
      .then((data) => setNews(data.news || []))
      .catch((err) => console.error(err));
  }, [category]);

  //  console.log(news);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <span className="bg-red-500 w-1 h-7 -mt-[5px]"></span>
        <h3 className="text-2xl font-bold mb-1 capitalize text-black">
          {category} News
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {news.slice(0, 4).map((item) => (
          <NewsCard key={item._id} props={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryNews;
