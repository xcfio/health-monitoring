import { isFastifyError, ValidationErrorHandler } from "./function"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import Fastify from "fastify"
import { readFileSync } from "node:fs"

export async function main() {
    const isDevelopment = process.env.NODE_ENV === "development"
    const fastify = Fastify({
        trustProxy: true,
        logger: {
            formatters: { level: (level, number) => ({ level: `${level} (${number})` }) },
            file: isDevelopment ? "./log.json" : undefined
        },
        schemaErrorFormatter: ValidationErrorHandler
    }).withTypeProvider<TypeBoxTypeProvider>()

    fastify.get("/status", (_, reply) => reply.code(200).send("OK"))
    fastify.get("/", (_, reply) => reply.type("text/html").send(readFileSync(".temp/HealthMonitoring_Dashboard.html")))

    fastify.addHook("onError", (_, reply, error) => {
        if ((Error.isError(error) && error.message.startsWith("Rate limit exceeded")) || isFastifyError(error)) {
            throw error
        } else {
            console.trace(error)
            return reply.code(500).send({ error: "Internal Server Error" })
        }
    })

    await fastify.listen({ host: "0.0.0.0", port: 7200 })
    console.log(`Server listening at http://localhost:7200`)
    return fastify
}

main()
