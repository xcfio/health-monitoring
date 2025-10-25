import createError, { FastifyError } from "@fastify/error"

/**
 * Type guard to check if a given error is a FastifyError.
 *
 * This function ensures type narrowing in TypeScript by returning
 * a type predicate. It is useful when handling errors in Fastify
 * applications to distinguish Fastify-specific errors from generic ones.
 *
 * @param {any} error - The error object to check
 * @returns {error is FastifyError} True if the error is an instance of FastifyError, otherwise false
 *
 * @example
 * ```typescript
 * try {
 *   // Some Fastify operation
 * } catch (error) {
 *   if (isFastifyError(error)) throw error
 *   console.trace(error);
 * }
 * ```
 */
export function isFastifyError(error: any): error is FastifyError {
    return error instanceof FastifyError
}

/**
 * Creates a custom Fastify error using @fastify/error factory
 *
 * This function creates properly formatted Fastify errors that work seamlessly
 * with Fastify's error handling and serialization system.
 *
 * @param {number} statusCode - HTTP status code (e.g., 400, 404, 500)
 * @param {string} code - Unique error code identifier (e.g., 'USER_NOT_FOUND')
 * @param {string} message - Human-readable error message
 * @param {Record<string, any>} [details] - Optional additional error details
 *
 * @returns {Error} Fastify-compatible error instance
 *
 * @example
 * ```typescript
 * // Create and throw an error
 * throw CreateError(404, 'USER_NOT_FOUND', 'User not found', { userId: '123' });
 *
 * // Create error for conditional throwing
 * const error = CreateError(400, 'VALIDATION_ERROR', 'Invalid input');
 * if (shouldThrow) throw error;
 * ```
 */
export function CreateError(
    statusCode: number,
    code: string,
    message: string,
    details?: Record<string, any>
): FastifyError {
    // Validate inputs
    if (!Number.isInteger(statusCode) || statusCode < 100 || statusCode >= 600) {
        throw new TypeError("statusCode must be a valid HTTP status code (100-599)")
    }

    if (!code || typeof code !== "string" || code.trim().length === 0) {
        throw new TypeError("code must be a non-empty string")
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
        throw new TypeError("message must be a non-empty string")
    }

    // Create the error class using Fastify's factory
    const CustomError = createError(code.trim().toUpperCase(), message, statusCode)

    // Create an instance of the error
    const errorInstance = new CustomError()

    // Add details if provided
    if (details && Object.keys(details).length > 0) {
        Object.assign(errorInstance, { details: { ...details } })
    }

    return errorInstance
}
