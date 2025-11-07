import { IconUser } from "@tabler/icons-react";
import { Badge } from "../ui/badge";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

interface StatisticCardProps {
    title: string;
    description: string;
    value: number | string;
    badgeContent: string;
}

export default function StatisticCard({
    title,
    description,
    value,
    badgeContent,
}: StatisticCardProps) {
    return (
        <Card className="@container/card">
            <CardHeader>
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {value}
                </CardTitle>
                <CardAction>
                    <Badge variant={"outline"}>
                        <IconUser />
                        {badgeContent}
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                    {description}
                </div>
            </CardFooter>
        </Card>
    );
}
