import React, { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";

const CommentCount = ({ props }) => {
  const [newsComment, setNewsComment] = useState(0);
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/comments/get-count/${props.newsId}`
    )
      .then((res) => res.json())
      .then((data) => setNewsComment(data))
      .catch((err) => console.error(err));
  }, [props.newsId]);

  return (
    <button type="button" className="flex justify-between items-center gap-1">
      <FaComment />
      {newsComment && newsComment.commentCount}
    </button>
  );
};

export default CommentCount;
