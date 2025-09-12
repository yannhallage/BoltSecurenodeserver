
import { Utilisateur } from "../models/general.model";
import { LoginEmail, LoginPasswordUserZod, LoginMasterKeyUserZod } from "../schemas/auth.shemas";
import { z } from "zod";
import bcrypt from "bcrypt";
import { randomInt } from "crypto";
import { CreerToken } from "../utils/creerToken";

export default class AuthService {

    static async VerifyEmail(input: z.infer<typeof LoginEmail>) {
        const { email } = LoginEmail.parse(input);

        const user = await Utilisateur.findOne({ email });
        if (!user) throw new Error("Utilisateur introuvable");

        return {
            message: "Email verifié avec success !"
        }
    }

    static async VerifyPassword(input: z.infer<typeof LoginPasswordUserZod>) {
        const { email, motDePasse } = LoginPasswordUserZod.parse(input);

        const user = await Utilisateur.findOne({ email });
        if (!user) throw new Error("Utilisateur introuvable");

        const valid = await bcrypt.compare(motDePasse, user.motDePasse);
        if (!valid) throw new Error("Mot de passe incorrect");

        return { message: "Authentification réussie (mot de passe)" };
    }


    static async VerifyMasterKey(input: z.infer<typeof LoginMasterKeyUserZod>) {
        const { email, motDePasse, masterKey } = LoginMasterKeyUserZod.parse(input);

        const user = await Utilisateur.findOne({ email });
        if (!user) throw new Error("Utilisateur introuvable");

        const valid = await bcrypt.compare(masterKey, user.masterKey);
        if (!valid) throw new Error("Mot de passe incorrect");

        const token_connexion = CreerToken(
            user.motDePasse,
            user.email,
            user.masterKey
        )
        return {
            message: "Authentification réussie (masterKey)",
            user,
            token_connexion
        };
    }
}
