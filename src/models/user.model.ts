import { prisma } from "../lib/prisma.js";

export const findUserByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
};
