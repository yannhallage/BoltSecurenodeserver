// Représente un mot de passe enregistré par l’utilisateur
export interface Password {
    id: string
    titre: string              // Nom du service (ex: Gmail, Facebook, etc.)
    identifiant: string        // Email ou nom d’utilisateur
    motDePasse: string         // Mot de passe chiffré
    reference?: PasswordReference // Référence pour retrouver l'accès
    dateCreation: Date
    dateModification: Date
    proprietaireId: string     // Référence à l'utilisateur
}

// Référence (email ou compte social lié au mot de passe)
export interface PasswordReference {
    type: 'email' | 'reseau_social' | 'autre'
    valeur: string // ex: adresse mail, identifiant de réseau social
}

// Payload pour créer un mot de passe
export interface CreatePasswordPayload {
    titre: string
    identifiant: string
    motDePasse: string
    reference?: PasswordReference
    proprietaireId: string
}

// Payload pour mettre à jour un mot de passe
export interface UpdatePasswordPayload {
    id: string
    titre?: string
    identifiant?: string
    motDePasse?: string
    reference?: PasswordReference
}
