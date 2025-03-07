import createError from 'http-errors'
import { HTTPStatusCode } from '../../Infrastructure/Http/Constants/HttpStatusCode'

export class HttpErrorFactory {
    static createBadRequest(message: string = 'Bad Request', details?: any) {
        return createError(HTTPStatusCode.BadRequest, message, { details })
    }

    static createUnauthorized(message: string = 'Unauthorized', details?: any) {
        return createError(HTTPStatusCode.Unauthorized, message, { details })
    }

    static createForbidden(message: string = 'Forbidden', details?: any) {
        return createError(HTTPStatusCode.Forbidden, message, { details })
    }

    static createNotFound(message: string = 'Not Found', details?: any) {
        return createError(HTTPStatusCode.NotFound, message, { details })
    }

    static createConflict(message: string = 'Conflict', details?: any) {
        return createError(HTTPStatusCode.Conflict, message, { details })
    }

    static createInternalServerError(
        message: string = 'Internal Server Error',
        details?: any,
    ) {
        return createError(HTTPStatusCode.InternalServerError, message, {
            details,
        })
    }
}
