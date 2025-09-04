// src/services/password.service.ts
import { Password } from "../models/general.model";
import { PasswordZod } from "../schemas/operation.schemas";
import { z } from "zod";
import bcrypt from "bcrypt";

export default class PasswordService {

    static async create(input: z.infer<typeof PasswordZod>) {
        const data = PasswordZod.parse(input);


        const hashedPassword = await bcrypt.hash(data.motDePasse, 10);
        data.motDePasse = hashedPassword;

        const password = new Password(data);
        await password.save();
        return password;
    }

    static async getAllByUser(userId: string) {
        return await Password.find({ proprietaireId: userId });
    }


    static async getById(id: string) {
        const password = await Password.findById(id);
        if (!password) throw new Error("Password introuvable");
        return password;
    }


    static async update(id: string, input: Partial<z.infer<typeof PasswordZod>>) {
        const data = PasswordZod.partial().parse(input);

        if (data.motDePasse) {
            data.motDePasse = await bcrypt.hash(data.motDePasse, 10);
        }

        const password = await Password.findByIdAndUpdate(id, data, { new: true });
        if (!password) throw new Error("Password introuvable");
        return password;
    }

    static async delete(id: string) {
        const password = await Password.findByIdAndDelete(id);
        if (!password) throw new Error("Password introuvable");
        return { message: "Password supprimé avec succès" };
    }
}
