import { RouteNewsDetails } from "@/helpers/RouteName";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading";

const RelatedNews = ({ props }) => {
  const [relatedNews, setRelatedNews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!props.currentNews?.slug) return;

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/news/get-related-news/${
        props.category
      }/${props.currentNews.slug}`
    )
      .then((res) => res.json())
      .then((data) => setRelatedNews(data.relatedNews || null))
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [props.category, props.currentNews?.slug]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl font-bold">Related News</h2>
      <div>
        {relatedNews && relatedNews.length > 0 ? (
          relatedNews.map((news) => {
            return (
              <Link
                key={news._id}
                to={RouteNewsDetails(props.category, news.slug)}
              >
                <div className="bg-slate-100 px-2 rounded-sm py-1 flex items-center gap-2 mb-5 hover:scale-[102%] duration-200">
                  <img
                    src={news.featuredImage}
                    alt="Blog image"
                    className="w-[100px] h-[70px] object-cover rounded-md"
                  />
                  <h4 className="line-clamp-2 text-lg font-semibold">
                    {news.title}
                  </h4>
                </div>
              </Link>
            );
          })
        ) : (
          <div>No Related News</div>
        )}
      </div>
    </div>
  );
};

export default RelatedNews;
