"use server";

import prisma from "@/lib/db/prisma";
import { safeAction } from "../utils/safe-action";
import { revalidatePath } from "next/cache";
import { logActivity } from "../activity/log";
import { ActivityType, DptStatus } from "@/app/generated/prisma";
import { activityMessage } from "../utils/activity";

export const exitBilik = safeAction(async ({ currentDptId, bilikId }: {
    currentDptId: bigint;
    bilikId: number;
}) => {
    const alreadyInBilik = await prisma.bilik.findFirst({
        where: {
            currentDptId: currentDptId,
        },
        select: {
            currentDpt: true
        }
    })

    if (!alreadyInBilik) {
        throw new Error("DPT is not inside Bilik")
    }

    const [data] = await prisma.$transaction([
        prisma.bilik.update({
            where: { id: bilikId },
            data: { currentDptId: null },
            include: { currentDpt: true },
        }),
        prisma.dpt.update({
            where: { id: currentDptId },
            data: { status: DptStatus.DALAM_ANTRIAN },
        })
    ]);

    await logActivity({
        type: ActivityType.REMOVE_BILIK,
        dptId: currentDptId,
        message: activityMessage.removeBilik(alreadyInBilik.currentDpt?.name || "DPT", bilikId)
    });

    revalidatePath("/queue")
    return data
});
