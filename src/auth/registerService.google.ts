import axios from "axios";
import jwt from "jsonwebtoken";
import { GoogleUser, AuthResponse } from "../types/google.type";

const GOOGLE_TOKEN_INFO_URL = "https://oauth2.googleapis.com/tokeninfo?id_token=";

export class AuthService {
    static async verifyGoogleToken(token: string): Promise<AuthResponse> {
        try {
            const res = await axios.get(GOOGLE_TOKEN_INFO_URL + token);
            const data: GoogleUser = res.data;

            if (!data.email_verified) {
                throw new Error("Email non vérifié par Google");
            }

            const internalToken = jwt.sign(
                {
                    sub: data.sub,
                    email: data.email,
                    name: data.name,
                },
                process.env.JWT_SECRET || "supersecret",
                { expiresIn: "1h" }
            );

            return {
                token: internalToken,
                user: data,
            };
        } catch (err) {
            throw new Error("Token Google invalide");
        }
    }
}
