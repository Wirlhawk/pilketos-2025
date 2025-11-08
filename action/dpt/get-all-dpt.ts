"use server";

import prisma from "@/lib/db/prisma";
import { safeAction } from "../utils/safe-action";
import { DptStatus } from "@/app/generated/prisma";

export const getAllDpt = safeAction(async ({ status }: { status?: DptStatus }) => {
    return prisma.dpt.findMany({
        where: status ? { status } : undefined,
        include: {
            kelas: true,

        }
    });
});
