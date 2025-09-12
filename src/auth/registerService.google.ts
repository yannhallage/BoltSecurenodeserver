import axios from "axios";
// import jwt from "jsonwebtoken";
import AccountService from "../services/account.service";
import { GoogleUser, AuthResponse } from "../types/google.type";
import { CreerToken } from "../utils/creerToken";

const GOOGLE_TOKEN_INFO_URL = "https://oauth2.googleapis.com/tokeninfo?id_token=";

export class AuthService {
    static async verifyGoogleToken(token: string): Promise<AuthResponse> {
        try {
            const res = await axios.get(GOOGLE_TOKEN_INFO_URL + token);
            const data: GoogleUser = res.data;

            if (!data.email_verified) {
                throw new Error("Email non vérifié par Google");
            }

            const internalToken = CreerToken(data.sub, data.email, data.name)

            await AccountService.sendOtp(data.email);
            console.log("OTP envoyé avec succès.")
            return {
                token: internalToken,
                user: data,
            };
        } catch (err) {
            throw new Error("Token Google invalide");
        }
    }
}
