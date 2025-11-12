"use client";
import { getBilik } from "@/action/bilik/get";
import { Bilik } from "@/app/generated/prisma";
import { ActionButton } from "@/components/ui/action-button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useClientAction } from "@/hooks/use-client-action";
import { IconArrowRight } from "@tabler/icons-react";
import { Bold } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BilikWelcomeCard({
    session,
}: {
    session: { name: string; id: number };
}) {
    const router = useRouter();

    const { run: runCheckBilik, loading } = useClientAction(getBilik, {
        errorMessage: "Bilik sedang kosong",
        onSuccess(data) {
            if (data!.currentDptId) {
                router.push("/bilik/vote");
            } else {
                throw Error("Bilik Kosong");
            }
        },
    });

    return (
        <Card className="w-full max-w-5xl bg-primary text-card p-6 shadow-none relative pt-8">
            <div className="px-10 py-2 border-[3px] w-fit rounded-sm absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 text-primary font-swung bg-card">
                <h1 className="text-2xl">BILIK 0{session.id}</h1>
            </div>
            <CardContent>
                <h1 className="font-swung text-9xl text-center mb-5 ">
                    SIAPA PEMIMPIN <br />
                    PILIHANMU?
                </h1>

                {/* <h1 className="font-swung text-9xl text-center mb-5 ">
                    SELAMAT DATANG
                </h1> */}

                <h2 className="text-center font-semibold text-xl ">
                    Pemilihan Ketua dan Wakil Ketua OSIS SMK AL-AMANAH periode
                    2025/2026
                </h2>
                <h2 className="text-center font-semibold text-xl ">
                    Klik tombol &quot;Mulai Memilih&quot; untuk lanjut
                </h2>
            </CardContent>
            <CardFooter>
                <ActionButton
                    variant={"secondary"}
                    className="font-bold mx-auto text-xl py-6 px-32!"
                    size={"lg"}
                    isLoading={loading}
                    onClick={async () => runCheckBilik({ id: session.id })}
                >
                    Mulai Memilih <IconArrowRight />
                </ActionButton>
            </CardFooter>
        </Card>
    );
}
