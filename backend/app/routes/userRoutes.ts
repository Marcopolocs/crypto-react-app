import express from "express";
import {
  login,
  logout,
  signup,
  validateUserEmail,
  validateUsername,
} from "../controllers/authController";
import { userEndpoints } from "../constants/endpoints/userEndpoints";

const userRouter = express.Router();

userRouter.route(userEndpoints.LOGIN).post(login);
userRouter.route(userEndpoints.SIGN_UP).post(signup);
userRouter.route(userEndpoints.LOGOUT).get(logout);
userRouter.route(userEndpoints.VALIDATE_USERNAME).post(validateUsername);
userRouter.route(userEndpoints.VALIDATE_EMAIL).post(validateUserEmail);

export default userRouter;
