"use server";

import prisma from "@/lib/db/prisma";
import { safeAction } from "../utils/safe-action";

export const getAllBilik = safeAction(async () => {
    return prisma.bilik.findMany({
        include: {
            currentDpt: {
                include: {
                    kelas: true
                }
            }
        },
        orderBy: {
            id: "asc"
        }
    });
});
