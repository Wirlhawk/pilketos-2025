import BilikWelcomeCard from "@/components/domain/bilik/bilik-welcome-card";
import { getBilikSession } from "@/lib/auth/bilik-auth";
import { redirect } from "next/navigation";

export default async function BilikPage() {
    const session = await getBilikSession();
    if (!session) {
        return redirect('/bilik/login')
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <BilikWelcomeCard session={session} />
        </div>
    );
}
