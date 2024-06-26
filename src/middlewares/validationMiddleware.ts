import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export default function validationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array(), type: "validation-error" });
  }
  next();
}
