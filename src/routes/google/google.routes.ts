import { Router } from "express";
import { AuthController } from "../../controllers/google controller/register.google.controller";

const router = Router();

router.post("/register", AuthController.googleAuth);

export default router;
