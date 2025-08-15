import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  GoogleLogin,
  Login,
  Logout,
  Register,
} from "../controllers/auth.controller.js";

const AuthRoute = express.Router();

AuthRoute.post("/register", Register);
AuthRoute.post("/login", Login);
AuthRoute.post("/google-login", GoogleLogin);
AuthRoute.get("/logout", authenticate, Logout);

export default AuthRoute;
