import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  showCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { onlyAdmin } from "../middleware/onlyAdmin.js";

const CategoryRoute = express.Router();

CategoryRoute.post("/add", onlyAdmin, addCategory);
CategoryRoute.get("/show/:categoryId", onlyAdmin, showCategory);
CategoryRoute.put("/update/:categoryId", onlyAdmin, updateCategory);
CategoryRoute.delete("/delete/:categoryId", onlyAdmin, deleteCategory);

CategoryRoute.get("/all", getAllCategories);

export default CategoryRoute;
