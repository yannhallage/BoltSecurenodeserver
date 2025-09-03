// Représente une carte de crédit enregistrée par l’utilisateur
export interface CreditCard {
    id: string                  // UID unique
    titre: string               // Obligatoire : titre (ex: "Visa", "MasterCard", "Carte Pro")
    nomTitulaire: string        // Nom du propriétaire de la carte
    numeroCarte: string         // Numéro de la carte (toujours chiffré côté serveur)
    dateExpiration: string      // Format MM/AA ou MM/YYYY
    cvc: string                 // Code de sécurité (chiffré côté serveur)
    reference?: CreditCardReference // Lien vers un réseau social ou un service
    proprietaireId: string      // Référence à l'utilisateur propriétaire
    dateAjout: Date
    dateModification: Date
}

// Référence qui pointe vers un réseau social ou un autre service
export interface CreditCardReference {
    type: 'reseau_social' | 'banque' | 'autre'
    valeur: string // ex: "Facebook Ads", "PayPal", "BNP Paribas"
}

// Payload pour créer une carte
export interface CreateCreditCardPayload {
    titre: string
    nomTitulaire: string
    numeroCarte: string
    dateExpiration: string
    cvc: string
    reference?: CreditCardReference
    proprietaireId: string
}

// Payload pour mettre à jour une carte
export interface UpdateCreditCardPayload {
    id: string
    titre?: string
    nomTitulaire?: string
    numeroCarte?: string
    dateExpiration?: string
    cvc?: string
    reference?: CreditCardReference
}
