import { getBilik } from "@/action/bilik/get";
import { getAllPaslon } from "@/action/paslon/get-all";
import CurrentDptCard from "@/components/domain/paslon/current-dpt-card";
import PaslonList from "@/components/domain/paslon/paslon-list";
import InitialVoteDialog from "@/components/domain/vote/initial-vote-dialog";
import { getBilikSession } from "@/lib/auth/bilik-auth";
import { redirect } from "next/navigation";

export default async function VotePage() {
    const session = await getBilikSession();
    if (!session) {
        redirect("/bilik/login");
    }

    const bilikData = await getBilik({ id: session.id });

    if (!bilikData.success || !bilikData.data?.currentDpt) {
        redirect("/bilik");
    }

    const paslonList = await getAllPaslon();

    return (
        <div className="h-screen flex flex-col gap-20 justify-center items-center">
            <InitialVoteDialog dpt={bilikData.data.currentDpt} />
            <CurrentDptCard dpt={bilikData.data.currentDpt} />
            <PaslonList
                paslonList={paslonList.success ? paslonList.data : []}
                dptId={bilikData.data.currentDptId!}
                bilikId={bilikData.data.id}
            />
        </div>
    );
}
