"use server";

import prisma from "@/lib/db/prisma";
import { safeAction } from "../utils/safe-action";

export const getAllKelas = safeAction(async () => {
    return prisma.kelas.findMany();
});
