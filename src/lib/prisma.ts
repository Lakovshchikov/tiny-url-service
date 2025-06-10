import pkg from "@prisma/client";
const { Prisma, PrismaClient } = pkg;

export { type Click, type Url } from "@prisma/client";
export const prisma = new PrismaClient();
export { Prisma, PrismaClient };
