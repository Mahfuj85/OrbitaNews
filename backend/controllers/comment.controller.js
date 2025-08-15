import { handleError } from "../helpers/handleError.js";
import Comment from "../models/comment.model.js";

export const addComment = async (req, res, next) => {
  try {
    const { user, newsId, comment } = req.body;

    const newComment = new Comment({
      user: user,
      newsId: newsId,
      comment: comment,
    });

    await newComment.save();

    res.status(200).json({
      success: true,
      message: "Comment submitted",
      comment: newComment,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getComments = async (req, res, next) => {
  try {
    const { newsId } = req.params;

    const comments = await Comment.find({
      newsId,
    })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      comments,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const commentCount = async (req, res, next) => {
  try {
    const { newsId } = req.params;

    const commentCount = await Comment.countDocuments({ newsId });

    res.status(200).json({
      commentCount,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllComments = async (req, res, next) => {
  try {
    const user = req.user;
    let comments;
    if (user.role === "admin") {
      comments = await Comment.find()
        .populate("newsId", "title")
        .populate("user", "name");
    } else {
      comments = await Comment.find({ user: user._id })
        .populate("newsId", "title")
        .populate("user", "name");
    }

    res.status(200).json({
      comments,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      success: true,
      message: "Comment deleted",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
