import { z } from "zod"

// Utilisateur
export const UtilisateurZod = z.object({
    email: z.string().email(),
    motDePasse: z.string().min(8), // hashé (mais on vérifie min)
    masterKey: z.string().min(8),  // hashée
    compteGoogle: z.string().optional(),
    dateCreation: z.date().optional(),
    dateDerniereConnexion: z.date().optional(),
    passwords: z.array(z.string().uuid().or(z.string())).optional(), // ObjectId -> string
    creditCards: z.array(z.string().uuid().or(z.string())).optional()
})

// Password
export const PasswordZod = z.object({
    titre: z.string().min(1),
    identifiant: z.string().min(1),
    motDePasse: z.string().min(8), // chiffré
    reference: z
        .object({
            type: z.enum(["email", "reseau_social", "autre"]),
            valeur: z.string().min(1)
        })
        .optional(),
    proprietaireId: z.string(), // ObjectId string
    dossierId: z.string().optional(), // ObjectId string
    dateCreation: z.date().optional(),
    dateModification: z.date().optional()
})

// CreditCard
export const CreditCardZod = z.object({
    titre: z.string().min(1),
    nomTitulaire: z.string().min(1),
    numeroCarte: z.string().min(12), // chiffré mais min de digits
    dateExpiration: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format MM/YY invalide"),
    cvc: z.string().min(3), // chiffré
    reference: z
        .object({
            type: z.enum(["reseau_social", "banque", "autre"]),
            valeur: z.string().min(1)
        })
        .optional(),
    proprietaireId: z.string(),
    dateAjout: z.date().optional(),
    dateModification: z.date().optional()
})

// Dossier
export const DossierZod = z.object({
    titre: z.string().min(1),
    description: z.string().optional(),
    proprietaireId: z.string(),
    passwords: z.array(z.string()).optional(), // ObjectIds
    dateCreation: z.date().optional(),
    dateModification: z.date().optional()
})
