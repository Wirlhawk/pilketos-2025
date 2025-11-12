"use server";

import prisma from "@/lib/db/prisma";
import { safeAction } from "../utils/safe-action";
import { ActivityType, DptStatus } from "@/app/generated/prisma";
import { logActivity } from "../activity/log";
import { activityMessage } from "../utils/activity";

export const votePaslon = safeAction(async ({ dptId, paslonId, bilikId }: {
    dptId: bigint;
    paslonId: number;
    bilikId: number;
}) => {

    // check udh ada existing perolehan
    const existingVote = await prisma.perolehan.findUnique({
        where: {
            dptId
        }
    })
    if (existingVote) {
        throw new Error("DPT sudah menggunakan hak suara")
    }

    const data = await prisma.$transaction(async (tx) => {
        // create perolehan
        const perolehan = await tx.perolehan.create({
            data: {
                bilikId,
                paslonId,
                dptId
            }
        })

        // update dpt status to sudah memilih
        const dpt = await tx.dpt.update({
            data: {
                status: DptStatus.SUDAH_MEMILIH
            },
            where: {
                id: dptId
            }
        })

        // update bilik to kosong
        const bilik = await tx.bilik.update({
            data: {
                currentDptId: null
            },
            where: {
                id: bilikId
            }
        })
        await logActivity({
            type: ActivityType.COMPLETE_VOTE,
            dptId,
            message: activityMessage.completeVote(dpt.name, bilikId)
        });
        return { perolehan, dpt, bilik }
    })

    return data
});
