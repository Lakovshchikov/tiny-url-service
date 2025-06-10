import { isEntityAlreadyExistsError, isNotFoundError, isUrlExpiredError } from "#lib";
import { NextFunction, Request, Response } from "express";

// express middleware error handler requires 4 arguments
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
  if (isEntityAlreadyExistsError(err)) {
    res.status(409).json({
      details: "The provided entity is already in use. Please choose a different one.",
      error: "Entity Already Exists",
    });
    return;
  }

  if (isNotFoundError(err)) {
    res.status(404).json({
      details: "The requested resource could not be found.",
      error: "Not Found",
    });
    return;
  }

  if (isUrlExpiredError(err)) {
    res.status(410).json({
      details: "The requested URL has expired.",
      error: "URL Expired",
    });
    return;
  }

  res.status(500).json({
    details: "An unexpected error occurred.",
    error: "Internal Server Error",
  });
}
