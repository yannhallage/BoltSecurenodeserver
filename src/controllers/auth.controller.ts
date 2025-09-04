// src/controllers/account.controller.ts
import { Request, Response } from "express";
import {
    ILoginEmailInput,
    ILoginmotDePasseInput,
    ILoginMasterKeyInput
 } from "../schemas/auth.shemas";
import AuthService from "../services/auth.service";

export default class AuthController {
    
    static async VerifyEmail(req: Request, res: Response) {
        try {
            const email: ILoginEmailInput = req.body;
            const result = await AuthService.VerifyEmail(email);
            res.status(200).json(result);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async VerifyPassword(req: Request, res: Response) {
        try {
            const motdepasse: ILoginmotDePasseInput = req.body;
            const result = await AuthService.VerifyPassword(motdepasse);
            res.status(200).json(result);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async VerifyMasterKey(req: Request, res: Response) {
        try {
            const masterkey: ILoginMasterKeyInput = req.body;
            const result = await AuthService.VerifyMasterKey(masterkey);
            res.status(200).json(result);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
}
