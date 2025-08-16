import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { decode } from "entities";
import moment from "moment";
import LikeCount from "@/components/LikeCount";
import CommentCount from "@/components/CommentCount";
import Comment from "@/components/Comment";
import RelatedNews from "@/components/news/RelatedNews";
import Loading from "@/components/Loading";

const SingleNewsDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newsData, setNewsData] = useState(null);
  const { slug, category } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/news/get-news/${slug}`)
      .then((res) => res.json())
      .then((data) => setNewsData(data.news || null))
      .catch((err) => console.error(err));
  }, [slug]);
  //console.log(newsData);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between gap-6">
      {newsData && (
        <>
          <div className="border rounded w-full md:w-[70%] p-5">
            <div className="text-2xl font-bold mb-5">
              <h1>{newsData.title}</h1>
              <h3 className="inline-block self-start px-2 mb-2 text-sm md:text-base font-semibold capitalize text-white bg-red-500">
                {newsData.category.name}
              </h3>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center gap-5">
                <Avatar>
                  <AvatarImage src={newsData.author.avatar} />
                </Avatar>
                <div>
                  <p className="font-semibold">{newsData.author.name}</p>
                  <p>Date: {moment(newsData.createdAt).format("DD-MM-YYYY")}</p>
                </div>
              </div>

              <div className="flex justify-between items-center gap-5">
                <div className="flex justify-between items-center gap-5">
                  <LikeCount props={{ newsId: newsData._id }} />
                </div>

                <div className="flex justify-between items-center gap-5">
                  <CommentCount props={{ newsId: newsData._id }} />
                </div>
              </div>
            </div>
            <div className="my-5">
              <img
                src={newsData.featuredImage}
                alt="Blog Content Image"
                className="rounded"
              />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: decode(newsData.newsContent) || "",
              }}
            ></div>

            <div className="mt-5 pt-5 border-t">
              <Comment props={{ newsId: newsData._id }} />
            </div>
          </div>
        </>
      )}
      <div className="border rounded w-full md:w-[30%] p-5">
        <RelatedNews props={{ category: category, currentNews: newsData }} />
      </div>
    </div>
  );
};

export default SingleNewsDetails;
