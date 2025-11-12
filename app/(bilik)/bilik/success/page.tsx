"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function SuccessPage({ searchParams }: { searchParams: { name?: string } }) {
      const name = searchParams.name ;

    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-full max-w-5xl bg-primary text-card p-6 shadow-none relative pt-8">
                <CardContent>
                    <h1 className="font-swung text-9xl text-center mb-5 ">
                        VOTING SUKSES
                    </h1>

                    {/* <h1 className="font-swung text-9xl text-center mb-5 ">
                    SELAMAT DATANG
                </h1> */}

                    <h2 className="text-center font-semibold text-xl ">
                        Terimakasih {name} atas partisipasinya
                    </h2>
                    <h2 className="text-center font-semibold text-xl ">
                        Klik tombol <b>Mulai Memilih</b> untuk lanjut lanjut
                    </h2>
                </CardContent>
            </Card>
        </div>
    );
}
