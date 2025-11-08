import { Bilik, Dpt, Kelas } from "@/app/generated/prisma";
import BilikCard from "@/components/cards/bilik-card";
import React from "react";

export default function BilikList({
    bilikList,
}: {
    bilikList: (Bilik & { currentDpt: (Dpt & { kelas: Kelas }) | null })[];
}) {
    return (
        <div className="@container/main  grid grid-cols-4 gap-4  @xl/main:grid-cols-2 @5xl/main:grid-cols-4 ">
            {bilikList.map((bilik) => (
                <BilikCard bilik={bilik} key={bilik.name} />
            ))}
        </div>
    );
}
