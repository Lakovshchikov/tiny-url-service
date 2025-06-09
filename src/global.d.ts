import { ZodIssue } from "zod";

declare global {
  interface Error {
    code?: string;
    message: string;
  }

  interface ResponseErrorBody {
    details?: string | ZodIssue[];
    error: string;
  }

  type ResponseWithErrorBody<D> = D | ResponseErrorBody;
}

export {};
