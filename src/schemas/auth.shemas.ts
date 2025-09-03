
import { z } from "zod"

// Étape 1 : Vérification Email
export const AuthEmailZod = z.object({
    email: z.string().email("Email invalide")
})
export type IAuthEmailInput = z.infer<typeof AuthEmailZod>

// Étape 2 : Vérification du mot de passe utilsateur
export const Step2Schema = z.object({
    email: z.string().email("Email invalide"),
    otp: z.string().length(6, "Le code OTP doit avoir 6 chiffres"),
});

// Étape 3 : Vérification du mot de passe utilsateur
export const AuthPasswordUserZod = z.object({
    email: z.string().email(),
    motDePasse: z.string().min(8, "mot de passe trop court"),
    otp: z.string().length(6, "Le code OTP doit avoir 6 chiffres"),
})
export type IAuthmotDePasseInput = z.infer<typeof AuthPasswordUserZod>

// Étape 3 : Vérification Master Key
export const AuthMasterKeyZod = z.object({
    email: z.string().email(),
    motDePasse: z.string().min(8, "mot de passe trop court"),
    masterKey: z.string().min(8, "Master Key trop courte"),
    otp: z.string().length(6, "Le code OTP doit avoir 6 chiffres")
})
export type IAuthMasterKeyInput = z.infer<typeof AuthMasterKeyZod>

// Étape 3 : Réponse finale
export const AuthResponseZod = z.object({
    userId: z.string(),
    email: z.string().email(),
    accessToken: z.string(),
    refreshToken: z.string().optional()
})
export type IAuthResponse = z.infer<typeof AuthResponseZod>
