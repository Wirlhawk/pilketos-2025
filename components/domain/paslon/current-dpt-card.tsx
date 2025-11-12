import { Dpt, Kelas } from "@/app/generated/prisma";
import Image from "next/image";
import React from "react";

export default function CurrentDptCard({
    dpt,
}: {
    dpt: Dpt & { kelas: Kelas };
}) {
    return (
        <div className="border-[3px] rounded-md p-4 px-20 text-3xl font-bold bg-primary relative">
            <h1 className="font-bold text-white tracking-tight ">
                {dpt.name} - {dpt.kelas.name}
            </h1>

            <Image
                src="/assets/flower-2.png"
                alt=""
                width={100}
                height={100}
                className="absolute top-3 left-0 -translate-x-1/2  z-0 size-20"
            />

            <Image
                src="/assets/flower-1.png"
                alt=""
                width={100}
                height={100}
                className="absolute bottom-3 right-0 translate-x-1/2  z-0 size-20"
            />
        </div>
    );
}
