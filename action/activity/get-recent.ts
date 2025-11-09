"use server";

import prisma from "@/lib/db/prisma";
import { safeAction } from "../utils/safe-action";

export const getRecentActivity = safeAction(async () => {
    return prisma.activityLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
    });
});

