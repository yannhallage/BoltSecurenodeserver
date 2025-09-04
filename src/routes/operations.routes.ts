import { Router } from "express";
import PasswordController from "../controllers/password.controller";
import CreditCardController from "../controllers/creditCard.controller";


const router = Router();

router.post("/:id", PasswordController.create);
router.get("/user/:userId", PasswordController.getAllByUser);
router.get("/:id", PasswordController.getById);
router.put("/:id", PasswordController.update);
router.delete("/:id", PasswordController.delete);


// h:\boltsecureServerNode\src\routes\operations.routes.ts
router.post("/creditCard/:id", CreditCardController.createCreditCard);
router.get("/creditCard/user/:userId", CreditCardController.getAllByUserCreditCard);
router.get("/creditCard/:id", CreditCardController.getByIdCreditCard);
router.put("/creditCard/:id", CreditCardController.updateCreditCard);
router.delete("/creditCard/:id", CreditCardController.deleteCreditCard);



export default router;