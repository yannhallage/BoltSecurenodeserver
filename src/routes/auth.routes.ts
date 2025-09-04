import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();

router.post("/authentification/email", AuthController.VerifyEmail);
router.post("/authentification/password", AuthController.VerifyPassword);
router.post("/authentification/master-key", AuthController.VerifyMasterKey);

export default router;
