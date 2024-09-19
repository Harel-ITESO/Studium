/**
 * Handle singleton instance of the Prisma client
 */

import { PrismaClient } from "@prisma/client";

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

export const prismaClient = global.prisma || new PrismaClient();

if (process.env["NODE_ENV"] !== "production") global.prisma = prismaClient;

export * from "@prisma/client";
