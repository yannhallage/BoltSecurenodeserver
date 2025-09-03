// Représente un utilisateur
export interface Utilisateur {
    id: string
    email: string
    motDePasse: string // hashé, jamais stocké en clair
    masterKey: string  // hashée
    compteGoogle?: string // si connecté via Google
    dateCreation: Date
    dateDerniereConnexion: Date
    donnees?: Dossier[]
}

// Représente un dossier ou données que l'utilisateur peut gérer
export interface Dossier {
    id: string
    titre: string
    contenu: string
    dateCreation: Date
    dateModification: Date
}

// Objet pour la création d’un compte
export interface CreationComptePayload {
    email: string
    motDePasse: string
    masterKey: string
    compteGoogle?: string
}

// Objet pour l’authentification
export interface AuthPayload {
    email: string
    motDePasse: string
    masterKey: string
}

// Objet réponse d’authentification
export interface AuthResponse {
    success: boolean
    token?: string
    message?: string
    utilisateur?: Utilisateur
}

// API générique
export interface ApiResponse<T> {
    success: boolean
    data?: T
    message?: string
}
