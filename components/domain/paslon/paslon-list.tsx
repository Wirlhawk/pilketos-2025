import { Paslon } from "@/app/generated/prisma";
import React from "react";
import PaslonCard from "./paslon-card";

export default function PaslonList({
    paslonList,
    bilikId,
    dptId,
}: {
    paslonList: Paslon[];
    bilikId: number;
    dptId: bigint;
}) {
    return (
        <div className="flex gap-12">
            {paslonList.map((paslon) => (
                <PaslonCard key={paslon.id} paslon={paslon} bilikId={bilikId} dptId={dptId} />
            ))}
        </div>
    );
}
