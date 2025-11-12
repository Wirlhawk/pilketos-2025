"use server";

import prisma from "@/lib/db/prisma";
import { safeAction } from "../utils/safe-action";

export const getAllPaslon = safeAction(async () => {
    return prisma.paslon.findMany();
});
