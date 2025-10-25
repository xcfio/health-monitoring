import { SchemaErrorFormatter } from "fastify/types/schema"
import { CreateError } from "./error"

export interface SchemaValidationError {
    instancePath?: string
    keyword: string
    message?: string
    params?: {
        allowedValue?: any
        [key: string]: any
    }
}

export interface ErrorsByPath {
    [key: string]: SchemaValidationError[]
}

// prettier-ignore
export function ValidationErrorHandler(errors: Parameters<SchemaErrorFormatter>["0"], dataVar: Parameters<SchemaErrorFormatter>["1"]) {
    const path = typeof dataVar === "string" ? dataVar : "unknown"

    const errorsByPath: ErrorsByPath = {}

    errors.forEach((error: SchemaValidationError) => {
        const instancePath = error.instancePath || "root"
        if (!errorsByPath[instancePath]) {
            errorsByPath[instancePath] = []
        }
        errorsByPath[instancePath].push(error)
    })

    const errorMessages: string[] = []

    Object.entries(errorsByPath).forEach(([instancePath, pathErrors]) => {
        const constErrors = pathErrors.filter((e: SchemaValidationError) => e.keyword === "const")
        const otherErrors = pathErrors.filter(
            (e: SchemaValidationError) => e.keyword !== "const" && e.keyword !== "anyOf"
        )

        if (constErrors.length > 0) {
            const allowedValues = constErrors.map((e: SchemaValidationError) => e.params?.allowedValue).filter(Boolean)
            if (allowedValues.length > 0) {
                const fieldName = instancePath.replace("/", "") || "field"
                errorMessages.push(`${fieldName} must be one of: ${allowedValues.join(", ")}`)
            } else {
                errorMessages.push(
                    ...constErrors.map(
                        (e: SchemaValidationError) =>
                            `${instancePath.replace("/", "") || "field"}: ${e.message || "Invalid value"}`
                    )
                )
            }
        }

        if (otherErrors.length > 0) {
            errorMessages.push(
                ...otherErrors.map((e: SchemaValidationError) => {
                    const fieldName = instancePath.replace("/", "") || "field"
                    return `${fieldName}: ${e.message || "Invalid value"}`
                })
            )
        }

        if (constErrors.length === 0 && otherErrors.length === 0) {
            errorMessages.push(...pathErrors.map((e: SchemaValidationError) => e.message || "Unknown error"))
        }
    })

    const finalMessage = errorMessages.length > 0 ? errorMessages.join("; ") : "Validation failed"

    return CreateError(400, "SCHEMA_VALIDATION_ERROR", `Schema validation failed for ${path}: ${finalMessage}`)
}
