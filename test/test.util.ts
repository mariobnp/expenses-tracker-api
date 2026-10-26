import { prisma } from "../src/lib/prisma.js";

export const deleteUser = (username: string) => {
  return prisma.user.deleteMany({
    where: {
      username,
    },
  });
};
