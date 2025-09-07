import express from 'express';
import passport from "./auth/auth.google";
import session from "express-session";
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';
import AccountRoute from './routes/account.routes';
import AuthRoute from './routes/auth.routes';
import OperationsRoute from './routes/operations.routes';
import GoogleAuth from './routes/google/google.routes'

dotenv.config();

class App {
    public app: express.Application;
    public port: number;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || '2001', 10);

        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares(): void {
        this.app.use(helmet());
        this.app.use(cors({
            origin: "http://localhost:5173",
            credentials: true
        }));
        this.app.use(express.json({ limit: "10mb" }));
        this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));
        this.app.use(morgan("dev"));

        // Sessions
        this.app.use(
            session({
                secret: process.env.SESSION_SECRET || "secret",
                resave: false,
                saveUninitialized: false,
            })
        );

        // Passport
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        // Rate limiter
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100,
            message: "Trop de requêtes, veuillez réessayer plus tard."
        });
        this.app.use("/api/", limiter);
    }

    private initializeRoutes(): void {
        console.log('Initializing routes...');

        this.app.get('/health', (req, res) => {
            res.status(200).json({
                status: 'OK',
                timestamp: new Date().toISOString(),
                uptime: process.uptime()
            });
        });

        // Google Login
        this.app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

        this.app.get(
            "/auth/google/callback",
            passport.authenticate("google", { failureRedirect: "/" }),
            (req, res) => {
                res.redirect("http://localhost:5173/profile");
            }
        );

        // Route protégée
        this.app.get('/profile', (req, res) => {
            if (req.isAuthenticated()) {
                res.json(req.user);
            } else {
                res.status(401).send('Not authenticated');
            }
        });

        this.app.use('/api/creationcompte', AccountRoute);
        this.app.use('/api/auth', AuthRoute);
        this.app.use('/api/operations', OperationsRoute);
        this.app.use('/api/google', GoogleAuth);

        // Catch-all route
        this.app.use(/.*/, (req, res) => {
            res.status(404).json({
                error: 'Route introuvable',
                path: req.originalUrl
            });
        });
    }

    private initializeErrorHandling(): void {
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
        this.app.listen(this.port, () => {
            console.log(`🚀 Serveur lancé sur http://localhost:${this.port}`);
            console.log(`💡 Test santé : http://localhost:${this.port}/health`);
        });
    }
}

export default App;
