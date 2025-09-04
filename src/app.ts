import express, { Application, Request, Response, NextFunction } from 'express';

import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';
import AccountRoute from './routes/account.routes';
import AuthRoute from './routes/auth.routes';
import OperationsRoute from './routes/operations.routes';

dotenv.config();

class App {
    public app: any;
    public port: number;

    constructor() {
        this.app = express();

        this.port = parseInt(process.env.PORT || '5000', 10);
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares(): void {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json({ limit: "10mb" }));
        this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));
        this.app.use(morgan("dev"));

        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100,
            message: "Trop de requêtes, veuillez réessayer plus tard."
        });
        this.app.use("/api/", limiter);
    }


    private initializeRoutes(): void {
        console.log('Initializing routes...');

        this.app.get('/health', (req: any, res: any) => {
            console.log('Handling /health route');
            res.status(200).json({
                status: 'OK',
                timestamp: new Date().toISOString(),
                uptime: process.uptime()
            });
        });

        this.app.use('/api/creationcompte', AccountRoute)
        this.app.use('/api/auth', AuthRoute)
        this.app.use('/api/operations', OperationsRoute)

        // Catch-all route
        this.app.use(/.*/, (req: any, res: any) => {
            console.log('Handling catch-all route');
            res.status(404).json({
                error: 'Route introuvable',
                path: req.originalUrl
            });
        });
    }

    private initializeErrorHandling(): void {
        console.log('Initializing error handling...');

        this.app.use((err: any, req: any, res: any, next: any) => {
            console.error('[Erreur Serveur]', err.stack);
            res.status(500).json({
                error: process.env.NODE_ENV === 'production'
                    ? 'Erreur interne du serveur'
                    : err.message,
                timestamp: new Date().toISOString()
            });
        });
    }

    public listen(): void {
        console.log('Starting server...');
        this.app.listen(this.port, () => {
            console.log(`🚀 Serveur lancé sur http://localhost:${this.port}`);
            console.log(`🌱 ENV : ${process.env.NODE_ENV}`);
            console.log(`💡 Test santé : http://localhost:${this.port}/health`);
        });
    }
}

export default App;
