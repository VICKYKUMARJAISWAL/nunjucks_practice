export class AppError extends Error {
//This is our custom application exception class.
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(
        message: string,
        statusCode: number = 500,
        isOperational: boolean = true
    ) {
        super(message);

        this.statusCode = statusCode;
        this.isOperational = isOperational;

        this.name = "AppError";

        Error.captureStackTrace(this, this.constructor);
    }
}