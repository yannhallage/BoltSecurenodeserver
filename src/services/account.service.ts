import { Utilisateur, Otp } from "../models/general.model";
import crypto from "crypto";
import { sendEmail } from "../mails/mail";
import bcrypt from "bcrypt";

class AccountService {

    static async sendOtp(email: string) {
        let user = await Utilisateur.findOne({ email });
        if (!user) {
            user = new Utilisateur({ email, motDePasse: "", masterKey: "" });
            await user.save();
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await Otp.findOneAndUpdate(
            { email },
            { code, expiresAt },
            { upsert: true, new: true }
        );

        await sendEmail(`${email}`, `Votre code OTP est : ${code}`);
    }

    static async verifyOtpWithemail(input: { email: string; otp: string }) {
        const otpRecord = await Otp.findOne({ email: input.email });
        if (!otpRecord || otpRecord.code !== input.otp || otpRecord.expiresAt < new Date()) {
            throw new Error("OTP invalide ou expiré");
        }

        const user = await Utilisateur.findOneAndUpdate(
            { email: input.email },
            { new: true }
        );
        return user!;
    }
    
    static async verifyOtpAndSetPassword(input: { email: string; otp: string; motDePasse: string }) {
        const otpRecord = await Otp.findOne({ email: input.email });
        if (!otpRecord || otpRecord.code !== input.otp || otpRecord.expiresAt < new Date()) {
            throw new Error("OTP invalide ou expiré");
        }

        const hashedPassword = await bcrypt.hash(input.motDePasse, 10);
        const user = await Utilisateur.findOneAndUpdate(
            { email: input.email },
            { motDePasse: hashedPassword },
            { new: true }
        );

        await Otp.deleteOne({ email: input.email });
        return user!;
    }

    static async setMasterKey(input: { email: string; motDePasse: string; masterKey: string; otp: string }) {
        const user = await Utilisateur.findOne({ email: input.email });
        if (!user) throw new Error("Utilisateur introuvable");

        const validPassword = await bcrypt.compare(input.motDePasse, user.motDePasse);
        if (!validPassword) throw new Error("Mot de passe incorrect");

        const hashedMasterKey = await bcrypt.hash(input.masterKey, 10);
        user.masterKey = hashedMasterKey;
        await user.save();

        return user;
    }
}

export default AccountService;
