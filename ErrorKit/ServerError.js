class ServerError extends Error {
    constructor(message, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params)

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServerError)
        }
        this.name = 'ServerError'
        // Custom debugging information
        this.message = message
        this.date = new Date()
    }
}
// try {
//     throw new ServerError("blabla")

// } catch (err) {
//     console.log(err.name, err.stack, err.date, err.message);
//     console.log(err);
//     console.log(err instanceof Error ? "EvalError" : "not EvalError")
//     console.log(err instanceof ServerError ? "ServerError" : "not ServerError")
// }
module.exports.ServerError = ServerError;

