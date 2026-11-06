import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
//This middleware handles URLs that do not exist.
export function notFoundHandler(
    req: Request,
    res: Response,
    next: NextFunction
): void {

    next(
        new AppError(
            `Requested URL ${req.originalUrl} was not found`,
            404
        )
    );
}