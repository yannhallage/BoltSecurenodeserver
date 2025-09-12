import jwt from "jsonwebtoken";


export const CreerToken = (sub: string, email: string, name: string): string => {

    return jwt.sign(
        {
            sub: sub,
            email: email,
            name: name,
        },
        process.env.JWT_SECRET || "supersecret",
        { expiresIn: "1h" }
    );
}