"use server";

import prisma from "@/lib/db/prisma";
import { safeAction } from "../utils/safe-action";
import { setBilikSession } from "@/lib/auth/bilik-auth";


export const bilikLogin = safeAction(async ({ id }: { id: number }) => {
    const bilik = await prisma.bilik.findUnique({
        where: { id },
    });

    if (!bilik) {
        throw new Error("Bilik tidak ditemukan");
    }

    await setBilikSession({
        id: bilik.id,
        name: bilik.name,
    });

    return bilik;
});