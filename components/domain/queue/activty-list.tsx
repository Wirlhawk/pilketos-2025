import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { IconArrowRight, IconCheck, IconClock } from "@tabler/icons-react";

export default function ActivtyList() {
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
                    Recent Activty
                </CardTitle>
                <CardDescription>Activty Log</CardDescription>

                <CardAction></CardAction>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Item variant="outline">
                        <ItemMedia variant="icon" className="bg-blue-700">
                            <IconArrowRight />
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle>Kafkariela Rasenry</ItemTitle>
                            <ItemDescription>Entered - Bilik 2</ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <Badge variant={"outline"}>
                                <IconClock />
                                30s Ago
                            </Badge>
                        </ItemActions>
                    </Item>
                    <Item variant="outline">
                        <ItemMedia variant="icon" className="bg-yellow-700">
                            <IconClock />
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle>Rayhan el Developer</ItemTitle>
                            <ItemDescription>Added to queue</ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <Badge variant={"outline"}>
                                <IconClock />
                                1m Ago
                            </Badge>
                        </ItemActions>
                    </Item>
                    <Item variant="outline">
                        <ItemMedia variant="icon" className="bg-green-700">
                            <IconCheck />
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle>Alif Cuki</ItemTitle>
                            <ItemDescription>
                                Completed Voting - Bilik 1
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <Badge variant={"outline"}>
                                <IconClock />
                                5m Ago
                            </Badge>
                        </ItemActions>
                    </Item>
                </div>
            </CardContent>
        </Card>
    );
}
