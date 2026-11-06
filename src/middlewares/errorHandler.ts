import {
    Request,
    Response,
    NextFunction,
    ErrorRequestHandler
} from "express";
//This is the centralized exception handler.
import logger from "../config/logger";
import { AppError } from "../errors/AppError";

export const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {

    const statusCode =
        err instanceof AppError ? err.statusCode : 500;

    const isOperational =
        err instanceof AppError ? err.isOperational : false;

    // Log the complete error internally
    logger.error("Application exception", {
        method: req.method,
        url: req.originalUrl,
        statusCode,
        isOperational,
        message: err.message,
        stack: err.stack
    });

    // Do not attempt to send a second response
    if (res.headersSent) {
        next(err);
        return;
    }

    const message =
        statusCode === 500
            ? "Something went wrong. Please try again later."
            : err.message;

    res.status(statusCode).render("errors/error", {
        title: "Application Error",
        statusCode,
        message
    });
};