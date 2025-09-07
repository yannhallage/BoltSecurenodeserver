import { Request, Response } from "express";
import { AuthService } from "../../auth/registerService.google";
import { GoogleAuthRequest } from "../../types/google.type";

export class AuthController {
    static async googleAuth(req: Request, res: Response) {
        try {
            const { token } = req.body as GoogleAuthRequest;

            if (!token) {
                return res.status(400).json({ message: "Token Google manquant" });
            }

            const authResponse = await AuthService.verifyGoogleToken(token);

            return res.status(200).json(authResponse);
        } catch (err: any) {
            return res.status(401).json({ message: err.message || "Échec d'auth Google" });
        }
    }
}
