export interface GoogleAuthRequest {
    token: string; // token reçu du frontend
}

export interface GoogleUser {
    sub: string;        // ID unique Google
    email: string;
    email_verified: boolean;
    name: string;
    picture: string;
}

export interface AuthResponse {
    token: string;      // ton JWT interne
    user: GoogleUser;   // infos utilisateur
}
