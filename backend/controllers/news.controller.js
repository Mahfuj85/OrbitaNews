import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";
import News from "../models/news.model.js";
import NewsLike from "../models/newsLike.model.js";
import { encode } from "entities";
import Category from "../models/category.model.js";

export const addNews = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    let featuredImage = "";

    // Upload featured image
    if (req.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, { folder: "EchoJot", resource_type: "auto" })
        .catch((error) => {
          next(handleError(500, error.message));
        });
      featuredImage = uploadResult.secure_url;
    }

    const news = new News({
      author: data.author,
      category: data.category,
      title: data.title,
      slug: data.slug,
      featuredImage: featuredImage,
      newsContent: encode(data.newsContent),
    });

    await news.save();

    res.status(200).json({
      success: true,
      message: "News added successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const editNews = async (req, res, next) => {
  try {
    const { newsId } = req.params;
    const news = await News.findById(newsId).populate("category", "name");
    if (!news) {
      next(handleError(404, "Data not found"));
    }
    res.status(200).json({
      news,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateNews = async (req, res, next) => {
  try {
    const { newsId } = req.params;
    const data = JSON.parse(req.body.data);

    const news = await News.findById(newsId);

    news.category = data.category;
    news.title = data.title;
    news.slug = data.slug;
    news.newsContent = encode(data.newsContent);

    let featuredImage = news.featuredImage;

    // Upload featured image
    if (req.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, { folder: "EchoJot", resource_type: "auto" })
        .catch((error) => {
          next(handleError(500, error.message));
        });
      featuredImage = uploadResult.secure_url;
    }

    news.featuredImage = featuredImage;

    await news.save();

    res.status(200).json({
      success: true,
      message: "News updated successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteNews = async (req, res, next) => {
  try {
    const { newsId } = req.params;
    await News.findByIdAndDelete(newsId);

    res.status(200).json({
      success: true,
      message: "News deleted successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showAllNews = async (req, res, next) => {
  try {
    const user = req.user;
    let news = await News.find()
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({ news });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getNews = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const news = await News.findOne({ slug })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .lean()
      .exec();

    res.status(200).json({ news });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// export const getRelatedNews = async (req, res, next) => {
//   try {
//     const { category, news } = req.params;
//     const categoryData = await Category.findOne({ slug: category });
//     if (!categoryData) {
//       return next(404, "Category data not found");
//     }
//     const categoryId = categoryData._id;
//     const relatedNews = await News.find({
//       category: categoryId,
//       slug: { $ne: news },
//     })
//       .lean()
//       .exec();

//     res.status(200).json({ relatedNews });
//   } catch (error) {
//     next(handleError(500, error.message));
//   }
// };
export const getRelatedNews = async (req, res, next) => {
  try {
    const { category, news } = req.params;

    const categoryData = await Category.findOne({ slug: category });
    if (!categoryData) {
      return next(404, "Category data not found");
    }

    const currentNews = await News.findOne({ slug: news });
    if (!currentNews) {
      return next(404, "News not found");
    }

    const relatedNews = await News.find({
      category: categoryData._id,
      _id: { $ne: currentNews._id }, // ✅ exclude by ID
    }).lean();

    res.status(200).json({ relatedNews });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getNewsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const categoryData = await Category.findOne({ slug: category });
    if (!categoryData) {
      return next(404, "Category data not found");
    }
    const categoryId = categoryData._id;
    const news = await News.find({
      category: categoryId,
    })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({ news, categoryData });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const search = async (req, res, next) => {
  try {
    const { q } = req.query;
    const news = await News.find({
      title: { $regex: new RegExp(q, "i") },
    })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({ news });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllNews = async (req, res, next) => {
  try {
    const user = req.user;

    const news = await News.find()
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({ news });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getLatestNews = async (req, res, next) => {
  try {
    const latestNews = await News.find(
      {},
      "featuredImage title author category slug"
    ) // select only needed fields
      .populate("author", "name") // only author name
      .populate("category", "name") // only category name
      .sort({ createdAt: -1 }) // newest first
      .limit(5) // get only 5 items
      .lean()
      .exec();
    res.status(200).json({ news: latestNews });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getPopularNews = async (req, res, next) => {
  try {
    const popularNews = await NewsLike.aggregate([
      {
        // Group by newsId, count total likes
        $group: {
          _id: "$newsId",
          likeCount: { $sum: 1 },
        },
      },
      {
        // Sort descending by likeCount
        $sort: { likeCount: -1 },
      },
      {
        // Limit to, e.g., top 5 popular news
        $limit: 4,
      },
      {
        // Lookup full news info by joining with News collection
        $lookup: {
          from: "news", // MongoDB collection name, lowercase plural usually
          localField: "_id",
          foreignField: "_id",
          as: "newsDetails",
        },
      },
      {
        // Unwind the array from lookup
        $unwind: "$newsDetails",
      },
      {
        // Project the fields to return
        $project: {
          _id: "$newsDetails._id",
          title: "$newsDetails.title",
          featuredImage: "$newsDetails.featuredImage",
          author: "$newsDetails.author",
          category: "$newsDetails.category",
          slug: "$newsDetails.slug",
          likeCount: 1,
        },
      },
    ]);

    // Optionally populate author and category info
    const popularNewsWithPopulated = await News.populate(popularNews, [
      { path: "author", select: "name" },
      { path: "category", select: "name" },
    ]);

    res.status(200).json({ popularNews: popularNewsWithPopulated });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getNewsByAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params;

    // Validate if authorId exists
    if (!authorId) {
      return res
        .status(400)
        .json({ success: false, message: "Author ID is required" });
    }

    // Find all news for the given author
    const newsList = await News.find({ author: authorId })
      .populate("author", "name email") // Optional: include author details
      .populate("category", "name") // Optional: include category details
      .sort({ createdAt: -1 }); // Latest first

    return res.status(200).json({
      success: true,
      count: newsList.length,
      news: newsList,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
