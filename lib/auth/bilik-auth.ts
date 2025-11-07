"use server"
import { cookies } from "next/headers";

export async function getBilikSession(): Promise<{ id: number; name: string } | null> {
    const c = await cookies();
    const raw = c.get("bilik_session")?.value;
    if (!raw) return null;

    try {
        return JSON.parse(raw) as { id: number; name: string };
    } catch {
        return null;
    }
}

export async function setBilikSession(data: { id: number; name: string }): Promise<void> {
    const c = await cookies();
    c.set("bilik_session", JSON.stringify(data), {
        httpOnly: true,
        path: "/",
    });
}

export async function clearBilikSession(): Promise<void> {
    const c = await cookies();
    c.delete("bilik_session");
}
