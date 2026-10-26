import { Request, Response, NextFunction } from "express";
import { validate } from "../validation/validation.js";
import { RegisterUserValidation } from "../validation/user.validaton.js";
import { registerService } from "../services/user.service.js";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // validate register request
    const request = validate(RegisterUserValidation, req.body);

    const result = await registerService(request);

    return res.status(201).json({
      success: true,
      message: "Registrasi pengguna berhasil",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
