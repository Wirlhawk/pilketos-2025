"use server";

import prisma from "@/lib/db/prisma";
import { safeAction } from "../utils/safe-action";
import { DptStatus } from "@/app/generated/prisma";

export const getDptStats = safeAction(async () => {
    const grouped = await prisma.dpt.groupBy({
        by: ["status"],
        _count: { _all: true },
    });

    // Make sure all statuses exist even if 0
    return Object.values(DptStatus).map((status) => {
        const found = grouped.find((g) => g.status === status);
        return {
            status,
            count: found?._count._all ?? 0,
        };
    });
});
