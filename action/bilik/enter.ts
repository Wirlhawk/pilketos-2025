"use server";

import prisma from "@/lib/db/prisma";
import { safeAction } from "../utils/safe-action";
import { revalidatePath } from "next/cache";
import { logActivity } from "../activity/log";
import { ActivityType, DptStatus } from "@/app/generated/prisma";
import { activityMessage } from "../utils/activity";

export const enterBilik = safeAction(async ({ currentDptId, bilikId }: {
    currentDptId: bigint;
    bilikId: number;
}) => {
    const alreadyInBilik = await prisma.bilik.findFirst({
        where: {
            currentDptId: currentDptId,
        }
    })

    if (alreadyInBilik) {
        throw new Error("DPT already enter Bilik")
    }

    const [data] = await prisma.$transaction([
        prisma.bilik.update({
            where: { id: bilikId },
            data: { currentDptId },
            include: { currentDpt: true },
        }),
        prisma.dpt.update({
            where: { id: currentDptId },
            data: { status: DptStatus.DALAM_BILIK },
        })
    ]);

    await logActivity({
        type: ActivityType.ENTER_BILIK,
        dptId: currentDptId,
        message: activityMessage.enterBilik(data.currentDpt?.name || "", bilikId)
    });

    revalidatePath("/queue")
    return data
});
