// src/services/creditCard.service.ts
import { CreditCard } from "../models/general.model";
import { CreditCardZod } from "../schemas/operation.schemas";
import { z } from "zod";
import bcrypt from "bcrypt";

export default class CreditCardService {

    static async createCreditCard(input: z.infer<typeof CreditCardZod>) {
        const data = CreditCardZod.parse(input);

        // Hasher les champs sensibles
        data.numeroCarte = await bcrypt.hash(data.numeroCarte, 10);
        data.cvc = await bcrypt.hash(data.cvc, 10);

        const creditCard = new CreditCard(data);
        await creditCard.save();
        return creditCard;
    }

    static async getAllByUserCreditCard(userId: string) {
        return await CreditCard.find({ proprietaireId: userId });
    }

    static async getByIdCreditCard(id: string) {
        const creditCard = await CreditCard.findById(id);
        if (!creditCard) throw new Error("Carte introuvable");
        return creditCard;
    }

    static async updateCreditCard(id: string, input: Partial<z.infer<typeof CreditCardZod>>) {
        const data = CreditCardZod.partial().parse(input);

        if (data.numeroCarte) data.numeroCarte = await bcrypt.hash(data.numeroCarte, 10);
        if (data.cvc) data.cvc = await bcrypt.hash(data.cvc, 10);

        const creditCard = await CreditCard.findByIdAndUpdate(id, data, { new: true });
        if (!creditCard) throw new Error("Carte introuvable");
        return creditCard;
    }

    static async deleteCreditCard(id: string) {
        const creditCard = await CreditCard.findByIdAndDelete(id);
        if (!creditCard) throw new Error("Carte introuvable");
        return { message: "Carte supprimée avec succès" };
    }
}
