"use server";

import prisma from "@/lib/db/prisma";
import { safeAction } from "../utils/safe-action";

export const getSystemStatus = safeAction(async () => {
    return prisma.status_Pemilihan.findFirst();
});
