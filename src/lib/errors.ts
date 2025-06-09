export enum ErrorCodes {
  ENTITY_ALREADY_EXISTS = "ENTITY_ALREADY_EXISTS",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  NOT_FOUND = "NOT_FOUND",
}

export const isEntityAlreadyExistsError = (error: unknown): boolean => {
  return error instanceof Error && error.message === ErrorCodes.ENTITY_ALREADY_EXISTS;
};

export const isInternalServerError = (error: unknown): boolean => {
  return error instanceof Error && error.message === ErrorCodes.INTERNAL_SERVER_ERROR;
};

export const isNotFoundError = (error: unknown): boolean => {
  return error instanceof Error && error.message === ErrorCodes.NOT_FOUND;
};
