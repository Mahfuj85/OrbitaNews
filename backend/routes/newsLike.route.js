import express from "express";
import {
  addLike,
  countAllNewsLikes,
  likeCount,
} from "../controllers/newsLike.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const NewsLikeRoute = express.Router();

NewsLikeRoute.post("/add-like", authenticate, addLike);
NewsLikeRoute.get("/get-like/:newsId", likeCount);
NewsLikeRoute.get("/all-like", countAllNewsLikes);

export default NewsLikeRoute;
