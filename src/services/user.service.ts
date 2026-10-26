import { ResponseError } from "../error/error.response.js";
import { createUser, findUserByUsername } from "../models/user.model.js";
import {
  RegisterRequest,
  UserResponse,
  toUserResponse,
} from "../type/user.type.js";
import bcrypt from "bcrypt";

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
  const user = await createUser({
    username: request.username,
    name: request.name,
    password: hashedPassword,
  });

  return toUserResponse(user);
};
