import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import logger from "../config/logger";

export function requestLogger(
    req: Request,
    res: Response,
    next: NextFunction
): void {

    const requestId = randomUUID();
    const startTime = Date.now();

    res.setHeader("X-Request-ID", requestId);

    logger.info("Incoming HTTP request", {
        requestId,
        method: req.method,
        url: req.originalUrl
    });

    res.on("finish", () => {

        const duration = Date.now() - startTime;

        logger.http("HTTP request completed", {
            requestId,
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            durationMs: duration
        });

    });

    next();
}