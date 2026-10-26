import { ResponseError } from "../error/error.response.js";
import { createUser, findUserByUsername } from "../models/user.model.js";
import {
  LoginRequest,
  LoginResponseData,
  RegisterRequest,
  UserResponse,
  toLoginUserResponse,
  toUserResponse,
} from "../type/user.type.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "../lib/jwt.js";
import { Prisma } from "../generated/prisma/client.js";

export const registerService = async (
  request: RegisterRequest,
): Promise<UserResponse> => {
  // chekcking username in database
  const existUser = await findUserByUsername(request.username);

  // if username already exist then throw error
  if (existUser) {
    throw new ResponseError(409, "CONFLICT_ERROR", "Username already exist");
  }

  // hashing password
  const hashedPassword = await bcrypt.hash(request.password, 10);

  // create user in db
  let user;
  try {
    user = await createUser({
      username: request.username,
      name: request.name,
      password: hashedPassword,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new ResponseError(409, "CONFLICT_ERROR", "Username already exist");
    }
    throw error;
  }

  return toUserResponse(user);
};

export const loginService = async (
  request: LoginRequest,
): Promise<LoginResponseData> => {
  // cek user in database
  const user = await findUserByUsername(request.username);

  // if username not found throw error
  if (!user || !(await bcrypt.compare(request.password, user.password))) {
    throw new ResponseError(
      401,
      "INVALID_CREDENTIAL",
      "Username atau Password salah.",
    );
  }

  const token = jwt.sign({ sub: user.id }, getJwtSecret(), {
    expiresIn: "15m",
  });

  return {
    token_type: "Bearer",
    access_token: token,
    expires_in: 900,
    user: toLoginUserResponse(user),
  };
};
