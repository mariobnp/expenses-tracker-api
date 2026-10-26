import { z } from "zod";
import {
  LoginUserValidation,
  RegisterUserValidation,
} from "../validation/user.validaton.js";
import { ApiResponse } from "./api.type.js";
import type { User } from "../generated/prisma/client.js";

export type LoginRequest = z.infer<typeof LoginUserValidation>;
export type RegisterRequest = z.infer<typeof RegisterUserValidation>;

export type UserResponse = {
  id: string;
  username: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginUserResponse = {
  id: string;
  name: string;
  username: string;
};

export type LoginResponseData = {
  token_type: "Bearer";
  access_token: string;
  expires_in: number;
  data: LoginUserResponse;
};

export type RegisterResponse = ApiResponse<UserResponse>;
export type LoginResponse = ApiResponse<LoginResponseData>;

type RegisterUserSource = Pick<
  User,
  "id" | "username" | "name" | "createdAt" | "updatedAt"
>;

export const toUserResponse = (user: RegisterUserSource): UserResponse => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
};

type LoginUserSource = Pick<User, "id" | "username" | "name">;

export const toLoginUserResponse = (
  user: LoginUserSource,
): LoginUserResponse => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
  };
};
