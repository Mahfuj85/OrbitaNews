import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
import upload from "../config/multer.js";
import { authenticate } from "../middleware/authenticate.js";
import { onlyAdmin } from "./../middleware/onlyAdmin.js";

const UserRoute = express.Router();

UserRoute.get("/all-users", onlyAdmin, getAllUsers);
UserRoute.use(authenticate);

UserRoute.get("/get-user/:userId", getUser);
UserRoute.put("/update-user/:userId", upload.single("file"), updateUser);
UserRoute.delete("/delete-user/:userId", deleteUser);

export default UserRoute;
