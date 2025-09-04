import { Request, Response } from "express";
import AccountService from "../services/account.service";
import { IAuthEmailInput, IAuthmotDePasseInput, IAuthOtpVerificationInput, IAuthMasterKeyInput } from "../schemas/account.shemas";

class AuthController {

    static async sendOtp(req: Request, res: Response) {
        try {
            const input: IAuthEmailInput = req.body;
            // console.log(input)
            await AccountService.sendOtp(input.email);
            return res.status(200).json({ message: "OTP envoyé avec succès." });
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }

    static async verifyOtp(req: Request, res: Response) {
        try {
            const input: IAuthOtpVerificationInput = req.body;
            const user = await AccountService.verifyOtpWithemail(input);
            return res.status(200).json({ userId: user._id, email: user.email });
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }

    static async verifyOtpAndSetPassword(req: Request, res: Response) {
        try {
            const input: IAuthmotDePasseInput = req.body;
            const user = await AccountService.verifyOtpAndSetPassword(input);
            return res.status(200).json({ userId: user._id, email: user.email });
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }

    static async setMasterKey(req: Request, res: Response) {
        try {
            const input: IAuthMasterKeyInput = req.body;
            const user = await AccountService.setMasterKey(input);
            return res.status(200).json({ userId: user._id, email: user.email });
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export default AuthController;
