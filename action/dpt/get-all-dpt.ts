"use server";

import prisma from "@/lib/db/prisma";
import { safeAction } from "../utils/safe-action";

export const getAllDpt = safeAction(async () => {
    return prisma.dpt.findMany({
        include: {
            kelas: true
        }
    });
});
