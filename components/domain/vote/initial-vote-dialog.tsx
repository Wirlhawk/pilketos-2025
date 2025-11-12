/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import type { Dpt, Kelas } from "@/app/generated/prisma";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function InitialVoteDialog({
    dpt,
}: {
    dpt: Dpt & { kelas: Kelas };
}) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="border-[3px]  rounded-2xl max-w-md neo   ">
                <DialogHeader className="pt-2">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <CheckCircle2 className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <DialogTitle className="text-3xl font-bold text-center text-foreground">
                        Selamat Datang
                    </DialogTitle>
                    <DialogDescription className="text-center text-base text-muted-foreground">
                        Anda siap untuk memulai proses pemilihan
                    </DialogDescription>
                </DialogHeader>

                {/* Voter info section */}
                <div className="space-y-3 py-6 px-4 rounded-lg">
                    <div>
                        <p className="text-sm font-semibold text-secondary uppercase tracking-wide">
                            Nama Pemilih
                        </p>
                        <p className="text-2xl font-bold text-foreground mt-1">
                            {dpt.name}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-secondary uppercase tracking-wide">
                            Kelas
                        </p>
                        <p className="text-2xl font-bold text-foreground mt-1">
                            {dpt.kelas.name}
                        </p>
                    </div>
                </div>

                {/* Action button */}
                <div className="pt-4">
                    <Button
                        className="w-full font-semibold text-base h-11 rounded-lg"
                        size="lg"
                        onClick={() => setOpen(false)}
                    >
                        Mulai Memilih
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
