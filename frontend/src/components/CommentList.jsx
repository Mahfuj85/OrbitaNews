import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Avatar, AvatarImage } from "./ui/avatar";
import moment from "moment";
import { useSelector } from "react-redux";
import userIcon from "/images/avatar.png";

const CommentList = ({ props }) => {
  const user = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/comments/get/${props.newsId}`)
      .then((res) => res.json())
      .then((data) => setComments(data.comments || []))
      .catch((err) => console.error(err));
  }, [props.newsId]);

  //  console.log(comments);

  //   if (loading) return <Loading />;

  return (
    <div>
      <h4 className="text-2xl font-bold">
        {props.newComment ? <>{comments.length + 1}</> : <>{comments.length}</>}{" "}
        Comments
      </h4>
      <div className="mt-5">
        {props.newComment && (
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src={user?.user?.avatar || userIcon} />
            </Avatar>
            <div>
              <p className="font-semibold">{user?.user?.name}</p>
              <p>{moment(props?.newComment?.createdAt).format("DD-MM-YYYY")}</p>
              <div className="pt-3">{props?.newComment?.comment}</div>
            </div>
          </div>
        )}

        {comments.length > 0 &&
          comments.map((comment) => {
            return (
              <div
                key={comment._id}
                className="flex gap-2 pb-4 mb-4 border-b
                 border-gray-200 last:border-b-0"
              >
                <Avatar>
                  <AvatarImage src={comment?.user?.avatar || userIcon} />
                </Avatar>
                <div>
                  <p className="font-semibold">{comment?.user?.name}</p>
                  <p>{moment(comment?.createdAt).format("DD-MM-YYYY")}</p>
                  <div className="pt-3">{comment?.comment}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CommentList;
