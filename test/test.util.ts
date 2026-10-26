import { prisma } from "../src/lib/prisma.js";
import bcrypt from "bcrypt";

export const deleteUser = () => {
  return prisma.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createUser = async () => {
  return prisma.user.create({
    data: {
      username: "test",
      name: "Test",
      password: await bcrypt.hash("PasswordKuat123!", 10),
      token: "test",
    },
  });
};
