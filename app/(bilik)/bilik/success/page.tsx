
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IconArrowBack } from "@tabler/icons-react";
import Link from "next/link";

export default function SuccessPage(
) {

    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-full max-w-5xl bg-primary text-card p-6 shadow-none relative pt-8">
                <CardContent>
                    <div className="mb-5">
                        <h1 className="font-swung text-8xl text-center ">
                            PEMILIHAN SUKSES
                        </h1>
                    </div>

                    {/* <h1 className="font-swung text-9xl text-center mb-5 ">
                        SELAMAT DATANG
                    </h1> */}

                    <h2 className="text-center font-semibold text-xl ">
                        Terimakasih atas partisipasinya
                    </h2>
                    <h2 className="text-center font-semibold text-xl ">
                        Klik tombol &quot;Selesai&quot; untuk kembali
                    </h2>
                </CardContent>
                <CardFooter>
                    <Button
                        variant={"secondary"}
                        className="font-bold mx-auto text-xl py-6 px-32!"
                        size={"lg"}
                        asChild
                    >
                        <Link href="/bilik">
                            Selesai <IconArrowBack size={400}/>
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
