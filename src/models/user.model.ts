import { prisma } from "../lib/prisma.js";

export const findUserByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
};

export const createUser = (data: {
  username: string;
  name: string;
  password: string;
}) => {
  return prisma.user.create({
    data,
  });
};
