import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) throw new Error("MONGO_URI non défini dans .env");

        await mongoose.connect(uri);
        console.log("✅ MongoDB connecté !");
    } catch (error) {
        console.error("❌ Erreur de connexion à MongoDB :", error);
        process.exit(1);
    }
};
