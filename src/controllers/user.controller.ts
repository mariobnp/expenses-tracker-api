import { Request, Response, NextFunction } from "express";
import { validate } from "../validation/validation.js";
import {
  LoginUserValidation,
  RegisterUserValidation,
} from "../validation/user.validaton.js";
import { loginService, registerService } from "../services/user.service.js";

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

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // validate register request
    const request = validate(LoginUserValidation, req.body);

    const result = await loginService(request);

    return res.status(200).json({
      success: true,
      message: "Login berhasil.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
