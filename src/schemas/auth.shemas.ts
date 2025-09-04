import { z } from "zod"


export const LoginEmail = z.object({
    email: z.string().email(),
})
export type ILoginEmailInput = z.infer<typeof LoginEmail>

export const LoginPasswordUserZod = z.object({
    email: z.string().email(),
    motDePasse: z.string().min(8, "mot de passe trop court"),
})
export type ILoginmotDePasseInput = z.infer<typeof LoginPasswordUserZod>

export const LoginMasterKeyUserZod = z.object({
    email: z.string().email(),
    motDePasse: z.string().min(8, "mot de passe trop court"),
    masterKey: z.string().min(8, "Master Key trop courte"),
})
export type ILoginMasterKeyInput = z.infer<typeof LoginMasterKeyUserZod>