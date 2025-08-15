import jwt from "jsonwebtoken";
import User from "./../models/user.model.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next(403, "Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select("-password"); // ✅ fetch full user

    if (!user) {
      return next(403, "Unauthorized");
    }

    req.user = user; // ✅ Now contains role, avatar, etc.
    next();
  } catch (error) {
    next(500, error.message);
  }
};
