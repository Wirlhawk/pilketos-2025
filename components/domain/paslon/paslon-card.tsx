"use client";
import { votePaslon } from "@/action/bilik/vote";
import type { Paslon } from "@/app/generated/prisma";
import { ActionButton } from "@/components/ui/action-button";
import { Card, CardContent } from "@/components/ui/card";
import { useClientAction } from "@/hooks/use-client-action";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PaslonCard({
    paslon,
    bilikId,
    dptId,
}: {
    paslon: Paslon;
    bilikId: number;
    dptId: bigint; 
}) {
    const router = useRouter();

    const { run: runVotePaslon, loading } = useClientAction(votePaslon, {
        onSuccess(data) {
            router.push(`/bilik/success?name=${data.dpt.name}`);
        },
    });

    const handleOnVote = () => {
        runVotePaslon({ paslonId: paslon.id, dptId, bilikId });
    };

    return (
        <Card className="bg-card w-[350px] max-w-sm transition-all duration-300 z-10 pb-8 shadow-none relative">
            <div className="text-4xl p-4 grid place-items-center rounded-full border-2 border-black absolute top-0 right-0 translate-x-[35%] translate-y-[-35%] bg-secondary font-bold text-white z-12">
                0{paslon.id}
            </div>

            <CardContent className="px-6 pt-4 pb-0">
                <div className="relative overflow-hidden rounded-xl mb-6 ">
                    <Image
                        className="w-full aspect-square object-cover transition-transform duration-300 hover:scale-110 scale-105 "
                        src={`/assets/${paslon.image}`}
                        alt={`Candidate ${paslon.id}`}
                        width={400}
                        height={500}
                    />
                    <div className="absolute inset-0 bg-linear-to-t via-transparent from-primary/40 to-transparent" />
                </div>

                <div className="space-y-2 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-balance text-secondary mb-1">
                            Paslon {String(paslon.id).padStart(2, "0")}
                        </h1>
                        <h2 className="text-2xl font-bold text-foreground">
                            {paslon.ketos}
                        </h2>
                        <h2 className="text-2xl font-bold text-foreground">
                            {paslon.waketos}
                        </h2>
                    </div>
                </div>

                <ActionButton
                    className="w-full font-bold py-6 transition-all duration-300 text-xl hover:scale-105 "
                    size="lg"
                    isLoading={loading}
                    onClick={handleOnVote}
                >
                    Pilih
                </ActionButton>
            </CardContent>
        </Card>
    );
}
