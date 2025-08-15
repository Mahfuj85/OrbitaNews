import mongoose from "mongoose";

const newsLikeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    newsId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "News",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const NewsLike = mongoose.model("NewsLike", newsLikeSchema);
export default NewsLike;
