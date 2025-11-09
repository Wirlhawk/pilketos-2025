"use server";

import prisma from "@/lib/db/prisma";
import { safeAction } from "../utils/safe-action";
import { ActivityType, DptStatus } from "@/app/generated/prisma";
import { revalidatePath } from "next/cache";
import { logActivity } from "../activity/log";
import { activityMessage } from "../utils/activity";

export const addQueue = safeAction(async ({ id }: { id: bigint }) => {
    const data = await prisma.dpt.update({
        where: { id },
        data: { status: DptStatus.DALAM_ANTRIAN },
        select: {
            name: true,

        }
    });

    await logActivity({
        type: ActivityType.ADD_QUEUE,
        dptId: id,
        message: activityMessage.addQueue(data.name)
    });

    revalidatePath("/dpt");
    revalidatePath("/queue");

    return data;
});
