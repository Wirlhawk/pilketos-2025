import { DptStatus } from "@/app/generated/prisma";
import StatusBadge from "@/components/status/status-badge";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IconCircleFilled } from "@tabler/icons-react";

export default function DptStats({
    dptStats,
}: {
    dptStats: {
        status: DptStatus;
        count: number;
    }[];
    }) {
    const total = dptStats.reduce((acc,item) => acc + item.count, 0)
    
    return (
        <Card className="w-full to-card bg-linear-to-t from-primary/5 shadow-xs border-2  ">
            <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-semibold">
                    DPT Stats
                </CardTitle>
                <CardDescription>Overview of DPT</CardDescription>
                <CardAction>
                    <Badge variant={"outline"}>
                        <IconCircleFilled className="fill-primary" />
                        Total
                    </Badge>
                    <CardTitle className="text-4xl font-semibold mt-2 text-muted-f">
                        {total}
                    </CardTitle>
                </CardAction>
            </CardHeader>
            <Separator orientation="horizontal" />
            <CardContent>
                <div className="flex items-center justify-between gap-0 h-24">
                    {dptStats.map((stat, index) => (
                        <>
                            <div
                                key={stat.status}
                                className="flex items-center flex-1 justify-center h-full"
                            >
                                <div className="flex flex-col items-center">
                                    <CardTitle className="text-4xl font-bold mb-2">
                                        {stat.count}
                                    </CardTitle>
                                    <StatusBadge status={stat.status} />
                                </div>
                            </div>
                            {index < dptStats.length - 1 && (
                                <Separator
                                    orientation="vertical"
                                    className="ml-0"
                                />
                            )}
                        </>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
