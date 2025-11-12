import { Paslon } from "@/app/generated/prisma";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function PaslonResultsCard({
    id,
    ketos,
    waketos,
    voteCount,
    votePercentage,
}: {
    id: number;
    ketos: string;
    waketos: string;
    voteCount: number;
    votePercentage: number;
}) {
    return (
        <Card className="@container/car to-card dark:bg-card bg-linear-to-t dark:from-primary-from-primary/15">
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    {/* Left side: Number and names */}
                    <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center size-10 rounded-full bg-primary text-primary-foreground font-semibold text-md">
                            0{id}
                        </div>

                        <div>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                Paslon 0{id}
                            </CardTitle>
                            <CardDescription className="leading-snug">
                                {ketos}
                            </CardDescription>
                            <CardDescription className="leading-snug">
                                {waketos}
                            </CardDescription>
                        </div>
                    </div>

                    {/* Right side: Percentage and votes */}
                    <div className="text-right">
                        <p className="text-2xl font-bold  leading-tight">
                            {votePercentage.toFixed(1)}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {voteCount} suara
                        </p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-2">
                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                        className="bg-linear-to-r from-primary to-primary/80 h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${votePercentage}%` }}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
