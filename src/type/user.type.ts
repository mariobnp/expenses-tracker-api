import { z } from "zod";
import {
  LoginUserValidation,
  RegisterUserValidation,
} from "../validation/user.validaton.js";
import { ApiResponse } from "./api.type.js";

export type LoginRequest = z.infer<typeof LoginUserValidation>;
export type RegisterRequest = z.infer<typeof RegisterUserValidation>;

export type UserResponseData = {
  id: string;
  username: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginResponseData = {
  token_type: "Bearer";
  access_token: string;
  expires_in: number;
  data: UserResponseData;
};

export type RegisterResponse = ApiResponse<UserResponseData>
export type LoginResponse = ApiResponse<LoginResponseData>
