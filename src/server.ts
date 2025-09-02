import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import http from "http";
import App from "./app";
import { connectToDatabase } from "./config/database";

const startServer = async () => {
    try {
        // console.log("MONGO_URI =", process.env.MONGO_URI);
        await connectToDatabase();

        const app = new App();
        const server = http.createServer(app.app);

        server.listen(app.port, () => {
            console.log(`🚀 Serveur lancé sur http://localhost:${app.port}`);
        });
    } catch (error) {
        console.error("❌ Erreur au démarrage du serveur :", error);
        process.exit(1);
    }
};

startServer();
