import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  addComment,
  commentCount,
  deleteComment,
  getAllComments,
  getComments,
} from "../controllers/comment.controller.js";

const CommentRoute = express.Router();

CommentRoute.post("/add", authenticate, addComment);
CommentRoute.get("/get/:newsId", getComments);
CommentRoute.get("/get-count/:newsId", commentCount);
CommentRoute.get("/all-comments", authenticate, getAllComments);
CommentRoute.delete("/delete/:commentId", authenticate, deleteComment);

export default CommentRoute;
