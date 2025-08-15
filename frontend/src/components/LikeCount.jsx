// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { AiFillLike } from "react-icons/ai";
// import { showToast } from "@/helpers/showToast";
// import { getEnv } from "@/helpers/getEnv";

// const LikeCount = ({ props }) => {
//   const [likeCount, setLikeCount] = useState(0);
//   const [hasLiked, setHasLiked] = useState(false);
//   const user = useSelector((state) => state.user);
//   const userId = user?.isLoggedIn ? user.user._id : "";

//   useEffect(() => {
//     fetch(
//       `${import.meta.env.VITE_BACKEND_URL}/news-likes/get-like/${props.newsId}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setLikeCount(data.likeCount || 0);
//         setHasLiked(data.isUserLiked || false);
//       })
//       .catch((err) => console.error(err));
//   }, [props.newsId]);

//   //  console.log(likeCount);

//   useEffect(() => {
//     if (likeCount) {
//       setLikeCount(likeCount.likeCount);
//       setHasLiked(likeCount.isUserLiked);
//     }
//   }, [likeCount]);

//   const handleLike = async () => {
//     try {
//       if (!user.isLoggedIn) {
//         return showToast("error", "Please login into your account");
//       }

//       const response = await fetch(
//         `${getEnv("VITE_BACKEND_URL")}/news-likes/add-like`,
//         {
//           method: "POST",
//           credentials: "include",
//           headers: { "Content-type": "application/json" },
//           body: JSON.stringify({ user: user.user._id, newsId: props.newsId }),
//         }
//       );

//       if (!response.ok) {
//         showToast("error", response.statusText);
//       }
//       const responseData = await response.json();
//       console.log(responseData);
//       setLikeCount(responseData.likeCount);
//       setHasLiked(!hasLiked);
//     } catch (error) {
//       showToast("error", error.message);
//     }
//   };

//   return (
//     <button
//       onClick={handleLike}
//       type="button"
//       className="flex justify-between items-center gap-1"
//     >
//       {!hasLiked ? <AiFillLike /> : <AiFillLike className="text-red-500" />}
//       <span>{likeCount}</span>
//     </button>
//   );
// };

// export default LikeCount;

// TESTING
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiFillLike } from "react-icons/ai";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";

const LikeCount = ({ props }) => {
  const [likeData, setLikeData] = useState({
    likeCount: 0,
    isUserLiked: false,
  });
  const user = useSelector((state) => state.user);
  const userId = user?.isLoggedIn ? user.user._id : "";

  // Fetch on mount
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/news-likes/get-like/${props.newsId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLikeData({
          likeCount: data.likeCount || 0,
          isUserLiked: data.isUserLiked || false,
        });
      })
      .catch((err) => console.error(err));
  }, [props.newsId, userId]);

  const handleLike = async () => {
    try {
      if (!user.isLoggedIn) {
        return showToast("error", "Please login into your account");
      }

      const response = await fetch(
        `${getEnv("VITE_BACKEND_URL")}/news-likes/add-like`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ user: user.user._id, newsId: props.newsId }),
        }
      );

      if (!response.ok) {
        return showToast("error", response.statusText);
      }

      const data = await response.json();
      setLikeData({
        likeCount: data.likeCount,
        isUserLiked: data.isUserLiked,
      });
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <button
      onClick={handleLike}
      type="button"
      className="flex justify-between items-center gap-1"
    >
      {likeData.isUserLiked ? (
        <AiFillLike className="text-red-500" />
      ) : (
        <AiFillLike />
      )}
      <span>{likeData.likeCount}</span>
    </button>
  );
};

export default LikeCount;
