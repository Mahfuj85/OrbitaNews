import { handleError } from "../helpers/handleError.js";
import NewsLike from "../models/newsLike.model.js";

export const addLike = async (req, res, next) => {
  try {
    const { user, newsId } = req.body;
    let like;
    like = await NewsLike.findOne({ userId: user, newsId });
    if (!like) {
      const savedLike = new NewsLike({
        userId: user,
        newsId,
      });
      like = await savedLike.save({});
    } else {
      await NewsLike.findByIdAndDelete(like._id);
    }

    const likeCount = await NewsLike.countDocuments({ newsId });

    // Check if user liked after operation
    const isUserLiked = !!(await NewsLike.findOne({ user, news: newsId }));

    res.status(200).json({ likeCount, isUserLiked });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const likeCount = async (req, res, next) => {
  try {
    const { newsId } = req.params;
    const { userId } = req.query;
    const likeCount = await NewsLike.countDocuments({ newsId });

    let isUserLiked = false;
    if (userId) {
      const getUserLike = await NewsLike.countDocuments({
        newsId,
        user: userId,
      });

      if (getUserLike > 0) {
        isUserLiked = true;
      }
    }

    res.status(200).json({ likeCount, isUserLiked });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const countAllNewsLikes = async (req, res, next) => {
  try {
    const totalLikes = await NewsLike.countDocuments();

    res.status(200).json({
      success: true,
      totalLikes,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
