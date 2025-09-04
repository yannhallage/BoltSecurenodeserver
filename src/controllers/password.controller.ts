
import { Request, Response } from "express";
import PasswordService from "../services/password.service";

export default class PasswordController {
    
    static async create(req: Request, res: Response) {
        try {
            const password = await PasswordService.create(req.body);
            res.status(201).json(password);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async getAllByUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const passwords = await PasswordService.getAllByUser(userId);
            res.status(200).json(passwords);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const password = await PasswordService.getById(id);
            res.status(200).json(password);
        } catch (err: any) {
            res.status(404).json({ error: err.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const password = await PasswordService.update(id, req.body);
            res.status(200).json(password);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await PasswordService.delete(id);
            res.status(200).json(result);
        } catch (err: any) {
            res.status(404).json({ error: err.message });
        }
    }
}
