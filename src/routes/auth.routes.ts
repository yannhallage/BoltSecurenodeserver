import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();

router.post("/register/email", AuthController.sendOtp);
router.post("/register/password", AuthController.verifyOtpAndSetPassword);
router.post("/register/master-key", AuthController.setMasterKey);

export default router;
