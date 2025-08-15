import express from "express";
import { getUser, updateUser } from "../controllers/user.controller.js";
import upload from "../config/multer.js";

import { authenticate } from "../middleware/authenticate.js";
import { onlyAdmin } from "../middleware/onlyAdmin.js";
import {
  addNews,
  deleteNews,
  editNews,
  getAllNews,
  getLatestNews,
  getNews,
  getNewsByAuthor,
  getNewsByCategory,
  getPopularNews,
  getRelatedNews,
  search,
  showAllNews,
  updateNews,
} from "../controllers/news.controller.js";

const NewsRoute = express.Router();

NewsRoute.post("/add", upload.single("file"), authenticate, addNews);
NewsRoute.get("/edit/:newsId", authenticate, editNews);
NewsRoute.put(
  "/update/:newsId",
  upload.single("file"),
  authenticate,
  updateNews
);
NewsRoute.delete("/delete/:newsId", authenticate, deleteNews);
NewsRoute.get("/get-all", showAllNews);

NewsRoute.get("/get-news/:slug", getNews);
NewsRoute.get("/get-related-news/:category/:news", getRelatedNews);
NewsRoute.get("/get-news-category/:category", getNewsByCategory);
NewsRoute.get("/search", search);

NewsRoute.get("/all", getAllNews);
NewsRoute.get("/latest", getLatestNews);
NewsRoute.get("/popular", getPopularNews);
NewsRoute.get("/author/:authorId", authenticate, getNewsByAuthor);

export default NewsRoute;
