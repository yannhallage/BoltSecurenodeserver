import mongoose, { Schema, Document, Model } from "mongoose"

/* ------------------------------
   Interfaces TypeScript
--------------------------------*/

// Utilisateur
export interface IUtilisateur extends Document {
    email: string
    motDePasse: string // hashé
    masterKey: string  // hashée
    compteGoogle?: string
    dateCreation: Date
    dateDerniereConnexion: Date
    passwords: mongoose.Types.ObjectId[] // relation avec Password
    creditCards: mongoose.Types.ObjectId[] // relation avec CreditCard
}

// Password
export interface IPassword extends Document {
    titre: string
    identifiant: string
    motDePasse: string // chiffré
    reference?: {
        type: "email" | "reseau_social" | "autre"
        valeur: string
    }
    proprietaireId: mongoose.Types.ObjectId // ref -> Utilisateur
    dateCreation: Date
    dateModification: Date
}

// CreditCard
export interface ICreditCard extends Document {
    titre: string
    nomTitulaire: string
    numeroCarte: string // chiffré
    dateExpiration: string // format MM/YY
    cvc: string // chiffré
    reference?: {
        type: "reseau_social" | "banque" | "autre"
        valeur: string
    }
    proprietaireId: mongoose.Types.ObjectId // ref -> Utilisateur
    dateAjout: Date
    dateModification: Date
}


export interface IDossier extends Document {
    titre: string
    description?: string
    proprietaireId: mongoose.Types.ObjectId // Utilisateur
    passwords: mongoose.Types.ObjectId[]    // liste de Password
    dateCreation: Date
    dateModification: Date
}


export interface IOtp extends Document {
    email: string
    code: string
    expiresAt: Date
}

/* ------------------------------
   Schemas Mongoose
--------------------------------*/

// Utilisateur
const UtilisateurSchema: Schema = new Schema<IUtilisateur>({
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: false, default: "" },
    masterKey: { type: String, required: false, default: "" },
    compteGoogle: { type: String },
    dateCreation: { type: Date, default: Date.now },
    dateDerniereConnexion: { type: Date, default: Date.now },
    passwords: [{ type: mongoose.Schema.Types.ObjectId, ref: "Password" }],
    creditCards: [{ type: mongoose.Schema.Types.ObjectId, ref: "CreditCard" }]
})

// Password
const PasswordSchema: Schema = new Schema({
    titre: { type: String, required: true },
    identifiant: { type: String, required: true },
    motDePasse: { type: String, required: true },
    trash: { type:Boolean, required: true },
    reference: {
        type: {
            type: String,
            enum: ["email", "reseau_social", "autre"]
        },
        valeur: String
    },
    proprietaireId: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
    dossierId: { type: mongoose.Schema.Types.ObjectId, ref: "Dossier" },
    dateCreation: { type: Date, default: Date.now },
    dateModification: { type: Date, default: Date.now }
})


// CreditCard
const CreditCardSchema: Schema = new Schema<ICreditCard>({
    titre: { type: String, required: true },
    nomTitulaire: { type: String, required: true },
    numeroCarte: { type: String, required: true }, // doit être chiffré
    dateExpiration: { type: String, required: true },
    cvc: { type: String, required: true }, // doit être chiffré
    reference: {
        type: {
            type: String,
            enum: ["reseau_social", "banque", "autre"]
        },
        valeur: String
    },
    proprietaireId: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
    dateAjout: { type: Date, default: Date.now },
    dateModification: { type: Date, default: Date.now }
})

const DossierSchema: Schema = new Schema<IDossier>({
    titre: { type: String, required: true },
    description: { type: String },
    proprietaireId: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
    passwords: [{ type: mongoose.Schema.Types.ObjectId, ref: "Password" }],
    dateCreation: { type: Date, default: Date.now },
    dateModification: { type: Date, default: Date.now }
})

const OtpSchema: Schema = new Schema<IOtp>({
    email: { type: String, required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true }
})
/* ------------------------------
   Models
--------------------------------*/

export const Utilisateur: Model<IUtilisateur> = mongoose.model<IUtilisateur>("Utilisateur", UtilisateurSchema)
export const Password: Model<IPassword> = mongoose.model<IPassword>("Password", PasswordSchema)
export const CreditCard: Model<ICreditCard> = mongoose.model<ICreditCard>("CreditCard", CreditCardSchema)
export const Dossier: Model<IDossier> = mongoose.model<IDossier>("Dossier", DossierSchema)
export const Otp: Model<IOtp> = mongoose.model<IOtp>("Otp", OtpSchema)
