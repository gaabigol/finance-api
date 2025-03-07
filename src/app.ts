import express, { Express } from 'express'
import createHttpError from 'http-errors'

import { router } from './Infrastructure/Http/Router/Routes'
import { MiddlewareConfig } from './Infrastructure/Http/Middleware/MidlewareConfig'
import errorHandlerMiddleware from './Infrastructure/Http/Middleware/ErrorHandler'

export class App {
    private app: Express
    private middlewareConfig: MiddlewareConfig

    constructor() {
        this.app = express()
        this.middlewareConfig = new MiddlewareConfig()

        this.configureMiddlewares()
        this.configureRoutes()
        this.configureErrorHandling()
    }

    private configureMiddlewares(): void {
        this.app.use(express.json({ limit: '10mb' }))
        this.app.use(express.urlencoded({ extended: true }))
        this.middlewareConfig.applyCors(this.app)
        this.middlewareConfig.applyHelmet(this.app)
        this.middlewareConfig.applyRateLimiting(this.app)
    }

    private configureRoutes(): void {
        this.app.use('/api/v1', router)
    }

    private configureErrorHandling(): void {
        this.app.use((req, res, next) => {
            next(createHttpError(404, 'Endpoint não encontrado'))
        })
        this.app.use(errorHandlerMiddleware)
    }

    public getExpressApp(): Express {
        return this.app
    }
}
