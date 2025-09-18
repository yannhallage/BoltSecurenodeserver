import { Router } from "express";
import PasswordController from "../controllers/password.controller";
import CreditCardController from "../controllers/creditCard.controller";


const router = Router();

router.post("/password/:id", PasswordController.create);
router.get("/password/:userId", PasswordController.getAllByUser);
// router.get("/:id", PasswordController.getById);
router.put("/password/:id", PasswordController.update);
router.delete("/password/:id", PasswordController.delete);

router.post("/creditCard/:id", CreditCardController.createCreditCard);
router.get("/creditCard/:userId", CreditCardController.getAllByUserCreditCard);
// router.get("/creditCard/:id", CreditCardController.getByIdCreditCard);
router.put("/creditCard/:id", CreditCardController.updateCreditCard);
router.delete("/creditCard/:id", CreditCardController.deleteCreditCard);



export default router;