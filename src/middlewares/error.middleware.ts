import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../error/error.response.js";
import { ZodError } from "zod";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // if error come from custom response error
  if (error instanceof ResponseError) {
    return res.status(error.status).json({
      error: {
        code: error.code,
        message: error.message,
        ...(error.details && { details: error.details }),
      },
    });
  }

  // if error come from zod validation
  if (error instanceof ZodError) {
    const details = error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    return res.status(422).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Request Validation Failed.",
        details,
      },
    });
  }

  // if error comes from unexpected
  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Terjadi kesalahan server.",
    },
  });
};
