import express from "express"
import { blockOrUnblockUser, changePasswordViaOTP, createUser, getAllUsers, getUser, googleLogin, loginUser, sendContactMessage, sendOTP, updateUserProfile } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", getUser);
userRouter.post("/google-login", googleLogin);
userRouter.get("/all-users", getAllUsers);
userRouter.put("/block/:email", blockOrUnblockUser);
userRouter.get("/send-otp/:email", sendOTP);
userRouter.post("/change-password/", changePasswordViaOTP);
userRouter.put("/me", updateUserProfile);
userRouter.post("/contact", sendContactMessage);

export default userRouter;