import { Request, Response, NextFunction } from 'express'
import { HttpError } from 'http-errors'

export const errorHandlerMiddleware = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction, // eslint-disable-line
) => {
    const statusCode = err.statusCode || err.status || 500
    const message = err.message || 'Internal Server Error'
    const details = err.details || undefined

    if (process.env.NODE_ENV !== 'production') {
        console.error(`[ERROR] ${statusCode} - ${message}`)
        console.error(err.stack)
    }

    res.status(statusCode).json({
        error: true,
        statusCode,
        message,
        details: process.env.NODE_ENV !== 'production' ? details : undefined,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    })
}

export default errorHandlerMiddleware
