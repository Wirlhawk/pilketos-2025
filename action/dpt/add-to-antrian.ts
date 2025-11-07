"use server";

import prisma from "@/lib/db/prisma";
import { safeAction } from "../utils/safe-action";
import { DptStatus } from "@/app/generated/prisma";
import { revalidatePath } from "next/cache";

export const addToAntrian = safeAction(async ({ id }: { id: number }) => {
    const data = await prisma.dpt.update({
        where: { id },
        data: { status: DptStatus.DALAM_ANTRIAN },
    });

    revalidatePath("/dpt");
    return data;
});
