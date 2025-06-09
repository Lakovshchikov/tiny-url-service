import { isEntityAlreadyExistsError, isNotFoundError } from "#lib";
import { Request, Response } from "express";

export function errorHandler(err: unknown, req: Request, res: Response) {
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

  res.status(500).json({
    details: "An unexpected error occurred.",
    error: "Internal Server Error",
  });
}
