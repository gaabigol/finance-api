import { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

export class MiddlewareConfig {
    public applyCors(app: Express): void {
        app.use(
            cors({
                origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
                allowedHeaders: ['Content-Type', 'Authorization'],
                credentials: true,
                maxAge: 86400, // 1 day
            }),
        )
    }

    public applyHelmet(app: Express): void {
        app.use(helmet())
    }

    public applyRateLimiting(app: Express): void {
        app.use(
            rateLimit({
                windowMs: 15 * 60 * 1000,
                max: 100,
                standardHeaders: true,
                legacyHeaders: false,
                message:
                    'Muitas requisições deste IP, por favor tente novamente após 15 minutos',
            }),
        )
    }
}
