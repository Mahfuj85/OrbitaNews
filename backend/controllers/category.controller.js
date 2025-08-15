import { handleError } from "../helpers/handleError.js";
import Category from "../models/category.model.js";

export const addCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const category = new Category({
      // new used to create a category
      name,
      slug,
    });

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category added successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message, // Show real reason
    });

    //next(handleError(500, error.message));
  }
};

export const showCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    //  console.log("categoryId:", categoryId);
    const category = await Category.findById(categoryId);
    if (!category) {
      next(handleError(404, "Data not found"));
    }
    res.status(200).json({
      category,
    });
  } catch (error) {
    console.error("Error in showCategory:", error);
    next(handleError(500, error.message));
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const { categoryId } = req.params;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      category,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const getAllCategories = async (req, res, next) => {
  try {
    const category = await Category.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.status(200).json({
      category,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
