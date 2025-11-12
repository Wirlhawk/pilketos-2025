"use server";

import prisma from "@/lib/db/prisma";
import { safeAction } from "../utils/safe-action";

export const getPerolehanResults = safeAction(async () => {
    const paslonResults = await prisma.paslon.findMany({
        include: {
            _count: {
                select: { perolehan: true },
            },
        },
    });

    const totalVotes = paslonResults.reduce(
        (acc, paslon) => acc + paslon._count.perolehan,
        0
    );

    const results = paslonResults.map((paslon) => ({
        ...paslon,
        voteCount: paslon._count.perolehan,
        percentage: totalVotes > 0 ? (paslon._count.perolehan / totalVotes) * 100 : 0,
    }));

    return results;
});
