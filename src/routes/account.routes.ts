import { Router } from "express";
import AuthController from "../controllers/account.controller";

const router = Router();

router.post("/register/email", AuthController.sendOtp);
router.post("/verify-otp", AuthController.verifyOtp);
router.post("/register/password", AuthController.verifyOtpAndSetPassword);
router.post("/register/master-key", AuthController.setMasterKey);

export default router;
