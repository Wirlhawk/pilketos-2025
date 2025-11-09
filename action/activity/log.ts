"use server";

import { ActivityType } from "@/app/generated/prisma";
import prisma from "@/lib/db/prisma";

export async function logActivity({
    type,
    message,
    dptId,
    bilikId
}: {
    type: ActivityType;
    message: string;
    dptId?: bigint;
    bilikId?: number;
}) {
    await prisma.activityLog.create({
        data: { type, message, dptId, bilikId }
    });
}
