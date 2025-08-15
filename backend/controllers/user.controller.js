import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId }).lean().exec(); // .lean() = Converts the result from a Mongoose document to a plain JavaScript object and .exec() = Executes the query and returns a promise. "Find one user document where userId matches, return it as a plain JS object (not a Mongoose document), and execute the query."

    if (!user) {
      next(handleError(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      message: "User data found",
      user,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    const { userId } = req.params;

    const user = await User.findById(userId);
    user.name = data.name;
    user.email = data.email;
    user.bio = data.bio;

    if (data.password && data.password.length >= 8) {
      const hashedPassword = bcryptjs.hashSync(data.password);
      user.password = hashedPassword;
    }

    // Upload user's image
    if (req.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, { folder: "EchoJot", resource_type: "auto" })
        .catch((error) => {
          next(handleError(500, error.message));
        });

      user.avatar = uploadResult.secure_url;
    }

    await user.save();

    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    res.status(200).json({
      success: true,
      message: "User data updated",
      user: newUser,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
