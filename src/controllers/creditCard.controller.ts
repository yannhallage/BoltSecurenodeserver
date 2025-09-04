// src/controllers/creditCard.controller.ts
import { Request, Response } from "express";
import CreditCardService from "../services/creditCard.service";
import { z } from "zod";
import { CreditCardZod } from "../schemas/operation.schemas";

export default class CreditCardController {

    static async createCreditCard(req: Request, res: Response) {
        try {
            const CreditCardSendingData  : z.infer<typeof CreditCardZod> = req.body;
            const creditCard = await CreditCardService.createCreditCard(CreditCardSendingData)
            return res.status(201).json(creditCard);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getAllByUserCreditCard(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const cards = await CreditCardService.getAllByUserCreditCard(userId);
            return res.status(200).json(cards);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async getByIdCreditCard(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const card = await CreditCardService.getByIdCreditCard(id);
            return res.status(200).json(card);
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }

    static async updateCreditCard(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedCard = await CreditCardService.updateCreditCard(id, req.body);
            return res.status(200).json(updatedCard);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async deleteCreditCard(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await CreditCardService.deleteCreditCard(id);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }
}
