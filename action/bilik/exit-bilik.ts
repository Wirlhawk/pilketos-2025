"use server";

import prisma from "@/lib/db/prisma";
import { safeAction } from "../utils/safe-action";
import { revalidatePath } from "next/cache";

export const exitBilik = safeAction(async ({ currentDptId, bilikId }: {
    currentDptId: number;
    bilikId: number;
}) => {
    const alreadyInBilik = await prisma.bilik.findFirst({
        where: {
            currentDptId: currentDptId,
        }
    })

    if (!alreadyInBilik) {
        throw new Error("DPT is not inside Bilik")
    }

    await prisma.bilik.update({
        data: {
            currentDptId: null
        },
        where: {
            id: bilikId
        }
    });

    revalidatePath("/queue")
});
