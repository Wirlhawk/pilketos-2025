"use server";

import prisma from "@/lib/db/prisma";
import { safeAction } from "../utils/safe-action";

export const getBilik = safeAction(async ({ id }: {
    id: number
}) => {
    return prisma.bilik.findUnique({
        include: {
            currentDpt: {
                include: {
                    kelas: true
                }
            }
        },
        where: {
            id
        }
    });
});
