import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import AuthRoute from "./routes/auth.route.js";
import UserRoute from "./routes/user.route.js";
import CategoryRoute from "./routes/category.route.js";
import NewsRoute from "./routes/news.route.js";
import CommentRoute from "./routes/comment.route.js";
import NewsLikeRoute from "./routes/newsLike.route.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// ROUTE SETUP
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/news", NewsRoute);
app.use("/api/v1/comments", CommentRoute);
app.use("/api/v1/news-likes", NewsLikeRoute);

// DATABASE SETUP
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Database Connection Error`, error);
  });

// ERROR HANDLER
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error.";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
