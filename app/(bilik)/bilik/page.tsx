import { getBilikSession } from "@/lib/auth/bilik-auth";

export default async function BilikPage() {
    const session = await getBilikSession();

    return (
        <div className="h-screen">
            <h1>Welcome!</h1>
            <p>{session?.name || "havent login"}</p>
        </div>
    );
}
