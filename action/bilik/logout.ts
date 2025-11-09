"use server";

import { clearBilikSession } from "@/lib/auth/bilik-auth";

export async function bilikLogout() {
    clearBilikSession();
}
